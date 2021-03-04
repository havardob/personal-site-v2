const MarkdownIt = require("markdown-it");
const { markdownItImageSize } = require("markdown-it-image-size");
const slugify = require("slugify");

let mdOptions = {
   html: true,
   breaks: true,
   linkify: true,
};

const mdRenderer = MarkdownIt(mdOptions);
mdRenderer.use(markdownItImageSize);

module.exports = function (eleventyConfig) {
   eleventyConfig.addFilter("md", function (content) {
      return mdRenderer.render(content);
   });

   eleventyConfig.setLibrary("md", mdRenderer);

   // Sort sections based on their order-value
   eleventyConfig.addCollection("sections", function (collectionApi) {
      return collectionApi.getAll().sort(function (a, b) {
         return a.data.order - b.data.order;
      });
   });

   // Universal slug filter strips unsafe chars from URLs
   eleventyConfig.addFilter("slugify", function (str) {
      return slugify(str, {
         lower: true,
         replacement: "-",
         remove: /[*+~.·,()'"`´%!?¿:@]/g,
      });
   });

   eleventyConfig.addWatchTarget("./**/*.(js|css)");

   eleventyConfig.addPassthroughCopy("img");
   eleventyConfig.addPassthroughCopy("manifest.json");
   eleventyConfig.addPassthroughCopy("favicon.svg");
   eleventyConfig.addPassthroughCopy("css");
   eleventyConfig.addPassthroughCopy("js");
   eleventyConfig.addPassthroughCopy("admin");
};
