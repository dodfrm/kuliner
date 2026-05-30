"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import RotatingText from "@/components/RotatingText";
import CountUp from "@/components/CountUp";

export default function PageLoader() {
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(true);
  const [loadKey, setLoadKey] = useState(0);
  const [duration, setDuration] = useState(2.0); // 2.0s for initial load, 1.0s for transitions
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      setDuration(1.0);
      setLoadKey((k) => k + 1);
      setShowLoader(true);
    }
  }, [pathname]);

  const handleLoadingComplete = () => {
    // Wait 500ms after count complete to let the number settle at 100% and show complete state
    setTimeout(() => {
      setShowLoader(false);
    }, 500);
  };

  return (
    <AnimatePresence mode="wait">
      {showLoader && (
        <motion.div
          key={`page-loader-${loadKey}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-neutral-950 flex flex-col items-center justify-center text-white select-none pointer-events-auto overflow-hidden"
        >
          {/* Decorative glowing gradient accents */}
          <div className="absolute w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none -top-40 -left-40 animate-pulse" />
          <div className="absolute w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none -bottom-40 -right-40 animate-pulse" />

          {/* Centered animated text question */}
          <div className="relative z-10 flex flex-row flex-wrap items-center justify-center gap-x-2 text-4xl md:text-6xl font-extrabold tracking-tight text-white px-6">
            <span>Udah</span>
            <RotatingText
              texts={["Makan", "Jajan", "Laper", "Ngemil"]}
              mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg inline-flex"
              staggerFrom="first"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={1000}
              splitBy="characters"
              auto
              loop
              key={`rotating-${loadKey}`}
            />
            <span>belum?</span>
          </div>

          {/* Bottom Right CountUp Progress Percentage */}
          <div className="absolute bottom-10 right-12 z-10 flex items-baseline font-mono text-2xl md:text-3xl font-black text-neutral-300">
            <CountUp
              to={100}
              from={0}
              duration={duration}
              key={`count-${loadKey}`}
              onEnd={handleLoadingComplete}
            />
            <span className="text-2xl md:text-3xl ml-1 font-bold text-neutral-500">%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
