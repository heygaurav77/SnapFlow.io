import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { existsSync } from "fs";

// Fallback paths for Windows if not in environment PATH
const YTDLP_PATH = "C:\\Users\\goura\\AppData\\Local\\Microsoft\\WinGet\\Packages\\yt-dlp.yt-dlp_Microsoft.Winget.Source_8wekyb3d8bbwe\\yt-dlp.exe";

function getExecutable() {
  if (existsSync(YTDLP_PATH)) return YTDLP_PATH;
  return "yt-dlp"; // Rely on system PATH
}

// ─── Platform Detection ───
const PLATFORM_PATTERNS: Record<string, RegExp[]> = {
  youtube: [/youtube\.com\/watch/, /youtube\.com\/shorts/, /youtu\.be\//, /youtube\.com\/embed/],
  tiktok: [/tiktok\.com\/@[\w.]+\/video/, /vm\.tiktok\.com/, /tiktok\.com\/t\//],
  instagram: [
    /instagram\.com\/(p|reel|stories|tv|s|highlights)\//, 
    /instagram\.com\/[\w.]+\/?$/, 
    /instagr\.am/
  ],
  pinterest: [/pinterest\.com\/pin\//, /pin\.it\//],
  twitter: [/twitter\.com\/\w+\/status/, /x\.com\/\w+\/status/],
  facebook: [/facebook\.com\/.*\/videos\//, /facebook\.com\/reel\//, /facebook\.com\/watch/, /fb\.watch\//],
};

function detectPlatform(url: string): string {
  for (const [platform, patterns] of Object.entries(PLATFORM_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(url)) return platform;
    }
  }
  return "other";
}

function isValidURL(str: string): boolean {
  try {
    const url = new URL(str);
    return ["http:", "https:"].includes(url.protocol);
  } catch {
    return false;
  }
}

interface FormatInfo {
  format_id: string;
  vcodec?: string;
  acodec?: string;
  height?: number;
  ext?: string;
  filesize?: number;
  filesize_approx?: number;
  url?: string; // Direct link from yt-dlp
}

interface MediaInfo {
  title?: string;
  description?: string;
  thumbnail?: string;
  duration?: number;
  uploader?: string;
  channel?: string;
  formats?: FormatInfo[];
  ext?: string;
  url?: string; // Top-level URL from yt-dlp
  width?: number;
  height?: number;
}

interface Quality {
  id: string;
  label: string;
  height: number;
  ext: string;
  filesize: number | null;
  type: string;
  format: string;
  directUrl?: string; // The URL to use for proxy download
}

function getMediaInfo(url: string, platform: string): Promise<MediaInfo> {
  return new Promise((resolve, reject) => {
    const args = [
      "--no-warnings",
      "--dump-json",
      "--no-download",
      "--socket-timeout", "15",
      "--user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "--no-check-certificates",
      "--no-mtime", // Faster processing
    ];

    if (platform === "instagram") {
      args.push(
        "--user-agent", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
        "--add-header", "X-IG-App-ID:936619743392459",
        "--add-header", "Referer:https://www.instagram.com/",
        "--add-header", "Origin:https://www.instagram.com",
        "--extractor-args", "instagram:stories=true;highlights=true"
      );
    }

    args.push(url);

    let stdout = "";
    let stderr = "";

    const proc = spawn(getExecutable(), args, { timeout: 45000 });
    proc.stdout.on("data", (data: Buffer) => { stdout += data.toString(); });
    proc.stderr.on("data", (data: Buffer) => { stderr += data.toString(); });

    proc.on("close", (code: number | null) => {
      if (code !== 0) {
        reject(new Error(stderr || "Failed to fetch media info"));
        return;
      }
      try {
        resolve(JSON.parse(stdout));
      } catch {
        reject(new Error("Failed to parse media info"));
      }
    });

    proc.on("error", (err) => {
      reject(new Error(`Could not find yt-dlp. ${err.message}`));
    });
  });
}

function buildQualities(info: MediaInfo, url: string, platform: string): Quality[] {
  const qualities: Quality[] = [];
  const formats = info.formats || [];
  
  const isVideoUrl = 
    platform === "youtube" || 
    platform === "tiktok" || 
    (platform === "instagram" && (url.includes("/stories/") || url.includes("/highlights/") || url.includes("/reel/") || url.includes("/p/"))) ||
    platform === "facebook" ||
    platform === "twitter" ||
    (info.ext === "mp4" || info.ext === "webm" || info.ext === "mkv");

  if (formats.length > 0) {
    const videoFormats = formats
      .filter((f) => f.vcodec && f.vcodec !== "none" && (f.height || 0) >= 144)
      .sort((a, b) => (b.height || 0) - (a.height || 0));

    const imageFormats = formats
      .filter((f) => (!f.vcodec || f.vcodec === "none") && (f.ext === "jpg" || f.ext === "png" || f.ext === "webp" || f.format_id?.includes("photo")))
      .sort((a, b) => (b.height || 0) - (a.height || 0));

    const seenLabels = new Set<string>();

    for (const f of videoFormats) {
      const h = f.height || 0;
      const label =
        h >= 4320 ? "8K (4320p)" :
        h >= 2160 ? "4K (2160p)" :
        h >= 1440 ? "2K (1440p)" :
        h >= 1080 ? "1080p (Full HD)" :
        h >= 720 ? "720p (HD)" :
        h >= 480 ? "480p" :
        h >= 360 ? "360p" : `${h}p`;

      if (!seenLabels.has(label)) {
        seenLabels.add(label);
        qualities.push({
          id: f.format_id,
          label,
          height: h,
          ext: f.ext || "mp4",
          filesize: f.filesize || f.filesize_approx || null,
          type: "video",
          format: h > 0 ? `bestvideo[height<=${h}]+bestaudio/best[height<=${h}]` : "best",
          directUrl: f.url || info.url || formats[0]?.url,
        });
      }
    }

    // Fallback if no specific high res videos found but we have formats
    if (qualities.length === 0 && videoFormats.length > 0) {
        const f = videoFormats[0];
        qualities.push({
            id: f.format_id,
            label: "Standard Quality",
            height: f.height || 0,
            ext: f.ext || "mp4",
            filesize: f.filesize || f.filesize_approx || null,
            type: "video",
            format: "best",
            directUrl: f.url || info.url
        });
    }

    for (const f of imageFormats) {
      const h = f.height || 0;
      const label = h > 0 ? `${h}p (High Res Image)` : "Original HD Image";
      if (!seenLabels.has(label)) {
        seenLabels.add(label);
        qualities.push({
          id: f.format_id,
          label,
          height: h,
          ext: f.ext || "jpg",
          filesize: f.filesize || f.filesize_approx || null,
          type: "image",
          format: f.format_id,
          directUrl: f.url || info.url || formats[0]?.url,
        });
      }
    }

    if (qualities.length === 0 || (isVideoUrl && !qualities.some(q => q.type === "video"))) {
      qualities.unshift({
        id: "best",
        label: "Premium HQ Archive",
        height: 0,
        ext: isVideoUrl ? "mp4" : (info.ext || "jpg"),
        filesize: null,
        type: isVideoUrl ? "video" : "image",
        format: "best",
        directUrl: info.url,
      });
    }

    const audioBitrates = [
      { label: "Studio Master (320kbps HL)", abr: 320 },
      { label: "Pro Grade (256kbps HD)", abr: 256 },
      { label: "Digital Standard (128kbps)", abr: 128 },
      { label: "Efficient Echo (48kbps)", abr: 48 },
    ];

    for (const b of audioBitrates) {
      qualities.push({
        id: `audio-${b.abr}`,
        label: b.label,
        height: 0,
        ext: "mp3",
        filesize: null,
        type: "audio",
        format: `bestaudio[abr<=${b.abr}]/bestaudio`,
      });
    }
  } else {
    qualities.push({
      id: "best",
      label: "Premium HQ Archive",
      height: 0,
      ext: isVideoUrl ? "mp4" : (info.ext || "jpg"),
      filesize: null,
      type: isVideoUrl ? "video" : "image",
      format: "best",
      directUrl: info.url,
    });
  }

  return qualities;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required." }, { status: 400 });
    }

    const cleanUrl = url.replace(/<[^>]*>/g, "").trim();

    if (!isValidURL(cleanUrl)) {
      return NextResponse.json({ error: "Invalid URL format." }, { status: 400 });
    }

    // CHECK FOR PRIVATE ARCHIVE LINKS
    if (cleanUrl.includes("/stories/archive/")) {
        return NextResponse.json({ 
            error: "Stories Archive links are PRIVATE to your account. Please use the public Story link found in the home feed." 
        }, { status: 400 });
    }

    const platform = detectPlatform(cleanUrl);
    let info: MediaInfo;
    
    try {
      info = await getMediaInfo(cleanUrl, platform);
      // 🔥 CRITICAL FALLBACK: Ensure base 'url' is set for the Download Route
      if (!info.url && info.formats && info.formats.length > 0) {
          info.url = info.formats[0].url;
      }
    } catch (primaryErr) {
      console.warn("[PRIMARY FETCH FAILED] Attempting Neural Fallback...", (primaryErr as Error).message);
      
      if (platform === "instagram") {
        try {
          const res = await fetch(cleanUrl, {
            headers: { 
              "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
              "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
              "Accept-Language": "en-US,en;q=0.9",
              "X-IG-App-ID": "936619743392459"
            }
          });
          
          const html = await res.text();
          
          const ogImage = html.match(/property="og:image"\s+content="(.*?)"/)?.[1];
          const ogVideo = html.match(/property="og:video"\s+content="(.*?)"/)?.[1];
          const ogTitle = html.match(/property="og:title"\s+content="(.*?)"/)?.[1] || 
                          html.match(/<title>(.*?)<\/title>/)?.[1];
          const ogDesc = html.match(/property="og:description"\s+content="(.*?)"/)?.[1];
          
          if (ogImage || ogVideo) {
            info = {
              title: ogTitle || (cleanUrl.includes("/stories/") ? "Instagram Story" : "Instagram Content"),
              description: ogDesc || "",
              thumbnail: ogImage || ogVideo,
              url: ogVideo || ogImage, // Use 'url', not 'directUrl'
              uploader: "Instagram User",
              ext: ogVideo ? "mp4" : "jpg",
              formats: ogVideo ? [{ 
                format_id: "original_video", 
                ext: "mp4", 
                vcodec: "h264", 
                height: 1080 
              }] : []
            };
          } else if (html.includes("login") || html.includes("Login")) {
             throw new Error("Instagram login wall detected.");
          } else {
            throw primaryErr;
          }
        } catch (fallbackErr) {
          throw primaryErr;
        }
      } else {
        throw primaryErr;
      }
    }

    const result = {
      success: true,
      platform,
      title: (info.title || info.description?.substring(0, 50) || "SnapFlow_Story").substring(0, 50),
      description: (info.description || "").substring(0, 150),
      thumbnail: info.thumbnail || null,
      duration: info.duration || 0,
      uploader: info.uploader || info.channel || "Unknown",
      qualities: buildQualities(info, cleanUrl, platform),
      isVertical: (info.height || 0) > (info.width || 0) || cleanUrl.includes("/shorts/") || cleanUrl.includes("/reel/") || cleanUrl.includes("/stories/"),
    };

    return NextResponse.json(result);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("[FETCH ERROR]", errorMessage);
    
    let errorResponse = "Access Restricted or Invalid Link. Ensure the content is PUBLIC and try again.";
    
    if (errorMessage.includes("Sign in to confirm you are not a bot")) {
      errorResponse = "YouTube Anti-Bot Detection: Please try again in 5-10 minutes or use a different video link.";
    } else if (errorMessage.includes("login wall") || errorMessage.includes("Private video")) {
      errorResponse = "This content is PRIVATE or requires a login. Please try a public link.";
    } else if (errorMessage.includes("Unsupported URL")) {
      errorResponse = "SnapFlow doesn't support this link yet. Please check the supported platforms.";
    } else if (errorMessage.includes("Incomplete data") || errorMessage.includes("JSON.parse")) {
        errorResponse = "Network error while fetching media info. Please try one more time.";
    } else if (errorMessage.length < 150) {
        // Pass through cleaner short errors
        errorResponse = errorMessage.replace(/ERROR: /g, "").substring(0, 150);
    }

    return NextResponse.json(
      { error: errorResponse },
      { status: 500 }
    );
  }
}
