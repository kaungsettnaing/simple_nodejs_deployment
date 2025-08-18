const fs = require('fs');
const path = require('path');
const fm = require('front-matter');
const getMarked = require('./marked');
const config = require('../config');

async function createPost(filepath) {
  try {
    const content = fs.readFileSync(path.join(config.dev.contentDir, filepath), 'utf-8');
    const { attributes, body } = fm(content);
    const marked = await getMarked();

    return {
      ...attributes,                  // front-matter metadata (title, date, etc.)
      body: marked(body),             // HTML content
      slug: filepath.replace('.md', '') // file name without .md
    };
  } catch (err) {
    console.error('Error processing file:', filepath, err);
    throw err;
  }
}

module.exports = { createPost };