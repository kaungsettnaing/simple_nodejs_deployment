const hljs = require('highlight.js');

async function getMarked() {
  const { marked } = await markedPromise;
  marked.setOptions({
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  });
  return marked;
}

module.exports = getMarked;