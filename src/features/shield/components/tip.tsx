import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from '@/components/pressable';
import { shieldColors } from '@/constants/theme';
import { Card } from '@/components/card';
export function Tip({ privacy = false }: { privacy?: boolean }) {
 return <Pressable  onPress={() => router.push({ pathname: '/guide', params: { id: privacy ? 'privacy' : 'phishing' } })}><Card className="flex-row gap-3 border border-border items-center"><Ionicons name="bulb-outline" size={26} color={shieldColors.cyan} /><View className="flex-1 gap-1"><Text className="text-xs text-muted">{privacy ? 'Privacy tip' : 'Today’s tip'}</Text><Text className="text-xs leading-4 text-foreground">{privacy ? 'Remove personal details before you scan a message.' : 'Be suspicious of unexpected links, even if they look real.'}</Text></View><Ionicons name="arrow-forward" size={16} color={shieldColors.cyan}/></Card></Pressable>;
}
