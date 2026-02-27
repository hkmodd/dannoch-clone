/**
 * Custom SVG icons for Danno.ch sections.
 * These are proprietar icons designed for the platform.
 */

import React from 'react';

interface IconProps {
    className?: string;
    size?: number;
}

/** Molecule icon — for Sostanze section */
export function MoleculeIcon({ className = '', size = 24 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
            {/* Central atom */}
            <circle cx="24" cy="24" r="5" fill="currentColor" opacity="0.9" />
            {/* Orbital electrons */}
            <circle cx="12" cy="12" r="3.5" fill="currentColor" opacity="0.7" />
            <circle cx="36" cy="12" r="3.5" fill="currentColor" opacity="0.7" />
            <circle cx="12" cy="36" r="3.5" fill="currentColor" opacity="0.7" />
            <circle cx="36" cy="36" r="3.5" fill="currentColor" opacity="0.5" />
            {/* Bonds */}
            <line x1="19.5" y1="19.5" x2="14.5" y2="14.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            <line x1="28.5" y1="19.5" x2="33.5" y2="14.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            <line x1="19.5" y1="28.5" x2="14.5" y2="33.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
            <line x1="28.5" y1="28.5" x2="33.5" y2="33.5" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
            {/* Outer ring */}
            <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1" opacity="0.15" strokeDasharray="3 3" />
        </svg>
    );
}

/** Shield with cross — for Rischi & Riduzione section */
export function ShieldCrossIcon({ className = '', size = 24 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
            {/* Shield shape */}
            <path d="M24 4L6 12V24C6 35 24 44 24 44C24 44 42 35 42 24V12L24 4Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
            {/* Cross / plus inside */}
            <rect x="21" y="15" width="6" height="18" rx="1.5" fill="currentColor" opacity="0.8" />
            <rect x="15" y="21" width="18" height="6" rx="1.5" fill="currentColor" opacity="0.8" />
        </svg>
    );
}

/** Flask with bubbles — for Drug Checking section */
export function FlaskBubblesIcon({ className = '', size = 24 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
            {/* Flask body */}
            <path d="M18 6H30V18L40 38C41 40 39.5 43 37 43H11C8.5 43 7 40 8 38L18 18V6Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
            {/* Flask top */}
            <line x1="16" y1="6" x2="32" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            {/* Liquid level */}
            <path d="M12 32H36" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="2 2" />
            {/* Bubbles */}
            <circle cx="20" cy="34" r="2" fill="currentColor" opacity="0.5" />
            <circle cx="28" cy="30" r="1.5" fill="currentColor" opacity="0.4" />
            <circle cx="24" cy="37" r="2.5" fill="currentColor" opacity="0.6" />
            <circle cx="32" cy="35" r="1" fill="currentColor" opacity="0.3" />
        </svg>
    );
}

/** Heart with pulse line — for Consulenza section */
export function HeartPulseIcon({ className = '', size = 24 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
            {/* Heart shape */}
            <path d="M24 42C24 42 6 30 6 18C6 12 10 7 16 7C20 7 23 10 24 12C25 10 28 7 32 7C38 7 42 12 42 18C42 30 24 42 24 42Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
            {/* ECG pulse line */}
            <polyline points="8,24 16,24 19,18 22,30 25,20 28,26 31,24 40,24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinejoin="round" strokeLinecap="round" opacity="0.8" />
        </svg>
    );
}

/** Book with ABC — for Glossario section */
export function GlossaryIcon({ className = '', size = 24 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
            {/* Book cover */}
            <path d="M8 6H36C38.2 6 40 7.8 40 10V38C40 40.2 38.2 42 36 42H12C9.8 42 8 40.2 8 38V6Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
            {/* Spine */}
            <line x1="14" y1="6" x2="14" y2="42" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
            {/* Text lines */}
            <line x1="19" y1="16" x2="34" y2="16" stroke="currentColor" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
            <line x1="19" y1="22" x2="30" y2="22" stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
            <line x1="19" y1="28" x2="32" y2="28" stroke="currentColor" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
            <line x1="19" y1="34" x2="28" y2="34" stroke="currentColor" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
        </svg>
    );
}

/** News page icon — for Blog section */
export function NewsIcon({ className = '', size = 24 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
            {/* Page */}
            <rect x="8" y="4" width="32" height="40" rx="3" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
            {/* Header block */}
            <rect x="13" y="10" width="22" height="8" rx="1.5" fill="currentColor" opacity="0.3" />
            {/* Text lines */}
            <line x1="13" y1="24" x2="35" y2="24" stroke="currentColor" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
            <line x1="13" y1="30" x2="30" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
            <line x1="13" y1="36" x2="25" y2="36" stroke="currentColor" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
        </svg>
    );
}

export default {
    MoleculeIcon,
    ShieldCrossIcon,
    FlaskBubblesIcon,
    HeartPulseIcon,
    GlossaryIcon,
    NewsIcon,
};
