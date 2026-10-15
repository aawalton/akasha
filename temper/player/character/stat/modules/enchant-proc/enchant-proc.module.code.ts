export type EnchantProc = {
  readonly damage: number
  readonly healing: number
}

export const ENCHANT_PROC_SECONDS = 4

const COLOR = /\|c[0-9a-fA-F]{6}|\|r/g

const DEALS_AND_RESTORES = /Deals (\d+) \w+ Damage and restores (\d+) Health/i

export function readEnchantProc(enchant: string): EnchantProc | undefined {
  const read = DEALS_AND_RESTORES.exec(enchant.replace(COLOR, ""))
  if (read === null) return undefined
  return { damage: Number(read[1]), healing: Number(read[2]) }
}

export function procsWithin(fightSeconds: number): number {
  return Math.floor(fightSeconds / ENCHANT_PROC_SECONDS)
}
