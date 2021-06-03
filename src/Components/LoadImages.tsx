import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";

function LoadImage({ size }: { size: number }) {
  // api that retrieves a photo, square sized of the specified size variable
  const url = `https://picsum.photos/${size}`;

  return (
    <div className="image">
      <img src={url} alt="img" />
    </div>
  );
}

export function LoadImages() {
  const imagesOnPage = 5;
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  const isAtBottom = useIntersectionObserver(ref, true);

  useEffect(() => {
    isAtBottom && setCount(count + 1);
  }, [isAtBottom]);

  return (
    <div className="load-images">
      {(() => {
        const images = [];
        for (let i = 1; i <= count * imagesOnPage; i++) {
          let size = (i * 1000) / imagesOnPage;
          if (i > 10) {
            size /= 10;
          }
          images.push(<LoadImage size={size} key={i} />);
        }
        return images;
      })()}
      <div className="loading" ref={ref}>
        Loading..
      </div>
    </div>
  );
}
