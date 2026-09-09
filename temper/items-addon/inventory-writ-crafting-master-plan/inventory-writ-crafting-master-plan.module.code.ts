export const MASTER_WRIT_BASE_QUALITY = 1

export type MasterWritStepKind = "craft" | "improve"

export function planMasterWritSteps(
  this: void,
  bestMatchQuality: number | undefined,
  targetQuality: number
): MasterWritStepKind[] {
  if (bestMatchQuality !== undefined && bestMatchQuality >= targetQuality) return []

  const needCraft = bestMatchQuality === undefined
  const startQuality = needCraft ? MASTER_WRIT_BASE_QUALITY : bestMatchQuality
  const improveCount = Math.max(0, targetQuality - startQuality)

  const steps: MasterWritStepKind[] = []
  if (needCraft) steps.push("craft")
  for (let i = 0; i < improveCount; i++) {
    steps.push("improve")
  }
  return steps
}

export function planMasterConsumableNeeded(this: void, current: number, max: number): number {
  return Math.max(0, max - current)
}
