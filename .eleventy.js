const markdown = require('markdown-it')({
  html: true,
  breaks: false,
  linkify: true,
})
.use(require('markdown-it-attrs'))
.use(require("markdown-it-anchor"))

const Image = require('@11ty/eleventy-img')

markdown.renderer.rules.image = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  return generateImage(token.attrGet('src'), token.content, token.attrGet('title'))
}

function generateImage (imgSrc, imgAlt = "", imgTitle = "") {
  const htmlOpts = {
    title: imgTitle,
    alt: imgAlt,
    loading: 'lazy',
    decoding: 'async'
  }

  const imgOpts = {
    widths: [144, 240, 460, 580, 768],
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

function generateLargeImage (imgSrc, imgAlt = "", imgTitle = "") {
  const htmlOpts = {
    title: imgTitle,
    alt: imgAlt,
    loading: 'eager',
    decoding: 'sync'
  }

  const imgOpts = {
    widths: [240, 460, 768, "auto"],
    formats: ['avif', 'jpeg'],
    urlPath: '/assets/img/',
    outputDir: './_site/assets/img/'
  }

  Image(imgSrc, imgOpts)
  const metadata = Image.statsSync(imgSrc, imgOpts)

  const generated = Image.generateHTML(metadata, {
    sizes: '100vw',
    ...htmlOpts
  })

  return generated
}

module.exports = function(eleventyConfig) {
  eleventyConfig.setLibrary('md', markdown)
  eleventyConfig.addPassthroughCopy("main.css")
  eleventyConfig.addPassthroughCopy("favicon.ico")
  eleventyConfig.addPassthroughCopy("icons")
  eleventyConfig.addPassthroughCopy("manifest.json")
  eleventyConfig.addPassthroughCopy("app.js")
  eleventyConfig.addPassthroughCopy("sw.js")
  eleventyConfig.addPassthroughCopy("fonts")
  eleventyConfig.addNunjucksShortcode('image', generateImage)
  eleventyConfig.addNunjucksShortcode('largeImage', generateLargeImage)
  eleventyConfig.addPairedShortcode('grid', (children) => {
    return `
      <div class="grid">
      
      ${content}
      
      </div>`
  })
};
