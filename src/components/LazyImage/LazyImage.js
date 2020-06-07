import React, { useState, useRef, useEffect } from "react";
import loading from "./loading.gif";

const LazyImage = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState(loading);
  const imageRef = useRef();

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imageRef.current) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: "75%",
          }
        );
        observer.observe(imageRef.current);
      } else {
        setImageSrc(src);
      }
    }
    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <img
      referrerPolicy="no-referrer"
      ref={imageRef}
      src={imageSrc}
      alt={alt}
      className={className}
    />
  );
};

export default LazyImage;
