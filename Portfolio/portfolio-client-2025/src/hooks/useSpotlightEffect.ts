import { useEffect, useRef } from 'react';

export const useSpotlightEffect = () => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Get the original color
    const computedStyle = window.getComputedStyle(element);
    const originalColor = computedStyle.color;

    // Wrap each character in a span
    const text = element.textContent || '';
    element.innerHTML = '';
    const characters = text.split('').map(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.transition = 'color 0.1s ease';
      span.style.color = originalColor; // Set the original color
      return span;
    });
    characters.forEach(span => element.appendChild(span));

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      characters.forEach(span => {
        const rect = span.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(mouseX - charCenterX, 2) + 
          Math.pow(mouseY - charCenterY, 2)
        );
        
        if (distance < 50) {
          span.style.color = '#000'; // Spotlight color
        } else {
          span.style.color = originalColor; // Reset to original color
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.textContent = text;
      element.style.color = originalColor;
    };
  }, []);

  return elementRef;
};

export function useTypedSpotlightEffect<T extends HTMLElement>() {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Get the original color
    const computedStyle = window.getComputedStyle(element);
    const originalColor = computedStyle.color;

    // Wrap each character in a span
    const text = element.textContent || '';
    element.innerHTML = '';
    const characters = text.split('').map(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.transition = 'color 0.1s ease';
      span.style.color = originalColor; // Set the original color
      return span;
    });
    characters.forEach(span => element.appendChild(span));

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      characters.forEach(span => {
        const rect = span.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
          Math.pow(mouseX - charCenterX, 2) + 
          Math.pow(mouseY - charCenterY, 2)
        );
        
        if (distance < 50) {
          span.style.color = '#000'; // Spotlight color
        } else {
          span.style.color = originalColor; // Reset to original color
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.textContent = text;
      element.style.color = originalColor;
    };
  }, []);

  return elementRef;
}



