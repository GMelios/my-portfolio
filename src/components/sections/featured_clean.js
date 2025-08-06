import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
`;

const StyledProject = styled.li`
  position: relative;
  margin-bottom: 40px;
  padding: 30px 0;
  border-bottom: 1px solid var(--light-navy);

  &:last-of-type {
    border-bottom: none;
  }

  .publication-header {
    display: flex;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 15px;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 10px;
    }
  }

  .publication-badge {
    background: var(--green);
    color: var(--navy);
    padding: 6px 12px;
    border-radius: 4px;
    font-size: var(--fz-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    flex-shrink: 0;
  }

  .publication-title {
    color: var(--lightest-slate);
    font-size: clamp(18px, 3vw, 24px);
    font-weight: 600;
    line-height: 1.3;
    margin: 0 0 10px 0;

    a {
      color: inherit;
      text-decoration: none;

      &:hover {
        color: var(--green);
      }
    }
  }

  .publication-authors {
    color: var(--slate);
    font-size: var(--fz-lg);
    margin-bottom: 8px;

    .author-name {
      text-decoration: underline;
    }
  }

  .publication-journal {
    color: var(--light-slate);
    font-style: italic;
    font-size: var(--fz-md);
    margin-bottom: 15px;
  }

  .publication-links {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;

    a {
      padding: 8px 16px;
      border: 1px solid var(--green);
      color: var(--green);
      text-decoration: none;
      font-size: var(--fz-xs);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-radius: 4px;
      transition: all 0.3s ease;

      &:hover {
        background: var(--green);
        color: var(--navy);
      }
    }
  }

  .publication-description {
    color: var(--light-slate);
    font-size: var(--fz-md);
    line-height: 1.5;
    margin-top: 15px;
  }
`;

const Featured = () => {
  const data = useStaticQuery(graphql`
    {
      featured: allMarkdownRemark(
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
            }
            html
          }
        }
      }
    }
  `);

  const featuredProjects = data.featured.edges.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const revealProjects = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealProjects.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <section id="featured">
      <h2 className="numbered-heading" ref={revealTitle}>
        Recent Publications
      </h2>

      <StyledProjectsGrid>
        {featuredProjects &&
          featuredProjects.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, github, cta } = frontmatter;

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="publication-header">
                  <div className="publication-badge">AJPS</div>
                </div>

                <h3 className="publication-title">
                  <a href={external || cta || '#'}>{title}</a>
                </h3>

                <div className="publication-authors">
                  Mathilde Emeriau, <span className="author-name">Jens Hainmueller</span>, Dominik
                  Hangartner, and David Laitin
                </div>

                <div className="publication-journal">
                  American Journal of Political Science, 2025
                </div>

                <div className="publication-links">
                  {cta && <a href={cta}>DOI</a>}
                  <a href="#bib">BIB</a>
                  <a href="#html">HTML</a>
                  <a href="#pdf">PDF</a>
                  {github && <a href={github}>GitHub</a>}
                </div>

                {html && (
                  <div
                    className="publication-description"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                )}
              </StyledProject>
            );
          })}
      </StyledProjectsGrid>
    </section>
  );
};

export default Featured;
