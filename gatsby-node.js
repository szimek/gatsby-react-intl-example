const path = require('path');

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
