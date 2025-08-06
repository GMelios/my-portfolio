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
  grid-template-columns: 1fr 2.2fr;
  gap: 80px;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 20px 0 60px;

  @media (max-width: 1400px) {
    max-width: 1200px;
    gap: 70px;
    padding: 0 20px 0 50px;
  }

  @media (max-width: 1200px) {
    max-width: 1100px;
    gap: 60px;
    padding: 0 20px 0 40px;
  }

  @media (max-width: 1080px) {
    gap: 50px;
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
    width: 100%;
    max-width: 100%;

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
    margin: 0 0 10px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 8px 2px;
    }
  }

  h3 {
    margin: 0 0 10px 0;
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
    max-width: 100%;
    line-height: 1.7;
    font-size: var(--fz-lg);

    @media (max-width: 768px) {
      max-width: 90vw;
      font-size: var(--fz-md);
    }
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }

  .hero-buttons {
    display: flex;
    gap: 20px;
    margin-top: 50px;

    @media (max-width: 480px) {
      flex-direction: column;
      gap: 15px;
    }

    .email-link {
      margin-top: 0;
    }
  }

  .skills-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0px 10px;
    padding: 0;
    margin: 20px 0 0 0;
    overflow: hidden;
    list-style: none;

    li {
      position: relative;
      margin-bottom: 10px;
      padding-left: 20px;
      font-family: var(--font-mono);
      font-size: var(--fz-xs);

      &:before {
        content: '▹';
        position: absolute;
        left: 0;
        color: var(--green);
        font-size: var(--fz-sm);
        line-height: 12px;
      }
    }
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

  const one = (
    <h1>
      <span style={{ color: 'var(--slate)' }}>Hi, my name is</span>
    </h1>
  );
  const two = (
    <h1>
      <span
        className="medium-heading"
        style={{ color: 'var(--green)', fontFamily: 'var(--font-sans)', marginBottom: '0px' }}>
        George Melios.
      </span>
    </h1>
  );
  const three = (
    <h3 className="medium-heading" style={{ marginTop: '0px' }}>
      I use causal inference to study <RotatingText />
    </h3>
  );
  const four = (
    <>
      <p>
        Currently, I'm a researcher at the{' '}
        <a href="https://www.lse.ac.uk/PBS" target="_blank" rel="noreferrer">
          London School of Economics
        </a>
        , working on political economy and behavioural science issues. My research primarily focuses
        on the foundations of democracy: how democratic institutions function, how citizens interact
        with them and how they can be improved. I look at the electoral cycle through four essential
        angles: i) the factors that affect citizens' participation, ii) those that shape their
        preferences, iii) the effect of elections on policies and welfare, and iv) collective
        decision making when institutions fail.
      </p>
    </>
  );
  const five = (
    <div className="hero-buttons">
      <a className="email-link" href={`mailto:${email}`} target="_blank" rel="noreferrer">
        Get In Touch
      </a>
      <a
        className="email-link"
        href="https://georgemelios.com/1961"
        target="_blank"
        rel="noreferrer">
        Job Market Paper
      </a>
    </div>
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
