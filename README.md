<p align="center">
  <img src="https://img.shields.io/badge/Harm%20Reduction-Switzerland-dc2626?style=for-the-badge" alt="Harm Reduction"/>
  <img src="https://img.shields.io/badge/React%2018-TypeScript-0891b2?style=for-the-badge" alt="React + TypeScript"/>
  <img src="https://img.shields.io/badge/Three.js-3D-black?style=for-the-badge" alt="Three.js"/>
</p>

<h1 align="center">
  ⚗️
  <br/>
  <strong>danno.ch</strong>
</h1>

<h3 align="center">
  <em>Informazioni sul consumo ricreativo di sostanze</em>
</h3>

<p align="center">
  <strong>🇨🇭 Riduzione del danno • Svizzera</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-development">Development</a> •
  <a href="#-deploy">Deploy</a>
</p>

---

## ⚗️ Il Progetto

Un portale interattivo di **riduzione del danno** che fornisce informazioni scientificamente accurate su sostanze, rischi, interazioni e servizi di Drug Checking in Svizzera.

> *"L'ignoranza non protegge nessuno. L'informazione sì."*

### ✨ Features

| Feature             | Descrizione                                                   |
| ------------------- | ------------------------------------------------------------- |
| 🧪 **Sostanze**      | Database dettagliato con effetti, dosi, rischi e farmacologia |
| ⚠️ **Rischi**        | Guida completa a set & setting, mix pericolosi, safer use     |
| 📖 **Glossario**     | Terminologia scientifica spiegata in modo accessibile         |
| 🔬 **Drug Checking** | Mappa servizi svizzeri con dati reali                         |
| 💬 **Consulenza**    | Link diretto a SafeZone.ch e servizi professionali            |
| 🧠 **Quiz**          | 80+ domande scientifiche, 20 random/sessione, pause/resume    |
| ⚖️ **Comparatore**   | Confronto side-by-side tra sostanze                           |
| ⚡ **Mix Checker**   | Matrice interazioni in tempo reale                            |
| 🔬 **Molecole 3D**   | Strutture molecolari reali da PubChem via 3Dmol.js            |
| 🌓 **Tema Auto**     | Light/dark automatico (7-19 chiaro) + toggle manuale          |
| 📱 **PWA**           | Installabile offline come app nativa                          |

---

## 🛠️ Tech Stack

```
React 18 + TypeScript + Vite
├── 🎨 Tailwind CSS v4       → Design system moderno
├── 🌀 Framer Motion         → Animazioni fluide
├── 🎮 React Three Fiber     → Background 3D immersivo
├── 🧬 3Dmol.js              → Visualizzazione molecolare reale
├── 🔍 PubChem API           → Dati molecolari scientifici (NCBI)
├── 📱 PWA                   → Service Worker + manifest
├── 🔎 SEO                   → Meta tags dinamici per ogni route
└── 🌓 Theme System          → Auto/light/dark con CSS variables
```

---

## 🚀 Development

```bash
# Clone
git clone https://github.com/[username]/dannoch-clone.git
cd dannoch-clone

# Install
npm install

# Dev server
npm run dev

# Build
npm run build
```

### 📁 Struttura

```
src/
├── components/
│   ├── canvas/     # Scene 3D (Three.js)
│   ├── dom/        # Navigation, Footer, CustomCursor
│   ├── icons/      # Icone custom SVG
│   ├── SEO.tsx     # Meta tags dinamici
│   └── ThemeProvider.tsx
├── data/           # Database sostanze, rischi, glossario, quiz
├── pages/          # Route pages (20+)
└── main.tsx        # Entry point con ThemeProvider
```

---

## 🚢 Deploy

Il sito si deploya automaticamente su **GitHub Pages** ad ogni push su `main`.

```
.github/workflows/deploy.yml
├── Build con Node 20
├── Deploy su GitHub Pages
└── SPA routing via 404.html
```

**Setup una tantum:** Settings → Pages → Source → **GitHub Actions**

---

## 📊 Performance

| Metrica             | Target                           |
| ------------------- | -------------------------------- |
| 🎮 **3D Background** | DPR adattivo, PerformanceMonitor |
| ⚡ **Transitions**   | < 250ms, spring damping          |
| 🧈 **Scrolling**     | 60fps con stagger caps           |
| 📦 **Bundle**        | Code splitting per route         |

---

## 🇨🇭 Fonti

| Fonte                                                  | Utilizzo            |
| ------------------------------------------------------ | ------------------- |
| [danno.ch](https://danno.ch)                           | Contenuti originali |
| [PubChem / NCBI](https://pubchem.ncbi.nlm.nih.gov)     | Dati molecolari     |
| [SafeZone.ch](https://www.safezone.ch/it)              | Consulenza online   |
| [DIB / Drug Information Bern](https://www.infodrog.ch) | Drug Checking       |

---

<p align="center">
  <img src="https://img.shields.io/badge/Harm%20Reduction-Saves%20Lives-dc2626?style=flat-square" alt="Harm Reduction"/>
  <img src="https://img.shields.io/badge/Science-Based-0891b2?style=flat-square" alt="Science Based"/>
  <img src="https://img.shields.io/badge/Switzerland-🇨🇭-ff0000?style=flat-square" alt="Switzerland"/>
</p>

<p align="center">
  <strong>L'informazione è il primo passo della prevenzione.</strong>
</p>

---

<p align="center">
  <sub>Built with ⚗️ by Antigravity AI</sub>
</p>
