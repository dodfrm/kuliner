"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import AnimatedContent from "@/components/AnimatedContent";
import CountUp from "@/components/CountUp";
import { IconAward } from "@tabler/icons-react";

interface CountryScore {
  name: string;
  enName: string;
  score: number;
  emoji: string;
  highlight?: boolean;
}

const countriesData: CountryScore[] = [
  { name: "Italia", enName: "Italy", score: 4.65, emoji: "🇮🇹" },
  { name: "Jepang", enName: "Japan", score: 4.65, emoji: "🇯🇵" },
  { name: "Yunani", enName: "Greece", score: 4.64, emoji: "🇬🇷" },
  { name: "Portugal", enName: "Portugal", score: 4.61, emoji: "🇵🇹" },
  { name: "Cina", enName: "China", score: 4.59, emoji: "🇨🇳" },
  { name: "Indonesia", enName: "Indonesia", score: 4.57, emoji: "🇮🇩", highlight: true },
  { name: "Meksiko", enName: "Mexico", score: 4.56, emoji: "🇲🇽" },
  { name: "Prancis", enName: "France", score: 4.55, emoji: "🇫🇷" },
  { name: "Spanyol", enName: "Spain", score: 4.55, emoji: "🇪🇸" },
  { name: "Peru", enName: "Peru", score: 4.54, emoji: "🇵🇪" },
];

