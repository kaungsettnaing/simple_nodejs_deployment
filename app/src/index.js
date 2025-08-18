const fs = require('fs');
const path = require('path');
const config = require('../config');
const { createPost } = require('./posts');
const { renderHomepage } = require('./homepage');

async function buildSite() {
  // make sure output folder exists
  if (!fs.existsSync(config.dev.outdir)) {
    fs.mkdirSync(config.dev.outdir);
  }

  // read markdown files from content
  const files = fs.readdirSync(config.dev.contentDir);
  console.log('Files found in contentDir:', files);

  // create posts asynchronously
  const posts = await Promise.all(files.map(file => createPost(file)));

  // generate each post
  posts.forEach(post => {
    const postDir = path.join(config.dev.outdir, post.slug);
    if (!fs.existsSync(postDir)) fs.mkdirSync(postDir);

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${post.title}</title>
      <link rel="stylesheet" href="../assets/styles/main.css">
    </head>
    <body>
      <h1>${post.title}</h1>
      <div>${post.body}</div>
    </body>
    </html>
    `;

    fs.writeFileSync(path.join(postDir, 'index.html'), html);
  });

  // generate homepage
  const homepageHtml = renderHomepage(posts);
  fs.writeFileSync(path.join(config.dev.outdir, 'index.html'), homepageHtml);

  console.log('✅ Site generated in public/');
}

buildSite();
