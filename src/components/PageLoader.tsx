"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import Shuffle from "@/components/Shuffle";
import CountUp from "@/components/CountUp";

export default function PageLoader() {
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(true);
  const [loadKey, setLoadKey] = useState(0);
  const [duration, setDuration] = useState(2.0); 
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      setDuration(1);
      setLoadKey((k) => k + 1);
      setShowLoader(true);
    }
  }, [pathname]);

  const handleLoadingComplete = () => {
    setTimeout(() => {
      setShowLoader(false);
    }, 2000);
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
          <div className="relative z-10 text-center px-6">
            <Shuffle
              key={`shuffle-${loadKey}`}
              text="Sudah Makan Belum?"
              className="font-sans text-4xl md:text-6xl font-extrabold tracking-tight text-white bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent"
              shuffleDirection="right"
              animationMode="evenodd"
              shuffleTimes={1}
              stagger={0.03}
              ease="power3.out"
              duration={0.5}
              triggerOnce={false}
              triggerOnHover={false}
              loop
            />
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
