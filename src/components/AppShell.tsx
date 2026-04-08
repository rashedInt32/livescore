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

const Container = styled.div`
  max-width: ${theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.md}) {
    padding: 0 ${theme.spacing.lg};
  }
`;

const StickyHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  background: ${theme.colors.background};
  padding: ${theme.spacing.md} 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const DesktopRow = styled.div`
  display: none;

  @media (min-width: ${theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${theme.spacing.md};
  }
`;

const MobileFilters = styled.div`
  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const Logo = styled.h1`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes["2xl"]};
  font-weight: 700;
  color: ${theme.colors.textPrimary};
  letter-spacing: -0.5px;
  flex-shrink: 0;

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
  flex-shrink: 0;
`;

const LIVE_DOT_SIZE = "8px";

const LiveDot = styled.span`
  width: ${LIVE_DOT_SIZE};
  height: ${LIVE_DOT_SIZE};
  border-radius: 50%;
  background: ${theme.colors.live};
  display: inline-block;
`;

const Content = styled.main`
  padding-top: ${theme.spacing.lg};
  padding-bottom: ${theme.spacing["2xl"]};
`;

function LiveBadge({ count }: { count: number }) {
  if (count === 0) return null;

  return (
    <LiveCount>
      <LiveDot aria-hidden="true" />
      {count} Live
    </LiveCount>
  );
}

export function AppShell({ matches }: AppShellProps) {
  const { activeFilter, setActiveFilter, counts, filteredMatches } =
    useMatchFilters(matches);

  const filterBar = (
    <FilterBar
      activeFilter={activeFilter}
      counts={counts}
      onFilterChange={setActiveFilter}
    />
  );

  return (
    <>
      <StickyHeader>
        <Container>
          <TopRow>
            <Logo>
              Live<span>Score</span>
            </Logo>
            <LiveBadge count={counts.Live} />
          </TopRow>
          <MobileFilters>{filterBar}</MobileFilters>

          <DesktopRow>
            <Logo>
              Live<span>Score</span>
            </Logo>
            {filterBar}
            <LiveBadge count={counts.Live} />
          </DesktopRow>
        </Container>
      </StickyHeader>

      <Content>
        <Container>
          <MatchList matches={filteredMatches} />
        </Container>
      </Content>
    </>
  );
}
