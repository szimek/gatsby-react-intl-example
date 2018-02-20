import React from 'react';
import Helmet from 'react-helmet';
import { FormattedDate, FormattedMessage, injectIntl } from 'react-intl';
import Link from 'gatsby-link';

function IndexPage({ data, intl }) {
  const { posts } = data;

  const renderedPosts = posts.edges.map(({ node: post }) => (
    <Link to={`/${post.frontmatter.locale}/${post.frontmatter.slug}`}>
      {post.frontmatter.title}
    </Link>
  ));

  return (
    <div className="blog-post-container">
      <Helmet>
        <title>{intl.formatMessage({ id: 'INDEX_PAGE.TITLE' })}</title>
      </Helmet>

      {renderedPosts}
    </div>
  );
}

export default injectIntl(IndexPage);

export const pageQuery = graphql`
  query PostsQuery($locale: String!) {
    posts: allMarkdownRemark(
        filter: { frontmatter: { locale: { eq: $locale } } }
    ) {
      edges {
        node {
          frontmatter {
            slug
            title
            locale
          }
        }
      }
    }
  }
`;
