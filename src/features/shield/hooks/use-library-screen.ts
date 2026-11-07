import { useState } from 'react';
import { scams, guides } from '../data/content';
export function useLibraryScreen() {
 const [query, setQuery] = useState('');
 const [category, setCategory] = useState('All scams');
 const filtered = scams.filter((s) => (category === 'All scams' || s.category === category) && `${s.title} ${s.message}`.toLowerCase().includes(query.toLowerCase()));
 return { query, setQuery, category, setCategory, filtered };
}
export function useEducationScreen() {
 const [query, setQuery] = useState('');
 const [topic, setTopic] = useState('');
 const filtered = guides.filter((g) => (!topic || g.topic === topic) && `${g.title} ${g.topic} ${g.description}`.toLowerCase().includes(query.toLowerCase()));
 return { query, setQuery, topic, setTopic, filtered };
}
