import ImageLoader from "components/Loaders/ImageLoader";
import { useEffect, useState } from "react";

function useImage(src?: string, alt?: string, className?: string) {
  const [image, setImage] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setImage(src);
  }, [src]);

  return (
    <div style={{ position: "relative" }}>
      {image && (
        <img
          src={image}
          style={{
            transition: "0.3s ease-in-out",
            filter: isLoaded ? "blur(0px)" : "blur(10px)",
          }}
          className={className}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
        />
      )}
      {!isLoaded && <ImageLoader />}
    </div>
  );
}

export default useImage;
