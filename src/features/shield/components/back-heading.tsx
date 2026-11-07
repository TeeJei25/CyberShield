import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from '@/components/pressable';
import { shieldColors } from '@/constants/theme';
export function BackHeading({ title, subtitle }: { title: string; subtitle?: string }) { return <View className="gap-2"><Pressable className="min-h-11 flex-row items-center gap-1 self-start" onPress={() => router.canGoBack() ? router.back() : router.replace('/(tabs)')}><Ionicons name="chevron-back" size={23} color={shieldColors.cyan}/><Text className="text-sm text-accent">Back</Text></Pressable><Text className="text-3xl font-bold text-foreground">{title}</Text>{subtitle ? <Text className="text-sm leading-5 text-muted">{subtitle}</Text> : null}</View>; }
