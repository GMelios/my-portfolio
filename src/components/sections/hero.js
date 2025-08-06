import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { email } from '@config';
import RotatingText from '../RotatingText';
import ProfileCard from '../ProfileCard';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: row;
  align-items: center;
  min-height: 100vh;
  height: 100vh;
  padding: 0;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 0 60px;

  @media (max-width: 1400px) {
    max-width: 1100px;
    gap: 50px;
    padding: 0 20px 0 50px;
  }

  @media (max-width: 1200px) {
    max-width: 1000px;
    gap: 40px;
    padding: 0 20px 0 40px;
  }

  @media (max-width: 1080px) {
    gap: 30px;
    padding: 0 20px 0 30px;
  }

  @media (max-width: 900px) {
    gap: 20px;
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 30px;
    max-width: none;
    padding: 0 20px;
  }

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  .main-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    min-height: 60vh;

    @media (max-width: 768px) {
      min-height: auto;
    }
  }

  .profile-card-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    @media (max-width: 768px) {
      height: auto;
      justify-content: flex-start;
    }
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 1.3;
    max-width: 100%;

    @media (max-width: 768px) {
      max-width: 90vw;
      line-height: 1.4;
    }

    @media (max-width: 480px) {
      max-width: 95vw;
      line-height: 1.5;
    }
  }

  .medium-heading {
    font-size: clamp(18px, 4vw, 36px);
    font-weight: 600;
    color: var(--slate);
    margin: 10px 0;
    line-height: inherit;

    @media (max-width: 768px) {
      font-size: clamp(16px, 5vw, 28px);
    }

    @media (max-width: 480px) {
      font-size: clamp(14px, 6vw, 22px);
    }
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">George Melios.</h2>;
  const three = (
    <h3 className="medium-heading">
      I use causal inference to study
      <p style={{ margin: '5px 0 0 0' }}>
        <RotatingText />
      </p>
    </h3>
  );
  const four = (
    <>
      <p>
        I'm an applied economist specializing in political economy and behavioral economics.
        Currently, I'm a researcher at the{' '}
        <a href="https://www.lse.ac.uk/PBS" target="_blank" rel="noreferrer">
          London School of Economics
        </a>
        , focusing on democratic institutions and citizen participation.
      </p>
    </>
  );
  const five = (
    <a className="email-link" href={`mailto:${email}`} target="_blank" rel="noreferrer">
      Get In Touch
    </a>
  );

  const items = [one, two, three, four, five];

  return (
    <StyledHeroSection>
      <div className="profile-card-container">
        <ProfileCard />
      </div>

      <div className="main-content">
        {prefersReducedMotion ? (
          <>
            {items.map((item, i) => (
              <div key={i}>{item}</div>
            ))}
          </>
        ) : (
          <TransitionGroup component={null}>
            {isMounted &&
              items.map((item, i) => (
                <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                  <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
                </CSSTransition>
              ))}
          </TransitionGroup>
        )}
      </div>
    </StyledHeroSection>
  );
};

export default Hero;
