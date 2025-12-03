import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledConsultancySection = styled.section`
  max-width: 900px;

  .inner {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  p {
    color: var(--light-slate);
    font-size: var(--fz-lg);
    margin: 0;
  }
`;

const Consultancy = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, [prefersReducedMotion]);

  return (
    <StyledConsultancySection id="consultancy" ref={revealContainer}>
      <h2 className="numbered-heading">Consultancy</h2>

      <div className="inner">
        <p>
          George is the founder and CEO of Ethos Lab, a research and innovation consultancy that
          uses behavioural insights and advanced data analytics to improve policy outcomes and
          people's lives. Though this and other activities, he has provided specialist consulting
          and delivered workshops/talks to institutions across the public and private sectors.
        </p>
        <p>
          With his wealth of experience and expertise in evaluating public policies and behavioural
          science, George is able to work in a variety of contexts from policy evaluation, to
          corporate consultancy and report writing, to experiment design and digital design
          interventions.
        </p>
      </div>
    </StyledConsultancySection>
  );
};

export default Consultancy;
