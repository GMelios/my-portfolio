import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledResearchList = styled.div`
  margin-bottom: 60px;

  .section-title {
    font-size: var(--fz-heading);
    color: var(--lightest-slate);
    margin: 0 0 30px 0;
    font-weight: 700;

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background: var(--lightest-navy);
      margin-top: 10px;
    }
  }

  .paper-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .paper-item {
    padding: 18px 0;
    border-bottom: 1px solid var(--light-navy);

    &:last-of-type {
      border-bottom: none;
    }
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

    .paper-title-text {
      color: var(--lightest-slate);
      font-weight: 500;
    }

    .journal-name {
      font-weight: 700;
      color: var(--dark-slate);
    }

    .paper-status {
      font-style: italic;
      color: var(--slate);
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

  .paper-media {
    margin-top: 8px;
    font-size: var(--fz-sm);
    color: var(--slate);

    strong {
      color: var(--dark-slate);
    }

    a {
      color: var(--green);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  /* WIP items are simpler */
  .wip-item {
    padding: 12px 0;
    border-bottom: 1px solid var(--light-navy);

    &:last-of-type {
      border-bottom: none;
    }
  }

  .wip-citation {
    font-size: var(--fz-lg);
    line-height: 1.6;
    color: var(--dark-slate);
    margin: 0;
    font-style: italic;
  }
`;

const formatAuthors = (authors, highlightName = 'George Melios') => {
  if (!authors) {return null;}
  return authors.split(', ').map((author, idx, arr) => (
    <span key={idx}>
      {author.includes(highlightName) ? <span className="author-self">{author}</span> : author}
      {idx < arr.length - 1 && ', '}
    </span>
  ));
};

const ResearchList = ({ title, papers, type = 'publication' }) => {
  const [abstractVisible, setAbstractVisible] = useState({});

  const toggleAbstract = index => {
    setAbstractVisible(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (type === 'wip') {
    return (
      <StyledResearchList>
        <h2 className="section-title">{title}</h2>
        <ul className="paper-list">
          {papers.map((paper, i) => (
            <li className="wip-item" key={i}>
              <p className="wip-citation">
                {paper.title}
                {paper.authors && <span style={{ fontStyle: 'normal' }}> — {paper.authors}</span>}
              </p>
            </li>
          ))}
        </ul>
      </StyledResearchList>
    );
  }

  return (
    <StyledResearchList>
      <h2 className="section-title">{title}</h2>
      <ul className="paper-list">
        {papers.map(({ node }, i) => {
          const { frontmatter, html } = node;
          const { title, authors, journal, year, cta, external, pdf, bib, code, github, slug } =
            frontmatter;

          const paperUrl = slug
            ? type === 'working-paper'
              ? `/working-papers/${slug}`
              : `/publications/${slug}`
            : external || cta || null;

          // Parse journal for status display
          const isRnR = journal && journal.startsWith('R & R');
          const isWorkingPaper = journal === 'Working Paper';

          return (
            <li className="paper-item" key={i}>
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
                  <span className="paper-title-text">{title}</span>
                )}
                {year && ` (${year})`}
                {isRnR ? (
                  <>
                    , <span className="paper-status">{journal}</span>
                  </>
                ) : (
                  journal &&
                  !isWorkingPaper && (
                    <>
                      , <span className="journal-name">{journal}</span>
                    </>
                  )
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
            </li>
          );
        })}
      </ul>
    </StyledResearchList>
  );
};

ResearchList.propTypes = {
  title: PropTypes.string.isRequired,
  papers: PropTypes.array.isRequired,
  type: PropTypes.string,
};

export default ResearchList;
