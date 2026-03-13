import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Layout } from '@components';
import ResearchList from '../components/sections/research-list';

const StyledResearchPage = styled.main`
  padding: 200px 150px;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 1080px) {
    padding: 200px 100px;
  }

  @media (max-width: 768px) {
    padding: 150px 50px;
  }

  @media (max-width: 480px) {
    padding: 125px 25px;
  }

  .page-heading {
    font-size: clamp(32px, 5vw, 48px);
    color: var(--lightest-slate);
    margin: 0 0 10px 0;
  }

  .page-subtitle {
    font-size: var(--fz-lg);
    color: var(--slate);
    margin: 0 0 60px 0;
    line-height: 1.5;
    max-width: 600px;
  }
`;

const ResearchPage = ({ location, data }) => {
  const publications = data.publications.edges;
  const workingPapers = data.workingPapers.edges;

  const wipItems = [
    {
      title: 'Choices, Preferences, and Character: A Framework for Endogenous Preference Formation',
      authors: 'with B. Klein Teeselink',
    },
    {
      title: 'Moral foundations, political role models and policy preferences',
      authors: null,
    },
  ];

  return (
    <Layout location={location}>
      <StyledResearchPage>
        <h1 className="page-heading">Research</h1>
        <p className="page-subtitle">
          My research focuses on political economy, public policy, and behavioural science.
        </p>

        <ResearchList title="Publications" papers={publications} type="publication" />
        <ResearchList title="Working Papers" papers={workingPapers} type="working-paper" />
        <ResearchList title="Work in Progress" papers={wipItems} type="wip" />
      </StyledResearchPage>
    </Layout>
  );
};

ResearchPage.propTypes = {
  location: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default ResearchPage;

export const pageQuery = graphql`
  {
    publications: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/featured/" } }
      sort: { fields: [frontmatter___date], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            tech
            github
            external
            cta
            slug
            authors
            journal
            year
            badge
            bib
            code
            pdf
          }
          html
        }
      }
    }
    workingPapers: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/working-papers/" } }
      sort: { fields: [frontmatter___date], order: ASC }
    ) {
      edges {
        node {
          frontmatter {
            title
            tech
            github
            external
            cta
            slug
            authors
            journal
            year
            badge
            bib
            code
            pdf
          }
          html
        }
      }
    }
  }
`;
