"use client";

import styled from "styled-components";
import { theme } from "@/styles/theme";
import type { Match } from "@/types/match";
import { getMatchDisplayStatus } from "@/lib/utils/matchStatus";
import { StatusLabel, StatusCircle } from "@/components/StatusBadge";
import { formatScore } from "@/lib/utils/scoreUtils";

interface MatchCardProps {
  match: Match;
}

const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  background: ${theme.colors.card};
  border-radius: ${theme.borderRadius.sm};
  font-family: ${theme.fonts.primary};
  overflow: hidden;
  transition:
    background ${theme.transitions.fast},
    box-shadow ${theme.transitions.fast},
    transform ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.surfaceHover};
    box-shadow: ${theme.shadows.cardHover};
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.lg};
`;

const Country = styled.span`
  font-size: ${theme.fontSizes.xs};
  font-weight: 400;
  color: ${theme.colors.textMuted};
  letter-spacing: 1.5px;
  text-transform: uppercase;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Competition = styled.span`
  font-size: ${theme.fontSizes.base};
  font-weight: 500;
  color: ${theme.colors.textPrimary};
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (min-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.lg};
  }
`;

const ScoreRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  font-weight: 400;
`;

const Score = styled.span`
  font-size: ${theme.fontSizes["4xl"]};
  color: ${theme.colors.textPrimary};
  min-width: 48px;
  text-align: center;
  line-height: 1;

  @media (min-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes["5xl"]};
  }
`;

const ScoreSep = styled.span`
  color: ${theme.colors.textTertiary};
  font-weight: 400;
  font-size: ${theme.fontSizes["3xl"]};
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.lg};
  width: 100%;
`;

const TeamName = styled.span`
  font-size: ${theme.fontSizes.base};
  font-weight: 400;
  color: ${theme.colors.textPrimary};
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (min-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.lg};
  }
`;

const HomeTeam = styled(TeamName)`
  text-align: right;
`;

const AwayTeam = styled(TeamName)`
  text-align: left;
`;

export function MatchCard({ match }: MatchCardProps) {
  const displayStatus = getMatchDisplayStatus(match);

  return (
    <Card aria-label={`${match.homeTeam.name} vs ${match.awayTeam.name}`}>
      <CardHeader>
        <Country>{match.country}</Country>
        <Competition>{match.competition}</Competition>
        <StatusLabel displayStatus={displayStatus} />
      </CardHeader>

      <ScoreRow>
        <Score>{formatScore(match.homeScore)}</Score>
        <ScoreSep aria-hidden="true">-</ScoreSep>
        <Score>{formatScore(match.awayScore)}</Score>
      </ScoreRow>

      <BottomRow>
        <HomeTeam>{match.homeTeam.name}</HomeTeam>
        <StatusCircle displayStatus={displayStatus} />
        <AwayTeam>{match.awayTeam.name}</AwayTeam>
      </BottomRow>
    </Card>
  );
}
