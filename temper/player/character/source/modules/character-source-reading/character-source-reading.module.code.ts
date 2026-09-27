import {
  holdPotions,
  POTION_READS,
  potionRestoresOf,
  potionsOf,
} from "akasha/temper/catalog/alchemy/modules/potion-source/potion-source.module.code.ts"
import {
  CHAMPION_STAR_READS,
  holdChampionStars,
} from "akasha/temper/catalog/champion-point/modules/champion-point-source/champion-point-source.module.code.ts"
import { temperChampionStar } from "akasha/temper/catalog/champion-point/temper-champion-star/temper-champion-star.page-type.ts"
import { temperCurse } from "akasha/temper/catalog/effect/temper-curse/temper-curse.page-type.ts"
import { temperVampireStage } from "akasha/temper/catalog/effect/temper-vampire-stage/temper-vampire-stage.page-type.ts"
import { temperSkillSlot } from "akasha/temper/catalog/skill/slot/temper-skill-slot.page-type.ts"
import {
  holdSkillSlots,
  skillSlotsOf,
} from "akasha/temper/catalog/skill-kind/modules/skill-slots/skill-slots.module.code.ts"
import { temperAlliance } from "akasha/temper/catalog/world/temper-alliance/temper-alliance.page-type.ts"
import { readPotionRestoresFrom } from "akasha/temper/items/rules/core/modules/potion-restore-resolve/potion-restore-resolve.module.code.ts"
import {
  BUFF_OR_DEBUFF_READS,
  buffsAndDebuffsOf,
  holdBuffsAndDebuffs,
} from "akasha/temper/player/character/formula-framework/modules/buff-or-debuff-source/buff-or-debuff-source.module.code.ts"
import { temperCharacterRole } from "akasha/temper/player/character/role/temper-character-role.page-type.ts"
import {
  alliancesOf,
  holdAlliances,
} from "akasha/temper/player/character/source/modules/alliances/alliances.module.code.ts"
import {
  attributesOf,
  holdAttributes,
} from "akasha/temper/player/character/source/modules/attributes-source/attributes-source.module.code.ts"
import {
  holdRoles,
  rolesOf,
} from "akasha/temper/player/character/source/modules/character-roles/character-roles.module.code.ts"
import {
  cursesOf,
  holdCurses,
} from "akasha/temper/player/character/source/modules/curses/curses.module.code.ts"
import {
  esoPlusOf,
  holdEsoPlus,
} from "akasha/temper/player/character/source/modules/eso-plus-source/eso-plus-source.module.code.ts"
import {
  foodOrDrinkOf,
  holdFoodOrDrink,
} from "akasha/temper/player/character/source/modules/food-or-drink-source/food-or-drink-source.module.code.ts"
import {
  holdMundus,
  mundusOf,
} from "akasha/temper/player/character/source/modules/mundus-source/mundus-source.module.code.ts"
import {
  holdVampireStages,
  vampireStagesOf,
} from "akasha/temper/player/character/source/modules/vampire-stages/vampire-stages.module.code.ts"
import { temperAttribute } from "akasha/temper/player/character/source/temper-attribute/temper-attribute.page-type.ts"
import { temperEsoPlus } from "akasha/temper/player/character/source/temper-eso-plus/temper-eso-plus.page-type.ts"
import { temperFoodOrDrink } from "akasha/temper/player/character/source/temper-food-or-drink/temper-food-or-drink.page-type.ts"
import { temperMundusStone } from "akasha/temper/player/character/source/temper-mundus-stone/temper-mundus-stone.page-type.ts"

type Row = Readonly<Record<string, unknown>>

type Read = readonly [string, readonly string[]]

const VAMPIRE_STAGE_FIELDS: readonly string[] = [
  "slug",
  "key",
  "title",
  "displayOrder",
  "esoVampireStageId",
  "description",
  "hashPlace",
]

const ESO_PLUS_FIELDS: readonly string[] = ["slug", "title", "description", "effects", "hashPlace"]

const MUNDUS_FIELDS: readonly string[] = [
  "slug",
  "title",
  "description",
  "esoMundusId",
  "esoIconName",
  "effects",
  "hashPlace",
]

const FOOD_OR_DRINK_FIELDS: readonly string[] = [
  "slug",
  "title",
  "description",
  "icon",
  "foodOrDrinkKind",
  "itemId",
  "abilityId",
  "seconds",
  "level",
  "effects",
  "hashPlace",
]

export const CHARACTER_SOURCE_READS: readonly Read[] = [
  [temperEsoPlus.slug, ESO_PLUS_FIELDS],
  [temperMundusStone.slug, MUNDUS_FIELDS],
  [temperAlliance.slug, ["slug", "title", "esoAllianceId", "hashPlace"]],
  [temperCurse.slug, ["slug", "key", "title", "esoCurseIds", "hashPlace"]],
  [temperVampireStage.slug, VAMPIRE_STAGE_FIELDS],
  [temperAttribute.slug, ["slug", "title", "metric", "value"]],
  [temperFoodOrDrink.slug, FOOD_OR_DRINK_FIELDS],
  [temperCharacterRole.slug, ["slug", "title", "displayOrder"]],
  [temperSkillSlot.slug, ["slug", "title", "hashPlace"]],
  ...BUFF_OR_DEBUFF_READS,
  ...POTION_READS,
  ...CHAMPION_STAR_READS,
]

export function holdCharacterSources(rowsOf: (pageTypeSlug: string) => Iterable<Row>): undefined {
  holdEsoPlus(esoPlusOf(rowsOf(temperEsoPlus.slug)))
  holdMundus(mundusOf(rowsOf(temperMundusStone.slug)))
  holdAlliances(alliancesOf(rowsOf(temperAlliance.slug)))
  holdCurses(cursesOf(rowsOf(temperCurse.slug)))
  holdVampireStages(vampireStagesOf(rowsOf(temperVampireStage.slug)))
  holdAttributes(attributesOf(rowsOf(temperAttribute.slug)))
  holdFoodOrDrink(foodOrDrinkOf(rowsOf(temperFoodOrDrink.slug)))
  holdRoles(rolesOf(rowsOf(temperCharacterRole.slug)))
  holdSkillSlots(skillSlotsOf(rowsOf(temperSkillSlot.slug)))
  holdBuffsAndDebuffs(buffsAndDebuffsOf(rowsOf))
  holdPotions(potionsOf(rowsOf))
  holdChampionStars(rowsOf(temperChampionStar.slug))
  const restores = potionRestoresOf(rowsOf)
  readPotionRestoresFrom(() => restores)
}
