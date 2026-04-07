import dayjs from "@/lib/dayjs";
import type { Score, ScoreValue } from "@/types/match";

export function hasScore(score: ScoreValue): score is Score {
  return "current" in score;
}

export function getCurrentScore(score: ScoreValue): number | null {
  return hasScore(score) ? score.current : null;
}

export function formatScore(score: ScoreValue): string {
  const value = getCurrentScore(score);
  return value !== null ? String(value) : "-";
}

export function formatMatchDate(timestamp: number): string {
  return dayjs.unix(timestamp).utc().format("MMM Do HH:mm").toUpperCase();
}

const DEG_PER_MINUTE = 4;
const FULL_CIRCLE = 360;

const STATUS_TO_DEG: Record<string, number> = {
  HT: 180,
  FT: FULL_CIRCLE,
  "-": 0,
  Canceled: 0,
};

export function getProgressDeg(liveStatus: string): number {
  if (liveStatus in STATUS_TO_DEG) return STATUS_TO_DEG[liveStatus];

  const minute = parseInt(liveStatus, 10);
  if (isNaN(minute) || minute <= 0) return 0;

  const extra = liveStatus.includes("+") ? DEG_PER_MINUTE : 0;
  return Math.min(minute * DEG_PER_MINUTE + extra, FULL_CIRCLE);
}
