## Initial install

`npm init -y`

`npm install @11ty/eleventy bulma`

`touch .eleventy.js`

Add the lines:

```
module.exports = function(eleventyConfig) {
    return {
      dir: {
        input: "_source",
        output: "_public"
      }
    };
  };
```
Build the project

`npx eleventy`

Serve the project

`npx eleventy --serve`
