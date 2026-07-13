"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Person } from "./people";

interface PersonModalProps {
  person: Person;
  onClose: () => void;
}

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ChessComIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M13.5 0h-3L9 1.5V6H6v3H1.5L0 10.5v3L1.5 15H6v3h3v4.5l1.5 1.5h3l1.5-1.5V18h3v-3h4.5l1.5-1.5v-3L22.5 9H18V6h-3V1.5L13.5 0zM12 4.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-4.5 4.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm9 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-9 9a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm9 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
  </svg>
);

const LichessIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.123 15.655c-.244-.22-1.026-.855-1.285-1.042-.258-.187-.665-.365-.778-.179-.112.185-.145.864-.132 1.101.013.238.163.535.151.71-.012.176-.328.324-.593.18-.266-.144-1.226-.848-1.523-1.127-.296-.28-.59-.727-.478-1.01.112-.284.577-.428.847-.393.27.035.795.127.973-.016.177-.142.062-.892-.089-1.115-.152-.224-.875-.765-1.144-.954a24.167 24.167 0 0 0-3.328-1.84c-.463-.198-.94-.356-1.425-.469-.485-.114-.984-.153-1.479-.117-.494.037-.98.15-1.442.336-.462.185-.892.443-1.272.763.153.25.328.487.522.709-.17.165-.316.353-.435.56-.239.412-.394.869-.459 1.344a6.59 6.59 0 0 0 .151 2.378c.176.67.48 1.3.896 1.854.417.554.945 1.018 1.554 1.363.61.346 1.288.583 1.996.697a15.82 15.82 0 0 0 5.174-.183c.712-.178 1.396-.453 2.03-.819a9.585 9.585 0 0 0 1.761-1.345 5.865 5.865 0 0 0 1.258-1.84c.148-.35.148-.737 0-1.087z" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const ICON_MAP = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  x: XIcon,
  chessCom: ChessComIcon,
  lichess: LichessIcon,
  email: MailIcon,
};

export default function PersonModal({ person, onClose }: PersonModalProps) {
  const { name, role, photoUrl, bio, links } = person;

  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-overlay backdrop-blur"
      />

      {/* Modal Container */}
      <motion.div
        layoutId={`person-card-${person.id}`}
        transition={{ type: "spring", stiffness: 350, damping: 32 }}
        className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-bg-card shadow-2xl backdrop-blur-xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full border border-border bg-bg-card/80 p-2 text-text-muted transition-colors hover:bg-bg-card-hover hover:text-foreground focus:outline-none focus:ring-1 focus:ring-emerald"
          aria-label="Close modal"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Portrait portion */}
          <div className="relative h-60 w-full md:h-auto md:w-56 shrink-0 select-none">
            <Image
              src={photoUrl}
              alt={`${name}, ${role}`}
              fill
              sizes="(max-width: 768px) 100vw, 224px"
              className="object-cover"
              priority
            />
          </div>

          {/* Details portion */}
          <div className="p-6 md:p-8 flex flex-col justify-between flex-1 gap-6 bg-bg-card/40">
            <div>
              <span className="text-[10px] font-mono-accent uppercase tracking-widest text-emerald">
                {role}
              </span>
              <h2 className="mt-1 text-2xl font-bold text-foreground tracking-wide">
                {name}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text-muted">
                {bio}
              </p>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3 border-t border-border pt-4">
              {Object.entries(links).map(([platform, url]) => {
                if (!url) return null;
                const IconComponent = ICON_MAP[platform as keyof typeof ICON_MAP];
                if (!IconComponent) return null;

                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-emerald transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-emerald p-1"
                    aria-label={`${name}'s ${platform}`}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
