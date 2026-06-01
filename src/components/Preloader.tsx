"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import BlurText from "./BlurText";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PreloaderVariant =
  | "stairs"
  | "percentage"
  | "circle"
  | "slide"
  | "curtain";

export type PreloaderPosition = "fixed" | "absolute";
export type PercentagePosition = "center" | "bottom-left" | "top-left";
export type StairsRevealFrom = "left" | "right" | "center";
export type StairsRevealDirection = "up" | "down";
export type ProgressBarPosition = "top" | "bottom";
export type ReducedMotionFallback = "fade" | "none";
export type AriaLive = "polite" | "assertive" | "off";

export interface PreloaderProps {
  loading?: boolean;
  variant?: PreloaderVariant;
  position?: PreloaderPosition;
  duration?: number;
  loadingText?: string;
  zIndex?: number;
  bgColor?: string;
  textClassName?: string;
  percentagePosition?: PercentagePosition;
  showPercentageSign?: boolean;
  percentageTextClassName?: string;
  showProgressBar?: boolean;
  progressBarPosition?: ProgressBarPosition;
  stairCount?: number;
  stairsRevealFrom?: StairsRevealFrom;
  stairsRevealDirection?: StairsRevealDirection;
  onComplete?: () => void;
  onLoadingStart?: () => void;
  onLoadingComplete?: () => void;
  respectReducedMotion?: boolean;
  reducedMotionFallback?: ReducedMotionFallback;
  ariaLabel?: string;
  ariaLive?: AriaLive;
  textFadeThreshold?: number;
  backdropBlur?: number;
  customContent?: (progress: number) => ReactNode;
  className?: string;
  children?: ReactNode;
}

// ─── Hook: useReducedMotion ───────────────────────────────────────────────────

function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersReduced;
}

// ─── Hook: useProgress ───────────────────────────────────────────────────────

