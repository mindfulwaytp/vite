// src/components/ScrollToTop.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Provider directory restores its own scroll on return-from-profile; don't fight it.
    if (pathname === '/providers' && sessionStorage.getItem('providerDirectoryScrollY')) {
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
