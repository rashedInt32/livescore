"use client";

import styled, { css } from "styled-components";
import { theme } from "@/styles/theme";
import type { FilterType, FilterCounts } from "@/types/match";

interface FilterBarProps {
  activeFilter: FilterType;
  counts: FilterCounts;
  onFilterChange: (filter: FilterType) => void;
}

const FILTERS: FilterType[] = ["ALL", "Result", "Live", "Upcoming"];

const FILTER_LABELS: Record<FilterType, string> = {
  ALL: "All",
  Result: "Result",
  Live: "Live",
  Upcoming: "Upcoming",
};

const MIN_TAP_TARGET = "44px";

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.sm} 0;
  margin-bottom: ${theme.spacing.lg};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
`;

const TabList = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    gap: ${theme.spacing.md};
    justify-content: center;
    overflow-x: visible;
  }
`;

const Tab = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all ${theme.transitions.fast};
  min-height: ${MIN_TAP_TARGET};
  border: 1px solid transparent;

  ${({ $active }: { $active: boolean }) =>
    $active
      ? css`
          background: ${theme.colors.filterActiveBg};
          color: ${theme.colors.filterActive};
          border-color: ${theme.colors.filterActive};
        `
      : css`
          background: ${theme.colors.surface};
          color: ${theme.colors.textSecondary};

          &:hover {
            background: ${theme.colors.surfaceHover};
            color: ${theme.colors.textPrimary};
          }
        `}

  &:focus-visible {
    outline: 2px solid ${theme.colors.filterActive};
    outline-offset: 2px;
  }
`;

const Badge = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  padding: 2px 6px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSizes.xs};
  font-weight: 700;
  background: ${({ $active }: { $active: boolean }) =>
    $active ? theme.colors.filterBadgeActive : theme.colors.filterBadgeInactive};
  color: ${({ $active }: { $active: boolean }) =>
    $active ? theme.colors.textPrimary : theme.colors.textSecondary};
  transition: all ${theme.transitions.fast};
`;

export function FilterBar({ activeFilter, counts, onFilterChange }: FilterBarProps) {
  return (
    <Nav aria-label="Match filters">
      <TabList role="tablist">
        {FILTERS.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <Tab
              key={filter}
              role="tab"
              aria-selected={isActive}
              $active={isActive}
              onClick={() => onFilterChange(filter)}
            >
              {FILTER_LABELS[filter]}
              <Badge $active={isActive}>{counts[filter]}</Badge>
            </Tab>
          );
        })}
      </TabList>
    </Nav>
  );
}
