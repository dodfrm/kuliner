"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "motion/react";
import ParticleText from "@/components/ParticleText";

import {
  IconMail,
  IconPhone,
  IconMapPin,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandYoutube,
  IconArrowUp
} from "@tabler/icons-react";

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Navbar");


  const regions = [
    { name: "Sumatera", link: "/sumatera" },
    { name: "Jawa", link: "/jawa" },
    { name: "Kalimantan", link: "/kalimantan" },
    { name: "Bali & Nusa Tenggara", link: "/bali" },
    { name: "Maluku & Papua", link: "/maluku" },
  ];

  const quickLinks = [
    { name: tNav("features"), link: "#explore" },
    { name: tNav("team"), link: "#team" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 border-t border-neutral-200/80 dark:border-neutral-800/80 overflow-hidden font-sans transition-colors duration-300">
      {/* Decorative top glow border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-800 to-transparent" />

      {/* Large Interactive Particle Text Header */}
      <div className="relative w-full h-[220px] md:h-[300px] bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800/50 flex items-center justify-center overflow-hidden group select-none transition-colors duration-300">
        {/* Subtle grid background for the canvas section */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-40 dark:opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-white dark:to-neutral-900 pointer-events-none" />
        
        {/* Particle text element */}
        <div className="w-full h-full max-w-7xl mx-auto px-4">
          <ParticleText
            text="KulinerIn"
            fontSize={220}
            particleGap={3}
            particleSize={3}
            mouseControls={{
              enabled: true,
              radius: 120,
              strength: 5,
            }}
            backgroundColor="transparent"
          />
        </div>

      </div>

      {/* Main Footer Links & Content Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-black tracking-tight text-neutral-900 dark:text-white">
                Kuliner<span className="text-[#ff4500]">In</span>
              </span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm">
              {t("tagline")}
            </p>
            {/* Social Links with Hover Effects */}
            <div className="flex items-center space-x-3 pt-2">
              {[
                { icon: <IconBrandInstagram size={18} />, href: "https://instagram.com" },
                { icon: <IconBrandTwitter size={18} />, href: "https://twitter.com" },
                { icon: <IconBrandFacebook size={18} />, href: "https://facebook.com" },
                { icon: <IconBrandYoutube size={18} />, href: "https://youtube.com" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-500 hover:border-red-500/30 dark:hover:border-red-500/30 transition-colors shadow-sm hover:shadow-md"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 flex flex-col space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
              {t("quickLinks")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.link}
                    className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-500 transition-colors inline-block relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-red-600 dark:after:bg-red-500 after:transition-all hover:after:w-full"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Regions Links Column */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
              {t("regions")}
            </h4>
            <ul className="grid grid-cols-1 gap-3">
              {regions.map((region, idx) => (
                <li key={idx}>
                  <Link
                    href={region.link}
                    className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-500 transition-colors inline-block relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-red-600 dark:after:bg-red-500 after:transition-all hover:after:w-full"
                  >
                    {region.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="lg:col-span-3 flex flex-col space-y-4">
            <h4 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
              {t("contact")}
            </h4>
            <ul className="space-y-3 text-sm text-neutral-500 dark:text-neutral-400">
              <li className="flex items-start space-x-3">
                <IconMapPin size={18} className="text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                <span>Jakarta, Indonesia</span>
              </li>
              <li className="flex items-center space-x-3">
                <IconMail size={18} className="text-red-600 dark:text-red-500 shrink-0" />
                <a href="mailto:info@kulinerin.id" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">
                  info@kulinerin.id
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <IconPhone size={18} className="text-red-600 dark:text-red-500 shrink-0" />
                <a href="tel:+62211234567" className="hover:text-red-600 dark:hover:text-red-500 transition-colors">
                  +62 (21) 1234-567
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Divider, Copyright, Back to Top */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-neutral-400 dark:text-neutral-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} KulinerIn. {t("rights")}
          </p>

          <div className="flex items-center space-x-6">
            <Link
              href="/privacy"
              className="text-xs text-neutral-400 dark:text-neutral-500 hover:text-red-600 dark:hover:text-red-500 transition-colors"
            >
              {t("privacy")}
            </Link>
            <Link
              href="/terms"
              className="text-xs text-neutral-400 dark:text-neutral-500 hover:text-red-600 dark:hover:text-red-500 transition-colors"
            >
              {t("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
