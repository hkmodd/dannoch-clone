import { useEffect, useRef, useCallback } from 'react';

/**
 * High-performance custom cursor — zero React re-renders on mouse movement.
 * Uses refs + direct DOM transforms for smooth 60fps tracking.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const rafId = useRef<number>(0);
  const isVisible = useRef(false);

  const lerp = useCallback((a: number, b: number, t: number) => a + (b - a) * t, []);

  useEffect(() => {
    // Don't initialize on touch devices — no mouse pointer
    const isTouch = !window.matchMedia('(pointer: fine)').matches;
    if (isTouch) return;

    // Mouse move — just store coordinates, no re-render
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible.current) {
        isVisible.current = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }
    };

    // Hover detection — no getComputedStyle, just ancestry checks
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tag = target.tagName;
      const hovering = tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' ||
        !!target.closest('a') || !!target.closest('button') || !!target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer');

      if (hovering !== isHovering.current) {
        isHovering.current = hovering;
        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${dotPos.current.x - 6}px, ${dotPos.current.y - 6}px, 0) scale(${hovering ? 3 : 1})`;
        }
        if (ringRef.current) {
          ringRef.current.style.opacity = hovering ? '0' : '1';
          ringRef.current.style.transform = `translate3d(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px, 0) scale(${hovering ? 1.5 : 1})`;
        }
      }
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    // Animation loop — smooth interpolation at display refresh rate
    const animate = () => {
      const target = mousePos.current;

      // Dot follows tightly (fast lerp)
      dotPos.current.x = lerp(dotPos.current.x, target.x, 0.35);
      dotPos.current.y = lerp(dotPos.current.y, target.y, 0.35);

      // Ring follows loosely (slower lerp = elegant trail)
      ringPos.current.x = lerp(ringPos.current.x, target.x, 0.15);
      ringPos.current.y = lerp(ringPos.current.y, target.y, 0.15);

      const scale = isHovering.current ? 3 : 1;
      const ringScale = isHovering.current ? 1.5 : 1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x - 6}px, ${dotPos.current.y - 6}px, 0) scale(${scale})`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px, 0) scale(${ringScale})`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    // Kick off
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    rafId.current = requestAnimationFrame(animate);

    // Hide native cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId.current);
      document.body.style.cursor = 'auto';
    };
  }, [lerp]);

  return (
    <>
      {/* Dot cursor */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{ opacity: 0, willChange: 'transform' }}
      />
      {/* Ring cursor */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:block"
        style={{ opacity: 0, willChange: 'transform' }}
      />
    </>
  );
}
