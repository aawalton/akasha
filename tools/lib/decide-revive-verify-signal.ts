
export type ReviveVerifySignal = "revived" | "unverified" | "failed" | "benign"

export function classifyReviveVerifyExit(exitCode: number): ReviveVerifySignal {
  if (exitCode === 0) return "revived"
  if (exitCode === 3) return "unverified"
  return "failed"
}
