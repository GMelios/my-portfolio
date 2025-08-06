import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledRotatingText = styled.span`
  color: var(--green);
  display: inline;
  min-width: 280px;
  white-space: nowrap;
`;

const RotatingText = () => {
  const texts = ['voter behavior', 'labour market preferences', 'behavioral biases'];

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[currentTextIndex];

      if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        setTypingSpeed(75);
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
