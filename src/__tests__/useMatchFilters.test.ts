import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMatchFilters } from "@/hooks/useMatchFilters";
import { createMatch } from "./helpers/createMatch";
import type { Match } from "@/types/match";

const matches: Match[] = [
  createMatch({ id: "1", status: { code: 100, type: "finished" } }),
  createMatch({ id: "2", status: { code: 7, type: "inprogress" } }),
  createMatch({ id: "3", status: { code: 0, type: "notstarted" } }),
];

describe("useMatchFilters", () => {
  it("starts with ALL filter showing all matches", () => {
    const { result } = renderHook(() => useMatchFilters(matches));
    expect(result.current.activeFilter).toBe("ALL");
    expect(result.current.filteredMatches).toHaveLength(3);
  });

  it("filters to live matches when Live is selected", () => {
    const { result } = renderHook(() => useMatchFilters(matches));
    act(() => result.current.setActiveFilter("Live"));
    expect(result.current.filteredMatches).toHaveLength(1);
    expect(result.current.filteredMatches[0].id).toBe("2");
  });

  it("filters to finished matches when Result is selected", () => {
    const { result } = renderHook(() => useMatchFilters(matches));
    act(() => result.current.setActiveFilter("Result"));
    expect(result.current.filteredMatches).toHaveLength(1);
    expect(result.current.filteredMatches[0].id).toBe("1");
  });

  it("calculates correct counts", () => {
    const { result } = renderHook(() => useMatchFilters(matches));
    expect(result.current.counts).toEqual({ ALL: 3, Result: 1, Live: 1, Upcoming: 1 });
  });

  it("handles an empty match list", () => {
    const { result } = renderHook(() => useMatchFilters([]));
    expect(result.current.filteredMatches).toHaveLength(0);
    expect(result.current.counts.ALL).toBe(0);
  });
});
