'use client';

import { useRef } from 'react';
import StaggeredMenu from '@/components/StaggeredMenu';
import { StaggeredMenuItem, StaggeredMenuSocialItem } from '@/components/StaggeredMenu';
import gsap from 'gsap';
import { Observer } from 'gsap/Observer';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(Observer);

// Tipe data untuk Section
type SectionData = {
  id: number;
  title: string;
  subtitle: string;
  gradient: string; // Tailwind gradient classes
  accentColor: string;
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(-1);
  const animating = useRef(false);

  // Data Menu Navigasi
  const menuItems: StaggeredMenuItem[] = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Portfolio', ariaLabel: 'View our work', link: '/portfolio' },
    { label: 'Services', ariaLabel: 'Our services', link: '/services' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
  ];

  const socialItems: StaggeredMenuSocialItem[] = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'Dribbble', link: 'https://dribbble.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  // Data Konten Section
  const contentSections: SectionData[] = [
    {
      id: 0,
      title: "Innovate",
      subtitle: "Scroll to explore our digital universe",
      gradient: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
      accentColor: "text-purple-300"
    },
    {
      id: 1,
      title: "Create",
      subtitle: "Transforming ideas into visual reality",
      gradient: "bg-gradient-to-br from-zinc-900 via-teal-900 to-zinc-900",
      accentColor: "text-teal-300"
    },
    {
      id: 2,
      title: "Elevate",
      subtitle: "Next generation user experiences",
      gradient: "bg-gradient-to-br from-neutral-900 via-rose-900 to-neutral-900",
      accentColor: "text-rose-300"
    },
    {
      id: 3,
      title: "Scale",
      subtitle: "Building for the future, today",
      gradient: "bg-gradient-to-br from-gray-900 via-amber-900 to-gray-900",
      accentColor: "text-amber-300"
    }
  ];

  useGSAP(() => {
    const sections = gsap.utils.toArray<HTMLElement>(".gsap-section");
    const outerWrappers = gsap.utils.toArray<HTMLElement>(".gsap-outer");
    const innerWrappers = gsap.utils.toArray<HTMLElement>(".gsap-inner");

    // Set initial state
    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    // Helper to create decorative element animation
    const animateDecos = (index: number, direction: number) => {
      const section = sections[index];
      if (!section) return;
      
      const decos = section.querySelectorAll(".floating-deco");
      gsap.fromTo(decos, 
        { scale: 0.5, opacity: 0, rotation: -10 }, 
        { 
          scale: 1, 
          opacity: 1, 
          rotation: 0, 
          duration: 1, 
          stagger: 0.1, 
          ease: "power2.out",
          delay: 0.3
        }
      );
    };

    function gotoSection(index: number, direction: number) {
      if (index < 0 || index >= sections.length) {
        animating.current = false;
        return;
      }

      animating.current = true;

      let fromTop = direction === -1;
      let dFactor = fromTop ? -1 : 1;
      
      let tl = gsap.timeline({
        defaults: { duration: 1.2, ease: "power3.inOut" },
        onComplete: () => { animating.current = false; } // FIXED: Reset animating flag
      });

      // Handle previous section (hide it)
      if (currentIndex.current >= 0) {
        // Push the old section down in z-index
        gsap.set(sections[currentIndex.current], { zIndex: 0 });
        tl.to(sections[currentIndex.current], { opacity: 0.2, duration: 0.5 }, 0); // Slight fade out
      }

      // Prepare incoming section
      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1, opacity: 1 });
      
      // The main reveal animation
      tl.fromTo([outerWrappers[index], innerWrappers[index]], { 
          yPercent: i => i ? -100 * dFactor : 100 * dFactor
        }, { 
          yPercent: 0 
        }, 0);

      // Text Animation
      const texts = sections[index].querySelectorAll(".anim-text");
      tl.fromTo(texts, 
        { y: 50 * dFactor, opacity: 0 }, 
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: "power2.out" }, 
        0.4
      );

      animateDecos(index, direction);
      currentIndex.current = index;
    }

    Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => !animating.current && gotoSection(currentIndex.current - 1, -1),
      onUp: () => !animating.current && gotoSection(currentIndex.current + 1, 1),
      tolerance: 50, // Increased tolerance for better touch handling
      preventDefault: true 
    });

    // Initialize first section
    gotoSection(0, 1);

  }, { scope: containerRef });

  return (
    <>
      {/* Navigation */}
      <div className="fixed z-50 w-full">
        <StaggeredMenu
          position="right"
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#fff"
          openMenuButtonColor="#000"
          changeMenuColorOnOpen={true}
          logoUrl="/next.svg" // Ensure this exists or replace with your logo path
          isFixed={true}
        />
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center text-white/50 text-xs tracking-widest pointer-events-none">
        <span className="mb-2">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent animate-pulse"></div>
      </div>

      {/* Main Container */}
      <div ref={containerRef} className="fixed inset-0 w-full h-full overflow-hidden bg-zinc-950">
        {contentSections.map((section, index) => (
          <section 
            key={section.id} 
            className="gsap-section absolute inset-0 invisible w-full h-full"
          >
            <div className="gsap-outer absolute inset-0 w-full h-full overflow-hidden">
              <div className="gsap-inner absolute inset-0 w-full h-full overflow-hidden">
                
                {/* Background Layer with Modern Styling */}
                <div className={`absolute inset-0 w-full h-full ${section.gradient}`}>
                  
                  {/* Decorative Floating Elements (Glassmorphism) */}
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                     {/* Large Orb 1 */}
                    <div 
                      className="floating-deco absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white/5 backdrop-blur-3xl border border-white/10"
                      style={{ transform: 'translate(-50%, -50%)' }}
                    ></div>
                    {/* Large Orb 2 */}
                    <div 
                      className="floating-deco absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-black/20 backdrop-blur-xl border border-white/5"
                      style={{ transform: 'translate(50%, 50%)' }}
                    ></div>
                  </div>

                  {/* Content Grid */}
                  <div className="relative z-10 h-full w-full flex flex-col items-center justify-center px-6 md:px-12">
                    <div className="max-w-5xl w-full">
                      
                      {/* Section Number */}
                      <div className="anim-text overflow-hidden mb-4">
                        <span className={`inline-block text-sm font-mono tracking-[0.3em] ${section.accentColor} border-b border-current pb-1`}>
                          0{index + 1} / 0{contentSections.length}
                        </span>
                      </div>

                      {/* Main Title */}
                      <h2 className="anim-text overflow-hidden">
                        <span className="block text-6xl md:text-8xl lg:text-9xl font-bold text-white tracking-tighter leading-none">
                          {section.title}
                        </span>
                      </h2>

                      {/* Subtitle */}
                      <div className="anim-text mt-6 max-w-lg">
                        <p className="text-lg md:text-xl text-white/60 leading-relaxed">
                          {section.subtitle}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <div className="anim-text mt-10">
                        <button className="group relative px-8 py-4 bg-white text-black text-sm font-semibold uppercase tracking-widest overflow-hidden transition-all duration-300 hover:bg-opacity-90">
                          <span className="relative z-10">Explore More</span>
                          <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Corner Frame Decorations */}
                  <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/20 pointer-events-none"></div>
                  <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/20 pointer-events-none"></div>

                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}