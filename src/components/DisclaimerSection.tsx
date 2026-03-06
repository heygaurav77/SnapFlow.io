"use client";

export default function DisclaimerSection() {
  return (
    <section className="py-16 bg-surface border-t border-border/50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          {/* Background Icon */}
          <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4m0 4h.01" />
            </svg>
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start relative z-10">
            <div className="w-16 h-16 shrink-0 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4m0 4h.01" />
              </svg>
            </div>
            
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-wider">
                Digital Rights & Legal Disclaimer
              </h2>
              <div className="space-y-4 text-sm text-muted leading-relaxed">
                <p>
                  SnapFlow is a professional utility tool designed for personal media archival and educational purposes only. 
                  We do not host any content on our servers. All media is fetched and downloaded directly from the 
                  respective platform&apos;s CDNs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-white font-bold block mb-1">Copyright Notice</span>
                    Users are strictly prohibited from downloading copyrighted material without explicit permission from the rights holder.
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-white font-bold block mb-1">User Responsibility</span>
                    You are solely responsible for compliance with the Terms of Service of the platforms you access through SnapFlow.
                  </div>
                </div>
                <p className="pt-2 italic text-[11px] opacity-60">
                  By using this service, you agree that SnapFlow is not liable for any misuse of the tool or infringement of intellectual property rights by its users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
