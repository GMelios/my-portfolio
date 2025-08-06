import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledTeachingSection = styled.section`
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

  .teaching-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .teaching-item {
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

      .institution {
        color: var(--green);

        &:hover,
        &:focus {
          outline: 0;
        }
      }
    }

    .teaching-details {
      margin-bottom: 25px;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
    }

    .teaching-description {
      color: var(--light-slate);
      font-size: var(--fz-sm);

      ul {
        ${({ theme }) => theme.mixins.fancyList};
      }
    }
  }
`;

const Teaching = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const teachingData = [
    {
      course: 'Teaching Portfolio',
      institution: 'Coming Soon',
      level: '',
      range: '',
      description: [
        'Teaching experience and course information will be populated here.',
        'This section will include courses taught, teaching philosophy, and student feedback.',
      ],
    },
  ];

  return (
    <StyledTeachingSection id="teaching" ref={revealContainer}>
      <h2 className="numbered-heading">Teaching</h2>

      <div className="inner">
        <ul className="teaching-list">
          {teachingData.map(({ course, institution, level, range, description }, i) => (
            <li key={i} className="teaching-item">
              <h3>
                <span>{course}</span>
                {institution && (
                  <>
                    {' '}
                    <span className="institution">@ {institution}</span>
                  </>
                )}
              </h3>

              {(level || range) && (
                <p className="teaching-details">
                  {range} {level && `• ${level}`}
                </p>
              )}

              <div className="teaching-description">
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
    </StyledTeachingSection>
  );
};

export default Teaching;
