import { useEffect, useRef, useCallback, useState } from "react";
import { useTheme } from "next-themes";


export interface MouseControls {
  enabled: boolean;
  radius: number;
  strength: number;
}

export interface MousePosition {
  x: number | null;
  y: number | null;
}

export interface ParticleTextProps {
  text?: string;
  colors?: string[];
  particleSize?: number;
  particleGap?: number;
  mouseControls?: MouseControls;
  fontSize?: number;
  autoFit?: boolean;
  backgroundColor?: string;
  friction?: number;
  ease?: number;
}

interface LiveProps {
  friction: number;
  ease: number;
  mouseControls: MouseControls;
}


class Particle {
  originX: number;
  originY: number;
  x: number;
  y: number;
  color: string;
  size: number;
  vx: number;
  vy: number;

  constructor(x: number, y: number, color: string, size: number) {
    this.originX = x;
    this.originY = y;
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.color = color;
    this.size = size;
    this.vx = 0;
    this.vy = 0;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
    ctx.fill();
  }

  update(
    mouse: MousePosition,
    friction: number,
    ease: number,
    mouseControls: MouseControls
  ): void {
    const { enabled, radius, strength } = mouseControls;

    if (enabled && mouse.x !== null && mouse.y !== null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const force = (radius - dist) / radius;
        const angle = Math.atan2(dy, dx);
        this.vx -= Math.cos(angle) * force * strength;
        this.vy -= Math.sin(angle) * force * strength;
      }
    }

    this.vx += (this.originX - this.x) * ease;
    this.vy += (this.originY - this.y) * ease;

    this.vx *= friction;
    this.vy *= friction;

    this.x += this.vx;
    this.y += this.vy;
  }
}


const DEFAULT_COLORS: string[] = ["#40ffaa", "#40aaff", "#ff40aa", "#aa40ff"];
const DEFAULT_MOUSE_CONTROLS: MouseControls = { enabled: true, radius: 150, strength: 5 };

export default function ParticleText({
  text = "brilliant.",
  colors = DEFAULT_COLORS,
  particleSize = 2,
  particleGap = 2,
  mouseControls = DEFAULT_MOUSE_CONTROLS,
  fontSize = 200,
  autoFit = true,
  backgroundColor = "transparent",
  friction = 0.75,
  ease = 0.05,
}: ParticleTextProps) {
  const { resolvedTheme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(resolvedTheme === "dark");

  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef     = useRef<MousePosition>({ x: null, y: null });
  const liveRef      = useRef<LiveProps>({ friction, ease, mouseControls });

  useEffect(() => {
    setIsDarkTheme(resolvedTheme === "dark" || !!containerRef.current?.closest(".dark"));
  }, [resolvedTheme]);

  useEffect(() => {
    liveRef.current = { friction, ease, mouseControls };
  }, [friction, ease, mouseControls]);

  const buildParticles = useCallback((): void => {
    const canvas    = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = container.clientWidth;
    const H = container.clientHeight;
    canvas.width  = W;
    canvas.height = H;

    let actualFontSize = fontSize;
    if (autoFit) {
      let lo = 10;
      let hi = fontSize;
      while (lo < hi - 1) {
        const mid = Math.floor((lo + hi) / 2);
        ctx.font = `900 ${mid}px 'Arial Black', Arial`;
        if (ctx.measureText(text).width < W * 0.92) lo = mid;
        else hi = mid;
      }
      actualFontSize = lo;
    }

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle    = "#ffffff";
    ctx.font         = `900 ${actualFontSize}px 'Arial Black', Arial`;
    ctx.textBaseline = "middle";
    ctx.textAlign    = "center";
    ctx.fillText(text, W / 2, H / 2);

    const { data } = ctx.getImageData(0, 0, W, H);
    ctx.clearRect(0, 0, W, H);

    const step = particleSize + particleGap;
    const next: Particle[] = [];

    const isKulinerIn = text.toLowerCase() === "kulinerin";
    let boundaryX = 0;
    if (isKulinerIn) {
      ctx.font = `900 ${actualFontSize}px 'Arial Black', Arial`;
      const totalWidth = ctx.measureText(text).width;
      const prefixWidth = ctx.measureText(text.substring(0, 7)).width; // Length of "Kuliner" is 7
      const startX = (W - totalWidth) / 2;
      boundaryX = startX + prefixWidth;
    }

    for (let y = 0; y < H; y += step) {
      for (let x = 0; x < W; x += step) {
        if (data[(y * W + x) * 4 + 3] > 128) {
          let color = colors[Math.floor(Math.random() * colors.length)];
          if (isKulinerIn) {
            color = x < boundaryX ? (isDarkTheme ? "#ffffff" : "#000000") : "#dc2626";
          }
          next.push(new Particle(x, y, color, particleSize));
        }
      }
    }

    particlesRef.current = next;
  }, [text, colors, particleSize, particleGap, fontSize, autoFit, isDarkTheme]);

  useEffect(() => {
    buildParticles();

    function loop(): void {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const { friction: fr, ease: ea, mouseControls: mc } = liveRef.current;

      if (backgroundColor && backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      for (const p of particlesRef.current) {
        p.update(mouseRef.current, fr, ea, mc);
        p.draw(ctx);
      }

      animFrameRef.current = requestAnimationFrame(loop);
    }

    if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current !== null) cancelAnimationFrame(animFrameRef.current);
    };
  }, [buildParticles, backgroundColor]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => buildParticles());
    ro.observe(container);
    return () => ro.disconnect();
  }, [buildParticles]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { left, top } = canvas.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - left, y: e.clientY - top };
  }, []);

  const handleMouseLeave = useCallback((): void => {
    mouseRef.current = { x: null, y: null };
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>): void => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { left, top } = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    mouseRef.current = { x: touch.clientX - left, y: touch.clientY - top };
  }, []);

  const handleTouchEnd = useCallback((): void => {
    mouseRef.current = { x: null, y: null };
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", position: "relative" }}>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          touchAction: "none",
        }}
      />
    </div>
  );
}