"use client";

const CHANGES = [
  {
    title: "Ultra-Fast Fetching",
    desc: "Migrated our backend logic to optimize media detection. Now 40% faster on YouTube and Instagram links.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    )
  },
  {
    title: "8K Interstellar Theme",
    desc: "Replaced hazy backgrounds with ultra-sharp cosmic visuals and cinematic card animations.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    )
  },
  {
    title: "Enhanced Verification",
    desc: "Implemented a new math-based human verification to prevent bot abuse while keeping access free.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    )
  },
  {
    title: "Universal Support",
    desc: "Added robust support for Facebook Reels and Pinterest HD Pins with original quality retention.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    )
  }
];

export default function ChangesSection() {
  return (
    <section id="feedback" className="py-24 bg-surface/50 border-t border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">
            Recent Development
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
            What We <span className="gradient-text">Changed</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto text-lg text-balance">
            We are constantly improving SnapFlow to provide the best downloading experience. 
            Here is what has been updated recently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {CHANGES.map((change, idx) => (
            <div 
              key={idx}
              className="group p-8 rounded-3xl bg-surface border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 transition-all text-primary">
                  {change.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                    {change.title}
                  </h3>
                  <p className="text-muted leading-relaxed">
                    {change.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-[32px] bg-gradient-to-b from-primary/10 to-transparent border border-primary/20 max-w-2xl mx-auto">
            <h4 className="text-xl font-bold text-white">Have Feedback?</h4>
            <p className="text-muted text-sm px-4">
              We&apos;re currently building our <span className="text-primary font-bold">Golang URL Shortener</span>. 
              If you have any other requests, let us know through our social channels!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
