export type CompanionStatsPanelState =
  | "no-companion"
  | "calculating"
  | "calculation-failed"
  | "no-stats"
  | "stats"

export interface CompanionStatsPanelInput {
  hasCompanion: boolean
  isLoading: boolean
  hasError: boolean
  statCount: number
}

export function deriveCompanionStatsPanelState(
  input: CompanionStatsPanelInput
): CompanionStatsPanelState {
  if (!input.hasCompanion) return "no-companion"
  if (input.isLoading) return "calculating"
  if (input.hasError) return "calculation-failed"
  if (input.statCount === 0) return "no-stats"
  return "stats"
}
