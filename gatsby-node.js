const path = require('path');
const _ = require('lodash');

exports.createPages = async ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;

  const { data: { posts } } = await graphql(`{
    posts: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            date
            slug
            title
            locale
          }
        }
      }
    }
  }`);

  // Render index page for each locale
  _(posts.edges).groupBy('node.frontmatter.locale').forOwn((postsInLocale, locale) => {
    createPage({
      path: `/${locale}`,
      component: path.resolve(`src/templates/IndexPage.js`),
      layout: locale,
      context: {
        locale,
      },
    })
  })

  // Render all posts
  posts.edges.forEach(({ node }) => {
    const { locale, slug } = node.frontmatter;

    createPage({
      path: `/${locale}/${slug}`,
      component: path.resolve(`src/templates/PostPage.js`),
      layout: locale,
      context: {
        locale,
        slug,
      },
    });
  });
}
