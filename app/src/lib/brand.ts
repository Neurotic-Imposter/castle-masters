/**
 * Brand Constants — Single Source of Truth
 *
 * All components, metadata, OpenGraph tags, manifests, Navbar, Footer,
 * Hero, Authentication, and Dashboard must import from this file.
 *
 * Never duplicate these values anywhere in the codebase.
 * Never hardcode brand strings, asset paths, or alt text in components.
 */

export const BRAND = {
  /** Official product name. Used as alt text, page titles, and display strings. */
  name: "Castle Masters",

  /** Approved brand tagline. Used in metadata and hero sections. */
  tagline: "Building stronger positions.",

  assets: {
    /**
     * Full logo lockup (mark + wordmark).
     * Primary consumers: Navbar, Footer, OpenGraph, Manifest.
     * Place the asset at: public/logo/logo-full.svg
     */
    logo: "/logo/logo-full.svg",

    /**
     * Logo mark only (icon without wordmark).
     * Primary consumers: mobile nav, cards, loading states, favicon contexts.
     * Place the asset at: public/logo/logo-mark.svg
     */
    mark: "/logo/logo-mark.svg",
  },
} as const;
