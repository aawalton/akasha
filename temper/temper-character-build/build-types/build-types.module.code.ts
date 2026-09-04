import type { PotionId } from "@akasha/temper-alchemy/potion-source"
import type { ChampionPointId } from "@akasha/temper-champion-points/champion-point-source"
import type { SkillId } from "@akasha/temper-character-skills/character-skills"
import type { ScribedSkill } from "@akasha/temper-character-skills/scribed-skill-types"
import type { AllianceId } from "@akasha/temper-character-sources/alliances"
import type { RoleId } from "@akasha/temper-character-sources/character-roles"
import type { CurseState } from "@akasha/temper-character-sources/curses"
import type { EsoPlusId } from "@akasha/temper-character-sources/eso-plus-source"
import type { FoodOrDrinkId } from "@akasha/temper-character-sources/food-or-drink-source"
import type { MundusId } from "@akasha/temper-character-sources/mundus-source"
import type { TargetArmorId } from "@akasha/temper-character-sources/target-armors"
import type { VampireStageId } from "@akasha/temper-character-sources/vampire-stages"
import type { Loadout } from "@akasha/temper-characters-equipment/loadout-types"
import type { BuildId } from "@akasha/temper-formula-framework/branded-id"
import type { ClassId } from "@akasha/temper-formula-framework/class-id"
import type { RaceId } from "@akasha/temper-races/races"
import type { SkillSlotId } from "@akasha/temper-skill-kinds/skill-slots"
import type { SkillLineId } from "@akasha/temper-skill-lines/skill-lines"

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

export type CharacterVisibility = "private" | "unlisted" | "public" | "live" | "target"

export function toCharacterVisibility(value: string | undefined): CharacterVisibility {
  if (value === "public" || value === "unlisted" || value === "live" || value === "target")
    return value
  return "private"
}
