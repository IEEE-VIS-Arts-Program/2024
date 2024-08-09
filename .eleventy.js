module.exports = function (eleventyConfig) {
  // copy these files without processing them
  eleventyConfig.addLayoutAlias('post', './source/_layouts/default.njk');
  eleventyConfig.addPassthroughCopy("./source/styles/fonts/");
  eleventyConfig.addPassthroughCopy("./source/images/");
  eleventyConfig.addPassthroughCopy("./source/scripts/");
  eleventyConfig.addPassthroughCopy("./source/downloads/");
  eleventyConfig.addWatchTarget("./source/styles/");
  eleventyConfig.addFilter("sortContributions", function(collection) {
    return collection.sort((a, b) => {
      const typeComparison = a.data.type.localeCompare(b.data.type);
      if (typeComparison !== 0) {
        return typeComparison;
      }
      return a.data.title.localeCompare(b.data.title);
    });
  });
  // return the configuration object
  return {
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    dir: {
      input: "source",
      output: "build",
      includes: "_partials",
      layouts: "_layouts",
      data: "_data",
    },
  };
};
