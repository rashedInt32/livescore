import type { Match } from "@/types/match";

export function createMatch(overrides: Partial<Match> = {}): Match {
  return {
    id: "match-1",
    name: "Team A - Team B",
    competitionId: "comp-1",
    competition: "Test League",
    countryId: "country-1",
    country: "Test Country",
    timestamp: 1_470_484_800,
    date: "06.08.2016.",
    time: "12:00",
    status: { code: 100, type: "finished" },
    round: { round: 1 },
    homeTeam: { id: 1, name: "Team A", slug: "team-a", gender: "M", subTeams: [] },
    awayTeam: { id: 2, name: "Team B", slug: "team-b", gender: "M", subTeams: [] },
    homeScore: { current: 2, period1: 1, normaltime: 2 },
    awayScore: { current: 1, period1: 0, normaltime: 1 },
    liveStatus: "FT",
    ...overrides,
  } as Match;
}
