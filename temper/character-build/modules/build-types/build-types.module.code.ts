import type { PotionId } from "akasha/temper/alchemy/potion-source/potion-source.module.code.ts"
import type { ChampionPointId } from "akasha/temper/champion-points/modules/champion-point-source/champion-point-source.module.code.ts"
import type { SkillId } from "akasha/temper/character-skills/modules/character-skills/character-skills.module.code.ts"
import type { ScribedSkill } from "akasha/temper/character-skills/scribed-skill-types/scribed-skill-types.module.code.ts"
import type { CurseState } from "akasha/temper/character-sources/curses/curses.module.code.ts"
import type { EsoPlusId } from "akasha/temper/character-sources/eso-plus-source/eso-plus-source.module.code.ts"
import type { FoodOrDrinkId } from "akasha/temper/character-sources/food-or-drink-source/food-or-drink-source.module.code.ts"
import type { AllianceId } from "akasha/temper/character-sources/modules/alliances/alliances.module.code.ts"
import type { RoleId } from "akasha/temper/character-sources/modules/character-roles/character-roles.module.code.ts"
import type { MundusId } from "akasha/temper/character-sources/mundus-source/mundus-source.module.code.ts"
import type { TargetArmorId } from "akasha/temper/character-sources/target-armors/target-armors.module.code.ts"
import type { VampireStageId } from "akasha/temper/character-sources/vampire-stages/vampire-stages.module.code.ts"
import type { Loadout } from "akasha/temper/characters-equipment/loadout-types/loadout-types.module.code.ts"
import type { ClassId } from "akasha/temper/formula-framework/class-id/class-id.module.code.ts"
import type { BuildId } from "akasha/temper/formula-framework/modules/branded-id/branded-id.module.code.ts"
import type { RaceId } from "akasha/temper/races/races/races.module.code.ts"
import type { SkillSlotId } from "akasha/temper/skill-kinds/skill-slots/skill-slots.module.code.ts"
import type { SkillLineId } from "akasha/temper/skill-lines/skill-lines/skill-lines.module.code.ts"

export interface CharacterState {
  id: BuildId
  name: string
  description: string
  character: {
    name: string
    roles: readonly RoleId[]
    class: ClassId
    race: RaceId
    alliance: AllianceId
    skillLineIds: readonly SkillLineId[]
    attributes: {
      magicka: number
      health: number
      stamina: number
    }
    curseState: CurseState
    vampireStage: VampireStageId
    mundusStone: MundusId
  }
  equipment: Loadout
  skills: {
    "primary-skill-bar": Record<SkillSlotId, SkillId>
    "backup-skill-bar": Record<SkillSlotId, SkillId>
  }
  passives: readonly SkillId[]
  scribing: readonly ScribedSkill[]
  championPoints: {
    warfare: {
      passive: readonly ChampionPointId[]
      slotted: readonly ChampionPointId[]
    }
    fitness: {
      passive: readonly ChampionPointId[]
      slotted: readonly ChampionPointId[]
    }
    craft: {
      passive: readonly ChampionPointId[]
      slotted: readonly ChampionPointId[]
    }
  }
  consumables: {
    foodOrDrink: FoodOrDrinkId
    potion: PotionId
    potion2: PotionId
  }
  target: {
    armor: TargetArmorId
    health: number
    targetCount: number
  }
  account: {
    esoPlus: EsoPlusId
  }
}
