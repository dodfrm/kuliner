"use client";
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
import { useState, useEffect } from "react";
import FlowingMenu from "@/components/FlowingMenu";
import Lanyard from "@/components/Lanyard";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import RotatingText from "@/components/RotatingText";
import { motion } from "motion/react";
import { HeroParallax } from "@/components/ui/hero-parallax";
import Footer from "@/components/Footer";
import { useTheme } from "next-themes";
import { ThemeToggleButton } from "@/components/ui/skiper-ui/skiper26";
import { IconBrandGithub, IconBrandLinkedin, IconBrandInstagram } from "@tabler/icons-react";

const daerah = [
  { link: '/sumatera', text: 'Sumatera', image: 'https://picsum.photos/600/400?random=1' },
  { link: '/jawa', text: 'Jawa', image: 'https://picsum.photos/600/400?random=2' },
  { link: '/kalimantan', text: 'Kalimantan', image: 'https://picsum.photos/600/400?random=3' },
  {link : '/sulawesi', text: 'Sulawesi', image: 'https://picsum.photos/600/400?random=6' },
  { link: '/bali', text: 'Bali & Nusra', image: 'https://picsum.photos/600/400?random=4' },
  { link: '/maluku', text: 'Maluku & Papua', image: 'https://picsum.photos/600/400?random=5' },
];

export default function Home() {
  const t = useTranslations("Navbar");
   
  const navItems = [
    {
      name: t("features"),
      link: "#features",
    },
    {
      name: t("explore"),
      link: "#explore",
    },
    {
      name: t("team"),
      link: "#team",
    },
  ];
 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className="relative w-full bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 min-h-screen selection:bg-teal-500 selection:text-white scroll-smooth transition-colors duration-300">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggleButton variant="polygon" start="top-left" />
          </div>
        </NavBody>
 
        {/* Mobile Navigation */}
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
      <HeroParallax products={products} />
      <div id="explore">
        <FlowingMenus />
      </div>
      <div id="team">
        <TeamSection />
      </div>
      <Footer />
    </div>
  );
}

export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://youtu.be/FSqVTcyIbBM",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/rogue.png",
  },

  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },

  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/renderwork.png",
  },

  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://www.aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];

const HeroSection = () => {
  const t = useTranslations("Home");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-neutral-950 transition-colors duration-300">
      {/* Subtle light background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      
      {/* Soft ambient light background glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-teal-200/20 dark:bg-teal-900/10 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-200/20 dark:bg-orange-900/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-100/10 dark:bg-indigo-950/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Hero content container */}
      <div className="relative z-10 max-w-5xl text-center flex flex-col items-center">

        {/* Heading on a single wrapping line */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-row flex-wrap items-center justify-center gap-x-3 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-50 mb-6 text-center leading-[1.1]"
        >
          <span className="text-neutral-500">{t("sukaMakan")}</span>
          <span className="inline-flex min-h-[1.2em] items-center">
            <RotatingText
              texts={[t("pedas"), t("manis"), t("gurih"), t("asam")]}
              mainClassName="px-2 sm:px-2 md:px-3 bg-none text-[#ff4500] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerDuration={0.03}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerFrom="first"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3200}
              splitBy="characters"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-300 max-w-2xl leading-relaxed font-normal"
        >
          {t("description")}
        </motion.p>
      </div>
    </section>
  );
};

const FlowingMenus = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("FlowingMenu");

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div className="bg-white dark:bg-neutral-950 py-16 border-t border-neutral-100 dark:border-neutral-800/80 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 z-10 relative">
        <h2 className="text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white sm:text-5xl">
          <span className="bg-gradient-to-b from-neutral-950 to-neutral-700 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">
            {t("title").split(" ").slice(0, -1).join(" ")}
          </span>{" "}
          <span className="text-[#ff4500]">
            {t("title").split(" ").slice(-1)[0]}
          </span>
        </h2>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-center max-w-lg mx-auto text-sm sm:text-base">
          {t("subtitle")}
        </p>
      </div>
      <div style={{ height: '400px', position: 'relative' }}>
        <FlowingMenu
          items={daerah}
          speed={15}
          textColor={isDark ? "#ffffff" : "#000000"}
          bgColor={isDark ? "#09090b" : "#ffffff"}
          marqueeBgColor={isDark ? "#ffffff" : "#000000"}
          marqueeTextColor={isDark ? "#000000" : "#ffffff"}
          borderColor={isDark ? "#262626" : "#e5e7eb"}
        />
      </div>
    </div>
  );
};

