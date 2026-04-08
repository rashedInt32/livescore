import { describe, it, expect } from "vitest";
import { filterMatches, calculateFilterCounts } from "@/lib/utils/filterMatches";
import { createMatch } from "./helpers/createMatch";
import type { Match } from "@/types/match";

const matches: Match[] = [
  createMatch({ id: "1", status: { code: 100, type: "finished" } }),
  createMatch({ id: "2", status: { code: 7, type: "inprogress" } }),
  createMatch({ id: "3", status: { code: 0, type: "notstarted" } }),
  createMatch({ id: "4", status: { code: 70, type: "canceled" } }),
];

describe("filterMatches", () => {
  it("ALL returns every match including canceled", () => {
    expect(filterMatches(matches, "ALL")).toHaveLength(4);
  });

  it("Result returns only finished matches", () => {
    const result = filterMatches(matches, "Result");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("Live returns only inprogress matches", () => {
    const result = filterMatches(matches, "Live");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("Upcoming returns only notstarted matches", () => {
    const result = filterMatches(matches, "Upcoming");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("3");
  });

  it("returns empty array when no matches exist", () => {
    expect(filterMatches([], "ALL")).toHaveLength(0);
  });
});

describe("calculateFilterCounts", () => {
  it("returns correct counts for each filter", () => {
    const counts = calculateFilterCounts(matches);
    expect(counts).toEqual({ ALL: 4, Result: 1, Live: 1, Upcoming: 1 });
  });

  it("canceled matches count in ALL but not in any named filter", () => {
    const onlyCanceled = [createMatch({ status: { code: 70, type: "canceled" } })];
    const counts = calculateFilterCounts(onlyCanceled);
    expect(counts).toEqual({ ALL: 1, Result: 0, Live: 0, Upcoming: 0 });
  });

  it("returns all zeros for empty array", () => {
    expect(calculateFilterCounts([])).toEqual({ ALL: 0, Result: 0, Live: 0, Upcoming: 0 });
  });
});
