const siteMetadata = require(`./user-config`)
const capitalize = require(`remark-capitalize`)
const emoji = require(`remark-emoji`)

module.exports = {
  pathPrefix: "/village-site",
  siteMetadata,
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-glslify`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `village site`,
        short_name: `village`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `standalone`,
        icon: `src/images/village.svg`,
        cache_busting_mode: "none",
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        // precachePages: [`/*`, `/blog/*`],
        // appendScript: require.resolve(`${__dirname}/custom-sw-code.js`),
        workboxConfig: {
          importWorkboxFrom: `local`,
          globPatterns: ["**/static/*"],
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    // {
    //   resolve: "gatsby-plugin-page-creator",
    //   options: {
    //     path: `${__dirname}/src/pages/posts/`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          default: require.resolve(
            `${__dirname}/src/components/md/default-page-layout.js`
          ),
        },
        // shouldBlockNodeFromTransformation(node) {
        //   return (
        //     [`NPMPackage`, `NPMPackageReadme`].includes(node.internal.type) ||
        //     (node.internal.type === `File` &&
        //       path.parse(node.dir).dir.endsWith(`packages`))
        //   )
        // },
        remarkPlugins: [capitalize, emoji],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-plugin-image`,
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true,
            },
          },
          // {
          //   resolve: `gatsby-remark-prismjs`,
          //   options: {
          //     classPrefix: "language-",
          //     inlineCodeMarker: null,
          //     aliases: {
          //       sh: "bash",
          //     },
          //     showLineNumbers: false,
          //     noInlineHighlight: false,
          //     languageExtensions: [
          //       {
          //         language: "superscript",
          //         extend: "javascript",
          //         definition: {
          //           superscript_types: /(SuperType)/,
          //         },
          //         insertBefore: {
          //           function: {
          //             superscript_keywords: /(superif|superelse)/,
          //           },
          //         },
          //       },
          //     ],
          //     prompt: {
          //       user: "root",
          //       host: "localhost",
          //       global: false,
          //     },
          //     escapeEntities: {},
          //   },
          // },
        ],
      },
    },
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        /**
         * @property {boolean} [isResettingCSS=true]
         * if false, this plugin will not use `<CSSReset />
         */
        isResettingCSS: true,
        /**
         * @property {boolean} [isUsingColorMode=true]
         * if false, this plugin will not use <ColorModeProvider />
         */
        isUsingColorMode: true,
      },
    },
    // {
    //   resolve: "gatsby-plugin-web-vitals",
    //   options: {
    //     // The Google Analytics property ID; the reporting code won't be generated without it
    //     trackingId: process.env.GA_TRACKING_ID,
    //     // An array with metrics you want to track and send to analytics
    //     metrics: [`FID`, `TTFB`, `LCP`, `CLS`, `FCP`],
    //     // Event Category (optional) { string }, default 'Web Vitals'
    //     eventCategory: "Performance",
    //     // Include Web Vitals tracking in development
    //     // Defaults to false meaning Vitals will only be tracked in production.
    //     includeInDevelopment: false,
    //     // Prints metrics in the console when true
    //     debug: false,
    //   },
    // },
  ],
}
