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
import { HeroParallax } from "@/components/ui/hero-parallax";
import { Testimonial } from "@/components/ui/design-testimonial";
import Footer from "@/components/Footer";
import { useTheme } from "next-themes";
import { ThemeToggleButton } from "@/components/ui/skiper-ui/skiper26";
import { IconBrandGithub, IconBrandLinkedin, IconBrandInstagram } from "@tabler/icons-react";
import AnimatedContent from "@/components/AnimatedContent";
import CulinaryStats from "@/components/CulinaryStats";

const daerah = [
  { link: '/sumatera', text: 'Sumatera', image: '/sumatera.png' },
  { link: '/jawa', text: 'Jawa', image: '/jawa.png' },
  { link: '/kalimantan', text: 'Kalimantan', image: '/kalimantan.png' },
  {link : '/sulawesi', text: 'Sulawesi', image: '/sulawesi.png' },
  { link: '/bali', text: 'Bali & Nusra', image: '/bali.png' },
  { link: '/maluku', text: 'Maluku & Papua', image: '/papua.png' },
];

export default function Home() {
  const t = useTranslations("Navbar");
   
  const navItems = [
    {
      name: t("home"),
      link: "#home",
    },
    {
      name: t("explore"),
      link: "#explore",
    },
    {
      name: t("experience"),
      link: "#experience",
    },
    {
      name: t("team"),
      link: "#team",
    },
  ];
 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <div className="relative w-full bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 min-h-screen selection:bg-teal-500 selection:text-white scroll-smooth transition-colors duration-300">
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
                className="relative text-neutral-600 dark:text-neutral-100 py-1"
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
      <CulinaryStats />
      <div id="explore">
        <FlowingMenus />
      </div>
      <div id="experience">
        <Testimonial />
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
    title: "Ayam taliwang",
    link: "https://youtu.be/Iw_KY_HiQWo",
    thumbnail: "https://img.youtube.com/vi/Iw_KY_HiQWo/hqdefault.jpg",
  },
  {
    title: "Bika Ambon",
    link: "https://youtu.be/yqhgyHGiLBQ",
    thumbnail: "https://img.youtube.com/vi/yqhgyHGiLBQ/hqdefault.jpg",
  },
  {
    title: "Gudeg Mercon",
       link: "https://youtu.be/PtXZ84z1TPQ?si=QL-GOoqiF0ZFrgCG",
    thumbnail: "https://img.youtube.com/vi/PtXZ84z1TPQ/hqdefault.jpg",
  },
  {
    title: "Seblak",
    link: "https://youtu.be/Jugx8oq_dH8?si=66QuOmTY8ciNF7Eo",
    thumbnail: "https://img.youtube.com/vi/Jugx8oq_dH8/hqdefault.jpg",
  },
  {
    title: "Mie Aceh",
    link: "https://youtu.be/QWG1geJfafs?si=sjrUVueIae8kW2so",
    thumbnail: "https://img.youtube.com/vi/QWG1geJfafs/hqdefault.jpg",
  },
  {
    title: "Sate Maranggi",
    link: "https://youtu.be/f4XnUn-jEFc?si=CXRep8NZXICXTs0m",
    thumbnail: "https://img.youtube.com/vi/f4XnUn-jEFc/hqdefault.jpg",
  },
  {
    title: "Lumpia",
    link: "https://youtu.be/WkY4Wg8RwB8?si=l6JXnBlvRbNm0t66",
    thumbnail: "https://img.youtube.com/vi/WkY4Wg8RwB8/hqdefault.jpg",
  },
  {
    title: "Es Pisang Ijo",
    link: "https://youtu.be/fsjPL3NNoBY?si=O6bNOBo4pamrxks4",
    thumbnail: "https://img.youtube.com/vi/fsjPL3NNoBY/hqdefault.jpg",
  },
  {
    title: "Nasi Kapau",
    link: "https://youtu.be/3rZ5mr8K1Jw?si=hJEYIjPbcfgBHK2d",
    thumbnail: "https://img.youtube.com/vi/3rZ5mr8K1Jw/hqdefault.jpg",
  },
  {
    title: "Coto Makassar",
    link: "https://youtu.be/oghw7PjOGcI?si=DXiqlchp_2OB-myp",
    thumbnail: "https://img.youtube.com/vi/oghw7PjOGcI/hqdefault.jpg",
  },
  {
    title: "Bakso Urat",
    link: "https://youtu.be/XiZi4G3JvSs?si=scKqc7Kx7vv0OE-R",
    thumbnail: "https://img.youtube.com/vi/XiZi4G3JvSs/hqdefault.jpg",
  },
  {
    title: "Nasi Padang",
    link: "https://youtu.be/SXXvNl-w50U?si=q-huKob53xA10dnR",
    thumbnail: "https://img.youtube.com/vi/SXXvNl-w50U/hqdefault.jpg",
  },
  {
    title: "Sate Klopo",
    link: "https://youtu.be/quBvrc2OYOQ?si=5t64nsw4yIVZjGgw",
    thumbnail: "https://img.youtube.com/vi/quBvrc2OYOQ/hqdefault.jpg",
  },
  {
    title: "Gulai Ikan Patin",
    link: "https://youtu.be/8x7ZaG7DD70?si=U3opk9oeRxvMZ4JW",
    thumbnail: "https://img.youtube.com/vi/8x7ZaG7DD70/hqdefault.jpg",
  }
];

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
          <h2 className="text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white sm:text-5xl">
            <span className="bg-gradient-to-b from-neutral-950 to-neutral-700 dark:from-white dark:to-neutral-100 bg-clip-text text-transparent">
              {t("title").split(" ").slice(0, -1).join(" ")}
            </span>{" "}
            <span className="text-[#ff4500]">
              {t("title").split(" ").slice(-1)[0]}
            </span>
          </h2>
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
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-center max-w-lg mx-auto text-sm sm:text-base">
            {t("subtitle")}
          </p>
        </AnimatedContent>
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
          <h2 className="text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white sm:text-5xl">
            <span className="bg-gradient-to-b from-neutral-950 to-neutral-700 dark:from-white dark:to-neutral-100 bg-clip-text text-transparent">
              {t("title").split(" ").slice(0, -1).join(" ")}
            </span>{" "}
            <span className="text-[#ff4500]">
              {t("title").split(" ").slice(-1)[0]}
            </span>
          </h2>
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
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-center max-w-lg mx-auto text-sm sm:text-base">
            {t("subtitle")}
          </p>
        </AnimatedContent>
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
