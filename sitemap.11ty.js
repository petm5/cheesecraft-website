class SiteMap {
  data() {
    return {
      eleventyExcludeFromCollections: true,
      layout: null,
      permalink: function (data) {
        return data.site.siteMap;
      },
    };
  }

  render({ collections: { all: content }, site: { baseUrl } }) {
    const urls = content.map((c) => `${baseUrl}${c.url}`);
    urls.sort();
    return urls.join("\n");
  }
}

module.exports = SiteMap;
