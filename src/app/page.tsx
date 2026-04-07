import matchesData from "../../public/sports.json";
import type { Match } from "@/types/match";

export default function Home() {
  const matches = matchesData as Match[];
  return <div>{matches.length} matches loaded</div>;
}