export default function CulinaryStats() {
  const t = useTranslations("CulinaryStats");
  const tNavbar = useTranslations("Navbar");
  const isEn = tNavbar("home") === "Home";

  const awards = [
    {
      title: "Bawang Goreng",
      rank: isEn ? "Best Condiment (#1)" : "Kondimen Terbaik (#1)",
      desc: isEn ? "Voted as the #1 condiment globally." : "Dinobatkan sebagai pelengkap makanan terbaik di dunia.",
      color: "from-amber-500/20 to-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/30",
    },
    {
      title: "Siomay & Batagor",
      rank: isEn ? "Best Street Food (#1 & #2)" : "Street Food Terbaik (#1 & #2)",
      desc: isEn ? "Voted as the top two street foods worldwide." : "Jajanan kaki lima teratas di seluruh dunia.",
      color: "from-teal-500/20 to-emerald-500/20 text-teal-600 dark:text-teal-400 border-teal-500/30",
    },
    {
      title: "Pecel",
      rank: isEn ? "Best Salad (#2)" : "Salad Terbaik (#2)",
      desc: isEn ? "Ranked as the 2nd best salad globally." : "Dinilai sebagai hidangan salad terbaik ke-2 di dunia.",
      color: "from-green-500/20 to-emerald-500/20 text-green-600 dark:text-green-400 border-green-500/30",
    },
    {
      title: "Pempek",
      rank: isEn ? "Best Fish Dish (#3)" : "Olahan Ikan Terbaik (#3)",
      desc: isEn ? "Ranked #3 among fish dishes, and #13 overall food." : "Olahan ikan terbaik ke-3 & peringkat ke-13 makanan terbaik dunia.",
      color: "from-blue-500/20 to-sky-500/20 text-blue-600 dark:text-blue-400 border-blue-500/30",
    },
  ];

  return (
    <section className="relative w-full py-24 bg-neutral-50 dark:bg-neutral-900 border-t border-b border-neutral-100 dark:border-neutral-800/80 transition-colors duration-300 overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ef444405_1px,transparent_1px),linear-gradient(to_bottom,#ef444405_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#ff4500]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <AnimatedContent
            distance={50}
            direction="vertical"
            duration={0.6}
            ease="power2.out"
          >
            <h2 className="text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white sm:text-5xl">
              {t("sectionTitle")}
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-base sm:text-lg">
              {t("sectionSubtitle")}
            </p>
          </AnimatedContent>
        </div>

        {/* 2 Column Layout - Changed gap-12 to gap-8 and removed items-start to stretch height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Chart - Added h-full */}
          <div className="lg:col-span-6 h-full">
            <AnimatedContent
              distance={40}
              direction="vertical"
              delay={0.1}
              duration={0.6}
              className="h-full"
            >
              {/* Card Container - Added h-full flex flex-col */}
              <div className="h-full flex flex-col bg-white dark:bg-neutral-950 p-6 sm:p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/80 shadow-xl shadow-neutral-100 dark:shadow-black/50 transition-colors duration-300">
                
                <div className="mb-6 flex justify-between items-end flex-shrink-0">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-950 dark:text-white">
                      {t("chartTitle")}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                      {t("chartSource")}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      {t("scoreLabel")} (Max 5.0)
                    </span>
                  </div>
                </div>

                {/* Chart Bars - Added flex-grow to fill remaining space if needed, though content dictates height mostly */}
                <div className="space-y-4 flex-grow">
                  {countriesData.map((country, idx) => {
                    const minScale = 4.4;
                    const maxScale = 4.7;
                    const percentage = Math.max(
                      15,
                      ((country.score - minScale) / (maxScale - minScale)) * 85 + 15
                    );

                    return (
                      <div key={country.enName} className="group relative flex flex-col">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <div className="flex items-center gap-2 font-medium">
                            <span className="text-lg select-none">{country.emoji}</span>
                            <span className={`${country.highlight ? "text-[#ff4500] font-bold" : "text-neutral-700 dark:text-neutral-300"}`}>
                              {isEn ? country.enName : country.name}
                            </span>
                            {country.highlight && (
                              <span className="text-[10px] bg-orange-100 dark:bg-orange-950/60 text-[#ff4500] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider animate-pulse">
                                RANK #6
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className={`font-mono text-sm font-semibold ${country.highlight ? "text-[#ff4500] text-base" : "text-neutral-900 dark:text-neutral-100"}`}>
                              <CountUp to={country.score} duration={1.5} delay={0.2} />
                            </span>
                          </div>
                        </div>

                        <div className="h-3.5 w-full bg-neutral-100 dark:bg-neutral-800/60 rounded-full overflow-hidden relative">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 + idx * 0.05 }}
                            className={`h-full rounded-full relative transition-all duration-300 ${
                              country.highlight
                                ? "bg-gradient-to-r from-orange-500 via-[#ff4500] to-rose-600 shadow-[0_0_12px_rgba(255,69,0,0.4)]"
                                : "bg-gradient-to-r from-neutral-400 to-neutral-500 dark:from-neutral-700 dark:to-neutral-600 group-hover:from-teal-500/70 group-hover:to-teal-600/70"
                            }`}
                          >
                            {country.highlight && (
                              <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_50%,rgba(255,255,255,0.15)_100%)] bg-[length:200%_100%] animate-[shimmer_2s_infinite]" />
                            )}
                          </motion.div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </AnimatedContent>
          </div>

          {/* Right Column: News Panel & Awards - Added h-full */}
          <div className="lg:col-span-6 h-full flex flex-col gap-6">
            <AnimatedContent
              distance={40}
              direction="vertical"
              delay={0.2}
              duration={0.6}
              className="flex-grow"
            >
              {/* News Card */}
              <div className="bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/80 shadow-xl transition-all duration-300 h-full flex flex-col">
                <h3 className="text-2xl font-extrabold text-neutral-950 dark:text-white leading-tight">
                  {t("newsTitle")}
                </h3>
                <p className="mt-3 text-sm font-semibold text-[#ff4500]">
                  {t("newsSubtitle")}
                </p>
                <div className="mt-4 text-neutral-600 dark:text-neutral-400 text-sm sm:text-base space-y-4 flex-grow">
                  <p>{t("newsParagraph1")}</p>
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800/80 flex-shrink-0">
                  <span className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider block mb-3">
                    {isEn ? "Recommended TasteAtlas Restaurants" : "Rekomendasi Restoran Lokal (TasteAtlas)"}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {["Warung Mak Beng (Bali)", "Lapo Marpadotbe (Batak)"].map((restaurant) => (
                      <span
                        key={restaurant}
                        className="text-xs px-2.5 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/40 dark:border-neutral-800/60 text-neutral-700 dark:text-neutral-300 font-medium"
                      >
                        {restaurant}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedContent>

            {/* Awards Breakdowns */}
            <div className="flex-shrink-0">
              <AnimatedContent
                distance={40}
                direction="vertical"
                delay={0.3}
                duration={0.6}
              >
                <h4 className="text-sm font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-4">
                  {isEn ? "Detailed Category Triumphs" : "Rincian Kemenangan Kategori"}
                </h4>
              </AnimatedContent>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {awards.map((award, index) => (
                  <AnimatedContent
                    key={award.title}
                    distance={30}
                    direction="vertical"
                    delay={0.35 + index * 0.05}
                    duration={0.5}
                    className="h-full"
                  >
                    <div className={`p-4 rounded-xl border bg-gradient-to-br ${award.color} h-full flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}>
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="font-bold text-sm text-neutral-900 dark:text-white">
                            {award.title}
                          </span>
                        </div>
                        <span className="text-xs font-bold block mb-1">
                          {award.rank}
                        </span>
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 font-normal">
                          {award.desc}
                        </p>
                      </div>
                    </div>
                  </AnimatedContent>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}} />
    </section>
  );
}