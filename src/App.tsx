/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { useState, useMemo } from 'react';
import { useTheme } from './components/ThemeProvider';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { Scene } from './components/canvas/Scene';
import { Navigation } from './components/dom/Navigation';
import { Footer } from './components/dom/Footer';
import { CustomCursor } from './components/dom/CustomCursor';
import { Home } from './pages/Home';
import { Sostanze } from './pages/Sostanze';
import { SostanzaDetail } from './pages/SostanzaDetail';
import { Rischi } from './pages/Rischi';
import { RischiDetail } from './pages/RischiDetail';
import { Glossario } from './pages/Glossario';
import { GlossarioDetail } from './pages/GlossarioDetail';
import { Drugchecking } from './pages/Drugchecking';
import { Consulenza } from './pages/Consulenza';
import { ChiSiamo } from './pages/ChiSiamo';
import { Contatti } from './pages/Contatti';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Flyers } from './pages/Flyers';
import { Partner } from './pages/Partner';
import { Links } from './pages/Links';
import { ScrollToTop } from './components/ScrollToTop';
import { SEO } from './components/SEO';
import { Quiz } from './pages/Quiz';
import { Comparatore } from './pages/Comparatore';
import { Interazioni } from './pages/Interazioni';
import { Molecole } from './pages/Molecole';

export default function App() {
  const [dpr, setDpr] = useState(1.5);
  const location = useLocation();
  const { resolved } = useTheme();
  const isLight = resolved === 'light';

  // Detect mobile — skip 3D canvas entirely for performance
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024);
  }, []);

  return (
    <div className={`w-full h-screen overflow-hidden relative transition-colors duration-500 ${isLight
      ? 'bg-[#F0EBE3] text-[#1a1a1a] selection:bg-[#1a1a1a] selection:text-[#F0EBE3]'
      : 'bg-[#050505] text-white selection:bg-white selection:text-black'
      }`}>
      <CustomCursor />
      <Navigation />

      {/* 3D Background — desktop only for performance */}
      {!isMobile && (
        <div className={`absolute inset-0 z-0 transition-opacity duration-700 ${isLight ? 'opacity-15' : 'opacity-100'}`}>
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={dpr}
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          >
            <PerformanceMonitor
              bounds={(fps) => [40, 60]}
              onDecline={() => setDpr(1)}
              onIncline={() => setDpr(1.5)}
            />
            <color attach="background" args={[isLight ? '#E8E3DB' : '#050505']} />
            <Scene />

            {/* Post-Processing Effects */}
            <EffectComposer enableNormalPass={false} multisampling={4}>
              <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.9} height={150} intensity={isLight ? 0.1 : 0.25} />
              <Noise opacity={isLight ? 0.01 : 0.025} />
              <Vignette eskil={false} offset={0.1} darkness={isLight ? 0.5 : 1.1} />
            </EffectComposer>
          </Canvas>
        </div>
      )}

      {/* Light mode background overlay — gives warm cream backdrop with subtle 3D texture showing through */}
      {isLight && (
        <div className="absolute inset-0 z-[1] bg-[#F0EBE3]/85 pointer-events-none transition-opacity duration-700" />
      )}

      {/* DOM Content Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-y-auto" data-scroll-container>
        <ScrollToTop />
        <SEO />
        <div className="min-h-full flex flex-col pointer-events-auto">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/sostanze" element={<Sostanze />} />
              <Route path="/sostanze/:id" element={<SostanzaDetail />} />
              <Route path="/rischi" element={<Rischi />} />
              <Route path="/rischi/:id" element={<RischiDetail />} />
              <Route path="/glossario" element={<Glossario />} />
              <Route path="/glossario/:id" element={<GlossarioDetail />} />
              <Route path="/drugchecking" element={<Drugchecking />} />
              <Route path="/consulenza" element={<Consulenza />} />
              <Route path="/chi-siamo" element={<ChiSiamo />} />
              <Route path="/contatti" element={<Contatti />} />
              <Route path="/news-blog" element={<Blog />} />
              <Route path="/news-blog/:id" element={<BlogPost />} />
              <Route path="/flyers" element={<Flyers />} />
              <Route path="/partner" element={<Partner />} />
              <Route path="/links" element={<Links />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/comparatore" element={<Comparatore />} />
              <Route path="/interazioni" element={<Interazioni />} />
              <Route path="/molecole" element={<Molecole />} />
              {/* Catch-all for other routes to render Home temporarily */}
              <Route path="*" element={<Home />} />
            </Routes>
          </AnimatePresence>
          {location.pathname === '/' && <Footer />}
        </div>
      </div>
    </div>
  );
}
