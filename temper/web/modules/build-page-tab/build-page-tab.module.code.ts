export type TabValue = "plan" | "build" | "browse" | "leaderboard"

export function isValidTab(value: unknown): value is TabValue {
  return value === "plan" || value === "build" || value === "browse" || value === "leaderboard"
}
