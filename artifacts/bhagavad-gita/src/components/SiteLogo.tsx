interface SiteLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  variant?: "light" | "dark";
  className?: string;
}

/**
 * Reusable site logo: Om (ॐ) icon mark + "AskGita.net" wordmark.
 * variant="light"  — gold logo for dark backgrounds (navbars, footer)
 * variant="dark"   — dark-brown logo for light backgrounds (breadcrumbs)
 *
 * SEO note: wrap with a <Link> and set aria-label on the link, not this component.
 * The SVG icon is aria-hidden; the wrapping span carries the accessible label.
 */
export function SiteLogo({
  size = "md",
  showText = true,
  variant = "light",
  className = "",
}: SiteLogoProps) {
  const dim = size === "sm" ? 30 : size === "md" ? 38 : 52;
  const iconFill = variant === "light" ? "#C9A227" : "#3A1A08";
  const iconBg = variant === "light" ? "#2E1408" : "#FFF8EE";
  const iconBorder = variant === "light" ? "#C9A227" : "#8B5E3C";

  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label="AskGita.net — Bhagavad Gita in Sanskrit, Hindi &amp; English"
    >
      {/* Om icon mark — aria-hidden because the parent span carries the label */}
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="48" height="48" rx="10" fill={iconBg} />
        <rect
          x="2.5"
          y="2.5"
          width="43"
          height="43"
          rx="8"
          fill="none"
          stroke={iconBorder}
          strokeWidth="1.5"
          opacity="0.45"
        />
        {/* ॐ — the sacred Om symbol representing Bhagavad Gita wisdom */}
        <text
          x="24"
          y="36"
          textAnchor="middle"
          fontFamily="'Noto Sans Devanagari','Mangal','Kohinoor Devanagari','Arial Unicode MS',serif"
          fontSize="28"
          fontWeight="700"
          fill={iconFill}
        >
          ॐ
        </text>
      </svg>

      {showText && (
        <span className="flex flex-col leading-none gap-0.5">
          <span
            className={`font-cinzel font-bold tracking-wide ${
              size === "sm" ? "text-sm" : size === "md" ? "text-base" : "text-xl"
            } ${variant === "light" ? "text-gold" : "text-dark-brown"}`}
          >
            AskGita.net
          </span>
          {size !== "sm" && (
            <span
              className={`font-cinzel uppercase tracking-[0.2em] leading-none ${
                size === "md" ? "text-[9px]" : "text-xs"
              } ${variant === "light" ? "text-gold/50" : "text-dark-brown/40"}`}
            >
              Bhagavad Gita
            </span>
          )}
        </span>
      )}
    </span>
  );
}
