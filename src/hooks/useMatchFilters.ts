import { useState, useMemo } from "react";
import type { Match, FilterType, FilterCounts } from "@/types/match";
import {
  filterMatches,
  calculateFilterCounts,
} from "@/lib/utils/filterMatches";

interface UseMatchFiltersReturn {
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
  counts: FilterCounts;
  filteredMatches: Match[];
}

export function useMatchFilters(
  matches: readonly Match[],
): UseMatchFiltersReturn {
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL");

  const counts = useMemo(() => calculateFilterCounts(matches), [matches]);

  const filteredMatches = useMemo(
    () => filterMatches(matches, activeFilter),
    [matches, activeFilter],
  );

  return { activeFilter, setActiveFilter, counts, filteredMatches };
}
