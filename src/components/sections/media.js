import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledMediaSection = styled.section`
  max-width: 900px;

  .inner {
    display: flex;
    flex-direction: column;
  }

  header {
    margin-bottom: 50px;

    h2 {
      font-size: clamp(24px, 5vw, var(--fz-heading));
      margin-bottom: 10px;
    }

    p {
      margin: 0;
      color: var(--light-slate);
      font-size: var(--fz-lg);
    }
  }

  .media-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .media-item {
    position: relative;
    padding-left: 30px;
    margin-bottom: 50px;

    &:before {
      content: '▹';
      position: absolute;
      left: 0;
      color: var(--green);
      font-size: var(--fz-sm);
      line-height: 18px;
    }

    h3 {
      font-weight: 500;
      font-size: var(--fz-xl);
      margin-bottom: 10px;
      color: var(--lightest-slate);

      .outlet {
        color: var(--green);

        &:hover,
        &:focus {
          outline: 0;
        }
      }

      a {
        text-decoration: none;
        color: inherit;

        &:hover,
        &:focus {
          color: var(--green);
        }
      }
    }

    .media-details {
      margin-bottom: 25px;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
    }

    .media-description {
      color: var(--light-slate);
      font-size: var(--fz-sm);

      ul {
        ${({ theme }) => theme.mixins.fancyList};
      }
    }
  }
`;

const Media = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const mediaData = [
    {
      title: 'Media Appearances',
      outlet: 'Coming Soon',
      type: '',
      date: '',
      url: '',
      description: [
        'Media appearances, interviews, and press coverage will be featured here.',
        'This section will include podcast appearances, news interviews, and published articles.',
      ],
    },
  ];

  return (
    <StyledMediaSection id="media" ref={revealContainer}>
      <h2 className="numbered-heading">Media</h2>

      <div className="inner">
        <ul className="media-list">
          {mediaData.map(({ title, outlet, type, date, url, description }, i) => (
            <li key={i} className="media-item">
              <h3>
                {url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    <span>{title}</span>
                  </a>
                ) : (
                  <span>{title}</span>
                )}
                {outlet && (
                  <>
                    {' '}
                    <span className="outlet">@ {outlet}</span>
                  </>
                )}
              </h3>

              {(type || date) && (
                <p className="media-details">
                  {date} {type && `• ${type}`}
                </p>
              )}

              <div className="media-description">
                <ul>
                  {description.map((desc, idx) => (
                    <li key={idx}>{desc}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </StyledMediaSection>
  );
};

export default Media;
