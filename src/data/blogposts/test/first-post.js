const firstPost = {
    id: 'first-post',
    visible: true,
    title: 'My First Blog Post',
    date: '2023-01-15',
    content: [
        { type: 'paragraph', text: 'CSS Grid and Flexbox are two powerful layout systems in CSS.' },
        {
            type: 'code', lang: 'css', text: `/* A simple CSS Grid example */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
.item { padding: 8px; background: #eee; }` },
        { type: 'paragraph', text: 'Grid is best for two-dimensional layouts, while Flexbox excels in one-dimensional layouts.' },
        { type: 'paragraph', text: 'Both can be used together to create complex and responsive designs.' },
    ],
};

export default firstPost;