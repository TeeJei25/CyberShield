import { useEffect } from 'react';
import { View } from 'react-native';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { useSharedValue, withTiming, useReducedMotion } from 'react-native-reanimated';
import { timing } from '@/lib/motion';
import { shieldColors } from '@/constants/theme';
export function VerdictMark({ animate = false, completion = false }: { animate?: boolean; completion?: boolean }) {
 const progress = useSharedValue(animate ? 0 : 1);
 const reduced = useReducedMotion();
 const path = Skia.Path.MakeFromSVGString(completion ? 'M 17 39 L 32 53 L 61 23' : 'M 39 7 L 67 18 L 65 43 Q 63 62 39 72 Q 15 62 13 43 L 11 18 Z M 25 38 L 36 48 L 54 29');
 useEffect(() => { progress.set(animate && !reduced ? withTiming(1,timing.enter) : 1); }, [animate,reduced,progress]);
 return <View className="h-20 w-20"><Canvas style={{ width:80,height:80 }}>{path ? <Path path={path} style="stroke" strokeWidth={3} strokeCap="round" strokeJoin="round" color={shieldColors.cyan} start={0} end={progress}/> : null}</Canvas></View>;
}
