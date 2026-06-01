"use client";

// TODO create a how to collection and plce it in them

import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useState, useEffect } from "react";

const SPRING = {
  mass: 0.1, // avoid Controls inertia (how sluggish or responsive the object feels). Lower mass = snappier motion; higher mass = lethargic motion
  damping: 10, // its like the weight of the ball heavier the ball less it will bounce or harder the rubber band the more it will bounce
  stiffness: 131, // like rubber Band the more you strech the more speed it goes back to the original position
};

const SimpleMouseFollow = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - bounds.left);
    y.set(e.clientY - bounds.top);
  };

  return (
    <div
      onPointerMove={(e) => {
        handlePointerMove(e);
      }}
      onPointerEnter={() => {
        opacity.set(1);
      }}
      onPointerLeave={() => {
        opacity.set(0);
      }}
      className="rounded-4xl bg-background mt-20 size-[500px] cursor-none overflow-hidden"
    >
      <motion.div
        style={{
          x,
          y,
          opacity,
        }}
        className="rounded-4xl size-5 bg-white mix-blend-difference"
      ></motion.div>
    </div>
  );
};

interface SpringMouseFollowProps {
  global?: boolean;
}

const SpringMouseFollow = ({ global = false }: SpringMouseFollowProps) => {
  const xSpring = useSpring(0, SPRING);
  const ySpring = useSpring(0, SPRING);
  const opacitySpring = useSpring(0, SPRING);
  const scaleSpring = useSpring(0, SPRING);

  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!global) return;

    // Global behavior: disable on touch devices for performance & access
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    // Hide initially until mouse moves
    opacitySpring.set(0);
    scaleSpring.set(0);

    let hasMoved = false;
    let styleEl: HTMLStyleElement | null = null;

    const handlePointerMove = (e: PointerEvent) => {
      // Offset by half of cursor size (size-6 is 24px, so -12) to align center
      xSpring.set(e.clientX);
      ySpring.set(e.clientY);

      if (!hasMoved) {
        hasMoved = true;
        opacitySpring.set(1);
        scaleSpring.set(1);

        // Apply global CSS rule to hide standard cursor ONLY after first movement
        if (!styleEl) {
          styleEl = document.createElement("style");
          styleEl.innerHTML = `
            @media (pointer: fine) {
              body, a, button, [role="button"], .cursor-pointer {
                cursor: none !important;
              }
            }
          `;
          document.head.appendChild(styleEl);
        }
      }
    };

    const handlePointerLeave = () => {
      opacitySpring.set(0);
      scaleSpring.set(0);
    };

    const handlePointerEnter = () => {
      if (hasMoved) {
        opacitySpring.set(1);
        scaleSpring.set(1);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      if (!hasMoved) return;
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.closest(".cursor-pointer") ||
        target.style.cursor === "pointer";

      if (isInteractive) {
        setIsHovered(true);
        scaleSpring.set(1.8);
      } else {
        setIsHovered(false);
        scaleSpring.set(1);
      }
    };

    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("pointerenter", handlePointerEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("pointerenter", handlePointerEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      if (styleEl && document.head.contains(styleEl)) {
        document.head.removeChild(styleEl);
      }
    };
  }, [global, xSpring, ySpring, opacitySpring, scaleSpring]);

  if (global) {
    if (!mounted) return null;
    return (
      <motion.div
        style={{
          x: xSpring,
          y: ySpring,
          opacity: opacitySpring,
          scale: scaleSpring,
        }}
        className="fixed top-0 left-0 size-6 rounded-full pointer-events-none z-[9999] mix-blend-difference bg-white"
      />
    );
  }

  return (
    <div
      onPointerMove={(e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        xSpring.set(e.clientX - bounds.left);
        ySpring.set(e.clientY - bounds.top);
      }}
      onPointerEnter={() => {
        opacitySpring.set(1);
        scaleSpring.set(1);
      }}
      onPointerLeave={() => {
        opacitySpring.set(0);
        scaleSpring.set(0);
      }}
      className="rounded-4xl bg-background mt-20 size-[500px] overflow-hidden"
    >
      <motion.div
        style={{
          x: xSpring,
          y: ySpring,
          opacity: opacitySpring,
          scale: scaleSpring,
        }}
        className="rounded-4xl size-10 bg-white mix-blend-difference"
      ></motion.div>
    </div>
  );
};

const Skiper61 = () => {
  return (
    <section className="h-screen w-full snap-y snap-mandatory overflow-y-scroll">
      <div className="flex h-screen w-full snap-start flex-col items-center justify-center px-5">
        <div className="grid content-start justify-items-center gap-6 text-center">
          <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
            Mouse follow simple
          </span>
        </div>
        <SimpleMouseFollow />
      </div>
      <div className="flex h-screen w-full snap-start flex-col items-center justify-center px-5">
        <div className="grid content-start justify-items-center gap-6 text-center">
          <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
            Mouse follow with Spring
          </span>
        </div>
        <SpringMouseFollow />
      </div>
    </section>
  );
};

export { SimpleMouseFollow, Skiper61, SpringMouseFollow };
