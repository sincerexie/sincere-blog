import fs from 'fs'

let sourceCode = fs.readFileSync(
  './src/.vitepress/vitepress-blog-theme-config.js',
  'utf-8'
);

fs.writeFileSync(
  './node_modules/@jcamp/vitepress-blog-theme/dist/config/index.js',
  sourceCode,
  'utf-8'
);

console.log(
  '@jcamp/vitepress-blog-theme/dist/config/index.js code replaced successfully!'
);
