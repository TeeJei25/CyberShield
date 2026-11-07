import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { router } from 'expo-router';
import { ListRow } from '@/components/list-row';
import { RiskBadge } from './risk-badge';
import { shieldColors } from '@/constants/theme';
import type { Scam } from '../types/shield';
export function ScamRow({ scam }: { scam: Scam }) {
 return <ListRow title={scam.title} subtitle={scam.message} left={<View className="h-9 w-9 rounded-xl bg-surface-tertiary items-center justify-center"><Ionicons name={scam.icon} size={24} color={shieldColors.cyan} /></View>} right={<RiskBadge risk={scam.risk} />} onPress={() => router.push({ pathname: '/example', params: { id: scam.id } })} />;
}
