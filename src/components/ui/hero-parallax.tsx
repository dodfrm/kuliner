"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import { motion, useReducedMotion } from "motion/react";
import RotatingText from "@/components/RotatingText";
import { useTranslations, useLocale } from "next-intl";
import AnimatedContent from "@/components/AnimatedContent";
import { cn } from "@/lib/utils";
import {
  IconPlayerPlay,
  IconX,
  IconArrowRight,
} from "@tabler/icons-react";

// ─── Static lookup maps (module-level, no re-creation per render) ───────────

const REGION_MAP_EN: Record<string, string> = {
  taliwang: "West Nusa Tenggara",
  ambon: "North Sumatra",
  gudeg: "Yogyakarta",
  seblak: "West Java",
  aceh: "Aceh",
  maranggi: "West Java",
  lumpia: "Central Java",
  "pisang ijo": "South Sulawesi",
  kapau: "West Sumatra",
  coto: "South Sulawesi",
  bakso: "Java",
  padang: "West Sumatra",
  klopo: "East Java",
  patin: "Riau (Sumatra)",
};

const REGION_MAP_ID: Record<string, string> = {
  taliwang: "Nusa Tenggara Barat",
  ambon: "Sumatera Utara",
  gudeg: "D.I. Yogyakarta",
  seblak: "Jawa Barat",
  aceh: "Aceh",
  maranggi: "Jawa Barat",
  lumpia: "Jawa Tengah",
  "pisang ijo": "Sulawesi Selatan",
  kapau: "Sumatera Barat",
  coto: "Sulawesi Selatan",
  bakso: "Jawa",
  padang: "Sumatera Barat",
  klopo: "Jawa Timur",
  patin: "Riau",
};

const DESCRIPTION_MAP_EN: Record<string, string> = {
  taliwang: "Lombok grilled chicken marinated in sweet, spicy, and savory spices.",
  "bika ambon": "Medan's traditional spongy yeast cake with a sweet, fragrant pandan aroma.",
  gudeg: "Yogyakarta's jackfruit stew slowly simmered in coconut milk and brown sugar.",
  seblak: "Sunda's spicy, savory dish made of wet crackers and aromatic kencur (sand ginger).",
  "mie aceh": "Aceh's thick yellow noodles cooked in spicy curry soup rich in aromatic spices.",
  maranggi: "Purwakarta's tender beef skewers marinated in sweet coriander and soy sauce.",
  lumpia: "Semarang's crispy spring rolls filled with sweet bamboo shoots and spices.",
  "pisang ijo": "Banana wrapped in green flour dough, served with coconut custard porridge and syrup.",
  kapau: "Minang rice dish served with jackfruit curry, beef offal, and authentic green chili.",
  "coto makassar": "South Sulawesi's rich beef and offal soup cooked with ground peanuts and spices.",
  bakso: "Savory Indonesian beef meatballs served in piping hot, clear beef broth.",
  padang: "Minangkabau rice banquet featuring various curries, sambals, and rich dishes.",
  klopo: "Surabaya's beef skewers coated with seasoned grated coconut before grilling.",
  patin: "Riau's local catfish stewed in a yellow, sour, spicy, and refreshing broth.",
};

const DESCRIPTION_MAP_ID: Record<string, string> = {
  taliwang: "Ayam bakar khas Lombok dengan bumbu pedas manis gurih yang meresap sempurna.",
  "bika ambon": "Kue basah tradisional berongga khas Medan dengan rasa manis harum pandan.",
  gudeg: "Nangka muda dimasak manis gurih dengan santan dan rempah khas Yogyakarta.",
  seblak: "Makanan pedas gurih khas Sunda dengan kerupuk basah dan kencur aromatik.",
  "mie aceh": "Mie kuning tebal dengan kuah kari pedas kaya rempah khas Serambi Mekkah.",
  maranggi: "Sate daging sapi empuk khas Purwakarta dengan marinasi ketumbar manis.",
  lumpia: "Rebung manis dibungkus kulit krispi khas Semarang, disajikan dengan saus kental.",
  "pisang ijo": "Pisang raja dibalut adonan hijau, disajikan dengan bubur sumsum dan sirup merah.",
  kapau: "Nasi khas Minang dengan gulai nangka, jeroan, dan sambal hijau otentik.",
  "coto makassar": "Sup jeroan dan daging sapi berkuah kacang gurih khas Sulawesi Selatan.",
  bakso: "Pentol daging sapi kenyal berkuah kaldu hangat yang segar dan gurih.",
  padang: "Hidangan nasi khas Minangkabau dengan aneka lauk bersantan dan sambal lado.",
  klopo: "Sate daging sapi yang dibalur parutan kelapa gurih sebelum dibakar khas Surabaya.",
  patin: "Sup ikan patin berkuah kuning asam pedas gurih yang segar khas Melayu.",
};

