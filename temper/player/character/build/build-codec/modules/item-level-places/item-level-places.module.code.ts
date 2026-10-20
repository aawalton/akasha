import type { ItemLevel } from "akasha/temper/player/character/characters-equipment/modules/item-composites/item-composites.module.code.ts"

export const ITEM_LEVEL_BITS = 7

const HIGHEST_CHARACTER_LEVEL = 50

const CHAMPION_POINTS_STEP = 10

const CHAMPION_LEVELS: readonly ItemLevel[] = [
  "CP10",
  "CP20",
  "CP30",
  "CP40",
  "CP50",
  "CP60",
  "CP70",
  "CP80",
  "CP90",
  "CP100",
  "CP110",
  "CP120",
  "CP130",
  "CP140",
  "CP150",
  "CP160",
]

export function itemLevelPlaceOfRequired(level: number, championPoints: number): number {
  if (championPoints > 0) {
    const step = Math.floor(championPoints / CHAMPION_POINTS_STEP)
    return HIGHEST_CHARACTER_LEVEL + Math.max(1, Math.min(CHAMPION_LEVELS.length, step))
  }
  if (level < 1) return 0
  return Math.min(HIGHEST_CHARACTER_LEVEL, Math.floor(level))
}

export function itemLevelPlaceOf(level: ItemLevel | undefined): number {
  if (level === undefined) return 0
  if (typeof level === "number") {
    const whole = Math.floor(level) === level
    return whole && level >= 1 && level <= HIGHEST_CHARACTER_LEVEL ? level : 0
  }
  const at = CHAMPION_LEVELS.indexOf(level)
  return at === -1 ? 0 : HIGHEST_CHARACTER_LEVEL + 1 + at
}

export function itemLevelOfPlace(place: number): ItemLevel | undefined {
  if (place < 1) return undefined
  if (place <= HIGHEST_CHARACTER_LEVEL) return place
  return CHAMPION_LEVELS[place - HIGHEST_CHARACTER_LEVEL - 1]
}
