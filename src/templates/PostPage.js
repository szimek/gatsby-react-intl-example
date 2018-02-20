import React from "react";
import Helmet from "react-helmet";

export default function PostPage({
  data, // this prop will be injected by the GraphQL query we'll write in a bit
}) {
  const { post } = data; // data.markdownRemark holds our post data
  return (
    <div className="blog-post-container">
      <Helmet title={`Your Blog Name - ${post.frontmatter.title}`} />
      <div className="blog-post">
        <h1>{post.frontmatter.title}</h1>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
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
      }
    }
  }
`;
