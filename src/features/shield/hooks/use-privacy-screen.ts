import { useState } from 'react';
import { Share } from 'react-native';
import { confirmDelete } from '@/lib/confirm';
import { deleteGuestSession } from '@/lib/auth';
import { useShield } from '../store/shield-store';
export function usePrivacyScreen() {
 const state = useShield();
 const [status,setStatus] = useState('');
 const [busy,setBusy] = useState(false);
 async function exportData() { try { await Share.share({message:JSON.stringify({app:'CyberShield ZA',exportedAt:new Date().toISOString(),scans:state.scans,lessonProgress:state.progress,completedGuides:state.completed},null,2),title:'CyberShield ZA data export'}); } catch { setStatus('The export could not be shared. Try again.'); } }
 function deleteScans() { confirmDelete({title:'Delete all scans?',message:'All saved messages and assessments will be removed from this device. This cannot be undone.',onConfirm:()=>{state.clearScans();setStatus('All saved scans deleted.');}}); }
 function deleteAll() { confirmDelete({title:'Delete all data and private session?',message:'This removes local scans, lesson progress and AI consent, and deletes your private server session. An internet connection is needed.',onConfirm:()=>{setBusy(true);void deleteGuestSession().then(()=>{state.clearAll();setStatus('Your private session and all app data have been deleted.');}).catch((e:unknown)=>setStatus(e instanceof Error?e.message:'Could not delete the private session. Try again online.')).finally(()=>setBusy(false));}}); }
 return {state,status,busy,exportData,deleteScans,deleteAll};
}
