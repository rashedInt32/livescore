"use client";

import styled, { css, keyframes } from "styled-components";
import { theme } from "@/styles/theme";
import type { DisplayStatus, MatchDisplayStatus } from "@/types/match";
import { getProgressDeg } from "@/lib/utils/scoreUtils";

// --- StatusLabel: coloured text at the top of the card ---

const LABEL_COLORS: Record<DisplayStatus, string> = {
  LIVE: theme.colors.live,
  HT: theme.colors.warning,
  FT: theme.colors.success,
  CANCELLED: theme.colors.live,
  PREMATCH: theme.colors.textSecondary,
};

const LabelText = styled.span<{ $status: DisplayStatus }>`
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: ${({ $status }: { $status: DisplayStatus }) => LABEL_COLORS[$status]};
`;

interface StatusLabelProps {
  displayStatus: MatchDisplayStatus;
}

export function StatusLabel({ displayStatus }: StatusLabelProps) {
  const { status, label, isLive } = displayStatus;

  return (
    <LabelText $status={status} aria-live={isLive ? "polite" : undefined}>
      {label}
    </LabelText>
  );
}

// --- StatusCircle: the round indicator between team names ---

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50%      { opacity: 0.5; }
`;

const CIRCLE_SIZE = "48px";
const CIRCLE_BORDER = "2px";
const CIRCLE_INSET = "3px";
const PULSE_SIZE = "6px";
const PULSE_OFFSET = "-2px";

const CircleBase = styled.div`
  width: ${CIRCLE_SIZE};
  height: ${CIRCLE_SIZE};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.fonts.primary};
  font-size: ${theme.fontSizes.xs};
  font-weight: 700;
  flex-shrink: 0;
`;

const overlayCenter = css`
  color: ${theme.colors.textPrimary};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: ${CIRCLE_INSET};
    border-radius: 50%;
    background: ${theme.colors.card};
  }

  span {
    position: relative;
    z-index: 1;
  }
`;

const LiveCircle = styled(CircleBase)`
  border: ${CIRCLE_BORDER} solid ${theme.colors.border};
  background: conic-gradient(
    ${theme.colors.success} 0deg var(--progress, 0deg),
    transparent var(--progress, 0deg) 360deg
  );
  background-clip: padding-box;
  ${overlayCenter}
`;

const HTCircle = styled(CircleBase)`
  border: ${CIRCLE_BORDER} solid ${theme.colors.warning};
  background: conic-gradient(
    ${theme.colors.warning} 0deg 180deg,
    transparent 180deg 360deg
  );
  ${overlayCenter}
`;

const FTCircle = styled(CircleBase)`
  border: ${CIRCLE_BORDER} solid ${theme.colors.success};
  color: ${theme.colors.success};
`;

const EmptyCircle = styled(CircleBase)`
  border: ${CIRCLE_BORDER} solid ${theme.colors.border};
  color: ${theme.colors.textTertiary};
`;

const PulseDot = styled.div`
  width: ${PULSE_SIZE};
  height: ${PULSE_SIZE};
  border-radius: 50%;
  background: ${theme.colors.live};
  animation: ${pulse} 1.5s ease-in-out infinite;
  position: absolute;
  top: ${PULSE_OFFSET};
  right: ${PULSE_OFFSET};
  z-index: 2;
`;

const LiveCircleWrapper = styled.div`
  position: relative;
  display: inline-flex;
`;

interface StatusCircleProps {
  displayStatus: MatchDisplayStatus;
}

export function StatusCircle({ displayStatus }: StatusCircleProps) {
  const { status, label } = displayStatus;

  switch (status) {
    case "LIVE": {
      const deg = getProgressDeg(label);
      return (
        <LiveCircleWrapper>
          <PulseDot aria-hidden="true" />
          <LiveCircle
            style={{ "--progress": `${deg}deg` } as React.CSSProperties}
            aria-label={`Match minute ${label}`}
          >
            <span>{label}'</span>
          </LiveCircle>
        </LiveCircleWrapper>
      );
    }
    case "HT":
      return (
        <HTCircle aria-label="Half time">
          <span>HT</span>
        </HTCircle>
      );
    case "FT":
      return (
        <FTCircle aria-label="Full time">
          <span>FT</span>
        </FTCircle>
      );
    case "CANCELLED":
    case "PREMATCH":
      return <EmptyCircle aria-hidden="true" />;
  }
}
