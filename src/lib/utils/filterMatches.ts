import type { Match, FilterType, FilterCounts } from "@/types/match";

const filterStrategies: Record<FilterType, (match: Match) => boolean> = {
  ALL: () => true,
  Result: (m) => m.status.type === "finished",
  Live: (m) => m.status.type === "inprogress",
  Upcoming: (m) => m.status.type === "notstarted",
};

export function filterMatches(
  matches: readonly Match[],
  filter: FilterType,
): Match[] {
  return matches.filter(filterStrategies[filter]);
}

export function calculateFilterCounts(
  matches: readonly Match[],
): FilterCounts {
  let result = 0;
  let live = 0;
  let upcoming = 0;

  for (const match of matches) {
    switch (match.status.type) {
      case "finished":
        result++;
        break;
      case "inprogress":
        live++;
        break;
      case "notstarted":
        upcoming++;
        break;
    }
  }

  return { ALL: matches.length, Result: result, Live: live, Upcoming: upcoming };
}
