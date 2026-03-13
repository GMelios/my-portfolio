import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import sr from '@utils/sr';
import { srConfig } from '@config';
import { usePrefersReducedMotion } from '@hooks';

const StyledWIPSection = styled.section`
  max-width: 900px;

  .wip-list {
    ${({ theme }) => theme.mixins.resetList};
  }

  .wip-item {
    padding: 12px 0;
    border-bottom: 1px solid var(--light-navy);

    &:last-of-type {
      border-bottom: none;
    }
  }

  .wip-title {
    color: var(--lightest-slate);
    font-size: var(--fz-lg);
    font-weight: 600;
    font-style: italic;
    margin: 0 0 4px 0;
    line-height: 1.4;
  }

  .wip-authors {
    color: var(--slate);
    font-size: var(--fz-md);
    margin: 0;
  }
`;

const workInProgressItems = [
  {
    title: 'Choices, Preferences, and Character: A Framework for Endogenous Preference Formation',
    authors: 'with B. Klein Teeselink',
  },
  {
    title: 'Moral foundations, political role models and policy preferences',
    authors: null,
  },
];

const WorkInProgress = () => {
  const revealTitle = useRef(null);
  const revealItems = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    sr.reveal(revealTitle.current, srConfig());
    revealItems.current.forEach((ref, i) => sr.reveal(ref, srConfig(i * 100)));
  }, []);

  return (
    <StyledWIPSection id="work-in-progress">
      <h2 className="numbered-heading" ref={revealTitle}>
        Work in Progress
      </h2>

      <ul className="wip-list">
        {workInProgressItems.map((item, i) => (
          <li className="wip-item" key={i} ref={el => (revealItems.current[i] = el)}>
            <p className="wip-title">{item.title}</p>
            {item.authors && <p className="wip-authors">{item.authors}</p>}
          </li>
        ))}
      </ul>
    </StyledWIPSection>
  );
};

export default WorkInProgress;
