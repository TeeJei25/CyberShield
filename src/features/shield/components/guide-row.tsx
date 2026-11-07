import { router } from 'expo-router';
import { ListRow } from '@/components/list-row';
import { Image } from '@/components/image';
import { art } from '../data/content';
import type { Guide } from '../types/shield';
export function GuideRow({ guide }: { guide: Guide }) { return <ListRow title={guide.title} subtitle={`${guide.description}  ${guide.minutes} min`} left={<Image source={art[guide.image]} className="h-12 w-14 rounded-lg" contentFit="cover"/>} onPress={() => router.push({pathname:'/guide',params:{id:guide.id}})}/>; }
