"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  LanguageSwitcher,
} from "@/components/ui/resizable-navbar";
import DomeGallery from "@/components/DomeGallery";
import { ThemeToggleButton } from "@/components/ui/skiper-ui/skiper26";

type ImageItem = string | { src: string; alt?: string };

interface RegionGalleryPageProps {
  regionKey: "bali" | "jawa" | "kalimantan" | "maluku" | "sumatera";
  images: ImageItem[];
}

export default function RegionGalleryPage({ regionKey, images }: RegionGalleryPageProps) {
  const t = useTranslations("Regions");
  const tNav = useTranslations("Navbar");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: tNav("features"),
      link: "/#features",
    },
    {
      name: tNav("pricing"),
      link: "/#pricing",
    },
    {
      name: tNav("team"),
      link: "/#team",
    },
  ];

  return (
    <div className="relative w-full h-screen bg-neutral-50 dark:bg-[#0b0813] text-neutral-900 dark:text-neutral-100 overflow-hidden flex flex-col font-sans transition-colors duration-300">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-200/20 dark:bg-teal-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Existing Navbar */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggleButton variant="polygon" start="top-left" />
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300 py-1"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-2 border-t border-neutral-100 dark:border-neutral-800 pt-4 mt-2">
              <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider px-2">
                Language & Theme
              </span>
              <div className="flex items-center justify-between px-2 w-full gap-4">
                <LanguageSwitcher className="w-auto justify-start" />
                <ThemeToggleButton variant="polygon" start="top-left" />
              </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Region Title & Subtitle */}
      <div className="relative z-10 text-center pt-32 px-4 select-none pointer-events-none">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white mb-2 dark:bg-gradient-to-b dark:from-white dark:to-neutral-400 dark:bg-clip-text dark:text-transparent">
          {t(`${regionKey}.title`)}
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light max-w-xl mx-auto">
          {t(`${regionKey}.subtitle`)}
        </p>
      </div>

      {/* Gallery Wrapper */}
      <main className="flex-1 w-full relative min-h-0 flex flex-col justify-between">
        <div className="w-full h-[calc(100vh-220px)] relative">
          <DomeGallery
            images={images}
            fit={1}
            minRadius={900}
            maxVerticalRotationDeg={10}
            segments={30}
            grayscale={false}
          />
        </div>
      </main>
    </div>
  );
}
