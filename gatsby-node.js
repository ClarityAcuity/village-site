/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)

exports.createPages = async function({ actions, graphql }) {
  const { createPage } = actions
  const { data, errors } = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  if (errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  data.allMdx.edges.forEach(({ node }, index) => {
    createPage({
      path: `/blog/${node.slug}`,
      component: path.resolve(`./src/components/md/posts-layout.js`),
      // values in the context object are passed in as variables to page queries
      context: {
        id: node.id,
        slug: node.slug,
      },
    })
  })
}