const TeamSection = () => {
  const t = useTranslations("Team");

  return (
    <section className="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden selection:bg-teal-500 selection:text-white transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f293705_1px,transparent_1px),linear-gradient(to_bottom,#1f293705_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="relative w-full max-w-5xl z-10 flex flex-col items-center text-center mb-16">
        <h2 className="text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white sm:text-5xl">
          <span className="bg-gradient-to-b from-neutral-950 to-neutral-700 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">
            {t("title").split(" ").slice(0, -1).join(" ")}
          </span>{" "}
          <span className="text-[#ff4500]">
            {t("title").split(" ").slice(-1)[0]}
          </span>
        </h2>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-center max-w-lg mx-auto text-sm sm:text-base">
          {t("subtitle")}
        </p>
      </div>

      {/* Cards Container - Swiper/Carousel on Mobile, Grid on Desktop */}
      <div className="flex md:grid md:grid-cols-2 gap-8 w-full max-w-5xl z-10 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-8 px-4 md:px-0">
        
        {/* Team Member 1 */}
        <div className="snap-center shrink-0 w-[80vw] sm:w-[60vw] md:w-full h-[55vh] md:h-[65vh] relative group bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-900/80 dark:to-neutral-950 border border-neutral-200 dark:border-neutral-800/80 rounded-2xl overflow-hidden hover:border-teal-500/30 transition-all duration-500 shadow-2xl shadow-neutral-200/50 dark:shadow-black/40">
          <div className="w-full h-full pt-6">
            <Lanyard cardTexture="/dodi-card.png" position={[0, 0, 11]} gravity={[0, -40, 0]} />
          </div>
          {/* Social Icons */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3">
            <a
              href="https://github.com/dodfrm"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-teal-500 hover:border-teal-500/50 dark:hover:text-teal-400 dark:hover:border-teal-400/50 transition-all duration-300 backdrop-blur-sm shadow-lg hover:scale-110 active:scale-95"
            >
              <IconBrandGithub size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-teal-500 hover:border-teal-500/50 dark:hover:text-teal-400 dark:hover:border-teal-400/50 transition-all duration-300 backdrop-blur-sm shadow-lg hover:scale-110 active:scale-95"
            >
              <IconBrandLinkedin size={18} />
            </a>
            <a
              href="https://instagram.com/dodfrm"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-teal-500 hover:border-teal-500/50 dark:hover:text-teal-400 dark:hover:border-teal-400/50 transition-all duration-300 backdrop-blur-sm shadow-lg hover:scale-110 active:scale-95"
            >
              <IconBrandInstagram size={18} />
            </a>
          </div>
        </div>

        {/* Team Member 2 */}
        <div className="snap-center shrink-0 w-[80vw] sm:w-[60vw] md:w-full h-[55vh] md:h-[65vh] relative group bg-gradient-to-b from-white to-neutral-100 dark:from-neutral-900/80 dark:to-neutral-950 border border-neutral-200 dark:border-neutral-800/80 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-500 shadow-2xl shadow-neutral-200/50 dark:shadow-black/40">
          <div className="w-full h-full pt-6">
            <Lanyard cardTexture="/wilfa-card.png" position={[0, 0, 11]} gravity={[0, -40, 0]} />
          </div>
          {/* Social Icons */}
          <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3">
            <a
              href="https://github.com/kalascode"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-indigo-500 hover:border-indigo-500/50 dark:hover:text-indigo-400 dark:hover:border-indigo-400/50 transition-all duration-300 backdrop-blur-sm shadow-lg hover:scale-110 active:scale-95"
            >
              <IconBrandGithub size={18} />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-indigo-500 hover:border-indigo-500/50 dark:hover:text-indigo-400 dark:hover:border-indigo-400/50 transition-all duration-300 backdrop-blur-sm shadow-lg hover:scale-110 active:scale-95"
            >
              <IconBrandLinkedin size={18} />
            </a>
            <a
              href="https://instagram.com/will.faa"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/80 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-indigo-500 hover:border-indigo-500/50 dark:hover:text-indigo-400 dark:hover:border-indigo-400/50 transition-all duration-300 backdrop-blur-sm shadow-lg hover:scale-110 active:scale-95"
            >
              <IconBrandInstagram size={18} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
