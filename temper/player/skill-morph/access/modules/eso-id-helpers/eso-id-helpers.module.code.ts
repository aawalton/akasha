import {
  type RaceId,
  races,
} from "akasha/temper/catalog/character-race/modules/races/races.module.code.ts"
import { classes } from "akasha/temper/modules/character-class/character-class.module.code.ts"
import type { ClassId } from "akasha/temper/player/character/formula-framework/modules/class-id/class-id.module.code.ts"
import { skillLineCategoriesSorted } from "akasha/temper/player/character/skill/line/modules/skill-line-category-data/skill-line-category-data.module.code.ts"
import {
  getSkillLineIdsForClass,
  type SkillLineId,
  skillLines,
} from "akasha/temper/player/character/skill/line/modules/skill-lines/skill-lines.module.code.ts"
import { getRacialSkillLineIdForRace } from "akasha/temper/player/character/skill/modules/passive-queries/passive-queries.module.code.ts"

export const ESO_CLASS_ID_TO_CLASS_ID = new Map<number, ClassId>(
  classes.list
    .filter((cls) => cls.esoClassId !== 0)
    .map((cls): [number, ClassId] => [cls.esoClassId, cls.id])
)

export const ESO_RACE_ID_TO_RACE_ID = new Map<number, RaceId>(
  races.list
    .filter((race) => race.esoRaceId !== 0)
    .map((race): [number, RaceId] => [race.esoRaceId, race.id])
)

let byEsoId: {
  readonly from: readonly unknown[]
  readonly ids: ReadonlyMap<number, SkillLineId>
} | null = null

export function skillLineIdOfEso(esoSkillLineId: number): SkillLineId | undefined {
  const from = skillLines.list
  if (byEsoId?.from !== from) {
    const ids = new Map<number, SkillLineId>()
    for (const sl of from) if (sl.esoSkillLineId !== 0) ids.set(sl.esoSkillLineId, sl.id)
    byEsoId = { from, ids }
  }
  return byEsoId.ids.get(esoSkillLineId)
}

export const EXCLUDED_CATEGORIES = new Set(["none", "companion"])
export const EXCLUDED_SKILL_LINES = new Set(["no-skill-line", "alliance-war-emperor"])

export function getApplicableSkillLineIds(classId: ClassId, raceId: RaceId): Set<SkillLineId> {
  const result = new Set<SkillLineId>()

  for (const category of skillLineCategoriesSorted) {
    if (EXCLUDED_CATEGORIES.has(category.id)) continue

    if (category.id === "class") {
      for (const slId of getSkillLineIdsForClass(classId)) {
        result.add(slId)
      }
    } else if (category.id === "racial") {
      const slId = getRacialSkillLineIdForRace(raceId)
      if (slId != null && !EXCLUDED_SKILL_LINES.has(slId)) {
        result.add(slId)
      }
    } else {
      for (const sl of skillLines.list) {
        if (sl.subcategoryId === category.id && !EXCLUDED_SKILL_LINES.has(sl.id)) {
          result.add(sl.id)
        }
      }
    }
  }

  return result
}
