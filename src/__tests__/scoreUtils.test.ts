import { describe, it, expect } from "vitest";
import {
  hasScore,
  getCurrentScore,
  formatScore,
  formatMatchDate,
  getProgressDeg,
} from "@/lib/utils/scoreUtils";

describe("hasScore", () => {
  it("returns true for a score with current", () => {
    expect(hasScore({ current: 2, period1: 1, normaltime: 2 })).toBe(true);
  });

  it("returns true for a zero score", () => {
    expect(hasScore({ current: 0 })).toBe(true);
  });

  it("returns false for an empty object", () => {
    expect(hasScore({})).toBe(false);
  });
});

describe("getCurrentScore", () => {
  it("returns the current score as a number", () => {
    expect(getCurrentScore({ current: 3 })).toBe(3);
  });

  it("returns 0 for a zero score", () => {
    expect(getCurrentScore({ current: 0 })).toBe(0);
  });

  it("returns null for an empty score object", () => {
    expect(getCurrentScore({})).toBeNull();
  });
});

describe("formatScore", () => {
  it("formats a score as a string", () => {
    expect(formatScore({ current: 3 })).toBe("3");
  });

  it("formats zero as '0' not '-'", () => {
    expect(formatScore({ current: 0 })).toBe("0");
  });

  it("returns '-' for an empty score object", () => {
    expect(formatScore({})).toBe("-");
  });
});

describe("formatMatchDate", () => {
  it("formats a timestamp into uppercase date string", () => {
    expect(formatMatchDate(1_470_484_800)).toBe("AUG 6TH 12:00");
  });

  it("uses correct ordinal suffixes", () => {
    expect(formatMatchDate(1_451_606_400)).toBe("JAN 1ST 00:00");
    expect(formatMatchDate(1_451_692_800)).toBe("JAN 2ND 00:00");
    expect(formatMatchDate(1_451_779_200)).toBe("JAN 3RD 00:00");
  });
});

describe("getProgressDeg", () => {
  it("converts a minute to degrees (4° per minute)", () => {
    expect(getProgressDeg("1")).toBe(4);
    expect(getProgressDeg("10")).toBe(40);
    expect(getProgressDeg("32")).toBe(128);
  });

  it("returns 180° for 45 minutes", () => {
    expect(getProgressDeg("45")).toBe(180);
  });

  it("returns 360° for 90 minutes", () => {
    expect(getProgressDeg("90")).toBe(360);
  });

  it("handles stoppage time with plus sign", () => {
    expect(getProgressDeg("45+")).toBe(184);
    expect(getProgressDeg("60+")).toBe(244);
  });

  it("clamps to 360° maximum", () => {
    expect(getProgressDeg("95")).toBe(360);
  });

  it("returns 180° for HT", () => {
    expect(getProgressDeg("HT")).toBe(180);
  });

  it("returns 360° for FT", () => {
    expect(getProgressDeg("FT")).toBe(360);
  });

  it("returns 0° for not started", () => {
    expect(getProgressDeg("-")).toBe(0);
  });

  it("returns 0° for Canceled", () => {
    expect(getProgressDeg("Canceled")).toBe(0);
  });

  it("returns 0° for unparseable strings", () => {
    expect(getProgressDeg("abc")).toBe(0);
    expect(getProgressDeg("")).toBe(0);
  });
});
