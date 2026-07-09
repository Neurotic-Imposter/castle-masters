/**
 * Footer
 *
 * Site footer — presentational component rendering footer columns,
 * brand description, copyright, and legal tagline.
 *
 * Responsibilities
 * - Composing Container, Grid, Stack, Logo, Text, Label primitives
 * - Rendering FOOTER_COLUMNS, FOOTER, SOCIAL_LINKS from footer.ts
 * - Dynamic copyright year via new Date().getFullYear()
 * - Rendering disabled links with aria-disabled, no focus, no click
 *
 * Not Responsible For
 * - Routing logic (consumer wraps links)
 * - Business logic or data fetching
 * - Authentication or user state
 * - Social link rendering (SOCIAL_LINKS exported but not rendered)
 *
 * Primary Consumers
 * - app/src/app/layout.tsx (CM012 — layout integration)
 * - app/src/app/cm011-preview/page.tsx (CM011 — preview verification)
 */

import Link from 'next/link';
import { Container } from './Container';
import { Grid } from './Grid';
import { Stack } from './Stack';
import Logo from '@/components/ui/logo/Logo';
import Text from '@/components/ui/Text';
import Label from '@/components/ui/Label';
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
        <Grid columns={4} gap="lg" className="py-16 md:py-24">
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
                  <FooterLink key={link.href} link={link} />
                ))}
              </Stack>
            </Stack>
          ))}
        </Grid>

        {/* ── Bottom Bar ─────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t border-border py-6">
          <Text size="sm" color="muted" className="text-center md:text-left">
            {copyrightText}
          </Text>
          <Text size="sm" color="muted" className="text-center md:text-right">
            {FOOTER.legalTagline}
          </Text>

          {/* Social Links Placeholder — not rendered until SOCIAL_LINKS populated */}
          {SOCIAL_LINKS.length > 0 && (
            <div className="flex items-center gap-4" aria-label="Social links">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.platform}
                  href={social.href}
                  aria-label={social.label}
                  className="text-text-muted hover:text-cyan transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.platform}
                </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </footer>
  );
};

// ─── FooterLink Subcomponent ────────────────────────────────────────────────

interface FooterLinkProps {
  link: FooterLink;
}

const FooterLink = ({ link }: FooterLinkProps) => {
  const isDisabled = link.disabled === true;

  return (
    <Link
      href={link.href}
      aria-disabled={isDisabled}
      tabIndex={isDisabled ? -1 : undefined}
      className={`
        inline-flex
        text-sm
        text-text-muted
        hover:text-cyan
        transition-colors
        ${isDisabled ? 'pointer-events-none opacity-40 select-none cursor-default' : ''}
      `}
    >
      {link.label}
    </Link>
  );
};

export default Footer;