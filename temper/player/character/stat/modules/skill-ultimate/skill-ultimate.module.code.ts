import type { Heroism } from "akasha/temper/player/character/stat/modules/rotation-healing/rotation-healing.module.code.ts"

const COLOR = /\|c[0-9a-fA-F]{6}|\|r/g

const HEROISM = /Heroism for (\d+) seconds?.*?generating (\d+) Ultimate every ([\d.]+) seconds?/i

const PER_POINT_SPENT = /for each point of the Ultimate spent/i

const CURRENT_HEALTH = /Current amount: (\d+) Health/i

function plain(description: string): string {
  return description.replace(COLOR, "").replace(/\s+/g, " ")
}

export function readHeroism(description: string): Heroism | undefined {
  const read = HEROISM.exec(plain(description))
  if (read === null) return undefined
  return {
    ultimate: Number(read[2]),
    everySeconds: Number(read[3]),
    lastsSeconds: Number(read[1]),
  }
}

export function readHealingPerUltimatePoint(description: string): number | undefined {
  const text = plain(description)
  if (!PER_POINT_SPENT.test(text)) return undefined
  const read = CURRENT_HEALTH.exec(text)
  return read === null ? undefined : Number(read[1])
}
