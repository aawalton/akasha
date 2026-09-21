import { createWeaponSource } from "akasha/temper/player/character/characters-equipment/modules/weapon-source/weapon-source.module.code.ts"
import type { PipelineStage } from "akasha/temper/player/character/stat/modules/pipeline-types/pipeline-types.module.code.ts"

export const extractWeapons: PipelineStage = (build, context) => {
  if (context.bar === "primary-weapon-bar") {
    const main = build.equipment["primary-weapon-bar"]["main-hand"]
    const off = build.equipment["primary-weapon-bar"]["off-hand"]

    return [
      ...(main.itemType === "weapon" ? [createWeaponSource(main.data)] : []),
      ...(off.itemType === "weapon" ? [createWeaponSource(off.data)] : []),
    ]
  }
  if (context.bar === "backup-weapon-bar") {
    const main = build.equipment["backup-weapon-bar"]["main-hand"]
    const off = build.equipment["backup-weapon-bar"]["off-hand"]

    return [
      ...(main.itemType === "weapon" ? [createWeaponSource(main.data)] : []),
      ...(off.itemType === "weapon" ? [createWeaponSource(off.data)] : []),
    ]
  }
  return []
}
