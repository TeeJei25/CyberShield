import { useRef, useState, useEffect } from 'react';
import { router } from 'expo-router';
import { Keyboard } from 'react-native';
import { Presets } from 'react-native-pulsar';
import { API_URL, getScanToken } from '@/lib/auth';
import { useShield } from '../store/shield-store';
import type { Analysis, Scan } from '../types/shield';
export function useScanScreen() {
 const state = useShield();
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState('');
 const lock = useRef(false);
 const active = useRef(true);
 const controller = useRef<AbortController | null>(null);
 useEffect(() => { active.current = true; return () => { active.current = false; controller.current?.abort(); }; }, []);
 async function analyze() {
  if (lock.current) return;
  setError('');
  if (state.draft.trim().length < 10) { setError('Paste at least 10 characters so there is enough context to check.'); return; }
  if (state.draft.length > 6000) { setError('Keep the message under 6,000 characters.'); return; }
  if (!state.consent) { setError('Allow AI processing below before checking this message.'); return; }
  Keyboard.dismiss(); lock.current = true; setLoading(true);
  const abort = new AbortController(); controller.current = abort;
  const timeout = setTimeout(() => abort.abort(), 100_000);
  try {
   const token = await getScanToken();
   if (!active.current || !useShield.getState().consent) return;
   const response = await fetch(`${API_URL}/api/analyze`, { method:'POST', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` }, body:JSON.stringify({message:state.draft.trim(),channel:state.channel,consent:true}), signal:abort.signal });
   const data = await response.json();
   if (!response.ok) throw new Error(typeof data.error === 'string' && data.error !== 'unauthorized' ? data.error : 'Your private connection could not be verified. Please try again.');
   if (!['Low','Medium','High'].includes(data.risk) || typeof data.summary !== 'string' || !Array.isArray(data.warningSigns) || !Array.isArray(data.recommendations)) throw new Error('The AI response was incomplete. Please try again.');
   if (!active.current || !useShield.getState().consent) return;
   const scan: Scan = { ...(data as Analysis), id:`scan-${Date.now()}`, message:state.draft.trim(), channel:state.channel, createdAt:new Date().toISOString() };
   useShield.getState().saveScan(scan); Presets.System.notificationSuccess();
   router.replace({ pathname:'/result', params:{id:scan.id,fresh:'yes'} });
  } catch (e) { if (active.current) setError(e instanceof Error && e.name !== 'AbortError' ? e.message : 'The check timed out or could not connect. Your message has not been assessed. Try again.'); }
  finally { clearTimeout(timeout); lock.current = false; if (active.current) setLoading(false); }
 }
 return { state, loading, error, analyze };
}
