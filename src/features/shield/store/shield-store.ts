import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { zustandStorage } from '@/lib/storage';
import type { ShieldState } from '../types/shield';
export const useShield = create<ShieldState>()(persist((set) => ({
 scans: [], consent: false, saveHistory: true, progress: {}, completed: [], draft: '', channel: 'SMS', latest: null,
 setDraft: (draft, channel) => set((s) => ({ draft, channel: channel ?? s.channel })),
 setConsent: (consent) => set({ consent }), setSaveHistory: (saveHistory) => set({ saveHistory }),
 saveScan: (scan) => set((s) => ({ latest: scan, scans: s.saveHistory ? [scan, ...s.scans].slice(0, 100) : s.scans, draft: '' })),
 deleteScan: (id) => set((s) => ({ scans: s.scans.filter((x) => x.id !== id), latest: s.latest?.id === id ? null : s.latest })),
 clearScans: () => set({ scans: [], latest: null }),
 clearAll: () => set({ scans: [], latest: null, consent: false, progress: {}, completed: [], draft: '' }),
 advance: (id, step) => set((s) => ({ progress: { ...s.progress, [id]: step } })),
 complete: (id) => set((s) => ({ completed: s.completed.includes(id) ? s.completed : [...s.completed, id], progress: { ...s.progress, [id]: 5 } })),
}), { name: 'cybershield-za-v1', storage: createJSONStorage(() => zustandStorage), partialize: (s) => ({ scans: s.scans, consent: s.consent, saveHistory: s.saveHistory, progress: s.progress, completed: s.completed, draft: s.draft, channel: s.channel }) }));
