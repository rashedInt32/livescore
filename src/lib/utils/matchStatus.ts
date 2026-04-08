import type { Match, MatchDisplayStatus } from "@/types/match";
import { formatMatchDate } from "@/lib/utils/scoreUtils";

// Detection uses status.type, not liveStatus — the liveStatus for canceled
// matches in the data is 'Canceled' (one L) which would silently fail
// any comparison using the more common 'Cancelled' spelling.
export function getMatchDisplayStatus(match: Match): MatchDisplayStatus {
  switch (match.status.type) {
    case "canceled":
      return { status: "CANCELLED", label: "CANCELLED", isLive: false };

    case "inprogress":
      if (match.liveStatus === "HT") {
        return { status: "HT", label: "HT", isLive: true };
      }
      return { status: "LIVE", label: "LIVE", minute: match.liveStatus, isLive: true };

    case "finished":
      return { status: "FT", label: "ENDED", isLive: false };

    case "notstarted":
      return {
        status: "PREMATCH",
        label: formatMatchDate(match.timestamp),
        isLive: false,
      };
  }
}
