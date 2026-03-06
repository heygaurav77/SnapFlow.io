"use client";

interface ToastProps {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  onClose: () => void;
}

const ICONS: Record<string, string> = {
  success: "✅",
  error: "❌",
  info: "ℹ️",
  warning: "⚠️",
};

export default function Toast({ message, type, onClose }: ToastProps) {
  return (
    <div className="glass rounded-xl px-4 py-3 flex items-center gap-3 animate-slide-down shadow-lg shadow-black/20 min-w-[280px]">
      <span className="text-lg">{ICONS[type]}</span>
      <span className="text-sm text-white flex-1">{message}</span>
      <button
        onClick={onClose}
        className="text-muted hover:text-white text-lg transition-colors"
      >
        ×
      </button>
    </div>
  );
}
