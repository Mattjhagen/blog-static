const fs = require('fs');
const path = require('path');

const postsDir = path.join(__dirname, 'posts_md');
const templatePath = path.join(__dirname, 'index.template.html');
const indexPath = path.join(__dirname, 'index.html');

fs.readdir(postsDir, (err, files) => {
  if (err) {
    console.error('Error reading posts directory:', err);
    return;
  }

  const postLinks = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const slug = path.basename(file, '.md');
      const title = slug.replace(/-/g, ' ');
      return `<li><a href="posts/${slug}.html" class="text-blue-400 underline">${title}</a></li>`;
    })
    .join('\n');

  fs.readFile(templatePath, 'utf8', (err, template) => {
    if (err) {
      console.error('Error reading template file:', err);
      return;
    }

    const newIndex = template.replace('<!-- POSTS_PLACEHOLDER -->', postLinks);

    fs.writeFile(indexPath, newIndex, 'utf8', err => {
      if (err) {
        console.error('Error writing index.html:', err);
      }
    });
  });
});
