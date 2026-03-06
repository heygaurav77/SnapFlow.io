"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTranslations } from "@/lib/translations";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Reviews", href: "/reviews" },
  { label: "Feedback", href: "/#feedback" },
  { label: "Advertise", href: "/#feedback" },
];

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇲🇽" },
  { code: "nl", name: "Dutch", flag: "🇳🇱" },
  { code: "ka", name: "Georgian", flag: "🇬🇪" },
  { code: "uk", name: "Ukrainian", flag: "🇺🇦" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "tr", name: "Turkish", flag: "🇹🇷" },
  { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
  { code: "pl", name: "Polish", flag: "🇵🇱" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [currentLang, setCurrentLang] = useState(LANGUAGES[0]);
  const [t, setT] = useState(getTranslations("en"));

  useEffect(() => {
    const savedLang = localStorage.getItem("snapflow-lang") || "en";
    const lang = LANGUAGES.find(l => l.code === savedLang) || LANGUAGES[0];
    setCurrentLang(lang);
    setT(getTranslations(lang.code));
  }, []);

  const handleLangChange = (lang: typeof LANGUAGES[0]) => {
    setCurrentLang(lang);
    setT(getTranslations(lang.code));
    localStorage.setItem("snapflow-lang", lang.code);
    window.dispatchEvent(new CustomEvent("snapflow-lang-change", { detail: lang.code }));
    setLangOpen(false);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = document.querySelectorAll("section[id]");
      let current = "home";
      sections.forEach((sec) => {
        const el = sec as HTMLElement;
        if (window.scrollY >= el.offsetTop - 100) {
          current = el.id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/60 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/40"
          : "bg-transparent py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="#home" className="flex items-center group">
          <span className="text-2xl font-black text-white tracking-tighter hover:scale-105 transition-transform">
            Snap<span className="gradient-text">Flow</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-bold tracking-wide transition-all duration-300 group ${
                  activeSection === item.href.replace("#", "")
                    ? "text-white"
                    : "text-muted hover:text-white"
                }`}
              >
                {/* Top Bar Indicator */}
                <span className={`absolute top-[-10px] left-0 right-0 h-[3px] bg-primary transition-all duration-300 transform origin-center ${
                  activeSection === item.href.replace("#", "")
                    ? "scale-x-100 opacity-100"
                    : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                }`} />
                {t.navbar[item.label.toLowerCase() as keyof typeof t.navbar] || item.label}
              </a>
            ))}
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-white hover:bg-white/10 transition-all"
            >
              <span>{currentLang.flag}</span>
              <span className="hidden lg:inline">{currentLang.name}</span>
              <svg 
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" 
                className={`transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {langOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 glass rounded-2xl p-2 border border-white/10 shadow-2xl animate-fade-in animate-slide-down max-h-[350px] overflow-y-auto no-scrollbar">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLangChange(lang)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      currentLang.code === lang.code
                        ? "bg-primary text-white"
                        : "text-muted hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-0.5 bg-white transition-transform ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-white transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-white transition-transform ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass animate-slide-down border-t border-border">
          <div className="flex flex-col px-4 py-3 gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  activeSection === item.href.replace("#", "")
                    ? "text-white bg-white/10"
                    : "text-muted hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
