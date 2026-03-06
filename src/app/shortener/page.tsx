"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ShortenerPage() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    // Simulation for demo
    setTimeout(() => {
      const code = Math.random().toString(36).substring(2, 8);
      setShortUrl(`snapflow.io/${code}`);
      setLoading(false);
    }, 1200);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Shortened URL copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-foreground selection:bg-primary/30">
      <Navbar />
      
      <main className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none opacity-20">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span className="text-sm font-medium text-primary">Ultra Fast URL Shortener</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white">
            Shorten Your <span className="gradient-text">Links</span>
          </h1>
          
          <p className="text-muted text-lg max-w-2xl mx-auto mb-12">
            Turn long, complicated URLs into clean, memorable links in seconds. 
            Perfect for social media, bios, and tracking.
          </p>

          <div className="bg-surface/40 backdrop-blur-xl border border-border/20 rounded-3xl p-6 md:p-10 shadow-2xl mb-12">
            <form onSubmit={handleShorten} className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                  </svg>
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste your long URL here..."
                  className="w-full bg-surface-light border border-border rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-muted/50 focus:outline-none focus:border-primary/50 transition-all shadow-inner"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:shadow-primary/25 text-white font-bold px-10 py-4 rounded-2xl transition-all flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="6" cy="6" r="3" />
                      <circle cx="6" cy="18" r="3" />
                      <line x1="20" y1="4" x2="8.12" y2="15.88" />
                      <line x1="14.47" y1="14.48" x2="20" y2="20" />
                      <line x1="8.12" y1="8.12" x2="12" y2="12" />
                    </svg>
                    Shorten Now
                  </>
                )}
              </button>
            </form>

            {/* Result area */}
            {shortUrl && (
              <div className="mt-8 p-6 bg-white/5 border border-primary/20 rounded-2xl animate-fade-in">
                <p className="text-sm text-muted mb-3 font-medium">Your shortened link is ready!</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 bg-surface-light border border-border py-4 px-6 rounded-xl font-mono text-primary font-bold text-lg overflow-hidden text-ellipsis whitespace-nowrap">
                    {shortUrl}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                    </svg>
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "No Expiry", desc: "Links that stay active forever." },
              { title: "Secure", desc: "100% encrypted and safe redirection." },
              { title: "Free", desc: "No subscriptions or hidden costs." },
            ].map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-surface/30 border border-border/10">
                <h3 className="text-white font-bold mb-2">{f.title}</h3>
                <p className="text-muted text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
