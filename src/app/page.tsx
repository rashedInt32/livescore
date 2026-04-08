import matchesData from "../../public/sports.json";
import type { Match } from "@/types/match";
import { AppShell } from "@/components/AppShell";

export default function Home() {
  const matches = matchesData as Match[];
  return <AppShell matches={matches} />;
}
