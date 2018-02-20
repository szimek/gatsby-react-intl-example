import React from "react";
import Helmet from "react-helmet";
import { FormattedDate, FormattedMessage } from "react-intl";
import Link from "gatsby-link";

export default function PostPage({
  data, // this prop will be injected by the GraphQL query we'll write in a bit
}) {
  const { post } = data; // data.markdownRemark holds our post data

  return (
    <div className="blog-post-container">
      <Helmet>
        <title>{`Your Blog Name - ${post.frontmatter.title}`}</title>
      </Helmet>

      <div className="blog-post">
        <h1>{post.frontmatter.title}</h1>
        <h3>
          <FormattedDate
            value={post.frontmatter.date}
            year='numeric'
            month='long'
            day='numeric'
            weekday='long'
          />
        </h3>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
      <div>
        <Link to={`/${post.frontmatter.locale}`}><FormattedMessage id="BACK" /></Link>
      </div>
    </div>
  );
}

export const pageQuery = graphql`
  query PostQuery($slug: String!, $locale: String!) {
    post: markdownRemark(frontmatter: { slug: { eq: $slug }, locale: { eq: $locale } }) {
      html
      frontmatter {
        date
        slug
        title
        locale
      }
    }
  }
`;
