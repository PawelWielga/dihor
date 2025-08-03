const blogPosts = [
  {
    id: 'first-post',
    visible: true,
    title: 'My First Blog Post',
    date: '2023-01-15',
    content: [
      { type: 'paragraph', text: 'CSS Grid and Flexbox are two powerful layout systems in CSS.' },
      { type: 'code', lang: 'css', text: `/* A simple CSS Grid example */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.item { padding: 8px; background: #eee; }` },
      { type: 'paragraph', text: 'Grid is best for two-dimensional layouts, while Flexbox excels in one-dimensional layouts.' },
      { type: 'paragraph', text: 'Both can be used together to create complex and responsive designs.' },
    ],
  },
  {
    id: 'second-post',
    visible: true,
    title: 'Understanding React Hooks',
    date: '2023-02-20',
    content: [
      { type: 'paragraph', text: 'Below is a basic example of a custom hook with TypeScript.' },
      { type: 'code', lang: 'ts', text: `import { useEffect, useState } from 'react';

export function useTimer(intervalMs: number) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return tick;
}` },
      { type: 'paragraph', text: 'Grid is best for two-dimensional layouts, while Flexbox excels in one-dimensional layouts.' },
      { type: 'paragraph', text: 'Both can be used together to create complex and responsive designs.' },
    ],
  },
  {
    id: 'third-post',
    visible: false,
    title: 'CSS Grid vs Flexbox',
    date: '2023-03-10',
    content: [
      { type: 'paragraph', text: 'You can also highlight JSON or shell snippets.' },
      { type: 'code', lang: 'json', text: `{
  "name": "example",
  "version": "1.0.0"
}` },
      { type: 'code', lang: 'bash', text: `# install deps
npm i
# start dev
npm run dev` },
      { type: 'paragraph', text: 'Both can be used together to create complex and responsive designs.' },
    ],
  },
];

export default blogPosts;