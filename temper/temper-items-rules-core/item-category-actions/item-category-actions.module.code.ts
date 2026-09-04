import type { ItemAction } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryConfig } from "../inventory-settings-types/inventory-settings-types.module.code.ts"
import { INVENTORY_CONFIG_DEFAULTS } from "../inventory-settings-types/inventory-settings-types.module.code.ts"
import type { RuleConditionStates } from "../rule-condition-states/rule-condition-states.module.code.ts"

export type ItemCategoryActions = Pick<
  InventoryConfig,
  | "trash"
  | "usedBait"
  | "otherLures"
  | "stolenTreasures"
  | "nonStolenTreasures"
  | "emptyGems"
  | "foodAndDrink"
  | "foodAndDrinkMaxQuality"
  | "potions"
  | "poisons"
  | "poisonSolvents"
  | "glyphs"
  | "glyphsMaxQuality"
  | "knownRecipes"
  | "knownRecipesMaxQuality"
  | "treasureMaps"
  | "museumPieces"
  | "disguises"
  | "monsterTrophies"
  | "rareFish"
>

export function buildItemCategoryActions(
  action: (nodeId: string) => ItemAction | false,
  states: RuleConditionStates
): ItemCategoryActions {
  const d = INVENTORY_CONFIG_DEFAULTS

  return {
    trash: action("trash"),
    usedBait: action("lures"),
    otherLures: action("lures"),
    stolenTreasures: states.stolen["treasure"] ?? action("treasure") ?? false,
    nonStolenTreasures: states.notStolen["treasure"] ?? action("treasure") ?? false,
    emptyGems: action("soul-gems"),

    foodAndDrink: action("food") || action("drink"),
    foodAndDrinkMaxQuality: d.foodAndDrinkMaxQuality,

    potions: action("potions"),
    poisons: action("poisons"),
    poisonSolvents: action("poison-solvents"),
    glyphs: action("glyphs"),
    glyphsMaxQuality: d.glyphsMaxQuality,

    knownRecipes: states.known["recipes"] ?? action("recipes"),
    knownRecipesMaxQuality: d.knownRecipesMaxQuality,

    treasureMaps: action("treasure-maps"),
    museumPieces: action("museum-pieces"),
    disguises: action("disguises"),
    monsterTrophies: states.known["monster-trophies"] ?? action("monster-trophies"),
    rareFish: states.known["rare-fish"] ?? action("rare-fish"),
  }
}
