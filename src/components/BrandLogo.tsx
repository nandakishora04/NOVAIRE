import React, { useEffect, useState, useRef } from 'react';

// Path to the user-uploaded official NOVAIRE brand logo
export const OFFICIAL_LOGO_SRC = '/assets/aistudio/NOVAIRE_5fa50bf0.png';

// Global cache for transparent keyed logo data URL so we don't recompute
let transparentLogoDataUrlCache: string | null = null;

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'orange' | 'auto';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSymbol?: boolean;
  className?: string;
  onClick?: () => void;
}

// Geometric retro brandmark based on the official NOVAIRE logo character form
export const BrandSymbol: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 24,
  className = '',
  color = '#F15A0A'
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-300 hover:scale-110 ${className}`}
      aria-label="NOVAIRE Brand Mark"
    >
      {/* Outer rounded pill seal */}
      <rect x="2" y="2" width="40" height="40" rx="12" fill="#111111" stroke={color} strokeWidth="2" />
      {/* Official chunky retro 'N' cut with curved arch */}
      <path
        d="M11 31V13C11 13 16 13 18 17L26 27V13H33V31C33 31 28 31 26 27L18 17V31H11Z"
        fill={color}
      />
      <circle cx="35" cy="9" r="3" fill={color} />
    </svg>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'auto',
  size = 'md',
  showSymbol = false,
  className = '',
  onClick
}) => {
  const [transparentSrc, setTransparentSrc] = useState<string | null>(transparentLogoDataUrlCache);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Key out the cream background in client canvas so the orange text is 100% transparent on any background
  useEffect(() => {
    if (transparentLogoDataUrlCache) {
      setTransparentSrc(transparentLogoDataUrlCache);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = OFFICIAL_LOGO_SRC;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return;

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const d = imgData.data;

        // The background is cream ~ (245-255, 240-255, 235-250)
        // The orange is ~ (241, 90, 10)
        for (let i = 0; i < d.length; i += 4) {
          const r = d[i];
          const g = d[i + 1];
          const b = d[i + 2];

          // Difference between red and blue isolates the vibrant orange (#F15A0A) from cream background
          // In orange: r ~ 241, g ~ 90, b ~ 10 -> diff (r - b) >= 200
          // In cream: r ~ 254, g ~ 252, b ~ 244 -> diff (r - b) <= 20
          const diff = r - b;

          if (diff <= 25) {
            d[i + 3] = 0; // Pure transparent background
          } else if (diff >= 110) {
            d[i + 3] = 255;
            d[i] = 241;
            d[i + 1] = 90;
            d[i + 2] = 10;
          } else {
            // Anti-aliased boundary pixel
            const t = (diff - 25) / (110 - 25);
            d[i + 3] = Math.round(t * 255);
            d[i] = 241;
            d[i + 1] = 90;
            d[i + 2] = 10;
          }
        }

        ctx.putImageData(imgData, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        transparentLogoDataUrlCache = dataUrl;
        setTransparentSrc(dataUrl);
      } catch {
        // Fallback to raw image if canvas manipulation restricted
        setTransparentSrc(OFFICIAL_LOGO_SRC);
      }
    };
  }, []);

  const sizeClasses = {
    sm: 'h-6 sm:h-7',
    md: 'h-8 sm:h-9 md:h-10',
    lg: 'h-11 sm:h-12 md:h-14',
    xl: 'h-14 sm:h-18 md:h-22',
  };

  const imageSrc = transparentSrc || OFFICIAL_LOGO_SRC;

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-3 transition-transform duration-300 hover:scale-[1.02] cursor-pointer text-left select-none group ${className}`}
      aria-label="NOVAIRE — Beyond the Ordinary"
    >
      {showSymbol && <BrandSymbol size={size === 'sm' ? 22 : size === 'md' ? 28 : 36} />}
      <img
        src={imageSrc}
        alt="NOVAIRE"
        className={`w-auto object-contain block ${sizeClasses[size]}`}
        style={{
          // On light backgrounds, multiply blend mode ensures flawless edges even while canvas loads
          mixBlendMode: variant === 'dark' ? 'multiply' : 'normal',
          filter: variant === 'light' ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' : 'none'
        }}
      />
    </button>
  );
};

export default BrandLogo;
