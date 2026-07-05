"use client";

import { useEffect, useState } from "react";

type MediaQueryState = {
  /** False during SSR and the first client paint — avoids hydration mismatch. */
  ready: boolean;
  matches: boolean;
};

/** Subscribe to a CSS media query. Waits until mounted before returning the real match. */
export function useMediaQuery(query: string): MediaQueryState {
  const [state, setState] = useState<MediaQueryState>({ ready: false, matches: false });

  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setState({ ready: true, matches: mq.matches });
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);

  return state;
}
