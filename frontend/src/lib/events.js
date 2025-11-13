const EVENT_NAME = "obrador:statsChanged";

function hasWindow() {
  return typeof window !== "undefined";
}

export function emitStatsChanged() {
  if (!hasWindow()) return;
  window.dispatchEvent(new Event(EVENT_NAME));
}

export function subscribeStatsChanged(handler) {
  if (!hasWindow()) return () => {};
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}
