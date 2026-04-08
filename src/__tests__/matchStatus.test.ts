import { describe, it, expect } from "vitest";
import { getMatchDisplayStatus } from "@/lib/utils/matchStatus";
import { createMatch } from "./helpers/createMatch";

describe("getMatchDisplayStatus", () => {
  it("returns CANCELLED for canceled matches", () => {
    const match = createMatch({
      status: { code: 70, type: "canceled" },
      liveStatus: "Canceled",
    });
    expect(getMatchDisplayStatus(match)).toEqual({
      status: "CANCELLED",
      label: "CANCELLED",
      isLive: false,
    });
  });

  it("returns LIVE with minute for in-progress matches", () => {
    const match = createMatch({
      status: { code: 7, type: "inprogress" },
      liveStatus: "89",
    });
    expect(getMatchDisplayStatus(match)).toEqual({
      status: "LIVE",
      label: "LIVE",
      minute: "89",
      isLive: true,
    });
  });

  it("returns LIVE with extra time minute", () => {
    const match = createMatch({
      status: { code: 6, type: "inprogress" },
      liveStatus: "45+",
    });
    expect(getMatchDisplayStatus(match)).toEqual({
      status: "LIVE",
      label: "LIVE",
      minute: "45+",
      isLive: true,
    });
  });

  it("returns HT for in-progress matches at half time", () => {
    const match = createMatch({
      status: { code: 31, type: "inprogress" },
      liveStatus: "HT",
    });
    expect(getMatchDisplayStatus(match)).toEqual({
      status: "HT",
      label: "HT",
      isLive: true,
    });
  });

  it("returns FT with ENDED label for finished matches", () => {
    const match = createMatch({
      status: { code: 100, type: "finished" },
      liveStatus: "FT",
    });
    expect(getMatchDisplayStatus(match)).toEqual({
      status: "FT",
      label: "ENDED",
      isLive: false,
    });
  });

  it("returns PREMATCH with formatted date for not started matches", () => {
    const match = createMatch({
      status: { code: 0, type: "notstarted" },
      liveStatus: "-",
      timestamp: 1_470_484_800,
    });
    const result = getMatchDisplayStatus(match);
    expect(result.status).toBe("PREMATCH");
    expect(result.isLive).toBe(false);
    expect(result.label).toBe("AUG 6TH 12:00");
  });
});
