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

function byEsoIdOver<Row extends { readonly id: string }>(
  rows: () => readonly Row[],
  esoIdOf: (row: Row) => number
): (esoId: number) => Row["id"] | undefined {
  let held: {
    readonly from: readonly Row[]
    readonly ids: ReadonlyMap<number, Row["id"]>
  } | null = null
  return (esoId) => {
    const from = rows()
    if (held?.from !== from) {
      const ids = new Map<number, Row["id"]>()
      for (const row of from) if (esoIdOf(row) !== 0) ids.set(esoIdOf(row), row.id)
      held = { from, ids }
    }
    return held.ids.get(esoId)
  }
}

const classOfEso = byEsoIdOver(
  () => classes.list,
  (one) => one.esoClassId
)

const raceOfEso = byEsoIdOver(
  () => races.list,
  (one) => one.esoRaceId
)

const skillLineOfEso = byEsoIdOver(
  () => skillLines.list,
  (one) => one.esoSkillLineId
)

export function classIdOfEso(esoClassId: number): ClassId | undefined {
  return classOfEso(esoClassId)
}

export function raceIdOfEso(esoRaceId: number): RaceId | undefined {
  return raceOfEso(esoRaceId)
}

export function skillLineIdOfEso(esoSkillLineId: number): SkillLineId | undefined {
  return skillLineOfEso(esoSkillLineId)
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
