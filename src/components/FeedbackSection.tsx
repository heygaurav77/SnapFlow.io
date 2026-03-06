"use client";

import { useState } from "react";

export default function FeedbackSection() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <section id="feedback" className="py-24 relative overflow-hidden bg-surface/30">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest mb-4">
            User Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
            Help Us Improve Our <br className="sm:hidden" />
            <span className="gradient-text">Social Media Downloader</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Your feedback directly shapes our future. Found a bug? Have a feature request? 
            Let us know below.
          </p>
        </div>

        <div className="bg-surface border border-border/50 rounded-[40px] p-8 md:p-12 shadow-2xl relative">
          {/* Subtle Corner Accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />

          {status === "success" ? (
            <div className="py-12 text-center animate-fade-in">
              <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent Successfully!</h3>
              <p className="text-muted">Thank you for helping us make SnapFlow better. We'll review your feedback shortly.</p>
              <button 
                onClick={() => setStatus("idle")}
                className="mt-8 text-sm font-bold text-primary hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-white/70 ml-1">Your Name</label>
                  <input
                    required
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-6 py-4 rounded-2xl bg-surface-light border border-white/5 text-white placeholder:text-muted/30 focus:outline-none focus:border-primary/50 transition-all shadow-inner"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-white/70 ml-1">Email Address</label>
                  <input
                    required
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 rounded-2xl bg-surface-light border border-white/5 text-white placeholder:text-muted/30 focus:outline-none focus:border-primary/50 transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-white/70 ml-1">Your Feedback / Request</label>
                <textarea
                  required
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us what you think or what features you'd like to see next..."
                  className="w-full px-6 py-4 rounded-3xl bg-surface-light border border-white/5 text-white placeholder:text-muted/30 focus:outline-none focus:border-primary/50 transition-all shadow-inner resize-none"
                />
              </div>

              <button
                disabled={status === "loading"}
                className={`w-full py-5 rounded-2xl font-black text-lg tracking-widest uppercase flex items-center justify-center gap-3 transition-all hover:opacity-90 active:scale-95 ${
                  status === "loading" ? "opacity-70 cursor-wait" : ""
                }`}
                style={{ background: "linear-gradient(135deg, #3B82F6 0%, #06B6D4 100%)" }}
              >
                {status === "loading" ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Send Feedback
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
