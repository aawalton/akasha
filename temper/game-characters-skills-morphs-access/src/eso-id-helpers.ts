import type { ClassId } from "@temper/game-characters-classes/classes-data"
import { classes } from "@temper/game-characters-classes/classes-data"
import type { RaceId } from "@temper/game-characters-races/races"
import { races } from "@temper/game-characters-races/generated/temper-race.generated"
import { skillLineCategoriesSorted } from "@temper/game-characters-skill-lines/skill-line-categories"
import type { SkillLineId } from "@temper/game-characters-skill-lines/skill-lines-data"
import { getSkillLineIdsForClass } from "@temper/game-characters-skill-lines/skill-lines-data"
import { skillLines } from "@temper/game-characters-skill-lines/generated/temper-skill-line.generated"
import { getRacialSkillLineIdForRace } from "@temper/game-characters-skills/passive-queries"

export const esoClassIdToClassId = new Map<number, ClassId>()
for (const cls of classes.list) {
  if (cls.esoClassId !== 0) esoClassIdToClassId.set(cls.esoClassId, cls.id)
}

export const esoRaceIdToRaceId = new Map<number, RaceId>()
for (const race of races.list) {
  if (race.esoRaceId !== 0) esoRaceIdToRaceId.set(race.esoRaceId, race.id)
}

export const esoSkillLineIdToSkillLineId = new Map<number, SkillLineId>()
for (const sl of skillLines.list) {
  if (sl.esoSkillLineId !== 0) esoSkillLineIdToSkillLineId.set(sl.esoSkillLineId, sl.id)
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
