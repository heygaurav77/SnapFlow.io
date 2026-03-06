import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { randomBytes } from "crypto";
import { existsSync, mkdirSync, createReadStream, statSync, readdirSync } from "fs";
import { join } from "path";

const DOWNLOADS_DIR = join(process.cwd(), "temp_downloads");

if (!existsSync(DOWNLOADS_DIR)) {
  mkdirSync(DOWNLOADS_DIR, { recursive: true });
}

const YTDLP_PATH = "C:\\Users\\goura\\AppData\\Local\\Microsoft\\WinGet\\Packages\\yt-dlp.yt-dlp_Microsoft.Winget.Source_8wekyb3d8bbwe\\yt-dlp.exe";
const FFMPEG_PATH = "C:\\Users\\goura\\AppData\\Local\\Microsoft\\WinGet\\Packages\\yt-dlp.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-N-123074-g4e32fb4c2a-win64-gpl\\bin\\ffmpeg.exe";

function getExecutable(name: "yt-dlp" | "ffmpeg") {
  const fallback = name === "yt-dlp" ? YTDLP_PATH : FFMPEG_PATH;
  if (existsSync(fallback)) return fallback;
  return name;
}

// 💎 HIGH-TRUST MOBILE HEADERS FOR BYPASSING INSTAGRAM SECURITY
const mobileUA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1";
const IG_APP_ID = "936619743392459";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");
    const format = searchParams.get("format") || "best";
    const type = searchParams.get("type") || "video";
    const title = searchParams.get("title") || "SnapFlow_Content";
    const directUrl = searchParams.get("directUrl");

    if (!url) {
      return NextResponse.json({ error: "URL is required." }, { status: 400 });
    }

    const cleanUrl = url.trim();
    const fileId = randomBytes(8).toString("hex");
    const isInstagramStory = cleanUrl.includes("/stories/") || cleanUrl.includes("/highlights/");
    const ext = (isInstagramStory || type === "video") ? "mp4" : (type === "audio" ? "mp3" : "jpg");
    const safeTitle = title.replace(/[<>:"/\\|?*]/g, "").substring(0, 100);
    const fileName = `${safeTitle} - SnapFlow.${ext}`;

    const platform = cleanUrl.includes("instagram.com") ? "instagram" : 
                     (cleanUrl.includes("youtube.com") || cleanUrl.includes("youtu.be")) ? "youtube" : "other";

    // 🚀 NEURAL DIRECT STREAMING (WITH REINFORCED IG APP TRUST)
    if (directUrl && isValidDirectUrl(directUrl)) {
      console.log(`[DOWNLOAD] Direct Proxy Attempt: ${directUrl.substring(0, 50)}...`);
      try {
        const fetchHeaders: Record<string, string> = {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        };

        if (platform === "instagram") {
          fetchHeaders["User-Agent"] = mobileUA;
          fetchHeaders["X-IG-App-ID"] = IG_APP_ID;
          fetchHeaders["Referer"] = "https://www.instagram.com/";
          fetchHeaders["Origin"] = "https://www.instagram.com";
        }

        const res = await fetch(directUrl, { headers: fetchHeaders });

        if (res.ok) {
          const contentType = ext === "mp4" ? "video/mp4" : (ext === "mp3" ? "audio/mpeg" : "image/jpeg");
          const buffer = await res.arrayBuffer(); // Pre-fetch buffer for maximum stability
          return new Response(Buffer.from(buffer), {
            headers: {
              "Content-Disposition": `attachment; filename="${fileName}"`,
              "Content-Type": contentType,
              "Content-Length": buffer.byteLength.toString(),
              "Cache-Control": "no-cache",
            },
          });
        }
      } catch (err) {
        console.warn("[DIRECT PROXY BLOCKED] Falling back to deep extraction engine...", err);
      }
    }

    // 🐢 DEEP EXTRACTION ENGINE (FOR COMPLEX ENCRYPTED STREAMS)
    const outputPath = join(DOWNLOADS_DIR, `${fileId}.%(ext)s`);
    const args = [
      "--no-warnings",
      "--no-playlist",
      "--ffmpeg-location", getExecutable("ffmpeg"),
      "-f", format,
      "-o", outputPath,
      "--user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "--no-check-certificates",
    ];

    if (platform === "instagram") {
      args.push(
        "--user-agent", mobileUA,
        "--add-header", `X-IG-App-ID:${IG_APP_ID}`,
        "--add-header", "Referer:https://www.instagram.com/",
        "--add-header", "Origin:https://www.instagram.com",
        "--extractor-args", "instagram:stories=true;highlights=true"
      );
    }

    args.push(cleanUrl);

    return new Promise<Response>((resolve) => {
      const proc = spawn(getExecutable("yt-dlp"), args, { timeout: 300000 });
      let stderr = "";
      proc.stderr.on("data", (d: Buffer) => { stderr += d.toString(); });

      proc.on("close", (code: number | null) => {
        if (code !== 0) {
          console.error("[DEEP ENGINE ERROR]", stderr);
          resolve(NextResponse.json({ error: "Access Restricted. This might be a private video or requires login." }, { status: 500 }) as any);
          return;
        }

        const files = readdirSync(DOWNLOADS_DIR).filter((f: string) => f.startsWith(fileId));
        if (files.length === 0) {
          resolve(NextResponse.json({ error: "File delivery failed." }, { status: 500 }) as any);
          return;
        }

        const filePath = join(DOWNLOADS_DIR, files[0]);
        const stats = statSync(filePath);
        const fileStream = createReadStream(filePath);
        const contentType = ext === "mp4" ? "video/mp4" : (ext === "mp3" ? "audio/mpeg" : "image/jpeg");

        resolve(new Response(fileStream as any, {
          headers: {
            "Content-Disposition": `attachment; filename="${fileName}"`,
            "Content-Type": contentType,
            "Content-Length": stats.size.toString(),
          },
        }));
      });
    });
  } catch (err: any) {
    return NextResponse.json({ error: "SnapFlow Engine Error." }, { status: 500 });
  }
}

function isValidDirectUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return ["http:", "https:"].includes(u.protocol);
  } catch {
    return false;
  }
}
