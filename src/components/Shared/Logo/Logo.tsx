/* ================= LOGO MARK (SVG) ================= */
/* A pulse/ECG line inside a solid circle — simple, scalable, no external
   asset needed. Reused as-is on both light (Navbar) and dark (Footer)
   backgrounds since the circle carries its own brand-blue fill. */
export const LogoMark = ({ className = "w-9 h-9" }: { className?: string }) => (
  <svg
    viewBox="0 0 40 40"
    className={`shrink-0 ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="20" cy="20" r="20" fill="#2AA7FF" />
    <path
      d="M8 21h4.2l2.3-5.5L18.8 27l3.4-10.5 2 4.5H32"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ================= LOGO (MARK + WORDMARK) ================= */
const SIZES = {
  sm: { icon: "w-7 h-7", text: "text-lg" },
  md: { icon: "w-9 h-9", text: "text-xl" },
  lg: { icon: "w-11 h-11", text: "text-2xl" },
} as const;

interface LogoProps {
  variant?: "dark" | "light";
  size?: keyof typeof SIZES;
  className?: string;
}

const Logo = ({ variant = "dark", size = "md", className = "" }: LogoProps) => {
  const { icon, text } = SIZES[size];

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className={icon} />
      <span
        className={`font-bold leading-none whitespace-nowrap ${text} ${
          variant === "dark" ? "text-black" : "text-white"
        }`}
      >
        Dr. <span className="text-[#2AA7FF]">Anarul Islam</span>
      </span>
    </span>
  );
};

export default Logo;
