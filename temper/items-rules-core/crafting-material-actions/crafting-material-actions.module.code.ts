import type { ItemAction } from "../inventory-rule-types/inventory-rule-types.module.code.ts"
import type { InventoryConfig } from "../inventory-settings-types/inventory-settings-types.module.code.ts"
import { INVENTORY_CONFIG_DEFAULTS } from "../inventory-settings-types/inventory-settings-types.module.code.ts"

export type CraftingMaterialActions = Pick<
  InventoryConfig,
  "crafting" | "enchanting" | "ingredients" | "styleMaterials" | "traitMaterials" | "furnishing"
>

export function buildCraftingMaterialActions(
  action: (nodeId: string) => ItemAction | false
): CraftingMaterialActions {
  const d = INVENTORY_CONFIG_DEFAULTS

  return {
    crafting: {
      blacksmithingRaw: action("bs-raw"),
      blacksmithing: action("bs-refined"),
      clothingRaw: action("cl-raw"),
      clothing: action("cl-refined"),
      woodworkingRaw: action("ww-raw"),
      woodworking: action("ww-refined"),
      jewelryRaw: action("jc-raw"),
      jewelry: action("jc-refined"),
    },

    enchanting: {
      potencyRunes: action("potency-runestones"),
      essenceRunes: action("essence-runestones"),
      aspectRunes: action("aspect-runestones"),
      aspectMaxQuality: d.enchanting.aspectMaxQuality,
    },

    ingredients: {
      mode: action("ingredients") ? "all" : "off",
      excludeRareAdditives: d.ingredients.excludeRareAdditives,
    },

    styleMaterials: action("style-materials")
      ? Object.fromEntries(
          Object.keys(d.styleMaterials).map((id) => [id, action("style-materials")])
        )
      : {},

    traitMaterials: action("trait-items")
      ? Object.fromEntries(Object.keys(d.traitMaterials).map((id) => [id, action("trait-items")]))
      : {},

    furnishing: {
      regulus: action("bs-furn-mat"),
      bast: action("cl-furn-mat"),
      cleanPelt: action("cl-furn-mat"),
      heartwood: action("ww-furn-mat"),
      alchResin: action("al-furn-mat"),
      mundRune: action("en-furn-mat"),
      decWax: action("pr-furn-mat"),
      ochre: action("jc-furn-mat"),
    },
  }
}
