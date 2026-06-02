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
import Footer from "@/components/Footer";
import AnimatedContent from "./AnimatedContent";

type ImageItem = string | { src: string; alt?: string };

interface RegionGalleryPageProps {
  regionKey: "bali" | "jawa" | "kalimantan" | "maluku" | "sumatera" | "sulawesi";
  images: ImageItem[];
}

export default function RegionGalleryPage({ regionKey, images }: RegionGalleryPageProps) {
  const t = useTranslations("Regions");
  const tNav = useTranslations("Navbar");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: tNav("home"),
      link: "/#home",
    },
    {
      name: tNav("explore"),
      link: "/#explore",
    },
    {      name: tNav("experience"),
      link: "/#experience",
    },
    {
      name: tNav("team"),
      link: "/#team",
    },
  ];

  return (
    <div className="dark relative w-full min-h-screen bg-[#0b0813] text-neutral-100 overflow-y-auto overflow-x-hidden flex flex-col font-sans transition-colors duration-300">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-900/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Existing Navbar */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
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
            <div className="flex w-full flex-col gap-2 border-t border-neutral-800 pt-4 mt-2">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider px-2">
                Language
              </span>
              <div className="flex items-center justify-between px-2 w-full gap-4">
                <LanguageSwitcher className="w-auto justify-start" />
              </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Region Title & Subtitle */}
      <div className="relative z-10 text-center pt-32 px-4 select-none pointer-events-none">
        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={0.8}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.1}
          delay={0}
        >
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
            <span className="bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
              {t(`${regionKey}.title`).split(" ").slice(0, -1).join(" ")}
            </span>{" "}
            <span className="text-[#ff4500]">
              {t(`${regionKey}.title`).split(" ").slice(-1)[0]}
            </span>
          </h1>
        </AnimatedContent>
        <AnimatedContent
          distance={100}
          direction="vertical"
          reverse={false}
          duration={0.8}
          ease="power3.out"
          initialOpacity={0}
          animateOpacity
          scale={1}
          threshold={0.1}
          delay={0.1}
        >
          <p className="text-xs sm:text-sm text-neutral-400 font-light max-w-xl mx-auto">
            {t(`${regionKey}.subtitle`)}
          </p>
        </AnimatedContent>
      </div>

      {/* Gallery Wrapper */}
      <main className="flex-1 w-full relative min-h-0 flex flex-col justify-between">
        <div className="w-full h-[calc(100vh-220px)] min-h-[550px] relative">
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
