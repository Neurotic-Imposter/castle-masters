'use client';

/**
 * LogoMark
 *
 * Renders the official Castle Masters logo mark asset.
 *
 * Responsibilities
 * - Rendering the founder-approved logo mark via next/image
 * - Size scaling via the size prop using a centralised size map
 * - Graceful development fallback when the asset is not yet available
 * - Accessible alt text sourced exclusively from BRAND
 * - Forwarding className and HTML div attributes to the wrapper
 *
 * Not Responsible For
 * - Navigation, routing, or click handling
 * - The full logo lockup (see Logo)
 * - Layout, margin, padding, or positioning
 *
 * Primary Consumers
 * - Logo (composed into full lockup)
 * - Navbar — compact / mobile contexts (CM010)
 * - Future: loading states, card headers, favicon contexts
 */

import React, { useState } from 'react';
import Image from 'next/image';
import { BRAND } from '@/lib/brand';

// ─── Types ───────────────────────────────────────────────────────────────────

/** Shared size scale used by all logo components. Exported for Logo to import. */
export type LogoSize = 'sm' | 'md' | 'lg';

export interface LogoMarkProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual size of the mark.
   * 'sm' → 28px  — compact / mobile contexts
   * 'md' → 34px  — navbar default (matches prototype)
   * 'lg' → 44px  — prominent / hero contexts
   */
  size?: LogoSize;
  className?: string;
}

// ─── Size Map ─────────────────────────────────────────────────────────────────

/** Single source of dimensions. Components never hardcode pixel values. */
const sizeMap: Record<LogoSize, number> = {
  sm: 28,
  md: 34,
  lg: 44,
};

// ─── Component ───────────────────────────────────────────────────────────────

const LogoMark = React.forwardRef<HTMLDivElement, LogoMarkProps>(
  ({ size = 'md', className = '', ...props }, ref) => {
    const [hasError, setHasError] = useState(false);
    const dimension = sizeMap[size];

    return (
      <div
        ref={ref}
        className={`inline-flex shrink-0 items-center justify-center ${className}`.trim()}
        style={{ width: dimension, height: dimension }}
        {...props}
      >
        {hasError ? (
          /*
           * Development fallback — shown when the asset is not yet present
           * in public/logo/logo-mark.svg. Renders a neutral placeholder using
           * existing design tokens. Remove once the real asset is in place.
           */
          <div
            aria-hidden="true"
            className="w-full h-full rounded-full bg-emerald/10 border border-emerald/20"
          />
        ) : (
          <Image
            src={BRAND.assets.mark}
            alt={BRAND.name}
            width={dimension}
            height={dimension}
            onError={() => setHasError(true)}
            unoptimized   // SVGs do not benefit from Next.js raster optimisation
            priority
          />
        )}
      </div>
    );
  }
);

LogoMark.displayName = 'LogoMark';

export default LogoMark;
