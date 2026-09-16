import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackNavigation } from '../lib/analytics';

// Records a page view on each client-side navigation. The first view is already
// recorded when the container loads, so it is skipped here to avoid double counting.
export default function usePageTracking() {
  const location = useLocation();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    trackNavigation();
  }, [location.pathname]);
}
