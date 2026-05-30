"use client";

import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import Lanyard from "@/components/Lanyard";
import { useTranslations } from "next-intl";

export default function TeamPage() {
  const t = useTranslations("Team");

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-200 flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden selection:bg-teal-500 selection:text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header and Navigation */}
      <div className="relative w-full max-w-5xl z-10 flex flex-col items-center text-center mb-12">
        <Link 
          href="/" 
          className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 hover:text-white hover:border-neutral-700 transition-all duration-300 mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>{t("back")}</span>
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
          {t("title")}
        </h1>
        <p className="mt-3 text-base text-neutral-400 max-w-xl">
          {t("description")}
        </p>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl z-10">
        
        {/* Team Member 1 */}
        <div className="relative group w-full h-[55vh] md:h-[65vh] bg-gradient-to-b from-neutral-900/80 to-neutral-950 border border-neutral-800/80 rounded-2xl overflow-hidden hover:border-teal-500/30 transition-all duration-500 shadow-2xl shadow-black/40">
          <div className="absolute top-6 left-6 z-20 pointer-events-none">
            <h2 className="text-2xl font-bold text-white mt-2.5 tracking-tight">Dodi Firmansyah</h2>
            <p className="text-xs text-neutral-500 mt-1">222212572@stis.ac.id</p>
          </div>
          
          <div className="w-full h-full pt-16">
            <Lanyard cardTexture="/dodi-card.png" position={[0, 0, 11]} gravity={[0, -40, 0]} />
          </div>
        </div>

        {/* Team Member 2 */}
        <div className="relative group w-full h-[55vh] md:h-[65vh] bg-gradient-to-b from-neutral-900/80 to-neutral-950 border border-neutral-800/80 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all duration-500 shadow-2xl shadow-black/40">
          <div className="absolute top-6 left-6 z-20 pointer-events-none">
            <h2 className="text-2xl font-bold text-white mt-2.5 tracking-tight">Wilfa Afriyani</h2>
            <p className="text-xs text-neutral-500 mt-1">222212915@stis.ac.id</p>
          </div>
          
          <div className="w-full h-full pt-16">
            <Lanyard cardTexture="/wilfa-card.png" position={[0, 0, 11]} gravity={[0, -40, 0]} />
          </div>
        </div>

      </div>
    </div>
  );
}