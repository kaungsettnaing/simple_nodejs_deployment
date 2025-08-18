const hljs = require('highlight.js');

let markedPromise = import('marked');

async function getMarked() {
  const markedModule = await markedPromise;
  const marked = markedModule.marked || markedModule.default || markedModule;
  marked.setOptions({
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  });
  return marked;
}

module.exports = getMarked;