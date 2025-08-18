const hljs = require('highlight.js');
const marked = require('marked');

marked.setOptions({
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  }
});

module.exports = async function getMarked() {
  return marked;
};