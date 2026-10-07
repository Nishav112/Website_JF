import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Resets the scroll position on every route change, except when the URL
// carries a hash (e.g. "/#market"), where the target page handles scrolling
// to that section itself.
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
