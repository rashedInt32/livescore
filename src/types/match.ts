export interface Team {
  readonly id: number;
  readonly name: string;
  readonly slug: string;
  readonly gender: string | null;
  readonly subTeams: readonly unknown[];
}

export interface Score {
  readonly current: number;
  readonly period1?: number;
  readonly normaltime?: number;
}

export type ScoreValue = Score | Record<string, never>;

export interface MatchStatus {
  readonly code: number;
  readonly type: "finished" | "inprogress" | "notstarted" | "canceled";
}

export interface Match {
  readonly id: string;
  readonly name: string;
  readonly competitionId: string;
  readonly competition: string;
  readonly countryId: string;
  readonly country: string;
  readonly timestamp: number;
  readonly date: string;
  readonly time: string;
  readonly status: MatchStatus;
  readonly round: { readonly round: number };
  readonly homeTeam: Team;
  readonly awayTeam: Team;
  readonly homeScore: ScoreValue;
  readonly awayScore: ScoreValue;
  readonly liveStatus: string;
}

export type FilterType = "ALL" | "Result" | "Live" | "Upcoming";

export interface FilterCounts {
  readonly ALL: number;
  readonly Result: number;
  readonly Live: number;
  readonly Upcoming: number;
}

export type DisplayStatus = "LIVE" | "HT" | "FT" | "CANCELLED" | "PREMATCH";

export interface MatchDisplayStatus {
  readonly status: DisplayStatus;
  readonly label: string;
  readonly minute?: string;
  readonly isLive: boolean;
}
