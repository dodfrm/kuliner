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
import { useState } from "react";
import FlowingMenu from "@/components/FlowingMenu";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import RotatingText from "@/components/RotatingText";
import { motion } from "motion/react";

const demoItems = [
  { link: 'https://www.facebook.com/watch/?ref=saved&v=4419187088357190', text: 'Sumatera', image: 'https://picsum.photos/600/400?random=1' },
  { link: '#', text: 'Jawa', image: 'https://picsum.photos/600/400?random=2' },
  { link: '#', text: 'Kalimantan', image: 'https://picsum.photos/600/400?random=3' },
  { link: '#', text: 'Bali Nusa Tenggara', image: 'https://picsum.photos/600/400?random=4' },
  { link: '#', text: 'Maluku & Papua', image: 'https://picsum.photos/600/400?random=5' }
];

export default function Home() {
  const t = useTranslations("Navbar");
   
  const navItems = [
    {
      name: t("features"),
      link: "#features",
    },
    {
      name: t("pricing"),
      link: "#pricing",
    },
    {
      name: t("team"),
      link: "/team",
    },
  ];
 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className="relative w-full bg-white text-neutral-900 min-h-screen selection:bg-teal-500 selection:text-white">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
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
                Language / Bahasa
              </span>
              <LanguageSwitcher className="w-full justify-start px-2" />
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      
      <HeroSection />
      <div id="explore">
        <FlowingMenus />
      </div>
    </div>
  );
}

const HeroSection = () => {
  const t = useTranslations("Home");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-24 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Subtle light background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      
      {/* Soft ambient light background glows */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-teal-200/20 rounded-full blur-[100px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange-200/20 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-100/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Hero content container */}
      <div className="relative z-10 max-w-5xl text-center flex flex-col items-center">

        {/* Heading on a single wrapping line */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-row flex-wrap items-center justify-center gap-x-3 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-neutral-900 mb-6 text-center leading-[1.1]"
        >
          <span className="text-neutral-500">{t("sukaMakan")}</span>
          <span className="inline-flex min-h-[1.2em] items-center">
            <RotatingText
              texts={[t("pedas"), t("manis"), t("gurih"), t("asam")]}
              mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerDuration={0.03}
              staggerFrom="first"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2200}
              splitBy="characters"
            />
          </span>
        </motion.h1>

        {/* Subtitle / Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-4 text-base sm:text-lg md:text-xl text-neutral-600 max-w-2xl leading-relaxed font-normal"
        >
          {t("description")}
        </motion.p>
      </div>

      {/* Animated scroll down hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => {
          document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400">Scroll Down</span>
        <div className="w-6 h-10 rounded-full border-2 border-neutral-300 flex justify-center p-1">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1.5 h-1.5 bg-teal-500 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

const FlowingMenus = () => {
  return (
    <div className="bg-white py-12 border-t border-neutral-100">
      <div style={{ height: '400px', position: 'relative' }}>
        <FlowingMenu
          items={demoItems}
          speed={15}
          textColor="#000000"
          bgColor="#ffffff"
          marqueeBgColor="#000000"
          marqueeTextColor="#ffffff"
          borderColor="#e5e7eb"
        />
      </div>
    </div>
  );
};
