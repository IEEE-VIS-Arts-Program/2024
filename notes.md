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

Export contributions data

1. build the proecjt `npm start`
2. navigate to the table or stream view: http://localhost:8080/contributions-table/, http://localhost:8080/contributions-stream/ 

