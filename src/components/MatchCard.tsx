"use client";

import styled from "styled-components";
import { theme } from "@/styles/theme";
import type { Match } from "@/types/match";
import { getMatchDisplayStatus } from "@/lib/utils/matchStatus";
import { StatusLabel, StatusCircle } from "@/components/StatusBadge";
import { getCurrentScore, formatScore } from "@/lib/utils/scoreUtils";

interface MatchCardProps {
  match: Match;
}

const Card = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${theme.spacing.lg} ${theme.spacing.md};
  background: ${theme.colors.card};
  border-radius: ${theme.borderRadius.lg};
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
  font-weight: 500;
  color: ${theme.colors.textTertiary};
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
  font-weight: 700;
`;

const Score = styled.span<{ $winner: boolean }>`
  font-size: ${theme.fontSizes["4xl"]};
  color: ${({ $winner }: { $winner: boolean }) =>
    $winner ? theme.colors.winner : theme.colors.textPrimary};
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

const TeamName = styled.span<{ $winner: boolean }>`
  font-size: ${theme.fontSizes.sm};
  font-weight: ${({ $winner }: { $winner: boolean }) => ($winner ? "700" : "400")};
  color: ${({ $winner }: { $winner: boolean }) =>
    $winner ? theme.colors.textPrimary : theme.colors.textSecondary};
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (min-width: ${theme.breakpoints.md}) {
    font-size: ${theme.fontSizes.base};
  }
`;

const HomeTeam = styled(TeamName)`
  text-align: right;
`;

const AwayTeam = styled(TeamName)`
  text-align: left;
`;

function getWinners(match: Match) {
  if (match.status.type !== "finished") return { homeWins: false, awayWins: false };

  const homeGoals = getCurrentScore(match.homeScore);
  const awayGoals = getCurrentScore(match.awayScore);
  if (homeGoals === null || awayGoals === null) return { homeWins: false, awayWins: false };

  return {
    homeWins: homeGoals > awayGoals,
    awayWins: awayGoals > homeGoals,
  };
}

export function MatchCard({ match }: MatchCardProps) {
  const displayStatus = getMatchDisplayStatus(match);
  const { homeWins, awayWins } = getWinners(match);

  return (
    <Card aria-label={`${match.homeTeam.name} vs ${match.awayTeam.name}`}>
      <CardHeader>
        <Country>{match.country}</Country>
        <Competition>{match.competition}</Competition>
        <StatusLabel displayStatus={displayStatus} />
      </CardHeader>

      <ScoreRow>
        <Score $winner={homeWins}>{formatScore(match.homeScore)}</Score>
        <ScoreSep aria-hidden="true">-</ScoreSep>
        <Score $winner={awayWins}>{formatScore(match.awayScore)}</Score>
      </ScoreRow>

      <BottomRow>
        <HomeTeam $winner={homeWins}>{match.homeTeam.name}</HomeTeam>
        <StatusCircle displayStatus={displayStatus} />
        <AwayTeam $winner={awayWins}>{match.awayTeam.name}</AwayTeam>
      </BottomRow>
    </Card>
  );
}
