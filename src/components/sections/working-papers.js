import React, { useEffect, useRef, useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';

const StyledProjectsGrid = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
`;

const StyledProject = styled.li`
  position: relative;
  margin-bottom: 20px;
  padding: 15px 0;
  border-bottom: 1px solid var(--light-navy);

  &:last-of-type {
    border-bottom: none;
  }

  .publication-title-row {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }

  .publication-badge {
    background: #dc2626;
    color: white;
    padding: 4px 8px;
    border-radius: 3px;
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
    margin: 0;

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
    color: #394a43ff;
    font-style: italic;
    font-size: var(--fz-md);
    font-weight: bold;
    margin-bottom: 15px;
  }

  .publication-links {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;

    button,
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
      background: transparent;
      cursor: pointer;
      font-family: inherit;

      &:hover,
      &.active {
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
    padding: 20px;
    background: var(--light-navy);
    border-radius: 4px;
    border-left: 4px solid var(--green);
  }
`;

const WorkingPapers = () => {
  const [abstractVisible, setAbstractVisible] = useState({});

  const toggleAbstract = index => {
    setAbstractVisible(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const data = useStaticQuery(graphql`
    {
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
            }
            html
          }
        }
      }
    }
  `);

  const workingPapers = data.workingPapers.edges.filter(({ node }) => node);
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
    <section id="working-papers">
      <h2 className="numbered-heading" ref={revealTitle}>
        Working Papers
      </h2>

      <StyledProjectsGrid>
        {workingPapers &&
          workingPapers.map(({ node }, i) => {
            const { frontmatter, html } = node;
            const { external, title, github, cta, slug, authors, journal, year, badge, bib, code } =
              frontmatter;

            return (
              <StyledProject key={i} ref={el => (revealProjects.current[i] = el)}>
                <div className="publication-title-row">
                  {badge && <div className="publication-badge">{badge}</div>}
                  <h3 className="publication-title">
                    {slug ? (
                      <Link to={`/working-papers/${slug}`}>{title}</Link>
                    ) : (
                      <a href={external || cta || '#'}>{title}</a>
                    )}
                  </h3>
                </div>

                <div className="publication-authors">
                  {(authors || 'Bouke Klein Teeselink, George Melios')
                    .split(', ')
                    .map((author, idx) => (
                      <span key={idx}>
                        {author.includes('George Melios') ? (
                          <span className="author-name">{author}</span>
                        ) : (
                          author
                        )}
                        {idx <
                          (authors || 'Bouke Klein Teeselink, George Melios').split(', ').length -
                            1 && ', '}
                      </span>
                    ))}
                </div>

                <div className="publication-journal">
                  {journal && year ? `${journal}, ${year}` : 'Working Paper'}
                </div>

                <div className="publication-links">
                  {cta && <a href={cta}>PAPER</a>}
                  <button
                    onClick={() => toggleAbstract(i)}
                    className={abstractVisible[i] ? 'active' : ''}>
                    Abstract
                  </button>
                  {bib ? <a href={bib}>BIB</a> : <button disabled>BIB</button>}
                  {code ? <a href={code}>CODE</a> : <button disabled>CODE</button>}
                  <button disabled>PDF</button>
                  {github && <a href={github}>GitHub</a>}
                </div>

                {abstractVisible[i] && html && (
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

export default WorkingPapers;
