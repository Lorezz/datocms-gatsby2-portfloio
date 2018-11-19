import React from "react";
import Slider from "react-slick";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Img from "gatsby-image";
import Layout from "../components/layout";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default ({ data }) => (
  <Layout data={data}>
    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsWork.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.datoCmsWork.title}</h1>
        <p className="sheet__lead">{data.datoCmsWork.excerpt}</p>
        {
          <div className="sheet__slider">
            <Slider infinite={true} slidesToShow={2} arrows>
              {data.datoCmsWork.gallery.map(item => {
                if (item.sizes != null)
                  return <Img key={item.url} sizes={item.sizes} />;
                else
                  return <img key={item.url} src={item.url} alt={item.url} />;
              })}
            </Slider>
          </div>
        }
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: data.datoCmsWork.descriptionNode.childMarkdownRemark.html
          }}
        />
        <div className="sheet__gallery">
          <Img sizes={data.datoCmsWork.coverImage.sizes} />
        </div>
      </div>
    </article>
  </Layout>
);

export const query = graphql`
  query WorkQuery($slug: String!) {
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
    datoCmsWork(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
      gallery {
        url
        sizes(maxWidth: 300, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
          src
        }
      }
      descriptionNode {
        childMarkdownRemark {
          html
        }
      }
      coverImage {
        url
        sizes(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`;
