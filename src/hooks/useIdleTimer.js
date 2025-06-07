import { useEffect, useRef } from "react";

const useIdleTimer = (onIdle, timeout = 5 * 60 * 1000) => {
  const timeRef = useRef();

  const resetTime = () => {
    clearTimeout(timeRef.current);
    timeRef.current = setTimeout(onIdle, timeout);
  };

  useEffect(() => {
    const events = ["mousemove", "keydown", "mousedown", "touchstart"];
    const handleActivity = () => resetTime();

    for (const event of events) {
      window.addEventListener(event, handleActivity);
    }

    resetTime();

    return () => {
      clearTimeout(timeRef.current);
      for (const event of events) {
        window.removeEventListener(event, handleActivity);
      }
    };
  }, []);
};

export default useIdleTimer;
