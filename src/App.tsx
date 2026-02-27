/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Canvas } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import { useState } from 'react';
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
import { Sondaggio } from './pages/Sondaggio';
import { Collabora } from './pages/Collabora';
import { Flyers } from './pages/Flyers';
import { Partner } from './pages/Partner';
import { Links } from './pages/Links';
import { ScrollToTop } from './components/ScrollToTop';
import { Quiz } from './pages/Quiz';
import { Comparatore } from './pages/Comparatore';
import { Interazioni } from './pages/Interazioni';
import { Molecole } from './pages/Molecole';

export default function App() {
  const [dpr, setDpr] = useState(1.5);
  const location = useLocation();

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden selection:bg-white selection:text-black relative">
      <CustomCursor />
      <Navigation />

      {/* Persistent 3D Background */}
      <div className="absolute inset-0 z-0">
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
          <color attach="background" args={['#050505']} />
          <Scene />

          {/* Post-Processing Effects */}
          <EffectComposer enableNormalPass={false} multisampling={4}>
            <Bloom luminanceThreshold={0.9} luminanceSmoothing={0.9} height={150} intensity={0.25} />
            <Noise opacity={0.025} />
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* DOM Content Layer */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-y-auto" data-scroll-container>
        <ScrollToTop />
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
              <Route path="/sondaggio-online-sui-consumi" element={<Sondaggio />} />
              <Route path="/collabora" element={<Collabora />} />
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
