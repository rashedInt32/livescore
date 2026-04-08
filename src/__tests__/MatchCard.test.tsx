import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MatchCard } from "@/components/MatchCard";
import { createMatch } from "./helpers/createMatch";

describe("MatchCard", () => {
  it("displays country and competition", () => {
    render(<MatchCard match={createMatch({ country: "Russia", competition: "National League" })} />);
    expect(screen.getByText("Russia")).toBeInTheDocument();
    expect(screen.getByText("National League")).toBeInTheDocument();
  });

  it("displays scores for a finished match", () => {
    const match = createMatch({
      homeScore: { current: 2, period1: 1, normaltime: 2 },
      awayScore: { current: 0, period1: 0, normaltime: 0 },
    });
    render(<MatchCard match={match} />);
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("displays '-' for scores when match has not started", () => {
    const match = createMatch({
      status: { code: 0, type: "notstarted" },
      homeScore: {} as never,
      awayScore: {} as never,
      liveStatus: "-",
    });
    render(<MatchCard match={match} />);
    const dashes = screen.getAllByText("-");
    expect(dashes.length).toBeGreaterThanOrEqual(2);
  });

  it("displays both team names", () => {
    const match = createMatch({
      homeTeam: { id: 1, name: "FK Tyumen", slug: "fk-tyumen", gender: "M", subTeams: [] },
      awayTeam: { id: 2, name: "Luch-Energiya", slug: "luch", gender: "M", subTeams: [] },
    });
    render(<MatchCard match={match} />);
    expect(screen.getByText("FK Tyumen")).toBeInTheDocument();
    expect(screen.getByText("Luch-Energiya")).toBeInTheDocument();
  });

  it("has accessible label with team names", () => {
    const match = createMatch({
      homeTeam: { id: 1, name: "Team A", slug: "team-a", gender: "M", subTeams: [] },
      awayTeam: { id: 2, name: "Team B", slug: "team-b", gender: "M", subTeams: [] },
    });
    render(<MatchCard match={match} />);
    expect(screen.getByLabelText("Team A vs Team B")).toBeInTheDocument();
  });
});
