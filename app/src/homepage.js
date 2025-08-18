function renderHomepage(posts) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>My Blog</title>
    <link rel="stylesheet" href="./assets/styles/main.css">
  </head>
  <body>
    <h1>Welcome to My Blog</h1>
    <ul>
      ${posts.map(post => `<li><a href="./${post.slug}/index.html">${post.title}</a></li>`).join('')}
    </ul>
  </body>
  </html>`;
}

module.exports = { renderHomepage };