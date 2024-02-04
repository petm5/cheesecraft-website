const markdownItDefault = require('markdown-it');

// you can use any plugins and configs you want
const markdownIt = markdownItDefault({
  html: true,
  breaks: false,
  linkify: true,
});

module.exports = markdownIt;
