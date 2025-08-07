import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Layout, Head } from '@components';

const StyledWorkingPaperPage = styled.main`
  max-width: 900px;
  margin: 0 auto;
  padding: 100px 50px 50px;

  @media (max-width: 768px) {
    padding: 100px 25px 50px;
  }

  .back-link {
    color: var(--green);
    text-decoration: none;
    font-size: var(--fz-sm);
    font-family: var(--font-mono);
    margin-bottom: 30px;
    display: inline-block;

    &:hover {
      text-decoration: underline;
    }
  }

  .publication-header {
    margin-bottom: 40px;
  }

  .publication-title {
    font-size: clamp(28px, 5vw, 48px);
    font-weight: 700;
    color: var(--lightest-slate);
    margin: 0 0 20px 0;
    line-height: 1.1;
  }

  .publication-authors {
    font-size: var(--fz-xl);
    color: var(--slate);
    margin-bottom: 15px;
    line-height: 1.3;

    .author-name {
      text-decoration: underline;
      font-weight: 600;
    }
  }

  .publication-meta {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 30px;

    .meta-item {
      display: flex;
      align-items: center;
      font-size: var(--fz-lg);
      color: var(--light-slate);

      .label {
        font-weight: 600;
        margin-right: 10px;
        min-width: 80px;
        color: var(--green);
      }

      .value {
        color: var(--lightest-slate);
        font-style: italic;
        font-weight: 600;
      }
    }
  }

  .publication-actions {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
    margin-bottom: 40px;
    padding: 20px 0;
    border-top: 1px solid var(--light-navy);
    border-bottom: 1px solid var(--light-navy);

    a,
    button {
      padding: 12px 20px;
      border: 1px solid var(--green);
      color: var(--green);
      background: transparent;
      text-decoration: none;
      font-size: var(--fz-sm);
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-radius: 4px;
      transition: all 0.3s ease;
      cursor: pointer;
      font-family: inherit;

      &:hover:not(:disabled) {
        background: var(--green);
        color: var(--navy);
        transform: translateY(-2px);
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  .publication-abstract {
    .section-title {
      font-size: var(--fz-xxl);
      font-weight: 600;
      color: var(--lightest-slate);
      margin: 0 0 20px 0;
    }

    .abstract-content {
      font-size: var(--fz-lg);
      line-height: 1.6;
      color: var(--light-slate);

      p {
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
`;

const WorkingPaperTemplate = ({ data, location }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const { title, authors, journal, year, cta, bib, code, github, external } = frontmatter;

  return (
    <Layout location={location}>
      <Head title={title} />
      <StyledWorkingPaperPage>
        <a href="/#working-papers" className="back-link">
          ← Back to Working Papers
        </a>

        <div className="publication-header">
          <h1 className="publication-title">{title}</h1>

          <div className="publication-authors">
            {(authors || 'Bouke Klein Teeselink, George Melios').split(', ').map((author, idx) => (
              <span key={idx}>
                {author.includes('George Melios') ? (
                  <span className="author-name">{author}</span>
                ) : (
                  author
                )}
                {idx < (authors || 'Bouke Klein Teeselink, George Melios').split(', ').length - 1 &&
                  ', '}
              </span>
            ))}
          </div>

          <div className="publication-meta">
            <div className="meta-item">
              <span className="label">Type:</span>
              <span className="value">Working paper</span>
            </div>
            <div className="meta-item">
              <span className="label">Status:</span>
              <span className="value">
                {journal && year ? `${journal}, ${year}` : 'Working Paper'}
              </span>
            </div>
          </div>
        </div>

        <div className="publication-actions">
          {external && (
            <a href={external} target="_blank" rel="noopener noreferrer">
              Paper
            </a>
          )}
          {cta && (
            <a href={cta} target="_blank" rel="noopener noreferrer">
              DOI
            </a>
          )}
          {bib ? (
            <a href={bib} target="_blank" rel="noopener noreferrer">
              Cite
            </a>
          ) : (
            <button disabled>Cite</button>
          )}
          {code ? (
            <a href={code} target="_blank" rel="noopener noreferrer">
              Code
            </a>
          ) : (
            <button disabled>Code</button>
          )}
          <button disabled>Dataset</button>
          {github && (
            <a href={github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          )}
        </div>

        {html && (
          <div className="publication-abstract">
            <h2 className="section-title">Abstract</h2>
            <div className="abstract-content" dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        )}
      </StyledWorkingPaperPage>
    </Layout>
  );
};

WorkingPaperTemplate.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      html: PropTypes.string,
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        authors: PropTypes.string,
        journal: PropTypes.string,
        year: PropTypes.string,
        cta: PropTypes.string,
        bib: PropTypes.string,
        code: PropTypes.string,
        github: PropTypes.string,
        external: PropTypes.string,
        slug: PropTypes.string,
      }),
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
};

export default WorkingPaperTemplate;

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        authors
        journal
        year
        cta
        bib
        code
        github
        external
        slug
      }
    }
  }
`;
