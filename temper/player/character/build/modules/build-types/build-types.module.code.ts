import type { PotionId } from "akasha/temper/catalog/alchemy/modules/potion-source/potion-source.module.code.ts"
import type { ChampionPointId } from "akasha/temper/catalog/champion-point/modules/champion-point-source/champion-point-source.module.code.ts"
import type { RaceId } from "akasha/temper/catalog/character-race/modules/races/races.module.code.ts"
import type { SkillSlotId } from "akasha/temper/catalog/skill-kind/modules/skill-slots/skill-slots.module.code.ts"
import type { SkillId } from "akasha/temper/player/character/skill/modules/character-skills/character-skills.module.code.ts"
import type { ScribedSkill } from "akasha/temper/player/character/skill/modules/scribed-skill-types/scribed-skill-types.module.code.ts"
import type { SkillLineId } from "akasha/temper/player/character/skill/line/modules/skill-lines/skill-lines.module.code.ts"
import type { AllianceId } from "akasha/temper/player/character/source/modules/alliances/alliances.module.code.ts"
import type { RoleId } from "akasha/temper/player/character/source/modules/character-roles/character-roles.module.code.ts"
import type { CurseState } from "akasha/temper/player/character/source/modules/curses/curses.module.code.ts"
import type { EsoPlusId } from "akasha/temper/player/character/source/modules/eso-plus-source/eso-plus-source.module.code.ts"
import type { FoodOrDrinkId } from "akasha/temper/player/character/source/modules/food-or-drink-source/food-or-drink-source.module.code.ts"
import type { MundusId } from "akasha/temper/player/character/source/modules/mundus-source/mundus-source.module.code.ts"
import type { TargetArmorId } from "akasha/temper/player/character/source/modules/target-armors/target-armors.module.code.ts"
import type { VampireStageId } from "akasha/temper/player/character/source/modules/vampire-stages/vampire-stages.module.code.ts"
import type { Loadout } from "akasha/temper/player/character/characters-equipment/modules/loadout-types/loadout-types.module.code.ts"
import type { BuildId } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"
import type { ClassId } from "akasha/temper/player/character/formula-framework/modules/class-id/class-id.module.code.ts"

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
