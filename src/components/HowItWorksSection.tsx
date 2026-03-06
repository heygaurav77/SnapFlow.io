export default function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      title: "Paste Content Link",
      desc: "Simply copy the URL of the Video, Reel, Story, or high-res Image you want to save. Paste it into the input field above. Our system supports over 1000+ social platforms including Instagram, TikTok, and YouTube.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
        </svg>
      ),
    },
    {
      num: "02",
      title: "Optimized Selection",
      desc: "Our engine analyzes the link and provides you with the best available qualities. Choose from 4K Ultra HD, 1080p Full HD, or even convert videos directly to high-bitrate MP3 audio with one click.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
      ),
    },
    {
      num: "03",
      title: "Instant Download",
      desc: "Click the download button and watch the magic. Your file is processed server-side and delivered at maximum speed. No intrusive ads, zero waiting time, and 100% data encryption for your security.",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
        </svg>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Simple & Fast
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            How <span className="gradient-text">It Works</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Download any content in just 3 simple steps. No sign-up required.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-4">
          {steps.map((step, index) => (
            <div key={step.num} className="contents">
              <div className="group relative flex-1 p-8 rounded-2xl bg-surface border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 text-center">
                <div className="absolute top-4 right-4 text-5xl font-black text-white/5 select-none">
                  {step.num}
                </div>
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center text-primary/40">
                  <svg width="40" height="20" viewBox="0 0 40 20">
                    <defs>
                      <linearGradient id={`arrowGrad${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#06B6D4" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 10 L35 10 M30 5 L35 10 L30 15"
                      stroke={`url(#arrowGrad${index})`}
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
