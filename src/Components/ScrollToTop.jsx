import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // Immediate scroll to top on route change
    const scrollToTop = () => {
      // Use multiple methods to ensure scroll works
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediate scroll
    scrollToTop();
    
    // Also try after a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      scrollToTop();
    }, 10);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Handle page reload and initial load scenarios
  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Force scroll to top on component mount (handles page reloads)
    scrollToTop();
    
    // Set up listeners for different load events
    const handleLoad = () => scrollToTop();
    const handleDOMContentLoaded = () => scrollToTop();
    const handleBeforeUnload = () => scrollToTop();
    
    // Add multiple event listeners to catch all scenarios
    window.addEventListener('load', handleLoad);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    
    // Also try after a longer delay for complex pages
    const delayedTimer = setTimeout(() => {
      scrollToTop();
    }, 100);
    
    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
      clearTimeout(delayedTimer);
    };
  }, []);

  return null;
}
