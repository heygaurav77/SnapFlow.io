"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Toast from "./Toast";
import { getTranslations } from "@/lib/translations";

const PLATFORM_COLORS: Record<string, string> = {
  youtube: "#FF0000",
  tiktok: "#00F2EA",
  instagram: "#E1306C",
  pinterest: "#E60023",
  twitter: "#1DA1F2",
  facebook: "#1877F2",
  other: "#3B82F6",
};

const PLATFORM_NAMES: Record<string, string> = {
  youtube: "YouTube",
  tiktok: "TikTok",
  instagram: "Instagram",
  pinterest: "Pinterest",
  twitter: "Twitter / X",
  facebook: "Facebook",
  other: "Website",
};

interface Quality {
  id: string;
  label: string;
  format: string;
  type: string;
  ext: string;
  filesize: number | null;
  directUrl?: string; // Opt-in for faster proxy downloads
}

interface MediaInfo {
  success: boolean;
  platform: string;
  title: string;
  description: string;
  thumbnail: string | null;
  duration: number;
  uploader: string;
  qualities: Quality[];
  url: string;
  isVertical?: boolean;
}

interface ToastItem {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

export default function HeroSection() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [media, setMedia] = useState<MediaInfo | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [activePlatform, setActivePlatform] = useState("all");
  const [activeSubTab, setActiveSubTab] = useState("Any URL");
  const [activePopupTab, setActivePopupTab] = useState<"video" | "audio">("video");
  const [downloading, setDownloading] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [t, setT] = useState(getTranslations("en"));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedLang = localStorage.getItem("snapflow-lang") || "en";
    setT(getTranslations(savedLang));

