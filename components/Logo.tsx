import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
  /** Mark + wordmark (nav) vs. mark only (footer per Theo's spec). */
  variant?: 'horizontal' | 'mark';
}

const HEIGHT = { small: 24, medium: 32, large: 48 };

/**
 * Inline SVG, not an `<img src>` of the static files `scripts/generate-
 * assets.mjs` writes to `public/` (those stay static — they back the OG
 * image, favicons and partner-kit exports, which have no CSS to read from).
 *
 * An externally-referenced SVG file cannot see this page's CSS custom
 * properties, so a colour baked into it is fixed for the life of the file —
 * that was the bug: the wordmark and two mark bars were baked to the LIGHT
 * `--ink` hex and went invisible on a dark background. Inline SVG is part of
 * the document, so `var(--s-ink)`/`var(--s-accent)` resolve live and repaint
 * with the theme, in both `prefers-color-scheme` and `data-theme` dark.
 */
export const Logo: React.FC<LogoProps> = ({ className = '', size = 'medium', variant = 'horizontal' }) => {
  const height = HEIGHT[size];
  const barWidth = height * 0.19;
  const gap = barWidth * 0.6;
  const markWidth = barWidth * 3 + gap * 2;

  const mark = (
    <svg
      viewBox={`0 0 ${markWidth} ${height}`}
      width={markWidth}
      height={height}
      aria-hidden={variant === 'horizontal' ? true : undefined}
      role={variant === 'mark' ? 'img' : undefined}
      focusable="false"
    >
      {variant === 'mark' && <title>ImmiStack</title>}
      <rect x={0} y={height * 0.55} width={barWidth} height={height * 0.45} rx={barWidth * 0.15} fill="var(--s-ink)" />
      <rect x={barWidth + gap} y={height * 0.28} width={barWidth} height={height * 0.72} rx={barWidth * 0.15} fill="var(--s-ink)" />
      <rect x={(barWidth + gap) * 2} y={0} width={barWidth} height={height} rx={barWidth * 0.15} fill="var(--s-accent)" />
    </svg>
  );

  if (variant === 'mark') {
    return <span className={`inline-flex shrink-0 ${className}`}>{mark}</span>;
  }

  return (
    <span className={`inline-flex items-center gap-2 shrink-0 ${className}`}>
      {mark}
      <span
        aria-hidden="true"
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 600,
          fontOpticalSizing: 'auto',
          fontSize: height * 0.62,
          lineHeight: 1,
          color: 'var(--s-ink)',
          whiteSpace: 'nowrap',
        }}
      >
        ImmiStack
      </span>
      <span className="sr-only">ImmiStack</span>
    </span>
  );
};
