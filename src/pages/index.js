import * as React from "react"
import { Link, graphql } from "gatsby"
import styled from 'styled-components';

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const Test = styled.article`
  text-align: center;
  padding: 12px;
  box-shadow: 0 6px 12px #dbd9d3;
`;
const BlogLists = styled.ol`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 759px) {
    justify-content: space-around;
  }
`;
const BlogList = styled.li`
  width: 240px;
`;

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title || `Main Title`
  
  const posts = data.allMarkdownRemark.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <Bio />
      <BlogLists style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <BlogList key={post.fields.slug}>
              <Test
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </Test>
            </BlogList>
          )
        })}
      </BlogLists>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
