export function convertRatingToChance(
  value: number,
  divisor: number,
  cap?: number,
  floorIncrement?: number
): number {
  const uncapped = value / divisor
  const capped = cap !== undefined ? Math.min(cap, uncapped) : uncapped
  if (floorIncrement !== undefined) {
    return Math.floor(capped / floorIncrement) * floorIncrement
  }
  return capped
}

export interface RatingSurplusInfo {
  effectiveValue: number
  rawValue: number
  surplusRating: number
  ratingToNextThreshold: number
  floorIncrement: number
}

export function calculateRatingSurplus(
  rating: number,
  divisor: number,
  cap: number,
  floorIncrement: number
): RatingSurplusInfo {
  const rawValue = Math.min(cap, rating / divisor)
  const effectiveValue = Math.floor(rawValue / floorIncrement) * floorIncrement
  const effectiveRating = effectiveValue * divisor
  const surplusRating = rating - effectiveRating
  const nextThreshold = Math.min(cap, effectiveValue + floorIncrement)
  const ratingToNextThreshold = nextThreshold * divisor - rating

  return {
    effectiveValue,
    rawValue,
    surplusRating,
    ratingToNextThreshold: Math.max(0, ratingToNextThreshold),
    floorIncrement,
  }
}
