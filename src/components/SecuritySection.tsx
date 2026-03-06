export default function SecuritySection() {
  const features = [
    {
      title: "End-to-End Encryption",
      desc: "All requests are encrypted via HTTPS. No data leaks.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
    },
    {
      title: "Zero Data Storage",
      desc: "We never save URLs, downloads, or personal info on our servers.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
      ),
    },
    {
      title: "No Tracking",
      desc: "No cookies, no trackers, no analytics that spy on you.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
  ];

  return (
    <section id="security" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Your Privacy Matters
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
              Built With <span className="gradient-text">Security First</span>
            </h2>
            <p className="text-muted mb-8 max-w-lg">
              We don&apos;t store your data. No URLs logged. No tracking cookies.
              Your downloads stay private.
            </p>

            <div className="flex flex-col gap-5">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-border hover:border-primary/20 transition-all group"
                >
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    {f.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{f.title}</h4>
                    <p className="text-sm text-muted">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shield Visual */}
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64">
              <div className="absolute inset-0 rounded-full border-2 border-primary/10 animate-ring-1" />
              <div className="absolute inset-6 rounded-full border-2 border-accent/10 animate-ring-2" />
              <div className="absolute inset-12 rounded-full border-2 border-primary/15 animate-ring-3" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-float">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-primary"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
