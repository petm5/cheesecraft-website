const markdown = require('markdown-it')({
  html: true,
  breaks: false,
  linkify: true,
})

const Image = require('@11ty/eleventy-img')

markdown.renderer.rules.image = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  let imgSrc = token.attrGet('src')
  const imgAlt = token.content
  const imgTitle = token.attrGet('title')

  const htmlOpts = {
    title: imgTitle,
    alt: imgAlt,
    loading: 'lazy',
    decoding: 'async'
  }

  const imgOpts = {
    widths: [144, 240, 460, 580, 768, "auto"],
    formats: ['avif', 'jpeg'],
    urlPath: '/assets/img/',
    outputDir: './_site/assets/img/'
  }

  Image(imgSrc, imgOpts)
  const metadata = Image.statsSync(imgSrc, imgOpts)

  const generated = Image.generateHTML(metadata, {
    sizes: '(max-width: 768px) 100vw, 768px',
    ...htmlOpts
  })

  return generated
}

module.exports = function(eleventyConfig) {
  eleventyConfig.setLibrary('md', markdown)
  eleventyConfig.addPassthroughCopy("main.css")
  eleventyConfig.addPassthroughCopy("favicon.ico")
  eleventyConfig.addPairedShortcode('grid', (children) => {
    const content = markdown.render(children)
    return `<div class="grid">${content}</div>`
  });
};
