const hljs = require('highlight.js');

async function getMarked() {
  const markedModule = await import('marked');
  // Try all possible exports
  const marked = markedModule.default || markedModule.marked || markedModule;
  if (!marked || typeof marked.setOptions !== 'function') {
    console.error('DEBUG markedModule:', markedModule); // Add this for debugging
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