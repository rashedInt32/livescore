"use client";

import styled from "styled-components";
import { theme } from "@/styles/theme";
import type { Match } from "@/types/match";
import { useMatchFilters } from "@/hooks/useMatchFilters";
import { FilterBar } from "@/components/FilterBar";
import { MatchList } from "@/components/MatchList";

interface AppShellProps {
  matches: Match[];
}

const Page = styled.main`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing.xl} ${theme.spacing.lg};
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`;

const Logo = styled.h1`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes["2xl"]};
  font-weight: 700;
  color: ${theme.colors.textPrimary};
  letter-spacing: -0.5px;

  span {
    color: ${theme.colors.live};
  }

  @media (min-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes["3xl"]};
  }
`;

const LiveCount = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  background: ${theme.colors.liveBg};
  border: 1px solid ${theme.colors.live};
  border-radius: ${theme.borderRadius.full};
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.sm};
  font-weight: 600;
  color: ${theme.colors.live};
`;

const LIVE_DOT_SIZE = "8px";

const LiveDot = styled.span`
  width: ${LIVE_DOT_SIZE};
  height: ${LIVE_DOT_SIZE};
  border-radius: 50%;
  background: ${theme.colors.live};
  display: inline-block;
`;

export function AppShell({ matches }: AppShellProps) {
  const { activeFilter, setActiveFilter, counts, filteredMatches } =
    useMatchFilters(matches);

  return (
    <Page>
      <Header>
        <Logo>
          Live<span>Score</span>
        </Logo>
        {counts.Live > 0 && (
          <LiveCount>
            <LiveDot aria-hidden="true" />
            {counts.Live} Live
          </LiveCount>
        )}
      </Header>

      <FilterBar
        activeFilter={activeFilter}
        counts={counts}
        onFilterChange={setActiveFilter}
      />

      <MatchList matches={filteredMatches} />
    </Page>
  );
}
