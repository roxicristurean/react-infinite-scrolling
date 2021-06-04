import { useState, useRef, useEffect, MutableRefObject } from "react";

export function useIntersectionObserver(
  observedElement: MutableRefObject<Element | null>, // target element to be observed
  forward: boolean = true // used if we want to keep the rendered content
) {
  // lets us know if the component is intersecting or not
  const [isIntersecting, setIsIntersecting] = useState(false);
  // reference that holds the observer
  const observer = useRef<IntersectionObserver | null>(null);
  // element that is observed
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    setElement(observedElement.current);
  }, [observedElement]);

  const disconectObserver = () => {
    if (observer.current) {
      observer.current.disconnect();
    }
  };

  useEffect(() => {
    if (element === null) return;
    disconectObserver();

    // create the observer that observes the element
    const obs = (observer.current = new IntersectionObserver(
      ([entryElement]) => {
        if (forward) {
          setIsIntersecting(entryElement.isIntersecting);
        } else if (!forward && !isIntersecting && entryElement.isIntersecting) {
          setIsIntersecting(entryElement.isIntersecting);
          disconectObserver();
        }
      }
    ));
    obs.observe(element);
    return () => {
      disconectObserver();
    };
  }, [element]);

  return isIntersecting;
}
