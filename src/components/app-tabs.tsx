import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { useThemeColor } from 'heroui-native';
import { shieldColors } from '@/constants/theme';

export default function AppTabs() {
 const accent = useThemeColor('accent');
 return <NativeTabs backgroundColor={shieldColors.background} tintColor={accent}>
  <NativeTabs.Trigger name="index" disableAutomaticContentInsets><NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label><NativeTabs.Trigger.Icon sf="house" md="home" /></NativeTabs.Trigger>
  <NativeTabs.Trigger name="scams" disableAutomaticContentInsets><NativeTabs.Trigger.Label>Scam Scans</NativeTabs.Trigger.Label><NativeTabs.Trigger.Icon sf="checkmark.shield" md="shield" /></NativeTabs.Trigger>
  <NativeTabs.Trigger name="education" disableAutomaticContentInsets><NativeTabs.Trigger.Label>Education</NativeTabs.Trigger.Label><NativeTabs.Trigger.Icon sf="graduationcap" md="school" /></NativeTabs.Trigger>
  <NativeTabs.Trigger name="privacy" disableAutomaticContentInsets><NativeTabs.Trigger.Label>Privacy</NativeTabs.Trigger.Label><NativeTabs.Trigger.Icon sf="lock" md="lock" /></NativeTabs.Trigger>
 </NativeTabs>;
}
