import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FilterBar } from "@/components/FilterBar";

const counts = { ALL: 179, Result: 93, Live: 18, Upcoming: 65 };

describe("FilterBar", () => {
  it("renders all four filter tabs", () => {
    render(<FilterBar activeFilter="ALL" counts={counts} onFilterChange={() => {}} />);
    expect(screen.getByRole("tab", { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /result/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /live/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /upcoming/i })).toBeInTheDocument();
  });

  it("shows the correct count for each tab", () => {
    render(<FilterBar activeFilter="ALL" counts={counts} onFilterChange={() => {}} />);
    expect(screen.getByText("179")).toBeInTheDocument();
    expect(screen.getByText("93")).toBeInTheDocument();
    expect(screen.getByText("18")).toBeInTheDocument();
    expect(screen.getByText("65")).toBeInTheDocument();
  });

  it("marks the active tab with aria-selected", () => {
    render(<FilterBar activeFilter="Live" counts={counts} onFilterChange={() => {}} />);
    expect(screen.getByRole("tab", { name: /live/i })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: /all/i })).toHaveAttribute("aria-selected", "false");
  });

  it("calls onFilterChange with the correct filter when clicked", () => {
    const onChange = vi.fn();
    render(<FilterBar activeFilter="ALL" counts={counts} onFilterChange={onChange} />);
    fireEvent.click(screen.getByRole("tab", { name: /result/i }));
    expect(onChange).toHaveBeenCalledWith("Result");
  });

  it("calls onFilterChange with Upcoming when that tab is clicked", () => {
    const onChange = vi.fn();
    render(<FilterBar activeFilter="ALL" counts={counts} onFilterChange={onChange} />);
    fireEvent.click(screen.getByRole("tab", { name: /upcoming/i }));
    expect(onChange).toHaveBeenCalledWith("Upcoming");
  });
});
