import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { createWeaponSource } from "akasha/temper/player/character/characters-equipment/modules/weapon-source/weapon-source.module.code.ts"
import { isMetricEffect } from "akasha/temper/player/character/formula-framework/modules/effect/effect.module.code.ts"
import { skills } from "akasha/temper/player/character/skill/modules/character-skills/character-skills.module.code.ts"
import type { PipelineStage } from "akasha/temper/player/character/stat/modules/pipeline-types/pipeline-types.module.code.ts"

type Bar = "primary-weapon-bar" | "backup-weapon-bar"

const OFF_HAND_POWER_SHARE = 0.177

const DUAL_WIELD_EXPERT = "dual-wield-expert"

const DUAL_WIELD_EXPERT_SHARE_PER_RANK = 0.03

function dualWieldExpertRank(build: CharacterState): number {
  if (!build.passives.includes(DUAL_WIELD_EXPERT)) return 0
  return build.passiveRanks?.[DUAL_WIELD_EXPERT] ?? skills.data[DUAL_WIELD_EXPERT]?.rank ?? 0
}

function offHandPowerShare(build: CharacterState): number {
  return OFF_HAND_POWER_SHARE + DUAL_WIELD_EXPERT_SHARE_PER_RANK * dualWieldExpertRank(build)
}

function weaponsOn(build: CharacterState, bar: Bar) {
  const main = build.equipment[bar]["main-hand"]
  const off = build.equipment[bar]["off-hand"]
  return [
    ...(main.itemType === "weapon" ? [createWeaponSource(main.data, 1)] : []),
    ...(off.itemType === "weapon" ? [createWeaponSource(off.data, offHandPowerShare(build))] : []),
  ]
}

function heldWhileBuffs(effect: unknown): boolean {
  return isMetricEffect(effect) && effect.whileBuffs !== undefined
}

function procsCarriedOver(build: CharacterState, bar: Bar) {
  return weaponsOn(build, bar)
    .map((weapon) => ({ ...weapon, effects: weapon.effects.filter(heldWhileBuffs) }))
    .filter((weapon) => weapon.effects.length > 0)
}

export const extractWeapons: PipelineStage = (build, context) => {
  if (context.bar === "primary-weapon-bar") {
    return [
      ...weaponsOn(build, "primary-weapon-bar"),
      ...procsCarriedOver(build, "backup-weapon-bar"),
    ]
  }
  if (context.bar === "backup-weapon-bar") {
    return [
      ...weaponsOn(build, "backup-weapon-bar"),
      ...procsCarriedOver(build, "primary-weapon-bar"),
    ]
  }
  return []
}
