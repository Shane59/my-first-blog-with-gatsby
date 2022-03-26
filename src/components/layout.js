import * as React from "react"
import { Link, graphql } from "gatsby"

const Layout = ({ data, location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  // const author = data.site.siteMetadata.author
  let header

  if (isRootPath) {
    header = (
      <h2 className="main-heading">
        <Link to="/">{title}</Link>
      </h2>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built by Shinya Aoi
        {` `}
      </footer>
    </div>
  )
}

export default Layout


export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        author {
          name
          summary
        }
      }
    }
  }
`
