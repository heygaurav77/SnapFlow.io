"use client";

import { useState, useEffect, useCallback } from "react";

interface Review {
  name: string;
  initials: string;
  date: string;
  rating: number;
  text: string;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    name: "Alex Johnson",
    initials: "AJ",
    date: "2 days ago",
    rating: 5,
    text: "Absolutely incredible tool! Downloaded all my saved Instagram reels in seconds. The quality is flawless. Can't believe it's free!",
  },
  {
    name: "Maria Garcia",
    initials: "MG",
    date: "5 days ago",
    rating: 5,
    text: "Finally a downloader that works with TikTok without the watermark! The dark UI is super clean and modern. Love it! 🔥",
  },
  {
    name: "David Kim",
    initials: "DK",
    date: "1 week ago",
    rating: 4,
    text: "Great for YouTube videos. The 4K option is amazing. Would love to see playlist support in the future. Keep it up!",
  },
  {
    name: "Sarah Williams",
    initials: "SW",
    date: "1 week ago",
    rating: 5,
    text: "I've tried dozens of downloaders and this is by far the best. Clean, fast, no shady ads. The security focus really shows.",
  },
  {
    name: "James Chen",
    initials: "JC",
    date: "2 weeks ago",
    rating: 5,
    text: "Pinterest image downloads in full resolution! This is a game changer for my design work. The UI is gorgeous too.",
  },
  {
    name: "Emma Roberts",
    initials: "ER",
    date: "2 weeks ago",
    rating: 4,
    text: "Love how simple it is — paste, choose quality, download. No login needed, no fuss. Perfect for saving Twitter videos!",
  },
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);

  useEffect(() => {
    const stored = localStorage.getItem("snapflow_reviews");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Review[];
        setReviews([...parsed, ...DEFAULT_REVIEWS]);
      } catch {}
    }
  }, []);

  return (
    <section id="reviews" className="relative py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            What People Say
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4">
            User <span className="gradient-text">Reviews</span>
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Loved by thousands of users worldwide. Here&apos;s what they&apos;re saying.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-surface border border-border hover:border-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-bold">
                  {r.initials}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{r.name}</h4>
                  <span className="text-xs text-muted">{r.date}</span>
                </div>
              </div>
              <div className="text-yellow-400 text-sm mb-3 tracking-wider">
                {"★".repeat(r.rating)}
                {"☆".repeat(5 - r.rating)}
              </div>
              <p className="text-sm text-muted leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
