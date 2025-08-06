import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';

const StyledProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: transparent;
  padding: 32px 28px;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    flex-direction: row;
    text-align: left;
    padding: 20px 24px;
  }

  .profile-image {
    width: 280px;
    height: 280px;
    border-radius: 50%;
    margin-bottom: 20px;
    flex-shrink: 0;
    object-fit: cover;
    object-position: center;

    @media (max-width: 768px) {
      margin-bottom: 0;
      margin-right: 30px;
      width: 90px;
      height: 90px;
    }
  }

  .profile-info {
    display: flex;
    flex-direction: column;
    min-width: 0;
    align-items: center;
    width: 280px;
    text-align: center;

    @media (max-width: 768px) {
      align-items: flex-start;
      text-align: left;
      width: 100%;
    }
  }

  .profile-name {
    font-size: var(--fz-xl);
    font-weight: 700;
    color: var(--lightest-slate);
    margin: 0 0 8px 0;
    line-height: 1.3;
    letter-spacing: -0.02em;
  }

  .profile-title {
    font-size: var(--fz-lg);
    color: var(--green);
    margin: 0 0 10px 0;
    line-height: 1.3;
    font-weight: 600;
  }

  .profile-affiliation {
    font-size: var(--fz-md);
    color: var(--light-slate);
    margin: 0;
    line-height: 1.4;
    text-align: center;
    font-weight: 500;

    @media (max-width: 768px) {
      text-align: left;
      font-size: var(--fz-sm);
    }
  }
`;

const ProfileCard = () => (
  <StyledProfileCard>
    <StaticImage
      className="profile-image"
      src="../images/me.jpg"
      width={560}
      height={560}
      quality={95}
      formats={['AUTO', 'WEBP', 'AVIF']}
      alt="George Melios"
      style={{
        borderRadius: '50%',
      }}
    />
    <div className="profile-info">
      <h4 className="profile-name">George Melios</h4>
      <p className="profile-title">Research Fellow</p>
      <p className="profile-affiliation">London School of Economics</p>
      <p className="profile-affiliation">Royal Holloway University of London</p>
    </div>
  </StyledProfileCard>
);

export default ProfileCard;
