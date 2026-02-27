/**
 * Interaction safety matrix data — inspired by TripSit combo chart
 * Levels: safe, caution, unsafe, dangerous, deadly
 */

export type SafetyLevel = 'safe' | 'low_risk' | 'caution' | 'unsafe' | 'dangerous' | 'deadly';

export interface Interaction {
    level: SafetyLevel;
    note: string;
}

export const SAFETY_COLORS: Record<SafetyLevel, { bg: string; text: string; label: string; emoji: string }> = {
    safe: { bg: '#10B981', text: '#fff', label: 'Sicuro', emoji: '🟢' },
    low_risk: { bg: '#22D3EE', text: '#000', label: 'Basso rischio', emoji: '🔵' },
    caution: { bg: '#F59E0B', text: '#000', label: 'Cautela', emoji: '🟡' },
    unsafe: { bg: '#F97316', text: '#fff', label: 'Rischioso', emoji: '🟠' },
    dangerous: { bg: '#EF4444', text: '#fff', label: 'Pericoloso', emoji: '🔴' },
    deadly: { bg: '#7F1D1D', text: '#fff', label: 'Potenzialmente letale', emoji: '💀' },
};

// Key substances for the interaction matrix
export const INTERACTION_SUBSTANCES = [
    'Alcol', 'Cannabis', 'MDMA', 'Cocaina', 'Anfetamine', 'LSD',
    'Funghi', 'Ketamina', 'GHB/GBL', 'Benzodiazepine', 'Oppiacei',
    'Caffeina', 'Nicotina', 'Popper',
] as const;

export type SubstanceName = typeof INTERACTION_SUBSTANCES[number];

// Symmetric matrix — key format: "A|B" (alphabetical order)
function key(a: string, b: string): string {
    return [a, b].sort().join('|');
}

