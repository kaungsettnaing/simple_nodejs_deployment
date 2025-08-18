const fs = require('fs');
const path = require('path');
const fm = require('front-matter');
const getMarked = require('./marked');
const config = require('../config');

async function createPost(filename) {
  try {
    const content = fs.readFileSync(path.join(config.dev.contentDir, filename), 'utf-8');
    const { attributes, body } = fm(content);
    const marked = await getMarked();

    return {
      ...attributes,                  // front-matter metadata (title, date, etc.)
      body: marked(body)             // HTML content
    };
  } catch (err) {
    console.error('Error processing file:', filename, err);
    throw err;
  }
}

module.exports = { createPost };