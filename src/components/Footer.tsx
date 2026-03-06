import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/[0.03] pt-32 pb-16 overflow-hidden">
      {/* Background Subtle Glow - even more subtle for black theme */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-32">
          <Link href="#home" className="group mb-10">
            <span className="text-8xl sm:text-9xl md:text-[10rem] font-black text-white tracking-tighter transition-all hover:scale-[1.02] block leading-none">
              Snap<span className="gradient-text">Flow</span>
            </span>
          </Link>
          <p className="text-lg text-muted/60 max-w-xl leading-relaxed font-medium">
            The world&apos;s most minimalist and powerful social media archiver. 
            Archiving your digital moments in pure high definition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-32 items-start border-y border-white/[0.03] py-20">
          {/* Social Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white/40 font-black mb-10 uppercase tracking-[0.4em] text-[10px] w-full text-center md:text-left">Registry & socials</h4>
            <div className="grid grid-cols-2 gap-3 w-full max-w-[320px]">
              {[
                { name: "Twitter / X", href: "#", icon: "M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" },
                { name: "Reddit", href: "#", icon: "M16.5 8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z M9.5 8c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2z M12 18c-2.1 0-4-1.1-5-3 1.1 1.9 2.9 3 5 3s3.9-1.1 5-3c-1.1 1.9-2.9 3-5 3z" },
                { name: "GitHub", href: "#", icon: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" }
              ].map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all text-muted/50 hover:text-white group"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform">
                    <path d={item.icon} />
                  </svg>
                  <span className="text-[10px] font-black uppercase tracking-widest leading-none">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Tools Column */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-white/40 font-black mb-10 uppercase tracking-[0.4em] text-[10px] w-full text-center md:text-left">Cloud Infrastructure</h4>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 max-w-[400px]">
              {["YouTube Shorts", "Instagram Reels", "TikTok HD", "Twitter Media", "Threads Info", "Pinterest HD"].map((tool) => (
                <Link key={tool} href="/" className="px-5 py-3 rounded-lg bg-white/[0.02] border border-white/[0.05] text-[9px] font-black uppercase tracking-widest text-muted/40 hover:text-white hover:border-primary/40 transition-all leading-none">
                  {tool}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col items-center md:items-end">
            <h4 className="text-white/40 font-black mb-10 uppercase tracking-[0.4em] text-[10px] w-full text-center md:text-right">Information</h4>
            <div className="flex flex-col items-center md:items-end gap-6 w-full">
              <Link href="#feedback" className="text-xs text-primary font-black uppercase tracking-[0.2em] hover:brightness-125 transition-all text-center md:text-right">Open Terminal / Feedback</Link>
              <Link href="#" className="text-[10px] text-muted/30 font-black uppercase tracking-[0.2em] hover:text-white transition-colors text-center md:text-right">Privacy Policy</Link>
              <Link href="#" className="text-[10px] text-muted/30 font-black uppercase tracking-[0.2em] hover:text-white transition-colors text-center md:text-right">Terms of Service</Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 opacity-30">
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-muted">
            © {new Date().getFullYear()} SNAPFLOW CO  —  ALL RIGHTS RESERVED
          </p>
          <div className="hidden md:flex h-px flex-1 mx-12 bg-white/[0.05]" />
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-primary">
            STABLE v1.0.0 RELEASE
          </p>
        </div>
      </div>
    </footer>
  );
}
