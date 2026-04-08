import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusLabel, StatusCircle } from "@/components/StatusBadge";
import { getMatchDisplayStatus } from "@/lib/utils/matchStatus";
import { createMatch } from "./helpers/createMatch";

describe("StatusLabel", () => {
  it("shows ENDED for finished matches", () => {
    const match = createMatch({ status: { code: 100, type: "finished" }, liveStatus: "FT" });
    render(<StatusLabel displayStatus={getMatchDisplayStatus(match)} />);
    expect(screen.getByText("ENDED")).toBeInTheDocument();
  });

  it("shows LIVE for in-progress matches", () => {
    const match = createMatch({ status: { code: 7, type: "inprogress" }, liveStatus: "89" });
    render(<StatusLabel displayStatus={getMatchDisplayStatus(match)} />);
    expect(screen.getByText("LIVE")).toBeInTheDocument();
  });

  it("shows HT for half-time matches", () => {
    const match = createMatch({ status: { code: 31, type: "inprogress" }, liveStatus: "HT" });
    render(<StatusLabel displayStatus={getMatchDisplayStatus(match)} />);
    expect(screen.getByText("HT")).toBeInTheDocument();
  });

  it("shows CANCELLED for canceled matches", () => {
    const match = createMatch({ status: { code: 70, type: "canceled" }, liveStatus: "Canceled" });
    render(<StatusLabel displayStatus={getMatchDisplayStatus(match)} />);
    expect(screen.getByText("CANCELLED")).toBeInTheDocument();
  });

  it("shows formatted date for not started matches", () => {
    const match = createMatch({
      status: { code: 0, type: "notstarted" },
      liveStatus: "-",
      timestamp: 1_470_484_800,
    });
    render(<StatusLabel displayStatus={getMatchDisplayStatus(match)} />);
    expect(screen.getByText("AUG 6TH 12:00")).toBeInTheDocument();
  });

  it("has aria-live='polite' for live matches", () => {
    const match = createMatch({ status: { code: 7, type: "inprogress" }, liveStatus: "60" });
    const { container } = render(<StatusLabel displayStatus={getMatchDisplayStatus(match)} />);
    expect(container.firstChild).toHaveAttribute("aria-live", "polite");
  });

  it("has no aria-live for finished matches", () => {
    const match = createMatch({ status: { code: 100, type: "finished" }, liveStatus: "FT" });
    const { container } = render(<StatusLabel displayStatus={getMatchDisplayStatus(match)} />);
    expect(container.firstChild).not.toHaveAttribute("aria-live");
  });
});

describe("StatusCircle", () => {
  it("renders FT text for finished matches", () => {
    const match = createMatch({ status: { code: 100, type: "finished" }, liveStatus: "FT" });
    render(<StatusCircle displayStatus={getMatchDisplayStatus(match)} />);
    expect(screen.getByText("FT")).toBeInTheDocument();
  });

  it("renders HT text for half-time matches", () => {
    const match = createMatch({ status: { code: 31, type: "inprogress" }, liveStatus: "HT" });
    render(<StatusCircle displayStatus={getMatchDisplayStatus(match)} />);
    expect(screen.getByText("HT")).toBeInTheDocument();
  });

  it("renders minute with apostrophe for live matches", () => {
    const match = createMatch({ status: { code: 7, type: "inprogress" }, liveStatus: "45" });
    render(<StatusCircle displayStatus={getMatchDisplayStatus(match)} />);
    expect(screen.getByText("45'")).toBeInTheDocument();
  });
});
