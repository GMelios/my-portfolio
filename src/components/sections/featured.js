import React, { useEffect, useRef, useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';

const StyledFeaturedSection = styled.section`
  .view-all {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    color: var(--green);
    margin-top: 20px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    &::after {
      content: ' →';
    }
  }
`;

const StyledPaperList = styled.ul`
  ${({ theme }) => theme.mixins.resetList};
`;

const StyledPaper = styled.li`
  padding: 18px 0;
  border-bottom: 1px solid var(--light-navy);

  &:last-of-type {
    border-bottom: none;
  }

  .paper-citation {
    font-size: var(--fz-lg);
    line-height: 1.6;
    color: var(--dark-slate);
    margin: 0 0 8px 0;

    .author-self {
      text-decoration: underline;
    }

    .paper-title-link {
      color: var(--lightest-slate);
      text-decoration: none;
      font-weight: 500;

      &:hover {
        color: var(--green);
      }
    }

    .journal-name {
      font-weight: 700;
      color: var(--dark-slate);
    }
  }

  .paper-links {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 8px;

    button,
    a {
      padding: 4px 12px;
      border: 1px solid var(--green);
      color: var(--green);
      text-decoration: none;
      font-size: var(--fz-xxs);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border-radius: 3px;
      transition: all 0.2s ease;
      background: transparent;
      cursor: pointer;
      font-family: inherit;

      &:hover,
      &.active {
        background: var(--green);
        color: var(--navy);
      }

      &:disabled {
        opacity: 0.3;
        cursor: default;
        &:hover {
          background: transparent;
          color: var(--green);
        }
      }
    }
  }

  .paper-abstract {
    color: var(--light-slate);
    font-size: var(--fz-md);
    line-height: 1.6;
    margin-top: 12px;
    padding: 16px 20px;
    background: var(--light-navy);
    border-radius: 4px;
    border-left: 3px solid var(--green);
  }
`;

const Featured = () => {
  const [abstractVisible, setAbstractVisible] = useState({});

  const toggleAbstract = index => {
    setAbstractVisible(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

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
  `);

  const publications = data.featured.edges.filter(({ node }) => node);
  const revealTitle = useRef(null);
  const revealPapers = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealTitle.current, srConfig());
    revealPapers.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  const formatAuthors = authors => {
    if (!authors) {return null;}
    return authors.split(', ').map((author, idx, arr) => (
      <span key={idx}>
        {author.includes('George Melios') ? <span className="author-self">{author}</span> : author}
        {idx < arr.length - 1 && ', '}
      </span>
    ));
  };

  return (
    <StyledFeaturedSection id="featured">
      <h2 className="numbered-heading" ref={revealTitle}>
        Selected Publications
      </h2>

      <StyledPaperList>
        {publications.map(({ node }, i) => {
          const { frontmatter, html } = node;
          const { external, title, github, cta, slug, authors, journal, year, bib, code, pdf } =
            frontmatter;

          const paperUrl = slug ? `/publications/${slug}` : external || cta || null;

          return (
            <StyledPaper key={i} ref={el => (revealPapers.current[i] = el)}>
              <p className="paper-citation">
                {paperUrl ? (
                  <a
                    className="paper-title-link"
                    href={paperUrl}
                    target={paperUrl.startsWith('/') ? '_self' : '_blank'}
                    rel="noopener noreferrer">
                    {title}
                  </a>
                ) : (
                  <span style={{ color: 'var(--lightest-slate)', fontWeight: 500 }}>{title}</span>
                )}
                {year && ` (${year})`}
                {journal && (
                  <>
                    , <span className="journal-name">{journal}</span>
                  </>
                )}
                {authors && <> — ({formatAuthors(authors)})</>}
              </p>

              <div className="paper-links">
                {html && (
                  <button
                    onClick={() => toggleAbstract(i)}
                    className={abstractVisible[i] ? 'active' : ''}>
                    Abstract
                  </button>
                )}
                {cta && (
                  <a href={cta} target="_blank" rel="noopener noreferrer">
                    DOI
                  </a>
                )}
                {pdf && (
                  <a href={pdf} target="_blank" rel="noopener noreferrer">
                    PDF
                  </a>
                )}
                {bib && <a href={bib}>BIB</a>}
                {code && (
                  <a href={code} target="_blank" rel="noopener noreferrer">
                    Code
                  </a>
                )}
                {github && (
                  <a href={github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                )}
              </div>

              {abstractVisible[i] && html && (
                <div className="paper-abstract" dangerouslySetInnerHTML={{ __html: html }} />
              )}
            </StyledPaper>
          );
        })}
      </StyledPaperList>

      <Link className="view-all" to="/research">
        View all research
      </Link>
    </StyledFeaturedSection>
  );
};

export default Featured;
