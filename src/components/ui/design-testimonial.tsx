"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useTranslations } from "next-intl"

interface TestimonialItem {
  quote: string
  author: string
  role: string
  company: string
}

export function Testimonial() {
  const t = useTranslations("Testimonials")
  const [activeIndex, setActiveIndex] = useState(0)
  const [customTestimonials, setCustomTestimonials] = useState<TestimonialItem[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Form states
  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [dish, setDish] = useState("")
  const [quote, setQuote] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  // Mouse position for magnetic effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 200 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  // Transform for parallax on the large number
  const numberX = useTransform(x, [-200, 200], [-20, 20])
  const numberY = useTransform(y, [-200, 200], [-10, 10])

  // Build the list of testimonials
  const defaultTestimonials = [
    {
      quote: t("default1.quote"),
      author: t("default1.author"),
      role: t("default1.role"),
      company: t("default1.company"),
    },
    {
      quote: t("default2.quote"),
      author: t("default2.author"),
      role: t("default2.role"),
      company: t("default2.company"),
    },
    {
      quote: t("default3.quote"),
      author: t("default3.author"),
      role: t("default3.role"),
      company: t("default3.company"),
    },
  ]

  const testimonials = [...defaultTestimonials, ...customTestimonials]

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }
  }

  const goNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length)
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  // Load custom testimonials on mount
  useEffect(() => {
    const stored = localStorage.getItem("kuliner_experiences")
    if (stored) {
      try {
        setCustomTestimonials(JSON.parse(stored))
      } catch (e) {
        console.error("Failed to parse custom testimonials from localStorage", e)
      }
    }
  }, [])

  // Auto-advance slideshow, paused when modal is open
  useEffect(() => {
    if (isModalOpen) return
    const timer = setInterval(goNext, 10000)
    return () => clearInterval(timer)
  }, [testimonials.length, isModalOpen])

  const handleAddTestimonial = (newTestimonial: { quote: string; author: string; role: string; company: string }) => {
    const updated = [...customTestimonials, newTestimonial]
    setCustomTestimonials(updated)
    localStorage.setItem("kuliner_experiences", JSON.stringify(updated))
    // Automatically transition to show the newly added testimonial
    setActiveIndex(testimonials.length)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !role || !dish || !quote) return

    const newTestimonial = {
      quote,
      author: name,
      role,
      company: dish,
    }

    handleAddTestimonial(newTestimonial)
    setIsSuccess(true)

    // Reset form fields
    setName("")
    setRole("")
    setDish("")
    setQuote("")

    setTimeout(() => {
      setIsModalOpen(false)
      setIsSuccess(false)
    }, 1200)
  }

  const current = testimonials[activeIndex] || defaultTestimonials[0]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50 overflow-hidden py-24 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 dark:border-neutral-900 transition-colors duration-300">
      
      {/* Section Header */}
      <div className="relative w-full max-w-5xl z-10 flex flex-col items-center text-center mb-16">
        <h2 className="text-4xl font-extrabold tracking-tight text-neutral-950 dark:text-white sm:text-5xl">
          <span className="bg-gradient-to-b from-neutral-950 to-neutral-700 dark:from-white dark:to-neutral-100 bg-clip-text text-transparent">
            {t("title").split(" ").slice(0, -1).join(" ")}
          </span>{" "}
          <span className="text-[#ff4500]">
            {t("title").split(" ").slice(-1)[0]}
          </span>
        </h2>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-center max-w-lg mx-auto text-sm sm:text-base">
          {t("subtitle")}
        </p>
      </div>

      <div ref={containerRef} className="relative w-full max-w-5xl" onMouseMove={handleMouseMove}>
        {/* Oversized index number - positioned to bleed off left edge */}
        <motion.div
          className="absolute -left-8 top-1/2 -translate-y-1/2 text-[28rem] font-bold text-neutral-950/[0.02] dark:text-foreground/[0.02] select-none pointer-events-none leading-none tracking-tighter"
          style={{ x: numberX, y: numberY }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="block"
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Main content - asymmetric layout */}
        <div className="relative flex">
          {/* Left column - vertical text */}
          <div className="flex flex-col items-center justify-center pr-8 sm:pr-16 border-r border-neutral-200 dark:border-neutral-800">
            <motion.span
              className="text-xs font-mono text-neutral-500 dark:text-neutral-400 tracking-widest uppercase"
              style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {t("title")}
            </motion.span>

            {/* Vertical progress line */}
            <div className="relative h-32 w-px bg-neutral-200 dark:bg-neutral-800 mt-8">
              <motion.div
                className="absolute top-0 left-0 w-full bg-neutral-800 dark:bg-neutral-200 origin-top"
                animate={{
                  height: `${((activeIndex + 1) / testimonials.length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>

          {/* Center - main content */}
          <div className="flex-1 pl-8 sm:pl-16 py-12">
            {/* Company/Dish badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <span className="inline-flex items-center gap-2 text-xs font-mono text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-800 rounded-full px-3 py-1 bg-white dark:bg-neutral-900/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff4500]" />
                  {current.company}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Quote with character reveal */}
            <div className="relative mb-12 min-h-[160px] sm:min-h-[140px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={activeIndex}
                  className="text-2xl sm:text-4xl md:text-5xl font-light text-neutral-900 dark:text-foreground leading-[1.2] tracking-tight"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {(current?.quote || "").split(" ").map((word: string, i: number) => (
                    <motion.span
                      key={i}
                      className="inline-block mr-[0.3em]"
                      variants={{
                        hidden: { opacity: 0, y: 20, rotateX: 90 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          rotateX: 0,
                          transition: {
                            duration: 0.5,
                            delay: i * 0.04,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                        exit: {
                          opacity: 0,
                          y: -10,
                          transition: { duration: 0.2, delay: i * 0.01 },
                        },
                      }}
                    >
                      {word}
                    </motion.span>
                  ))}
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="flex items-center gap-4"
                >
                  {/* Animated line before name */}
                  <motion.div
                    className="w-8 h-px bg-neutral-900 dark:bg-foreground hidden sm:block"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ originX: 0 }}
                  />
                  <div>
                    <p className="text-base font-medium text-neutral-900 dark:text-foreground">{current.author}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">{current.role}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controls: Bagikan Button + Prev/Next Navigation */}
              <div className="flex items-center gap-4 self-end sm:self-auto">
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 rounded-full bg-[#ff4500] hover:bg-[#e03d00] text-white text-xs sm:text-sm font-medium transition-colors duration-300 flex items-center gap-1.5 shadow-lg shadow-orange-500/20 active:scale-95"
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  {t("buttonAdd")}
                </motion.button>

                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={goPrev}
                    className="group relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-neutral-300 dark:border-neutral-800 flex items-center justify-center overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-700 bg-white dark:bg-neutral-950 transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="relative z-10 text-neutral-700 dark:text-foreground transition-colors"
                    >
                      <path
                        d="M10 12L6 8L10 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>

                  <motion.button
                    onClick={goNext}
                    className="group relative w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-neutral-300 dark:border-neutral-800 flex items-center justify-center overflow-hidden hover:border-neutral-400 dark:hover:border-neutral-700 bg-white dark:bg-neutral-950 transition-colors"
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="relative z-10 text-neutral-700 dark:text-foreground transition-colors"
                    >
                      <path
                        d="M6 4L10 8L6 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom ticker - subtle repeating company names / dishes */}
        <div className="absolute -bottom-20 left-0 right-0 overflow-hidden opacity-[0.05] pointer-events-none">
          <motion.div
            className="flex whitespace-nowrap text-6xl font-bold tracking-tight"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {[...Array(10)].map((_: unknown, i: number) => (
              <span key={i} className="mx-8 uppercase">
                {testimonials.map((t: TestimonialItem) => t.company).join(" • ")} •
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Testimonial Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative glows inside modal */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-xl font-bold text-neutral-950 dark:text-white mb-1">
                      {t("formTitle")}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-6">
                      {t("formSubtitle")}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                          {t("labelName")}
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={t("placeholderName")}
                          className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4500]/50 focus:border-[#ff4500] text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 transition-all duration-300"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                            {t("labelRole")}
                          </label>
                          <input
                            type="text"
                            required
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder={t("placeholderRole")}
                            className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4500]/50 focus:border-[#ff4500] text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                            {t("labelDish")}
                          </label>
                          <input
                            type="text"
                            required
                            value={dish}
                            onChange={(e) => setDish(e.target.value)}
                            placeholder={t("placeholderDish")}
                            className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4500]/50 focus:border-[#ff4500] text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1.5">
                          {t("labelQuote")}
                        </label>
                        <textarea
                          required
                          value={quote}
                          onChange={(e) => setQuote(e.target.value)}
                          placeholder={t("placeholderQuote")}
                          className="w-full px-3.5 py-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff4500]/50 focus:border-[#ff4500] text-sm text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-600 transition-all duration-300 h-24 resize-none"
                        />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                          className="flex-1 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-850 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-sm font-semibold transition-colors duration-200"
                        >
                          {t("buttonCancel")}
                        </button>
                        <button
                          type="submit"
                          className="flex-1 py-2.5 rounded-xl bg-[#ff4500] hover:bg-[#e03d00] text-white text-sm font-semibold transition-colors duration-200 shadow-lg shadow-orange-500/20"
                        >
                          {t("buttonSubmit")}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                      className="w-16 h-16 bg-green-500/10 dark:bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4"
                    >
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </motion.div>
                    <h3 className="text-xl font-bold text-neutral-950 dark:text-white mb-2">
                      {t("toastSuccess")}
                    </h3>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
