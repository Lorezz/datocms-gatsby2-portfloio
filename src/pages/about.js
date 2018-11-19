import React from "react";
// import Link from 'gatsby-link'
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from "gatsby-image";
import { graphql } from "gatsby";
import Layout from "../components/layout";

const About = ({ data }) => (
  <Layout data={data}>
    <article className="sheet">
      <HelmetDatoCms seo={data.about.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.about.title}</h1>
        <p className="sheet__lead">{data.about.subtitle}</p>
        <div className="sheet__gallery">
          <Img sizes={data.about.photo.sizes} />
        </div>
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: data.about.bioNode.childMarkdownRemark.html
          }}
        />
      </div>
    </article>
  </Layout>
);

export default About;

export const query = graphql`
  query AboutQuery {
    datoCmsSite {
      globalSeo {
        siteName
      }
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    datoCmsHome {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      introTextNode {
        childMarkdownRemark {
          html
        }
      }
      copyright
    }
    allDatoCmsSocialProfile(sort: { fields: [position], order: ASC }) {
      edges {
        node {
          profileType
          url
        }
      }
    }
    about: datoCmsAboutPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      subtitle
      photo {
        sizes(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
      bioNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;
