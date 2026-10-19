import {
  findIn,
  plainText,
  textPattern,
} from "akasha/temper/player/character/stat/modules/text-pattern/text-pattern.module.code.ts"

export type EnchantProc = {
  readonly damage: number
  readonly healing: number
}

const ENCHANT_PROC_SECONDS = 4

const DEALS_AND_RESTORES = textPattern("deals <n> <w> damage and restores <n> health")

export function readEnchantProc(enchant: string): EnchantProc | undefined {
  const read = findIn(DEALS_AND_RESTORES, plainText(enchant))
  if (read === undefined) return undefined
  return { damage: read[0] ?? 0, healing: read[1] ?? 0 }
}

export function procsIn(tick: number): boolean {
  return (tick + 1) % ENCHANT_PROC_SECONDS === 0
}