const RAW_INTERACTIONS: Record<string, Interaction> = {
    // Alcol combinations
    [key('Alcol', 'Cannabis')]: { level: 'caution', note: 'Potenzia la sedazione. Rischio di nausea e "green out". Non guidare.' },
    [key('Alcol', 'MDMA')]: { level: 'unsafe', note: 'L\'MDMA maschera l\'intossicazione alcolica. Aumenta disidratazione e neurotossicità.' },
    [key('Alcol', 'Cocaina')]: { level: 'dangerous', note: 'Si forma cocaetilene nel fegato — altamente cardiotossico. Rischio infarto.' },
    [key('Alcol', 'Anfetamine')]: { level: 'unsafe', note: 'Lo stimolante maschera l\'effetto sedativo. Rischio di bere troppo.' },
    [key('Alcol', 'LSD')]: { level: 'caution', note: 'L\'alcol può attenuare gli effetti psichedelici. Rischio di comportamenti impulsivi.' },
    [key('Alcol', 'Funghi')]: { level: 'caution', note: 'Può causare nausea intensa. Riduce la lucidità del trip.' },
    [key('Alcol', 'Ketamina')]: { level: 'dangerous', note: 'Entrambi depressori del SNC. Rischio di vomito, aspirazione e arresto respiratorio.' },
    [key('Alcol', 'GHB/GBL')]: { level: 'deadly', note: 'ESTREMAMENTE PERICOLOSO! Entrambi depressori GABA. Rischio concreto di coma e morte per arresto respiratorio.' },
    [key('Alcol', 'Benzodiazepine')]: { level: 'deadly', note: 'COMBINAZIONE LETALE — depressione respiratoria moltiplicata. Mai mescolare!' },
    [key('Alcol', 'Oppiacei')]: { level: 'deadly', note: 'RISCHIO MORTALE — depressione respiratoria estrema. Causa principale di overdose fatali.' },
    [key('Alcol', 'Caffeina')]: { level: 'caution', note: 'La caffeina maschera l\'intossicazione, portando a bere di più.' },
    [key('Alcol', 'Nicotina')]: { level: 'low_risk', note: 'Basso rischio diretto ma aumenta la tendenza a fumare di più.' },
    [key('Alcol', 'Popper')]: { level: 'dangerous', note: 'Entrambi vasodilatatori. Calo drastico della pressione, possibile svenimento.' },

    // Cannabis combinations
    [key('Cannabis', 'MDMA')]: { level: 'low_risk', note: 'La cannabis può attenuare il comedown. Può amplificare confusione mentale.' },
    [key('Cannabis', 'Cocaina')]: { level: 'caution', note: 'Effetti contrastanti, stress cardiovascolare. Ansia e paranoia possibili.' },
    [key('Cannabis', 'Anfetamine')]: { level: 'low_risk', note: 'La cannabis può aumentare l\'ansia da stimolanti. Stress cardiaco moderato.' },
    [key('Cannabis', 'LSD')]: { level: 'caution', note: 'Potenzia enormemente il trip. Può causare ansia intensa. Solo per esperti.' },
    [key('Cannabis', 'Funghi')]: { level: 'caution', note: 'Come con LSD, amplifica gli effetti psichedelici in modo imprevedibile.' },
    [key('Cannabis', 'Ketamina')]: { level: 'low_risk', note: 'Potenzia la dissociazione. Rischio di nausea e confusione.' },
    [key('Cannabis', 'GHB/GBL')]: { level: 'caution', note: 'Potenzia la sedazione. Rischio di nausea e vomito con aspirazione.' },
    [key('Cannabis', 'Benzodiazepine')]: { level: 'low_risk', note: 'Sedazione potenziata. Evitare guida.' },
    [key('Cannabis', 'Oppiacei')]: { level: 'caution', note: 'Nausea potenziata. Sedazione eccessiva possibile.' },
    [key('Cannabis', 'Caffeina')]: { level: 'safe', note: 'Interazione minima. La caffeina può contrastare la sonnolenza.' },
    [key('Cannabis', 'Nicotina')]: { level: 'safe', note: 'Combinazione comune, rischi aggiuntivi minimi.' },
    [key('Cannabis', 'Popper')]: { level: 'low_risk', note: 'Possibile calo di pressione e vertigini.' },

    // MDMA combinations
    [key('MDMA', 'Cocaina')]: { level: 'unsafe', note: 'La cocaina blocca gli effetti dell\'MDMA. Forte stress cardiaco.' },
    [key('MDMA', 'Anfetamine')]: { level: 'unsafe', note: 'Entrambi serotoninergici+stimolanti. Rischio di ipertermia e neurotossicità.' },
    [key('MDMA', 'LSD')]: { level: 'caution', note: '"Candy-flipping" — effetti molto intensi. Solo in ambiente sicuro con persone fidate.' },
    [key('MDMA', 'Funghi')]: { level: 'caution', note: '"Hippy-flipping" — esperienza intensa. Confusione e sovrastimolazione possibili.' },
    [key('MDMA', 'Ketamina')]: { level: 'caution', note: 'Combinazione confusionaria. Rischio di ipertermia. Idratarsi bene.' },
    [key('MDMA', 'GHB/GBL')]: { level: 'dangerous', note: 'Segnali di overdose mascherati. Rischio di perdita di coscienza e ipertermia.' },
    [key('MDMA', 'Benzodiazepine')]: { level: 'low_risk', note: 'Le benzo riducono stimolazione ed effetti. A volte usate per gestire il comedown.' },
    [key('MDMA', 'Oppiacei')]: { level: 'unsafe', note: 'Rischio di sindrome serotoninergica con tramadolo. Depressione respiratoria.' },
    [key('MDMA', 'Caffeina')]: { level: 'caution', note: 'Entrambi stimolanti. Stress cardiaco, disidratazione, ansia.' },
    [key('MDMA', 'Nicotina')]: { level: 'low_risk', note: 'L\'MDMA porta a fumare di più. Rischio cardio lieve.' },
    [key('MDMA', 'Popper')]: { level: 'dangerous', note: 'Calo pressione + ipertermia. Svenimento, rischio cardiaco elevato.' },

    // Cocaina combinations
    [key('Cocaina', 'Anfetamine')]: { level: 'unsafe', note: 'Entrambi stimolanti potenti. Sovraccarico cardiovascolare serio.' },
    [key('Cocaina', 'LSD')]: { level: 'caution', note: 'La cocaina può scatenare ansia e paranoia durante il trip.' },
    [key('Cocaina', 'Funghi')]: { level: 'caution', note: 'Stimolazione contraddittoria. Ansia e vasocostrizione.' },
    [key('Cocaina', 'Ketamina')]: { level: 'caution', note: 'Effetti opposti. Stress cardiaco moderato.' },
    [key('Cocaina', 'GHB/GBL')]: { level: 'unsafe', note: 'La cocaina maschera la sedazione del GHB. Overdose quando lo stimolante svanisce.' },
    [key('Cocaina', 'Benzodiazepine')]: { level: 'caution', note: 'Le benzo possono gestire stimolazione eccessiva ma mascherano i segnali di sovradosaggio.' },
    [key('Cocaina', 'Oppiacei')]: { level: 'dangerous', note: '"Speedball" — combinazione estremamente pericolosa. Arresto cardiaco.' },
    [key('Cocaina', 'Caffeina')]: { level: 'unsafe', note: 'Sovraccarico stimolante. Forte stress cardiaco.' },
    [key('Cocaina', 'Nicotina')]: { level: 'caution', note: 'Entrambi vasocostringono. Stress cardiovascolare aggiuntivo.' },
    [key('Cocaina', 'Popper')]: { level: 'dangerous', note: 'Cardiovascolarmente molto pericoloso. Stimolante + vasodilatatore = aritmie.' },

    // Ketamina
    [key('Ketamina', 'GHB/GBL')]: { level: 'dangerous', note: 'Entrambi depressori. Rischio di vomito con perdita di coscienza.' },
    [key('Ketamina', 'Oppiacei')]: { level: 'dangerous', note: 'Depressione respiratoria. Rischio di aspirazione del vomito.' },

    // GHB/GBL
    [key('GHB/GBL', 'Oppiacei')]: { level: 'deadly', note: 'COMBINAZIONE MORTALE — depressione respiratoria massima. Mai mescolare!' },
    [key('GHB/GBL', 'Benzodiazepine')]: { level: 'deadly', note: 'ESTREMAMENTE PERICOLOSO — sovrapposizione dei meccanismi depressivi GABA.' },

    // Oppiacei + Benzo
    [key('Oppiacei', 'Benzodiazepine')]: { level: 'deadly', note: 'COMBINAZIONE LETALE — principale causa di overdose fatali. Non mescolare MAI.' },
};

export function getInteraction(a: SubstanceName, b: SubstanceName): Interaction | null {
    if (a === b) return null;
    return RAW_INTERACTIONS[key(a, b)] || null;
}
