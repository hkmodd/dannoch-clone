import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title?: string;
    description?: string;
}

const ROUTE_SEO: Record<string, { title: string; description: string }> = {
    '/': {
        title: 'Danno.ch — Informazioni sul consumo ricreativo',
        description: 'Piattaforma svizzera per la riduzione del danno e l\'informazione sulle sostanze psicoattive. Enciclopedia, drug checking, consulenza anonima.',
    },
    '/sostanze': {
        title: 'Sostanze — Danno.ch',
        description: 'Enciclopedia completa delle sostanze psicoattive: dosaggi, effetti, durata, rischi e riduzione del danno per ogni sostanza.',
    },
    '/rischi': {
        title: 'Rischi — Danno.ch',
        description: 'Informazioni sulla riduzione del danno: set & setting, mix pericolosi, emergenze, modalità di consumo e prevenzione.',
    },
    '/glossario': {
        title: 'Glossario — Danno.ch',
        description: 'Terminologia farmacologica e di riduzione del danno. Definizioni chiare per comprendere rischi e interazioni.',
    },
    '/drugchecking': {
        title: 'Drug Checking — Danno.ch',
        description: 'Servizio anonimo di analisi delle sostanze in Svizzera. Risultati in tempo reale e centri di analisi.',
    },
    '/consulenza': {
        title: 'Consulenza — Danno.ch',
        description: 'Supporto anonimo e gratuito. Chat, telefono e consulenza online per chi ha domande sul consumo di sostanze.',
    },
    '/quiz': {
        title: 'Quiz — Danno.ch',
        description: 'Testa le tue conoscenze sulla riduzione del danno con il quiz interattivo. 100+ domande su farmacologia, mix e emergenze.',
    },
    '/comparatore': {
        title: 'Comparatore Sostanze — Danno.ch',
        description: 'Confronta fino a 3 sostanze fianco a fianco: categoria, salita, durata, dosaggio e modalità di consumo.',
    },
    '/interazioni': {
        title: 'Mix Checker — Danno.ch',
        description: 'Calcolatore di interazioni tra sostanze. Verifica la sicurezza delle combinazioni con la matrice di rischio.',
    },
    '/molecole': {
        title: 'Molecole 3D — Danno.ch',
        description: 'Visualizza le strutture molecolari 3D delle sostanze psicoattive. Dati scientifici da PubChem.',
    },
    '/news-blog': {
        title: 'News & Blog — Danno.ch',
        description: 'Articoli e notizie sulla riduzione del danno, ricerche sul consumo e aggiornamenti dal mondo delle sostanze.',
    },
    '/chi-siamo': {
        title: 'Chi siamo — Danno.ch',
        description: 'Il progetto Danno.ch: chi siamo, la nostra missione e i nostri servizi per la riduzione del danno in Svizzera.',
    },
    '/contatti': {
        title: 'Contatti — Danno.ch',
        description: 'Contatta il team di Danno.ch per informazioni, collaborazioni o segnalazioni.',
    },
};

export function SEO({ title, description }: SEOProps) {
    const location = useLocation();

    useEffect(() => {
        const routeSeo = ROUTE_SEO[location.pathname];
        const pageTitle = title || routeSeo?.title || 'Danno.ch — Informazioni sul consumo ricreativo';
        const pageDesc = description || routeSeo?.description || '';

        document.title = pageTitle;

        // Update meta description
        let metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', pageDesc);
        } else {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            metaDesc.setAttribute('content', pageDesc);
            document.head.appendChild(metaDesc);
        }

        // OG tags
        const ogTags: Record<string, string> = {
            'og:title': pageTitle,
            'og:description': pageDesc,
            'og:type': 'website',
            'og:url': `https://danno.ch${location.pathname}`,
            'og:site_name': 'Danno.ch',
        };

        Object.entries(ogTags).forEach(([property, content]) => {
            let tag = document.querySelector(`meta[property="${property}"]`);
            if (tag) {
                tag.setAttribute('content', content);
            } else {
                tag = document.createElement('meta');
                tag.setAttribute('property', property);
                tag.setAttribute('content', content);
                document.head.appendChild(tag);
            }
        });
    }, [location.pathname, title, description]);

    return null;
}
