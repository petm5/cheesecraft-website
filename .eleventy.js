const markdownIt = require('./11ty/markdown.js');

module.exports = function(eleventyConfig) {
  eleventyConfig.setLibrary('md', markdownIt);
  eleventyConfig.addPassthroughCopy("main.css");
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPairedShortcode('grid', (children) => {
    const content = markdownIt.render(children);
    return `<div class="grid">${content}</div>`
  });
};
