export function formatBagSlots(usedSlots: number, totalSlots: number): string {
  return `${usedSlots}/${totalSlots}`
}

export const BURST_QUIET_SECONDS = 5
export const BURST_FADE_SECONDS = 1

function threeSigFigs(value: number): string {
  if (value >= 100) return value.toFixed(0)
  if (value >= 10) return value.toFixed(1)
  return value.toFixed(2)
}

export function formatSignedGold(delta: number): string {
  const sign = delta < 0 ? "-" : "+"
  const abs = Math.abs(delta)
  let magnitude: string
  if (abs >= 1_000_000) magnitude = `${threeSigFigs(abs / 1_000_000)}M`
  else if (abs >= 1_000) magnitude = `${threeSigFigs(abs / 1_000)}K`
  else magnitude = `${Math.round(abs)}`
  return `${sign}${magnitude}`
}

export interface BurstState {
  amount: number
  lastChangeTime: number
}

export const EMPTY_BURST: BurstState = { amount: 0, lastChangeTime: 0 }

export function applyBurstChange(prev: BurstState, change: number, now: number): BurstState {
  if (change === 0) return prev
  const base = isBurstVisible(prev, now) ? prev.amount : 0
  return { amount: base + change, lastChangeTime: now }
}

export function isBurstVisible(state: BurstState, now: number): boolean {
  if (state.lastChangeTime === 0) return false
  return now - state.lastChangeTime < BURST_QUIET_SECONDS + BURST_FADE_SECONDS
}

export function burstAlpha(state: BurstState, now: number): number {
  if (state.lastChangeTime === 0) return 0
  const elapsed = now - state.lastChangeTime
  if (elapsed < BURST_QUIET_SECONDS) return 1
  const fadeElapsed = elapsed - BURST_QUIET_SECONDS
  if (fadeElapsed >= BURST_FADE_SECONDS) return 0
  return 1 - fadeElapsed / BURST_FADE_SECONDS
}
