import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTour } from '@reactour/tour';
import tourSteps from '../functions/TourSteps';


const TourStepsWrapper = () => {
  const location = useLocation();
  const { setSteps, setIsOpen } = useTour();

  useEffect(() => {
    const currentPath = location.pathname;
    const localKey = `tourSeen:${currentPath}`;
    const hasSeenTour = localStorage.getItem(localKey);

    if (!hasSeenTour) {
      const steps = tourSteps[currentPath] || [];
      if (steps.length > 0) {
        setSteps(steps);
        setIsOpen(true);
        localStorage.setItem(localKey, 'true');
      }
    }
  }, [location.pathname]);

  return null;
};

export default TourStepsWrapper;
