import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledExperienceSection = styled.section`
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

  .experience-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .experience-item {
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

      .company {
        color: var(--green);

        &:hover,
        &:focus {
          outline: 0;
        }
      }
    }

    .experience-details {
      margin-bottom: 25px;
      color: var(--light-slate);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
    }

    .experience-description {
      color: var(--light-slate);
      font-size: var(--fz-sm);

      ul {
        ${({ theme }) => theme.mixins.fancyList};
      }
    }
  }
`;

const Experience = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const experienceData = [
    {
      title: 'Professional Experience',
      company: 'Coming Soon',
      location: '',
      range: '',
      description: [
        'Professional experience section will be populated with industry positions and consulting work.',
      ],
    },
  ];

  return (
    <StyledExperienceSection id="experience" ref={revealContainer}>
      <h2 className="numbered-heading">Experience</h2>

      <div className="inner">
        <ul className="experience-list">
          {experienceData.map(({ title, company, location, range, description }, i) => (
            <li key={i} className="experience-item">
              <h3>
                <span>{title}</span>
                {company && (
                  <>
                    {' '}
                    <span className="company">@ {company}</span>
                  </>
                )}
              </h3>

              {(location || range) && (
                <p className="experience-details">
                  {range} {location && `• ${location}`}
                </p>
              )}

              <div className="experience-description">
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
    </StyledExperienceSection>
  );
};

export default Experience;
