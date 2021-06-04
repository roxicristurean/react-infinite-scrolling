import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";

const PAGE_SIZE = 5;

const rand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);

const getImageUrl = (id: number, width: number, height: number) =>
  `https://picsum.photos/id/${id}/${width}/${height}`;

const intStream = (n: number) => Array.from(new Array(n).keys());

const Image: React.FC<{ size: number; id: number }> = ({ id, size }) => {
  // api that retrieves a photo, square sized of the specified size variable
  const url = getImageUrl(id, size, size);

  return (
    <div className="image">
      <img src={url} alt="img" />
    </div>
  );
};

export function LoadImages() {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  const isAtBottom = useIntersectionObserver(ref, true);

  useEffect(() => {
    isAtBottom && setCount(count + 1);
  }, [isAtBottom]);

  return (
    <div className="load-images">
      {intStream(count * PAGE_SIZE).map((i) => (
        <Image id={rand(0, 1000)} size={500} key={i} />
      ))}
      <div className="loading" ref={ref}>
        Loading..
      </div>
    </div>
  );
}
