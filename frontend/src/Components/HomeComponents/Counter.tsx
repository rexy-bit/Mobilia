import { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  duration?: number; // en ms
}

const Counter: React.FC<CounterProps> = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // On observe qu'une fois
        }
      },
      { threshold: 0.5 } // au moins 50% visible
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const increment = end / (duration / 16); // environ 60 FPS
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
    }
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-[1.5em] font-bold text-center max-[600px]:text-[1.2em]">
      {count}+
    </div>
  );
};

export default Counter;
