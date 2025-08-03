const thirdPost = {
    id: 'third-post',
    visible: false,
    title: 'CSS Grid vs Flexbox',
    date: '2023-03-10',
    content: [
        { type: 'paragraph', text: 'You can also highlight JSON or shell snippets.' },
        {
            type: 'code', lang: 'json', text: `{
  "name": "example",
  "version": "1.0.0"
}` },
        {
            type: 'code', lang: 'bash', text: `# install deps
npm i
# start dev
npm run dev` },
        { type: 'paragraph', text: 'Both can be used together to create complex and responsive designs.' },
    ],
};

export default thirdPost;