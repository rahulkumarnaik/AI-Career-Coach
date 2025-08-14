export type Metrics = {
  resumeScore?: number;
  lastAnalyzeAt?: number;
  coverLettersCreated?: number;
};

const KEY = "metrics";

export function getMetrics(): Metrics {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Metrics) : {};
  } catch {
    return {};
  }
}

export function updateMetrics(patch: Partial<Metrics>): Metrics {
  const cur = getMetrics();
  const next = { ...cur, ...patch } as Metrics;
  localStorage.setItem(KEY, JSON.stringify(next));
  
  // Dispatch custom event for real-time updates
  window.dispatchEvent(new CustomEvent('localStorageUpdate', { 
    detail: { key: KEY } 
  }));
  
  return next;
}

export function incrementCoverLetters(): Metrics {
  const cur = getMetrics();
  const count = (cur.coverLettersCreated ?? 0) + 1;
  return updateMetrics({ coverLettersCreated: count });
}
