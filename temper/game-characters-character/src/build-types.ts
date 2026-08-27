import type { ChampionPointId } from "@temper/game-characters-champion-points/champion-points-source"
import type { ClassId } from "@temper/game-characters-classes/classes-data"
import type { Loadout } from "@temper/game-characters-equipment/loadout/loadout-types"
import type { RaceId } from "@temper/game-characters-races/races"
import type { SkillLineId } from "@temper/game-characters-skill-lines/skill-lines-data"
import type { ScribedSkill } from "@temper/game-characters-skills/scribing/scribed-skill-types"
import type { SkillSlotId } from "@temper/game-characters-skills/skill-slots-data"
import type { SkillId } from "@temper/game-characters-skills/skills-data"
import type { PotionId } from "@temper/game-items-alchemy/potions-source"
import type { BuildId } from "@temper/shared-formula-framework/branded"
import type { EsoPlusId } from "./account/eso-plus-source"
import type { AllianceId } from "./alliances-data"
import type { CurseState } from "./curse-data"
import type { FoodOrDrinkId } from "./food-and-drink/food-or-drink-source"
import type { MundusId } from "./mundus-source"
import type { RoleId } from "./roles"
import type { TargetArmorId } from "./target-armor-data"
import type { VampireStageId } from "./vampire-stages-data"

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
