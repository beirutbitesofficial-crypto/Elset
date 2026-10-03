const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function Icon({ name, size = 28 }) {
  const p = { ...base, width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true };
  switch (name) {
    case "leaf":
      return (
        <svg {...p}>
          <path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" />
          <path d="M5 19 13 11" />
        </svg>
      );
    case "sugar":
      return (
        <svg {...p}>
          <path d="m12 3 7 4v8l-7 4-7-4V7z" />
          <path d="m5 7 7 4 7-4M12 11v8" />
          <path d="M3 21 21 3" />
        </svg>
      );
    case "flask":
      return (
        <svg {...p}>
          <path d="M9 3h6M10 3v6L5 18a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" />
          <path d="M7.5 14h9" />
          <path d="M3 21 21 3" />
        </svg>
      );
    case "wheat":
      return (
        <svg {...p}>
          <path d="M12 21V8" />
          <path d="M12 8c-2-1-3-3-2-5 2 1 3 3 2 5Zm0 0c2-1 3-3 2-5-2 1-3 3-2 5Z" />
          <path d="M12 13c-2.5 0-4-1.5-4-3.5 2.5 0 4 1.5 4 3.5Zm0 0c2.5 0 4-1.5 4-3.5-2.5 0-4 1.5-4 3.5Z" />
          <path d="M12 18c-2.5 0-4-1.5-4-3.5 2.5 0 4 1.5 4 3.5Zm0 0c2.5 0 4-1.5 4-3.5-2.5 0-4 1.5-4 3.5Z" />
          <path d="M3 21 21 3" />
        </svg>
      );
    case "bag":
      return (
        <svg {...p}>
          <path d="M5 8h14l-1 13H6z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
      );
    case "close":
      return (
        <svg {...p}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case "truck":
      return (
        <svg {...p}>
          <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" />
          <circle cx="7" cy="18" r="1.8" />
          <circle cx="17" cy="18" r="1.8" />
        </svg>
      );
    case "cash":
      return (
        <svg {...p}>
          <rect x="2.5" y="6" width="19" height="12" rx="2" />
          <circle cx="12" cy="12" r="2.6" />
          <path d="M6 9v6M18 9v6" />
        </svg>
      );
    case "check":
      return (
        <svg {...p}>
          <path d="m5 12 4.5 4.5L19 7" />
        </svg>
      );
    case "trash":
      return (
        <svg {...p}>
          <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
        </svg>
      );
    case "plus":
      return (
        <svg {...p}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "minus":
      return (
        <svg {...p}>
          <path d="M5 12h14" />
        </svg>
      );
    default:
      return null;
  }
}

export function WhatsAppIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z"
      />
    </svg>
  );
}

// Thin gold ornamental divider
export function Ornament({ className = "" }) {
  return (
    <svg className={`ornament ${className}`} viewBox="0 0 240 20" aria-hidden="true">
      <path d="M0 10h92M148 10h92" stroke="url(#og)" strokeWidth="1" />
      <path d="M120 2l8 8-8 8-8-8z" fill="none" stroke="url(#og)" strokeWidth="1" />
      <circle cx="120" cy="10" r="2" fill="#e8c983" />
      <circle cx="100" cy="10" r="1.4" fill="#c9a35a" />
      <circle cx="140" cy="10" r="1.4" fill="#c9a35a" />
      <defs>
        <linearGradient id="og" x1="0" x2="1">
          <stop offset="0" stopColor="#c9a35a" stopOpacity="0" />
          <stop offset=".5" stopColor="#f3dca2" />
          <stop offset="1" stopColor="#c9a35a" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
