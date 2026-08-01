// src/hooks/usePrevious.ts
import { useRef, useEffect } from "react";

// Generic T works for any state type, returning T | undefined
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export default usePrevious;