export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/50 backdrop-blur-md py-8 px-6 md:px-12 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] md:text-xs uppercase tracking-widest opacity-60">
        <p>Danno.ch 2022-2026 ©</p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          <a href="/contatti" className="hover:opacity-100 transition-opacity">Contatti</a>
          <a href="mailto:info@danno.ch" className="hover:opacity-100 transition-opacity">info@danno.ch</a>
          <a href="/informazioni-legali" className="hover:opacity-100 transition-opacity">Informazioni Legali</a>
          <a href="/impressum" className="hover:opacity-100 transition-opacity">Impressum</a>
          <a href="/sitemap" className="hover:opacity-100 transition-opacity">Mappa del sito</a>
        </div>
      </div>
    </footer>
  );
}
