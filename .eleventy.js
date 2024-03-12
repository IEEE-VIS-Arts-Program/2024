module.exports = function (eleventyConfig) {
    // copy these files without processing them
    eleventyConfig.addLayoutAlias('post', './source/_layouts/default.njk');
    eleventyConfig.addPassthroughCopy("./source/images/");
    eleventyConfig.addPassthroughCopy("./source/scripts/");
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
  