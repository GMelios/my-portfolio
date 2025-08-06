import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledRotatingText = styled.span`
  color: var(--green);
  display: inline;
  white-space: nowrap;
  font-weight: inherit;
  font-size: inherit;
`;

const RotatingText = () => {
  const texts = ['political decisions', 'social behaviour', 'labour preferences'];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('voter behavior');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[currentTextIndex];

      if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        setTypingSpeed(100);
      } else {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setCurrentTextIndex(prevIndex => (prevIndex + 1) % texts.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTextIndex, typingSpeed, texts]);

  return (
    <StyledRotatingText>
      {displayText}
      <span style={{ opacity: displayText ? 1 : 0 }}>|</span>
    </StyledRotatingText>
  );
};

export default RotatingText;
