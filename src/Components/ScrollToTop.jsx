import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force immediate scroll to top on route change
    window.scrollTo(0, 0);
    
    // Small delay to ensure the page has rendered before smooth scrolling
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Handle page reload scenarios
  useEffect(() => {
    // Force scroll to top on component mount (handles page reloads)
    window.scrollTo(0, 0);
    
    // Also set up a listener for page load events
    const handleLoad = () => {
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('load', handleLoad);
    
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return null;
}
