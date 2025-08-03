const secondPost = {
    id: 'second-post',
    visible: true,
    title: 'Understanding React Hooks',
    date: '2023-02-20',
    content: [
        { type: 'paragraph', text: 'Below is a basic example of a custom hook with TypeScript.' },
        {
            type: 'code', lang: 'ts', text: `import { useEffect, useState } from 'react';

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
};

export default secondPost;