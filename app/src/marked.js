const hljs = require('highlight.js');

async function getMarked() {
  const markedModule = await import('marked');
  const marked = markedModule.default;
  if (typeof marked.setOptions !== 'function') {
    throw new Error('marked.setOptions is not a function. Check marked import.');
  }
  marked.setOptions({
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  });
  return marked;
}

module.exports = getMarked;