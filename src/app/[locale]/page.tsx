"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
  LanguageSwitcher,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import FlowingMenu from "@/components/FlowingMenu";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

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
      name: t("home"),
      link: "/",
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
    <div className="relative w-full">
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
      <FlowingMenus />
    </div>
  );
}

const HeroSection = () => {
  const t = useTranslations("Home");
  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">{t("welcome")}</h1>
    </div>
  );
}

const FlowingMenus = () => {
  return (
    <div>
      <div style={{ height: '400px', position: 'relative' }}>
        <FlowingMenu
          items={demoItems}
          speed={15}
          textColor="#000000"
          bgColor="#ffffff"
          marqueeBgColor="#000000"
          marqueeTextColor="#ffffff"
          borderColor="#000000"
        />
      </div>
    </div>
  );
};
