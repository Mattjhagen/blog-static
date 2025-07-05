const fs = require('fs').promises;
const path = require('path');
const { marked } = require('marked');

const postsDir = path.join(__dirname, 'posts_md');
const templatePath = path.join(__dirname, 'index.template.html');
const indexPath = path.join(__dirname, 'index.html');

async function buildIndex() {
  try {
    const files = await fs.readdir(postsDir);

    const markdownFiles = files
      .filter(file => file.endsWith('.md'))
      .sort()
      .reverse(); // Sort descending to get the latest post first

    if (markdownFiles.length === 0) {
      console.log('No posts found.');
      return;
    }

    const latestPostFile = markdownFiles[0];
    const olderPostFiles = markdownFiles.slice(1);

    // Generate the list of older posts for the sidebar
    const olderPostLinks = olderPostFiles
      .map(file => {
        const slug = path.basename(file, '.md');
        const title = slug.replace(/-/g, ' ');
        return `<li><a href="/posts/${slug}.html" class="text-blue-400 hover:underline">${title}</a></li>`;
      })
      .join('\n');

    // Read and render the latest post
    const latestPostPath = path.join(postsDir, latestPostFile);
    const latestPostContent = await fs.readFile(latestPostPath, 'utf8');
    const latestPostHtml = marked(latestPostContent);
    const latestPostTitle = path.basename(latestPostFile, '.md').replace(/-/g, ' ');

    const latestPostFullHtml = `
      <article class="prose lg:prose-xl">
        <a href="/" class="text-blue-400 hover:underline">&larr; Back to Home</a>
        <h1 class="text-3xl font-bold mb-4">${latestPostTitle}</h1>
        ${latestPostHtml}
      </article>
    `;

    // Read the template and inject the content
    const template = await fs.readFile(templatePath, 'utf8');
    let newIndex = template.replace('<!-- LATEST_POST_PLACEHOLDER -->', latestPostFullHtml);
    newIndex = newIndex.replace('<!-- OLDER_POSTS_PLACEHOLDER -->', olderPostLinks);

    await fs.writeFile(indexPath, newIndex, 'utf8');
    console.log('Successfully built index.html');

  } catch (err) {
    console.error('Error building index:', err);
  }
}

buildIndex();