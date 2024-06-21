require('dotenv').config(); // Make env variables available in 11ty global data
const { DateTime } = require('luxon');
const { EleventyHtmlBasePlugin } = require("@11ty/eleventy");
const pluginBundle = require("@11ty/eleventy-plugin-bundle");

module.exports = function(eleventyConfig) {
    // Copy the contents of the `public` folder to the output folder
    // For example, `./public/css/` ends up in `_site/css/`
    eleventyConfig.addPassthroughCopy({
        "./public/": "/",
    });

    // Plugins
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(pluginBundle);

    // Format dates from EventBrite API
    eleventyConfig.addFilter('humanizeDate', (dateObj) => {
        return DateTime.fromISO(dateObj).toLocaleString(DateTime.DATE_FULL); // October, 13, 2023
    });

    // Format times from EventBrite API
    eleventyConfig.addFilter('humanizeStartTime', (dateObj) => {
        return DateTime.fromISO(dateObj).toLocaleString(DateTime.TIME_SIMPLE); // 6:23 AM
    });

    eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

    return {
        // Control which files Eleventy will process
        // e.g.: *.md, *.njk, *.html, *.liquid
        templateFormats: [
            "md",
            "njk",
            "html",
            "liquid",
        ],

        // Pre-process *.md files with: (default: `liquid`)
        markdownTemplateEngine: "njk",

        // Pre-process *.html files with: (default: `liquid`)
        htmlTemplateEngine: "njk",

        // -----------------------------------------------------------------
        // Optional items:
        // -----------------------------------------------------------------

        // If your site deploys to a subdirectory, change `pathPrefix`.
        // Read more: https://www.11ty.dev/docs/config/#deploy-to-a-subdirectory-with-a-path-prefix

        // When paired with the HTML <base> plugin https://www.11ty.dev/docs/plugins/html-base/
        // it will transform any absolute URLs in your HTML to include this
        // folder name and does **not** affect where things go in the output folder.
        pathPrefix: "/",
    };
};