function useProgress(
  active: boolean,
  duration: number,
  onComplete?: () => void
): number {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const tick = useCallback(
    (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const pct = Math.min(((ts - startRef.current) / duration) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        onComplete?.();
      }
    },
    [duration, onComplete]
  );

  useEffect(() => {
    if (!active) {
      setProgress(0);
      startRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    startRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, tick]);

  return progress;
}

// ─── StairsPreloader ─────────────────────────────────────────────────────────
//
//  Each strip (stair) is a full-height vertical panel.
//  ENTER phase: strips slide in from the bottom (staggered left→right / right→left / center-out).
//  HOLD:        all strips visible — user sees the opaque overlay.
//  EXIT phase:  strips slide out to the top (staggered, same or reversed order).
//
//  stairsRevealFrom controls the stagger order for both enter & exit.
//  stairsRevealDirection = "up"   → enters from bottom, exits to top
//  stairsRevealDirection = "down" → enters from top,    exits to bottom
// ─────────────────────────────────────────────────────────────────────────────

type Phase = "enter" | "hold" | "exit" | "done";

interface StairsInternalProps {
  stairCount: number;
  stairsRevealFrom: StairsRevealFrom;
  stairsRevealDirection: StairsRevealDirection;
  loadingText: string;
  textClassName: string;
  textFadeThreshold: number;
  bgColor: string;
  progress: number;
  phase: Phase;
  useAnimation: boolean;
  isTextFadingOut: boolean;
}

function StairsPreloader({
  stairCount,
  stairsRevealFrom,
  stairsRevealDirection,
  loadingText,
  textClassName,
  textFadeThreshold,
  bgColor,
  progress,
  phase,
  useAnimation,
  isTextFadingOut,
}: StairsInternalProps) {
  const strips = Array.from({ length: stairCount }, (_, i) => i);

  // Stagger delay index for each strip (0 = first, stairCount-1 = last)
  const staggerIndex = (i: number): number => {
    if (stairsRevealFrom === "left") return i;
    if (stairsRevealFrom === "right") return stairCount - 1 - i;
    // center-out
    const mid = (stairCount - 1) / 2;
    return Math.round(Math.abs(i - mid));
  };

  const maxStagger = stairCount - 1;
  const stripDuration = 0.55; // seconds each strip takes
  const staggerGap = 0.06;    // seconds between each strip's start

  // translateY offsets
  const enterFrom = stairsRevealDirection === "up" ? "100%" : "-100%";
  const exitTo = stairsRevealDirection === "up" ? "-100%" : "100%";

  // Text fade near end
  const textOpacity =
    isTextFadingOut
      ? 0
      : progress >= textFadeThreshold
      ? Math.max(0, 1 - (progress - textFadeThreshold) / (100 - textFadeThreshold + 0.001))
      : 1;

  const getTransform = (i: number): string => {
    if (!useAnimation) return "translateY(0%)";
    if (phase === "enter") return "translateY(0%)"; // already slid in
    if (phase === "exit" || phase === "done") return `translateY(${exitTo})`;
    return "translateY(0%)";
  };

  const getTransition = (i: number): string => {
    if (!useAnimation) return "none";
    const idx = staggerIndex(i);
    const delay = idx * staggerGap;
    return `transform ${stripDuration}s cubic-bezier(0.76, 0, 0.24, 1) ${delay}s`;
  };

  // Initial transform before enter animation fires
  const getInitialTransform = (i: number): string => {
    if (!useAnimation) return "translateY(0%)";
    if (phase === "enter") return `translateY(${enterFrom})`;
    return "translateY(0%)";
  };

  return (
    <div className="absolute inset-0 flex overflow-hidden">
      {strips.map((i) => (
        <div
          key={i}
          className="relative flex-1 h-full overflow-hidden"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: bgColor,
              transform: phase === "hold" ? "translateY(0%)" : getTransform(i),
              transition: getTransition(i),
            }}
          />
        </div>
      ))}

      {/* Loading text overlay — sits above all strips */}
      {loadingText && (
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10 p-4 ${textClassName}`}
          style={{ opacity: textOpacity, transition: "opacity 0.4s ease" }}
        >
          <BlurText
            text={loadingText}
            className="text-white text-2xl md:text-4xl font-extrabold uppercase tracking-[0.25em] text-center justify-center font-sans"
            delay={40}
            animateBy="letters"
            direction="top"
          />
        </div>
      )}
    </div>
  );
}

// ─── Percentage Variant ───────────────────────────────────────────────────────

function PercentagePreloader({
  progress,
  percentagePosition,
  showPercentageSign,
  percentageTextClassName,
  showProgressBar,
  progressBarPosition,
  bgColor,
  isExiting,
  useAnimation,
}: {
  progress: number;
  percentagePosition: PercentagePosition;
  showPercentageSign: boolean;
  percentageTextClassName: string;
  showProgressBar: boolean;
  progressBarPosition: ProgressBarPosition;
  bgColor: string;
  isExiting: boolean;
  useAnimation: boolean;
}) {
  const posMap: Record<PercentagePosition, string> = {
    center: "inset-0 flex items-center justify-center",
    "bottom-left": "bottom-8 left-8",
    "top-left": "top-8 left-8",
  };

  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundColor: bgColor,
        transform: useAnimation && isExiting ? "translateY(-100%)" : "translateY(0%)",
        transition: useAnimation ? "transform 0.8s cubic-bezier(0.76,0,0.24,1)" : "none",
      }}
    >
      <div className={`absolute ${posMap[percentagePosition]}`}>
        <span
          className={`font-black text-white select-none ${percentageTextClassName}`}
          style={{
            fontSize: "clamp(4rem,18vw,12rem)",
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {Math.floor(progress)}
          {showPercentageSign && <span style={{ fontSize: "0.4em" }}>%</span>}
        </span>
      </div>
      {showProgressBar && (
        <div
          className={`absolute left-0 right-0 h-0.5 bg-white/10 ${progressBarPosition === "top" ? "top-0" : "bottom-0"}`}
        >
          <div
            className="h-full bg-white/70 transition-[width] duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

// ─── Circle Variant ───────────────────────────────────────────────────────────

function CirclePreloader({
  progress,
  loadingText,
  textClassName,
  textFadeThreshold,
  bgColor,
  isExiting,
  useAnimation,
}: {
  progress: number;
  loadingText: string;
  textClassName: string;
  textFadeThreshold: number;
  bgColor: string;
  isExiting: boolean;
  useAnimation: boolean;
}) {
  const R = 52;
  const circ = 2 * Math.PI * R;
  const textOpacity =
    progress >= textFadeThreshold
      ? Math.max(0, 1 - (progress - textFadeThreshold) / (100 - textFadeThreshold + 0.001))
      : 1;

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-6"
      style={{
        backgroundColor: bgColor,
        opacity: useAnimation && isExiting ? 0 : 1,
        transition: useAnimation && isExiting ? "opacity 0.5s ease" : "none",
      }}
    >
      <div className="relative w-32 h-32">
        <svg className="-rotate-90 w-full h-full" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
          <circle
            cx="60" cy="60" r={R} fill="none" stroke="white" strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={circ - (progress / 100) * circ}
            style={{ transition: "stroke-dashoffset 0.08s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-mono text-2xl font-bold" style={{ fontVariantNumeric: "tabular-nums" }}>
            {Math.floor(progress)}
          </span>
        </div>
      </div>
      {loadingText && (
        <p
          className={`text-white/40 text-xs tracking-[0.25em] uppercase font-mono ${textClassName}`}
          style={{ opacity: textOpacity, transition: "opacity 0.3s ease" }}
        >
          {loadingText}
        </p>
      )}
    </div>
  );
}

// ─── Slide Variant ────────────────────────────────────────────────────────────

function SlidePreloader({
  bgColor, isExiting, useAnimation,
}: { bgColor: string; isExiting: boolean; useAnimation: boolean }) {
  return (
    <div
      className="absolute inset-0"
      style={{
        backgroundColor: bgColor,
        transform: useAnimation && isExiting ? "translateY(-100%)" : "translateY(0%)",
        transition: useAnimation ? "transform 0.8s cubic-bezier(0.76,0,0.24,1)" : "none",
      }}
    />
  );
}

// ─── Curtain Variant ──────────────────────────────────────────────────────────

function CurtainPreloader({
  bgColor, isExiting, useAnimation,
}: { bgColor: string; isExiting: boolean; useAnimation: boolean }) {
  return (
    <div className="absolute inset-0 flex">
      <div
        className="flex-1 h-full"
        style={{
          backgroundColor: bgColor,
          transform: useAnimation && isExiting ? "translateX(-100%)" : "translateX(0%)",
          transition: useAnimation ? "transform 0.75s cubic-bezier(0.76,0,0.24,1)" : "none",
        }}
      />
      <div
        className="flex-1 h-full"
        style={{
          backgroundColor: bgColor,
          transform: useAnimation && isExiting ? "translateX(100%)" : "translateX(0%)",
          transition: useAnimation ? "transform 0.75s cubic-bezier(0.76,0,0.24,1) 0.05s" : "none",
        }}
      />
    </div>
  );
}

// ─── Main Preloader ───────────────────────────────────────────────────────────

export function Preloader({
  loading,
  variant = "stairs",
  position = "absolute",
  duration = 2500,
  loadingText = "Loading your next level experience",
  zIndex = 50,
  bgColor,
  textClassName = "",
  percentagePosition = "center",
  showPercentageSign = true,
  percentageTextClassName = "",
  showProgressBar = true,
  progressBarPosition = "bottom",
  stairCount = 12,
  stairsRevealFrom = "left",
  stairsRevealDirection = "up",
  onComplete,
  onLoadingStart,
  onLoadingComplete,
  respectReducedMotion = false,
  reducedMotionFallback = "fade",
  ariaLabel = "Loading content",
  ariaLive = "polite",
  textFadeThreshold = 99,
  backdropBlur = 0,
  customContent,
  className = "",
  children,
}: PreloaderProps) {
  const resolvedBg = bgColor ?? "#0a0a0a";

  const isControlled = loading !== undefined;
  const [localLoading, setLocalLoading] = useState(true);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  // Phase machine for stairs: enter → hold → exit → done
  const [phase, setPhase] = useState<Phase>("done");
  const [isVisible, setIsVisible] = useState(false);
  const [showChildren, setShowChildren] = useState(isControlled ? !loading : false);

  // For non-stairs variants
  const [isExiting, setIsExiting] = useState(false);
  const [isTextFadingOut, setIsTextFadingOut] = useState(false);

  const prefersReduced = useReducedMotion();
  const useAnimation = !(respectReducedMotion && prefersReduced);

  // Strip animation durations for stairs
  const staggerGap = 0.06;
  const stripDuration = 0.55;
  const maxStaggerIdx = stairCount - 1;
  const totalEnterMs = (maxStaggerIdx * staggerGap + stripDuration) * 1000;
  const totalExitMs = (maxStaggerIdx * staggerGap + stripDuration) * 1000;

  const handleProgressComplete = useCallback(() => {
    onComplete?.();

    if (variant === "stairs") {
      // Start text fade out first
      setIsTextFadingOut(true);
      const textFadeDelay = useAnimation ? 400 : 0;

      setTimeout(() => {
        // Start exit phase after text fades out
        setPhase("exit");
        const exitWait = useAnimation ? totalExitMs + 100 : 0;
        setTimeout(() => {
          setPhase("done");
          setIsVisible(false);
          setShowChildren(true);
          if (!isControlled) {
            setLocalLoading(false);
          }
          onLoadingComplete?.();
        }, exitWait);
      }, textFadeDelay);
    } else {
      setIsExiting(true);
      const exitWait = useAnimation ? 850 : 0;
      setTimeout(() => {
        setIsVisible(false);
        setShowChildren(true);
        if (!isControlled) {
          setLocalLoading(false);
        }
        onLoadingComplete?.();
      }, exitWait);
    }
  }, [variant, useAnimation, totalExitMs, onComplete, onLoadingComplete, isControlled]);

  const resolvedLoading = isControlled ? loading : localLoading;

  const progress = useProgress(
    resolvedLoading && isVisible && (variant !== "stairs" || phase === "hold"),
    duration,
    handleProgressComplete
  );

  useEffect(() => {
    if (!isControlled && pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      setLocalLoading(true);
    }
  }, [pathname, isControlled]);

  useEffect(() => {
    if (resolvedLoading) {
      setShowChildren(false);
      setIsExiting(false);
      setIsVisible(true);
      setIsTextFadingOut(false);
      onLoadingStart?.();

      if (variant === "stairs") {
        setPhase("enter");
        const enterWait = useAnimation ? totalEnterMs + 50 : 0;
        setTimeout(() => setPhase("hold"), enterWait);
      } else {
        setPhase("hold");
      }
    } else {
      setShowChildren(true);
      setIsVisible(false);
      setPhase("done");
    }
  }, [resolvedLoading]); // eslint-disable-line react-hooks/exhaustive-deps

  const containerStyle: React.CSSProperties = {
    position,
    inset: 0,
    zIndex,
    pointerEvents: isVisible ? "all" : "none",
    overflow: "hidden",
    ...(backdropBlur > 0 ? { backdropFilter: `blur(${backdropBlur}px)` } : {}),
  };

  return (
    <>
      {isVisible && (
        <div
          role="status"
          aria-label={ariaLabel}
          aria-live={ariaLive}
          aria-busy={phase !== "done"}
          className={`overflow-hidden ${className}`}
          style={containerStyle}
        >
          {customContent ? (
            <div className="absolute inset-0" style={{ backgroundColor: resolvedBg }}>
              {customContent(progress)}
            </div>
          ) : (
            <>
              {variant === "stairs" && (
                <StairsPreloader
                  stairCount={stairCount}
                  stairsRevealFrom={stairsRevealFrom}
                  stairsRevealDirection={stairsRevealDirection}
                  loadingText={loadingText}
                  textClassName={textClassName}
                  textFadeThreshold={textFadeThreshold}
                  bgColor={resolvedBg}
                  progress={progress}
                  phase={phase}
                  useAnimation={useAnimation}
                  isTextFadingOut={isTextFadingOut}
                />
              )}
              {variant === "percentage" && (
                <PercentagePreloader
                  progress={progress}
                  percentagePosition={percentagePosition}
                  showPercentageSign={showPercentageSign}
                  percentageTextClassName={percentageTextClassName}
                  showProgressBar={showProgressBar}
                  progressBarPosition={progressBarPosition}
                  bgColor={resolvedBg}
                  isExiting={isExiting}
                  useAnimation={useAnimation}
                />
              )}
              {variant === "circle" && (
                <CirclePreloader
                  progress={progress}
                  loadingText={loadingText}
                  textClassName={textClassName}
                  textFadeThreshold={textFadeThreshold}
                  bgColor={resolvedBg}
                  isExiting={isExiting}
                  useAnimation={useAnimation}
                />
              )}
              {variant === "slide" && (
                <SlidePreloader bgColor={resolvedBg} isExiting={isExiting} useAnimation={useAnimation} />
              )}
              {variant === "curtain" && (
                <CurtainPreloader bgColor={resolvedBg} isExiting={isExiting} useAnimation={useAnimation} />
              )}
            </>
          )}
        </div>
      )}
      {showChildren && children}
    </>
  );
}

export default Preloader;