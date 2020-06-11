import { useState, useEffect } from "react";

const useOnScreen = (ref, rootMargin = "0px") => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const current = ref.current;
    const checkView = ([entry]) => setIntersecting(entry.isIntersecting);
    const observer = new IntersectionObserver(checkView, { rootMargin });

    if (current) observer.observe(current);

    return () => {
      observer.unobserve(current);
    };
  }, [rootMargin, ref]);

  return isIntersecting;
};

export default useOnScreen;
