/**
 * Footer
 *
 * Site footer — brand description, 3 navigation columns, social links, legal bar.
 *
 * Responsibilities
 * - Composing Container, Stack, Logo, Text, Label primitives
 * - Rendering FOOTER_COLUMNS, FOOTER, SOCIAL_LINKS from footer.ts
 * - Dynamic copyright year
 * - Disabled links: aria-disabled, no pointer events, reduced opacity
 * - Social links: SVG icons, target="_blank", rel="noopener noreferrer"
 *
 * Not Responsible For
 * - Routing logic
 * - Business logic or data fetching
 * - Authentication or user state
 *
 * Primary Consumers
 * - app/src/app/layout.tsx
 */

import Link from 'next/link';
import { Container } from './Container';
import { Stack } from './Stack';
import Logo from '@/components/ui/logo/Logo';
import Text from '@/components/ui/Text';
import Label from '@/components/ui/Label';
import { SocialIcon } from '@/components/ui/icons/SocialIcons';
import {
  FOOTER_COLUMNS,
  FOOTER,
  SOCIAL_LINKS,
  type FooterLink,
} from '@/lib/footer';

// ─── Component ────────────────────────────────────────────────────────────────

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const copyrightText = FOOTER.copyright.replace('{year}', String(currentYear));

  return (
    <footer className="w-full border-t border-border bg-background/50" role="contentinfo">
      <Container size="wide">
        {/* ── Main Footer Grid ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16 md:py-24">

          {/* Brand Column */}
          <Stack spacing="md" className="max-w-xs">
            <Link href="/" aria-label="Castle Masters — Home">
              <Logo size="lg" />
            </Link>
            <Text size="base" color="muted" className="leading-body">
              {FOOTER.description}
            </Text>
          </Stack>

          {/* Navigation Columns */}
          {FOOTER_COLUMNS.map((column) => (
            <Stack key={column.label} spacing="md">
              <Label color="cyan" className="text-[0.78rem]">
                {column.label}
              </Label>
              <Stack spacing="sm">
                {column.links.map((link) => (
                  <FooterNavLink key={link.href} link={link} />
                ))}
              </Stack>
            </Stack>
          ))}
        </div>

        {/* ── Bottom Bar ─────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-border py-6">
          <Text size="sm" color="muted" className="text-center md:text-left">
            {copyrightText}
          </Text>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4" aria-label="Follow Castle Masters on social media">
            {SOCIAL_LINKS.map((social) => (
              <Link
                key={social.platform}
                href={social.href}
                aria-label={social.label}
                className="text-text-muted hover:text-cyan transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon platform={social.platform} className="w-5 h-5" title={social.label} />
              </Link>
            ))}
          </div>

          <Text size="sm" color="muted" className="text-center md:text-right">
            {FOOTER.legalTagline}
          </Text>
        </div>
      </Container>
    </footer>
  );
};

// ─── FooterNavLink ────────────────────────────────────────────────────────────

interface FooterNavLinkProps {
  link: FooterLink;
}

const FooterNavLink = ({ link }: FooterNavLinkProps) => {
  const isDisabled = link.disabled === true;
  return (
    <Link
      href={link.href}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : undefined}
      className={`
        inline-flex text-sm text-text-muted hover:text-cyan transition-colors
        ${isDisabled ? 'pointer-events-none opacity-40 select-none cursor-default' : ''}
      `}
    >
      {link.label}
    </Link>
  );
};

export default Footer;
