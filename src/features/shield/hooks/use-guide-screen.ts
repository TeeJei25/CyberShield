import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Presets } from 'react-native-pulsar';
import { guides } from '../data/content';
import { useShield } from '../store/shield-store';
export function useGuideScreen() {
 const {id}=useLocalSearchParams<{id:string}>();
 const state=useShield();
 const guide=guides.find((g)=>g.id===id);
 const [step,setStep]=useState(Math.min(state.progress[id]??0,5));
 const [answer,setAnswer]=useState<number|null>(null);
 const [justCompleted,setJustCompleted]=useState(false);
 function next() { const n=Math.min(step+1,5);setStep(n);state.advance(id,n); }
 function choose(index:number) { setAnswer(index);if(index!==guide?.correct)return;const isNew=!state.completed.includes(id);state.complete(id);setJustCompleted(isNew);if(isNew)Presets.System.notificationSuccess(); }
 return {guide,step,answer,justCompleted,completed:state.completed.includes(id),next,previous:()=>setStep(Math.max(0,step-1)),choose};
}