const DEFAULT_DESC_EN = "Authentic traditional Indonesian culinary masterpiece rich in aromatic spices.";
const DEFAULT_DESC_ID = "Kuliner tradisional Indonesia yang kaya akan cita rasa rempah otentik nusantara.";
const DEFAULT_REGION_EN = "Indonesia";
const DEFAULT_REGION_ID = "Indonesia";

// ─── Pure helpers (stable references, no closure captures) ──────────────────

const getRegionOfProduct = (title: string, locale: string): string => {
  const lower = title.toLowerCase();
  const map = locale === "en" ? REGION_MAP_EN : REGION_MAP_ID;
  const defaultVal = locale === "en" ? DEFAULT_REGION_EN : DEFAULT_REGION_ID;
  for (const key of Object.keys(map)) {
    if (lower.includes(key)) return map[key];
  }
  return defaultVal;
};

const getFoodDescription = (title: string, locale: string): string => {
  const lower = title.toLowerCase();
  const map = locale === "en" ? DESCRIPTION_MAP_EN : DESCRIPTION_MAP_ID;
  const defaultVal = locale === "en" ? DEFAULT_DESC_EN : DEFAULT_DESC_ID;
  for (const key of Object.keys(map)) {
    if (lower.includes(key)) return map[key];
  }
  return defaultVal;
};

const getYouTubeId = (url: string): string => {
  if (!url) return "";
  const match = url.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
  return match && match[2].length === 11 ? match[2] : "";
};

// ─── Card style constants (avoid magic numbers scattered in logic) ───────────

const CARD_VISIBILITY_RANGE = 2;
const X_NEAR = 160;
const X_FAR = 290;
const ROTATE_NEAR = 20;
const ROTATE_FAR = 35;
const MOBILE_MULTIPLIER = 0.45;
const SWIPE_THRESHOLD = 50;
const AUTOPLAY_INTERVAL = 4500;

// ─── Custom hook: carousel state & logic ────────────────────────────────────

interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

function useCarousel(products: Product[], isMobile: boolean, prefersReducedMotion: boolean | null) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState("");

  const count = products.length;

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % count);
  }, [count]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  const goTo = useCallback((idx: number) => {
    setActiveIndex(idx);
  }, []);

  const handlePlayVideo = useCallback((product: Product) => {
    setActiveVideoUrl(product.link);
    setIsVideoOpen(true);
  }, []);

  const handleCloseVideo = useCallback(() => {
    setIsVideoOpen(false);
    setActiveVideoUrl("");
  }, []);

  // ── Autoplay with Page Visibility API ──
  useEffect(() => {
    if (isHovered || isVideoOpen || prefersReducedMotion) return;

    let timer: ReturnType<typeof setInterval>;

    const start = () => {
      timer = setInterval(() => setActiveIndex((prev) => (prev + 1) % count), AUTOPLAY_INTERVAL);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        clearInterval(timer);
      } else {
        start();
      }
    };

    start();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isHovered, isVideoOpen, prefersReducedMotion, count]);

  // ── Keyboard navigation ──
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isVideoOpen) {
        if (e.key === "Escape") handleCloseVideo();
        return;
      }
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isVideoOpen, handleNext, handlePrev, handleCloseVideo]);

  // ── Memoized card styles (numeric x for better Framer perf) ──
  const cardStyles = useMemo(() => {
    const mult = isMobile ? MOBILE_MULTIPLIER : 1;
    return products.map((_, index) => {
      let offset = index - activeIndex;
      const half = Math.floor(count / 2);
      if (offset > half) offset -= count;
      if (offset < -half) offset += count;

      const absOffset = Math.abs(offset);

      if (absOffset > CARD_VISIBILITY_RANGE) {
        return { x: 0, rotateY: 0, scale: 0.5, zIndex: 0, opacity: 0, pointerEvents: "none" as const };
      }

      const zIndex = 30 - absOffset * 10;
      const opacity = absOffset === 0 ? 1 : absOffset === 1 ? 0.65 : 0.25;
      const scale = absOffset === 0 ? 1 : absOffset === 1 ? 0.82 : 0.65;

      let x = 0;
      let rotateY = 0;

      if (offset !== 0) {
        const sign = offset > 0 ? 1 : -1;
        const isNear = absOffset === 1;
        x = sign * (isNear ? X_NEAR : X_FAR) * mult;
        rotateY = -sign * (isNear ? ROTATE_NEAR : ROTATE_FAR);
      }

      const pointerEvents: "auto" | "none" = absOffset <= 1 ? "auto" : "none";

      return { x, rotateY, scale, zIndex, opacity, pointerEvents };
    });
  }, [activeIndex, isMobile, products, count]);

  return {
    activeIndex,
    isHovered,
    isVideoOpen,
    activeVideoUrl,
    setIsHovered,
    handleNext,
    handlePrev,
    goTo,
    handlePlayVideo,
    handleCloseVideo,
    cardStyles,
  };
}

