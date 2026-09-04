import type { CharacterState } from "@akasha/temper-character-build/build-types"
import {
  countArmorPiecesByWeight,
  countSlottedAbilitiesFromLine,
  getRacialSkillLineIdForRace,
  getSkillLineCategory,
  getSlottedSkillLineIds,
  getWeaponTypeIdsForBar,
} from "@akasha/temper-character-skills/passive-queries"
import { getWeaponSkillLineIdsForBar } from "@akasha/temper-character-skills/skill-line-queries"
import type { CurseState } from "@akasha/temper-character-sources/curses"
import type { StandardArmorWeightId } from "@akasha/temper-equipment/armor-weight-ids"
import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"
import { assertNever } from "@akasha/utils-narrow/assert-never"
import type { TranslationContext } from "../pipeline-types/pipeline-types.module.code.ts"

export interface PassiveEligibilityContext {
  raceId: CharacterState["character"]["race"]
  classId: CharacterState["character"]["class"]
  buildSkillLineIds: readonly SkillLineId[]
  curseState: CurseState
  vampireStage: CharacterState["character"]["vampireStage"]
  armorWeightCounts: Record<StandardArmorWeightId, number>
  primaryBarWeaponSkillLineIds: readonly SkillLineId[]
  backupBarWeaponSkillLineIds: readonly SkillLineId[]
  primaryBarWeaponTypeIds: readonly string[]
  backupBarWeaponTypeIds: readonly string[]
  primaryBarSlottedSkillLineIds: readonly SkillLineId[]
  backupBarSlottedSkillLineIds: readonly SkillLineId[]
  primaryBarSlottedCountsByLine: Partial<Record<SkillLineId, number>>
  backupBarSlottedCountsByLine: Partial<Record<SkillLineId, number>>
}

export function buildEligibilityContext(build: CharacterState): PassiveEligibilityContext {
  const primaryBarWeaponSkillLineIds = getWeaponSkillLineIdsForBar(
    build.equipment["primary-weapon-bar"]
  )
  const backupBarWeaponSkillLineIds = getWeaponSkillLineIdsForBar(
    build.equipment["backup-weapon-bar"]
  )

  const primaryBarWeaponTypeIds = getWeaponTypeIdsForBar(build.equipment["primary-weapon-bar"])
  const backupBarWeaponTypeIds = getWeaponTypeIdsForBar(build.equipment["backup-weapon-bar"])

  const primaryBarSlottedSkillLineIds = getSlottedSkillLineIds(build.skills["primary-skill-bar"])
  const backupBarSlottedSkillLineIds = getSlottedSkillLineIds(build.skills["backup-skill-bar"])

  const primaryBarSlottedCountsByLine: Partial<Record<SkillLineId, number>> = {}
  const backupBarSlottedCountsByLine: Partial<Record<SkillLineId, number>> = {}

  for (const skillLineId of primaryBarSlottedSkillLineIds) {
    primaryBarSlottedCountsByLine[skillLineId] = countSlottedAbilitiesFromLine(
      build.skills["primary-skill-bar"],
      skillLineId
    )
  }

  for (const skillLineId of backupBarSlottedSkillLineIds) {
    backupBarSlottedCountsByLine[skillLineId] = countSlottedAbilitiesFromLine(
      build.skills["backup-skill-bar"],
      skillLineId
    )
  }

  return {
    raceId: build.character.race,
    classId: build.character.class,
    buildSkillLineIds: build.character.skillLineIds,
    curseState: build.character.curseState,
    vampireStage: build.character.vampireStage,
    armorWeightCounts: countArmorPiecesByWeight(build.equipment.armor),
    primaryBarWeaponSkillLineIds,
    backupBarWeaponSkillLineIds,
    primaryBarWeaponTypeIds,
    backupBarWeaponTypeIds,
    primaryBarSlottedSkillLineIds,
    backupBarSlottedSkillLineIds,
    primaryBarSlottedCountsByLine,
    backupBarSlottedCountsByLine,
  }
}

export function isPassiveEligible(
  skillLineId: SkillLineId,
  ctx: PassiveEligibilityContext,
  pipelineCtx: TranslationContext
): boolean {
  const category = getSkillLineCategory(skillLineId)

  switch (category) {
    case "racial": {
      const racialSkillLineId = getRacialSkillLineIdForRace(ctx.raceId)
      return skillLineId === racialSkillLineId
    }

    case "class": {
      return ctx.buildSkillLineIds.includes(skillLineId)
    }

    case "weapon": {
      if (pipelineCtx.bar === "primary-weapon-bar") {
        return ctx.primaryBarWeaponSkillLineIds.includes(skillLineId)
      }
      if (pipelineCtx.bar === "backup-weapon-bar") {
        return ctx.backupBarWeaponSkillLineIds.includes(skillLineId)
      }
      return (
        ctx.primaryBarWeaponSkillLineIds.includes(skillLineId) ||
        ctx.backupBarWeaponSkillLineIds.includes(skillLineId)
      )
    }

    case "armor": {
      const armorWeightMap: Partial<Record<SkillLineId, StandardArmorWeightId>> = {
        "armor-heavy-armor": "heavy",
        "armor-medium-armor": "medium",
        "armor-light-armor": "light",
      }
      const armorWeight = armorWeightMap[skillLineId]
      if (armorWeight != null) {
        return ctx.armorWeightCounts[armorWeight] > 0
      }
      return false
    }

    case "world": {
      if (skillLineId === "world-vampire") {
        return ctx.curseState === "vampire"
      }
      if (skillLineId === "world-werewolf") {
        return false
      }
      return true
    }

    case "guild":
    case "alliance-war": {
      return true
    }

    case "craft": {
      return false
    }

    case "none":
      return false

    case "companion":
      return false

    default:
      assertNever(category)
  }
}
