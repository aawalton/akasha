import type { Heroism } from "akasha/temper/player/character/stat/modules/rotation-healing/rotation-healing.module.code.ts"

import {
  findIn,
  plainText,
  textPattern,
} from "akasha/temper/player/character/stat/modules/text-pattern/text-pattern.module.code.ts"

const HEROISM = textPattern(
  "heroism for <n> second[s]<*>generating <n> ultimate every <d> second[s]"
)

const PER_POINT_SPENT = textPattern("for {each point of the|every} ultimate spent")

const CURRENT_HEALTH = textPattern("current amount: <n> health")

export function readHeroism(description: string): Heroism | undefined {
  const read = findIn(HEROISM, plainText(description))
  if (read === undefined) return undefined
  return {
    ultimate: read[1] ?? 0,
    everySeconds: read[2] ?? 0,
    lastsSeconds: read[0] ?? 0,
  }
}

export function readHealingPerUltimatePoint(description: string): number | undefined {
  const text = plainText(description)
  if (findIn(PER_POINT_SPENT, text) === undefined) return undefined
  return findIn(CURRENT_HEALTH, text)?.[0]
}
