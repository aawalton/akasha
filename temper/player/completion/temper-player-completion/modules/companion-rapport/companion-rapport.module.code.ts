export const MAX_COMPANION_RAPPORT = 4000

export const COMPANION_RAPPORT_TIER_MAX = 8

export function clampRapportProgress(raw: number): number {
  if (raw < 0) return 0
  if (raw > MAX_COMPANION_RAPPORT) return MAX_COMPANION_RAPPORT
  return raw
}

export function rawRapportToCompanionTier(raw: number): number {
  if (raw >= MAX_COMPANION_RAPPORT) return COMPANION_RAPPORT_TIER_MAX
  if (raw >= 3000) return 7
  if (raw >= 2000) return 6
  if (raw >= 1000) return 5
  if (raw >= 750) return 4
  if (raw >= -2499) return 3
  if (raw >= -3999) return 2
  return 1
}
