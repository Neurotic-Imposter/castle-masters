'use client';

/**
 * Logo
 *
 * Renders the complete founder-approved Castle Masters logo lockup.
 *
 * Responsibilities
 * - Rendering the full logo asset (mark + wordmark unified) via next/image
 * - Size scaling via the size prop using the centralised size map
 * - Graceful development fallback when the asset is not yet available
 * - Accessible alt text sourced exclusively from BRAND
 * - Forwarding className and HTML div attributes to the wrapper
 *
 * Not Responsible For
 * - Navigation, routing, or click handling — consumers wrap in <Link>
 * - Rendering mark and wordmark separately (see LogoMark)
 * - Layout, margin, padding, or positioning
 *
 * Primary Consumers
 * - Navbar (CM010) — wrapped in Next.js <Link href="/">
 * - Footer — standalone or wrapped in <Link>
 * - Future: OpenGraph, Manifest, Authentication, Dashboard
 */

import React, { useState } from 'react';
import Image from 'next/image';
import { BRAND } from '@/lib/brand';
import { type LogoSize } from './LogoMark';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual size of the full lockup.
   * Controls height; width scales automatically to preserve aspect ratio.
   * 'sm' → 28px height — compact contexts
   * 'md' → 34px height — navbar default (matches prototype)
   * 'lg' → 44px height — prominent / hero contexts
   */
  size?: LogoSize;
  className?: string;
}

// ─── Size Map ─────────────────────────────────────────────────────────────────

/**
 * Single source of height dimensions for the full logo lockup.
 * Width is derived automatically from the asset's intrinsic aspect ratio.
 * Components never hardcode pixel values — always consume this map.
 */
const sizeMap: Record<LogoSize, number> = {
  sm: 28,
  md: 34,
  lg: 44,
};

/**
 * Intrinsic width used for next/image layout calculation.
 * Assumes approximately 4:1 aspect ratio for a full lockup.
 * Adjust once the real asset's dimensions are known.
 */
const intrinsicWidthMap: Record<LogoSize, number> = {
  sm: 112,
  md: 136,
  lg: 176,
};

// ─── Component ────────────────────────────────────────────────────────────────

const Logo = React.forwardRef<HTMLDivElement, LogoProps>(
  ({ size = 'md', className = '', ...props }, ref) => {
    const [hasError, setHasError] = useState(false);
    const height = sizeMap[size];
    const width = intrinsicWidthMap[size];

    return (
      <div
        ref={ref}
        className={`inline-flex shrink-0 items-center ${className}`.trim()}
        style={{ height }}
        {...props}
      >
        {hasError ? (
          /*
           * Development fallback — shown when the asset is not yet present
           * in public/logo/logo-full.svg. Renders the brand name as plain
           * text using existing design tokens so layout is preserved.
           * Remove once the real asset is in place.
           */
          <span
            className="font-heading font-bold text-foreground"
            style={{ fontSize: height * 0.55 }}
          >
            {BRAND.name}
          </span>
        ) : (
          <Image
            src={BRAND.assets.logo}
            alt={BRAND.name}
            width={width}
            height={height}
            onError={() => setHasError(true)}
            unoptimized   // SVGs do not benefit from Next.js raster optimisation
            priority
            style={{ height, width: 'auto' }}
          />
        )}
      </div>
    );
  }
);

Logo.displayName = 'Logo';

export default Logo;
