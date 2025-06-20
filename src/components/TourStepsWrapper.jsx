import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTour } from '@reactour/tour';
import tourSteps from '../functions/TourSteps';
import { getAuth } from 'firebase/auth';
import { hasUserSeenTourForPage, markTourAsSeenForPage } from '../functions/Database';

const TourStepsWrapper = () => {
  const location = useLocation();
  const { setSteps, setIsOpen } = useTour();

  // Fungsi global untuk trigger tour manual
  useEffect(() => {
    window.startTour = async (path = location.pathname, force = false) => {
      const auth = getAuth();
      const user = auth.currentUser;
  
      let steps = tourSteps[path] || [];
  
      // Jika user login, filter tour-login-button
      if (user) {
        steps = steps.filter(step => step.selector !== '.tour-login-button');
      }
  
      if (steps.length === 0) return;
  
      setSteps(steps);
      setIsOpen(true);
  
      if (user && !force) {
        await markTourAsSeenForPage(user.uid, path); // tandai sebagai seen
      } else if (!user && !force) {
        localStorage.setItem(`tourSeen:${path}`, 'true');
      }
    };
  }, [location.pathname, setSteps, setIsOpen]);  

  // Auto trigger jika belum pernah lihat
  useEffect(() => {
    const interval = setInterval(async () => {
      if (window.__isTourReady === true) {
        clearInterval(interval);

        const path = location.pathname;
        const steps = tourSteps[path] || [];
        if (steps.length === 0) return;

        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const seen = await hasUserSeenTourForPage(user.uid, path);
          if (!seen) window.startTour(path);
        } else {
          const seen = localStorage.getItem(`tourSeen:${path}`);
          if (!seen) window.startTour(path);
        }
      }
    }, 300);

    return () => clearInterval(interval);
  }, [location.pathname]);

  return null;
};

export default TourStepsWrapper;
