import { useEffect, useRef, useState } from "react";

export const useIsElementVisible = (ref: any) => {
  const [isVisible, setIsVisible] = useState(false);

  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });

    if (ref.current) observer.current.observe(ref.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [ref]);

  return isVisible;
};
