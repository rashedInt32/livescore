"use client";

import styled from "styled-components";
import { theme } from "@/styles/theme";
import type { Match } from "@/types/match";
import { MatchCard } from "@/components/MatchCard";

interface MatchListProps {
  matches: Match[];
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing["2xl"]};
  gap: ${theme.spacing.md};
  text-align: center;
  font-family: ${theme.fonts.primary};
`;

const EmptyText = styled.p`
  font-size: ${theme.fontSizes.base};
  color: ${theme.colors.textPrimary};
`;

const EmptyHint = styled.p`
  font-size: ${theme.fontSizes.sm};
  color: ${theme.colors.textTertiary};
`;

export function MatchList({ matches }: MatchListProps) {
  if (matches.length === 0) {
    return (
      <EmptyState role="status">
        <EmptyText>No matches found</EmptyText>
        <EmptyHint>Try a different filter</EmptyHint>
      </EmptyState>
    );
  }

  return (
    <Grid>
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </Grid>
  );
}
