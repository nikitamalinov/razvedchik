import React, { useState, useEffect, useRef } from "react";

const LazyImage = ({ src, alt, ...props }) => {
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <img
      className="block w-[100%] h-auto "
      ref={imageRef}
      src={isInView ? src : ""}
      alt={alt}
      {...props}
    />
  );
};

export default LazyImage;