    const syncLang = (e: any) => {
      setT(getTranslations(e.detail));
    };
    window.addEventListener("snapflow-lang-change", syncLang);
    return () => window.removeEventListener("snapflow-lang-change", syncLang);
  }, []);

  const PLATFORM_TABS = [
    { id: "all", label: t.platforms.all, icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    )},
    { id: "instagram", label: t.platforms.instagram, icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    )},
    { id: "tiktok", label: t.platforms.tiktok, icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.64-4.89 1.45-1.12 3.29-1.67 5.11-1.53v4.12c-.7-.13-1.43.15-2.04.48-.6.31-1.12.82-1.43 1.44-.45.92-.12 1.45.1 1.77.12.18.25.35.4.5.42.41 1.05.62 1.63.62h.58V1.31l1-.05L12.525.02z"/>
      </svg>
    )},
    { id: "youtube", label: t.platforms.youtube, icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    )},
  ];

  const SUB_TABS: Record<string, string[]> = {
    all: [t.platforms.anyUrl],
    instagram: [t.platforms.video, t.platforms.reels, t.platforms.photo, t.platforms.dp, t.platforms.stories, t.platforms.highlights],
    tiktok: [t.platforms.video, t.platforms.audio],
    youtube: [t.platforms.video, t.platforms.shorts, t.platforms.audio],
  };

  const handlePlatformChange = (platformId: string) => {
    setActivePlatform(platformId);
    setActiveSubTab(SUB_TABS[platformId][0]);
    setUrl(""); // Optional: clear URL when switching platforms
  };

  const showToast = useCallback(
    (message: string, type: ToastItem["type"] = "info") => {
      // Respect notification setting for non-error messages
      if (!notificationsEnabled && type !== "error") return;

      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
      inputRef.current?.focus();
      showToast("Link pasted!", "success");
    } catch {
      showToast("Clipboard access denied.", "error");
    }
  };

  const handleFetch = async () => {
    let rawUrl = url.trim();
    if (!rawUrl) {
      showToast("Please paste a valid social media link.", "error");
      inputRef.current?.focus();
      return;
    }
    
    if (!/^https?:\/\//i.test(rawUrl)) {
      rawUrl = "https://" + rawUrl;
    }

    try {
      const u = new URL(rawUrl);
      if (!["http:", "https:"].includes(u.protocol) || !u.hostname.includes("."))
        throw new Error();
    } catch {
      showToast(
        "Hmm, that doesn't look like a valid link. Copy the full URL from your browser or app.",
        "error"
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: rawUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.error || "Failed to fetch content.", "error");
        return;
      }

      const mediaData: MediaInfo = { ...data, url: rawUrl };
      setMedia(mediaData);
      
      if (data.qualities?.length > 0) {
        setSelectedFormat(data.qualities[0].format);
        setSelectedType(data.qualities[0].type);
      }

      showToast(`Found: ${data.title}`, "success");
    } catch {
      showToast("Could not connect to server. Is the server running?", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!media) return;
    setDownloading(true);

    const currentQuality = media.qualities?.find(q => q.format === selectedFormat);
    const directUrl = currentQuality?.directUrl || "";

    const downloadUrl = `/api/download?url=${encodeURIComponent(
      media.url
    )}&format=${encodeURIComponent(selectedFormat)}&type=${encodeURIComponent(
      selectedType
    )}&title=${encodeURIComponent(media.title)}&platform=${encodeURIComponent(media.platform)}&directUrl=${encodeURIComponent(directUrl)}`;

    const a = document.createElement("a");
    a.href = downloadUrl;
    
    const safeTitle = (media.title || "SnapFlow_Video")
      .replace(/[<>:"/\\|?*]/g, "")
      .substring(0, 50); 
    
    a.download = `${safeTitle} - SnapFlow`;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    showToast("Downloading...", "success");
    
    // Simulate finishing state
    setTimeout(() => {
      setDownloading(false);
      setMedia(null);
      showToast("Success!", "success");
    }, 4000);
  };

  const initiateDownloadFlow = () => {
    if (!selectedFormat) {
      showToast("Please select a quality first", "warning");
      return;
    }
    handleDownload();
  };

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMedia(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const durationStr = media?.duration
    ? `${Math.floor(media.duration / 60)}:${Math.floor(media.duration % 60)
        .toString()
        .padStart(2, "0")}`
    : null;

  return (
    <>
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        {/* Ultra-Sharp Blackhole Background */}
        <div className="absolute inset-0 bg-[url('/blackhole.png')] bg-cover bg-center brightness-[1.1] contrast-[1.1] sharp-bg pointer-events-none" />
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        
        {/* Notification Control Panel */}
        <div className="absolute top-24 right-8 z-20 flex items-center gap-3 animate-fade-in group">
          <button 
            onClick={() => {
              const newState = !notificationsEnabled;
              setNotificationsEnabled(newState);
              if (newState) showToast("System Alerts Active", "success");
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all backdrop-blur-xl border ${
              notificationsEnabled 
                ? "bg-primary text-white border-primary/30 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-110" 
                : "bg-white/5 text-white/20 border-white/10 hover:text-white hover:bg-white/10"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              {notificationsEnabled ? (
                <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" />
              ) : (
                <path d="M13.73 21a2 2 0 0 1-3.46 0M18.63 13A17.89 17.89 0 0 1 18 8M6.26 6.26A6 6 0 0 0 6 8c0 7-3 9-3 9h14M18 8a6 6 0 0 0-7.07-5.91M2 2l20 20" />
              )}
            </svg>
          </button>
        </div>
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center animate-fade-in">
          {/* Badge */}
          {/* Upcoming Feature Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-12 shadow-sm backdrop-blur-xl group hover:bg-white/10 transition-all cursor-default lg:scale-100 scale-90">
            <div className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-black text-white uppercase tracking-[0.3em] flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
              SnapFlow <span className="text-primary">v1.0</span>
              <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 tracking-tight">
            {t.hero.title} <br className="sm:hidden" />
            <TypewriterText />
          </h1>

          <div className="border-spin-glow max-w-3xl mx-auto mb-12 shadow-[0_0_50px_rgba(59,130,246,0.15)]">
            <div className="bg-black/40 backdrop-blur-3xl rounded-[23px] p-6 sm:p-10 relative overflow-hidden h-full w-full border border-white/5">
              {/* Themed Glow inside card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              {/* Platform Main Tabs */}
              <div className="flex overflow-x-auto pb-2 mb-6 gap-2 sm:gap-4 no-scrollbar justify-start sm:justify-center border-b border-border/50">
                {PLATFORM_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handlePlatformChange(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 border-b-2 font-medium transition-all whitespace-nowrap ${
                      activePlatform === tab.id
                        ? "border-primary text-primary"
                        : "border-transparent text-muted hover:text-white"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Sub Tabs */}
              {SUB_TABS[activePlatform].length > 1 && (
                <div className="flex flex-wrap gap-2 mb-8 justify-center">
                  {SUB_TABS[activePlatform].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setActiveSubTab(sub)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                        activeSubTab === sub
                          ? "bg-white/10 text-white"
                          : "bg-white/5 text-muted hover:bg-white/10 hover:text-white border border-white/5"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}

              <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">
                {activePlatform === "all" ? t.hero.description : `${PLATFORM_NAMES[activePlatform] || activePlatform} ${activeSubTab} Downloader`}
              </h2>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative group w-full">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
                    </svg>
                  </div>
                  <input
                    ref={inputRef}
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleFetch()}
                    placeholder={
                      activePlatform === "all" 
                        ? "Paste any social media link here..." 
                        : `Paste valid ${PLATFORM_NAMES[activePlatform]} link here...`
                    }
                    className="w-full pl-12 pr-12 py-4 rounded-2xl bg-black/20 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-primary/50 transition-all text-sm sm:text-base backdrop-blur-md"
                  />
                  <button
                    onClick={handlePaste}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg text-muted hover:text-white hover:bg-white/10 transition-colors"
                    title="Paste"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                  </button>
                </div>

                <button
                  onClick={handleFetch}
                  disabled={loading}
                  className="btn-highlight px-6 sm:px-10 py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-black text-lg flex justify-center items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-wait w-full sm:w-auto mt-2 sm:mt-0 uppercase tracking-wider relative overflow-hidden"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="animate-pulse">{t.hero.searching}</span>
                    </div>
                  ) : (
                    <>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                      </svg>
                      <span>{t.hero.search}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Loading Overlay */}
              {loading && (
                <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-2xl flex flex-col items-center justify-center animate-fade-in">
                  <div className="relative mb-10 scale-125 md:scale-150">
                    <div className="absolute inset-0 bg-primary/30 blur-[100px] rounded-full animate-pulse" />
                    <div className="relative z-10 text-6xl font-black text-white tracking-tighter flex items-baseline gap-1">
                      {t.hero.fetching.split("Flow")[0]}<span className="gradient-text">Flow</span>
                    </div>
                    {/* Neural Ping Orbitals */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] pointer-events-none opacity-20">
                      <div className="absolute inset-0 border border-primary/50 rounded-full animate-[ping_3s_infinite]" />
                      <div className="absolute inset-4 border border-accent/30 rounded-full animate-[ping_4s_infinite]" />
                      <div className="absolute inset-12 border border-white/20 rounded-full animate-[ping_5s_infinite]" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-6 relative z-10 w-full max-w-sm px-10">
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                      <div className="h-full bg-gradient-to-r from-primary via-accent to-primary w-full animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary animate-pulse">
                        {t.hero.neuralLink}
                      </p>
                      <p className="text-[9px] font-bold text-muted/40 uppercase tracking-[0.2em]">
                        {t.hero.scanning}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* Download Result Modal */}
      {media && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 animate-fade-in"
          // Strict modal: disabled outside click to prevent accidental close
          // onClick={(e) => e.target === e.currentTarget && setMedia(null)}
        >
          <div className="glass-premium rounded-[40px] max-w-md w-full overflow-hidden animate-slide-up shadow-[0_0_100px_rgba(0,0,0,1)] border border-white/5 relative z-[101]">
            <div className="relative">
              <button
                onClick={() => setMedia(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                ×
              </button>
              {/* Preview */}
              <div className={`${media.isVertical ? "aspect-[9/16] max-h-[400px]" : "aspect-video"} bg-surface-light flex items-center justify-center overflow-hidden relative mx-auto`}>
                {media.thumbnail && (
                  <img
                    src={`/api/thumbnail?url=${encodeURIComponent(media.thumbnail)}`}
                    alt={media.title || "Preview"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 sm:p-7">
              <div className="mb-5">
                <h3 className="text-base font-black text-white line-clamp-1 tracking-tight mb-1">
                  {media.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span 
                    className="text-[9px] font-black uppercase tracking-[0.4em]"
                    style={{ color: PLATFORM_COLORS[media.platform] || "#FF0000" }}
                  >
                    {PLATFORM_NAMES[media.platform] || media.platform}
                  </span>
                  <span className="text-[10px] font-bold text-white/30 tracking-widest">{durationStr}</span>
                </div>
              </div>

              {/* Quality Tabs - Video / Audio */}
              <div className="flex gap-2 mb-5 p-1 bg-white/[0.04] rounded-[20px] border border-white/[0.05]">
                <button
                  onClick={() => setActivePopupTab("video")}
                  className={`flex-1 py-2.5 rounded-[14px] text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                    activePopupTab === "video" 
                      ? "bg-white/10 text-white shadow-xl" 
                      : "text-white/20 hover:text-white"
                  }`}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                  Video
                </button>
                <button
                  onClick={() => setActivePopupTab("audio")}
                  className={`flex-1 py-2.5 rounded-[14px] text-[10px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                    activePopupTab === "audio" 
                      ? "bg-white/10 text-white shadow-xl" 
                      : "text-white/20 hover:text-white"
                  }`}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
                  </svg>
                  Audio
                </button>
              </div>

              {/* Quality Selection Grid */}
              <div className="max-h-[220px] overflow-y-auto no-scrollbar mb-8 animate-fade-in group/registry">
                <div className="flex items-center gap-2 mb-4 opacity-40 group-hover/registry:opacity-100 transition-opacity">
                  <div className={`w-1 h-1 rounded-full ${activePopupTab === "video" ? "bg-primary" : "bg-accent"}`} />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white">
                    {activePopupTab === "video" ? "Video Registry" : "Audio Archive"}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  {media.qualities?.filter(q => q.type === activePopupTab || (activePopupTab === "video" && q.type === "image")).map((q) => (
                    <button
                      key={q.format}
                      onClick={() => {
                        setSelectedFormat(q.format);
                        setSelectedType(q.type);
                        showToast(`Selected: ${q.label}`, "info");
                      }}
                      className={`group flex items-center justify-between px-4 py-3.5 rounded-[18px] text-[10px] font-black uppercase tracking-[0.15em] transition-all border ${
                        selectedFormat === q.format
                          ? activePopupTab === "video"
                            ? "bg-primary/10 border-primary/40 text-white shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                            : "bg-accent/10 border-accent/40 text-white shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                          : "bg-white/[0.02] border-white/[0.05] text-white/30 hover:text-white hover:bg-white/[0.06] hover:border-white/10"
                      }`}
                    >
                      <div className="flex flex-col items-start gap-0.5">
                        <span className={selectedFormat === q.format ? (activePopupTab === "video" ? "text-primary" : "text-accent") : ""}>
                          {q.label}
                        </span>
                        {q.filesize && (
                          <span className="text-[7px] opacity-20 group-hover:opacity-40 font-bold uppercase tracking-tight">Size: {(q.filesize / 1024 / 1024).toFixed(1)}MB</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] opacity-20 font-bold group-hover:opacity-50">{q.ext.toUpperCase()}</span>
                        {selectedFormat === q.format && (
                          <div className={`w-1.5 h-1.5 rounded-full ${activePopupTab === "video" ? "bg-primary animate-pulse" : "bg-accent animate-pulse"}`} />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={initiateDownloadFlow}
                disabled={downloading}
                className={`w-full py-4 rounded-[22px] font-black uppercase tracking-[0.25em] text-[10px] transition-all flex items-center justify-center gap-3 relative overflow-hidden group ${
                  downloading
                    ? "bg-primary text-white cursor-wait"
                    : selectedFormat 
                      ? "bg-primary text-white shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98]" 
                      : "bg-[#161821] text-white/5 cursor-not-allowed border border-white/[0.03]"
                }`}
              >
                {/* Downloading Animation overlay */}
                {downloading && (
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-primary opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full animate-shimmer" style={{ backgroundSize: '100% 100%' }} />
                  </div>
                )}
                
                {downloading ? (
                  <div className="flex items-center gap-2.5 z-10">
                    <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span className="animate-pulse">Downloading...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    Download Now
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Toasts */}
      <div className="fixed top-20 right-4 z-[60] flex flex-col gap-2 max-w-sm">
        {toasts.map((t) => (
          <Toast key={t.id} {...t} onClose={() => removeToast(t.id)} />
        ))}
      </div>
    </>
  );
}

function TypewriterText() {
  const words = [
    "Instagram HD Pictures",
    "Instagram 4K Reels",
    "Instagram Active Stories",
    "TikTok Viral Videos",
    "TikTok Trending Music",
    "YouTube 4K Shorts",
    "YouTube Live Streams",
    "Pinterest HD Videos",
    "Pinterest Profile Logos",
    "Twitter High-Res Images",
    "Twitter HD GIFs",
    "Facebook 4K Reels",
    "Facebook Stories",
    "Threads High-Quality Media",
    "Anything from Any URL",
  ];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const timeout2 = setTimeout(() => setBlink((prev) => !prev), 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  // Typing logic
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !isDeleting) {
      setTimeout(() => setIsDeleting(true), 2000); // Wait before deleting
      return;
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => setSubIndex((prev) => prev + (isDeleting ? -1 : 1)),
      Math.max(isDeleting ? 40 : 100, Math.random() * 50)
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, words]);

  return (
    <span className="gradient-text inline-block text-left min-h-[1.2em]">
      {words[index].substring(0, subIndex)}
      <span className={`text-white ml-0.5 ${blink ? "opacity-100" : "opacity-0"}`}>|</span>
    </span>
  );
}
