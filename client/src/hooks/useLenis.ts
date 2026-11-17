import { useEffect } from 'react';
import Lenis from 'lenis';

let globalLenis: Lenis | null = null;

export function useLenis() {
  useEffect(() => {
    if (globalLenis) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    globalLenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      globalLenis = null;
    };
  }, []);
}

export function scrollToSection(id: string) {
  if (id === 'home') {
    globalLenis ? globalLenis.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0 });
    return;
  }
  const el = document.getElementById(id);
  if (el) {
    if (globalLenis) {
      globalLenis.scrollTo(el, { offset: -80, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