// ─── Sub-components (extracted to prevent unnecessary re-renders) ────────────

interface CardProps {
  product: Product;
  style: ReturnType<typeof useCarousel>["cardStyles"][number];
  isActive: boolean;
  locale: string;
  prefersReducedMotion: boolean | null;
  onClickActive: () => void;
  onClickInactive: () => void;
}

const CarouselCard = React.memo(function CarouselCard({
  product,
  style,
  isActive,
  locale,
  prefersReducedMotion,
  onClickActive,
  onClickInactive,
}: CardProps) {
  const transition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 300, damping: 30 };

  return (
    <motion.div
      key={product.title}
      style={{ transformOrigin: "center center" }}
      animate={style}
      transition={transition}
      onClick={isActive ? onClickActive : onClickInactive}
      className={cn(
        "absolute w-[250px] sm:w-[310px] h-[350px] sm:h-[410px] rounded-3xl overflow-hidden shadow-2xl border transition-colors duration-500 flex flex-col justify-between group",
        isActive
          ? "bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] cursor-pointer"
          : "bg-neutral-100/90 dark:bg-neutral-950/90 border-neutral-200/50 dark:border-neutral-900/50 shadow-md cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-800"
      )}
    >
      {/* Thumbnail + play overlay */}
      <div className="relative w-full h-[160px] sm:h-[200px] overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
          <motion.div
            className="w-12 h-12 rounded-full bg-[#ff4500] text-white flex items-center justify-center shadow-lg shadow-orange-500/20"
            whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
          >
            <IconPlayerPlay size={20} className="fill-current ml-0.5" />
          </motion.div>
        </div>

        {/* Region badge */}
        <div className="absolute top-4 left-4 bg-black/55 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
          {getRegionOfProduct(product.title, locale)}
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white line-clamp-1 group-hover:text-[#ff4500] transition-colors duration-300">
            {product.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-1.5 sm:mt-2 line-clamp-3 leading-relaxed">
            {getFoodDescription(product.title, locale)}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800/60 pt-3 mt-3">
          <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            {locale === "en" ? "Archipelago Culinary" : "Kuliner Nusantara"}
          </span>
          <span className="flex items-center text-xs font-bold text-[#ff4500] group-hover:translate-x-1 transition-transform duration-300">
            {locale === "en" ? "Watch Video" : "Tonton Video"}
            <IconArrowRight size={13} className="ml-1" />
          </span>
        </div>
      </div>
    </motion.div>
  );
});

// ─── Header ──────────────────────────────────────────────────────────────────

export const Header = ({ className }: { className?: string }) => {
  const t = useTranslations("Home");
  return (
    <div
      className={
        className ??
        "max-w-7xl relative mx-auto py-20 md:py-30 px-4 w-full left-0 top-0"
      }
    >
      <h1 className="text-5xl md:text-7xl font-bold text-black dark:text-white leading-[1.15]">
        <span className="text-black dark:text-white block sm:inline mr-2">
          {t("sukaMakan")}
        </span>
        <span className="inline-flex min-h-[1.2em] items-center">
          <RotatingText
            texts={[t("pedas"), t("manis"), t("gurih"), t("asam")]}
            mainClassName="px-2 sm:px-2 md:px-3 bg-none text-[#ff4500] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg font-bold"
            staggerDuration={0.03}
            initial={{ y: "100%", opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-120%", opacity: 1 }}
            staggerFrom="first"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={3200}
            splitBy="characters"
          />
        </span>
      </h1>
      <p className="max-w-2xl text-base md:text-lg mt-6 text-neutral-600 dark:text-neutral-300 leading-relaxed">
        {t("description")}
      </p>
    </div>
  );
};

// ─── HeroParallax ────────────────────────────────────────────────────────────

export const HeroParallax = ({ products }: { products: Product[] }) => {
  const t = useTranslations("Home");
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();

  const [isMobile, setIsMobile] = useState(false);

  // ── Debounced resize handler ──
  useEffect(() => {
    let raf: number;
    const check = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setIsMobile(window.innerWidth < 1024);
      });
    };
    check();
    window.addEventListener("resize", check);
    return () => {
      window.removeEventListener("resize", check);
      cancelAnimationFrame(raf);
    };
  }, []);

  const {
    activeIndex,
    isHovered,
    isVideoOpen,
    activeVideoUrl,
    setIsHovered,
    handleNext,
    handlePrev,
    goTo,
    handlePlayVideo,
    handleCloseVideo,
    cardStyles,
  } = useCarousel(products, isMobile, prefersReducedMotion ?? false);

  // ── Pointer/swipe tracking ──
  const dragStartX = useRef<number | null>(null);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
  }, []);

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (dragStartX.current === null) return;
      const delta = e.clientX - dragStartX.current;
      dragStartX.current = null;
      if (Math.abs(delta) < SWIPE_THRESHOLD) return;
      delta < 0 ? handleNext() : handlePrev();
    },
    [handleNext, handlePrev]
  );

  // Cancel swipe if pointer leaves the container
  const handlePointerCancel = useCallback(() => {
    dragStartX.current = null;
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-12 overflow-hidden bg-white dark:bg-neutral-950 transition-colors duration-300"
    >
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Decorative Radial Glowing Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-[#ff4500]/5 dark:bg-[#ff4500]/8 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-teal-500/5 dark:bg-teal-500/8 rounded-full blur-[100px] pointer-events-none animate-pulse duration-[8000ms]" />

      <div className="max-w-7xl mx-auto px-4 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <AnimatedContent
              distance={40}
              direction="vertical"
              duration={0.8}
              ease="power3.out"
            >
              <Header className="relative w-full py-2 px-0" />
            </AnimatedContent>

            <AnimatedContent
              distance={40}
              direction="vertical"
              duration={0.8}
              ease="power3.out"
              delay={0.15}
              className="mt-6 flex flex-wrap gap-4 items-center"
            >
              <a
                href="#explore"
                className="group relative px-6 py-3.5 rounded-full bg-[#ff4500] hover:bg-[#e03d00] text-white font-semibold transition-all duration-300 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>{t("ctaExplore")}</span>
                <IconArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>
            </AnimatedContent>
          </div>

          {/* Right Column: 3D Carousel */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[420px] sm:min-h-[500px]">
            {/* Ambient glow behind active card */}
            <div className="absolute w-[220px] sm:w-[280px] h-[320px] sm:h-[380px] rounded-3xl bg-gradient-to-tr from-orange-500/10 to-rose-500/10 dark:from-orange-500/15 dark:to-rose-500/15 blur-2xl pointer-events-none -z-10 animate-pulse duration-[4000ms]" />

            {/* Carousel deck — pointer events for swipe support */}
            <div
              className="relative w-full flex items-center justify-center [perspective:1000px] lg:[transform-style:preserve-3d] select-none touch-pan-y"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              role="region"
              aria-label={locale === "en" ? "Food carousel" : "Carousel makanan"}
              aria-roledescription="carousel"
            >
              {products.map((product, index) => (
                <CarouselCard
                  key={product.title}
                  product={product}
                  style={cardStyles[index]}
                  isActive={index === activeIndex}
                  locale={locale}
                  prefersReducedMotion={prefersReducedMotion}
                  onClickActive={() => handlePlayVideo(product)}
                  onClickInactive={() => goTo(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && activeVideoUrl && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={locale === "en" ? "Video player" : "Pemutar video"}
        >
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
            <button
              onClick={handleCloseVideo}
              aria-label="Close video"
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/60 hover:bg-[#ff4500] text-white transition-all duration-300 cursor-pointer shadow-lg active:scale-95 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              <IconX size={18} />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeId(activeVideoUrl)}?autoplay=1&rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0 -z-10 cursor-pointer"
            onClick={handleCloseVideo}
            aria-hidden="true"
          />
        </div>
      )}
    </section>
  );
};

// ─── Backward-compatible ProductCard ─────────────────────────────────────────

export const ProductCard = ({ product }: { product: Product }) => (
  <div className="relative rounded-2xl overflow-hidden shadow bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4">
    <img
      src={product.thumbnail}
      alt={product.title}
      className="w-full h-40 object-cover rounded-lg"
      loading="lazy"
      decoding="async"
    />
    <h3 className="font-bold text-neutral-900 dark:text-white mt-2">{product.title}</h3>
  </div>
);