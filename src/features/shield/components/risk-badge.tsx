import { Text, View } from 'react-native';
import type { Risk } from '../types/shield';
export function RiskBadge({ risk }: { risk: Risk }) {
 const color = { Low: 'text-success', Medium: 'text-warning', High: 'text-danger' }[risk];
 const bg = { Low: 'bg-success/10', Medium: 'bg-warning/10', High: 'bg-danger/10' }[risk];
 return <View className={`rounded-md px-2 py-1 ${bg}`}><Text className={`text-xs font-medium ${color}`}>{risk} risk</Text></View>;
}
