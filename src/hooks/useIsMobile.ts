import { useState, useEffect } from 'react';

export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}

export const getMotionProps = (isMobile: boolean) => {
  if (isMobile) {
    return {
      initial: {},
      animate: {},
      whileInView: {},
      transition: {},
      viewport: {}
    };
  }
  return null;
};
