export type Risk = 'Low' | 'Medium' | 'High';
export type Channel = 'SMS' | 'WhatsApp' | 'Email';
export interface Analysis { risk: Risk; summary: string; warningSigns: string[]; recommendations: string[]; }
export interface Scan extends Analysis { id: string; message: string; channel: Channel; createdAt: string; }
export interface Scam { id: string; title: string; category: string; channel: Channel; message: string; signs: string[]; steps: string[]; icon: 'logo-whatsapp' | 'card-outline' | 'cube-outline' | 'briefcase-outline' | 'gift-outline' | 'mail-outline'; risk: Risk; }
export interface Guide { id: string; title: string; topic: string; minutes: number; description: string; steps: { title: string; body: string }[]; question: string; answers: string[]; correct: number; image: 'phishing' | 'whatsapp' | 'jobs' | 'secure'; }
export interface ShieldState { scans: Scan[]; consent: boolean; saveHistory: boolean; progress: Record<string, number>; completed: string[]; draft: string; channel: Channel; latest: Scan | null; setDraft: (text: string, channel?: Channel) => void; setConsent: (value: boolean) => void; setSaveHistory: (value: boolean) => void; saveScan: (scan: Scan) => void; deleteScan: (id: string) => void; clearScans: () => void; clearAll: () => void; advance: (id: string, step: number) => void; complete: (id: string) => void; }
