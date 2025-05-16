import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTour } from '@reactour/tour';
import tourSteps from '../functions/TourSteps';
import { getAuth } from 'firebase/auth';
import { hasUserSeenTourForPage, markTourAsSeenForPage } from '../functions/Database';

const TourStepsWrapper = () => {
  const location = useLocation();
  const { setSteps, setIsOpen } = useTour();

  useEffect(() => {
    const interval = setInterval(async () => {
      // Tunggu sampai halaman menyatakan data-nya siap
      if (window.__isTourReady === true) {
        clearInterval(interval);

        const currentPath = location.pathname;
        const steps = tourSteps[currentPath] || [];

        if (steps.length === 0) return;

        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) return;

        const seen = await hasUserSeenTourForPage(user.uid, currentPath);
        if (!seen) {
          setSteps(steps);
          setIsOpen(true);
          await markTourAsSeenForPage(user.uid, currentPath);
        }
      }
    }, 300); // Cek setiap 300ms

    return () => clearInterval(interval);
  }, [location.pathname]);

  return null;
};

export default TourStepsWrapper;
