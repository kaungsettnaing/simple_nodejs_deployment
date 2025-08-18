const fs = require('fs');
const path = require('path');
const fm = require('front-matter');
const getMarked = require('./marked');
const config = require('../config');

function getSlug(filename, attributes) {
  return attributes.slug || filename.replace(/\.md$/, '');
}

async function createPost(filename) {
  try {
    const content = fs.readFileSync(path.join(config.dev.contentDir, filename), 'utf-8');
    const { attributes, body } = fm(content);
    const marked = await getMarked();
    const slug = getSlug(filename, attributes);

    return {
      title: attributes.title || slug,
      date: attributes.date,
      slug,
      body: marked(body)
    };
  } catch (err) {
    console.error('Error processing file:', filename, err);
    throw err;
  }
}

module.exports = { createPost };