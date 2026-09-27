import { expect, test } from "bun:test"
import { recipeAlchemyFormulaFurnishing } from "akasha/temper/catalog/temper-specialized-item-type/pages/recipe-alchemy-formula-furnishing.temper-specialized-item-type.ts"
import { recipeBlacksmithingDiagramFurnishing } from "akasha/temper/catalog/temper-specialized-item-type/pages/recipe-blacksmithing-diagram-furnishing.temper-specialized-item-type.ts"
import { recipeClothierPatternFurnishing } from "akasha/temper/catalog/temper-specialized-item-type/pages/recipe-clothier-pattern-furnishing.temper-specialized-item-type.ts"
import { recipeEnchantingSchematicFurnishing } from "akasha/temper/catalog/temper-specialized-item-type/pages/recipe-enchanting-schematic-furnishing.temper-specialized-item-type.ts"
import { recipeJewelrycraftingSketchFurnishing } from "akasha/temper/catalog/temper-specialized-item-type/pages/recipe-jewelrycrafting-sketch-furnishing.temper-specialized-item-type.ts"
import { recipeProvisioningDesignFurnishing } from "akasha/temper/catalog/temper-specialized-item-type/pages/recipe-provisioning-design-furnishing.temper-specialized-item-type.ts"
import { recipeProvisioningStandardDrink } from "akasha/temper/catalog/temper-specialized-item-type/pages/recipe-provisioning-standard-drink.temper-specialized-item-type.ts"
import { recipeProvisioningStandardFood } from "akasha/temper/catalog/temper-specialized-item-type/pages/recipe-provisioning-standard-food.temper-specialized-item-type.ts"
import { recipeWoodworkingBlueprintFurnishing } from "akasha/temper/catalog/temper-specialized-item-type/pages/recipe-woodworking-blueprint-furnishing.temper-specialized-item-type.ts"
import type { TemperSpecializedItemType } from "akasha/temper/catalog/temper-specialized-item-type/temper-specialized-item-type.page-type.types.ts"
import { numberedOptions } from "akasha/temper/items/filters/core/modules/search-page-options/search-page-options.module.code.ts"

const SUBTYPES: readonly TemperSpecializedItemType[] = [
  recipeAlchemyFormulaFurnishing,
  recipeBlacksmithingDiagramFurnishing,
  recipeClothierPatternFurnishing,
  recipeEnchantingSchematicFurnishing,
  recipeJewelrycraftingSketchFurnishing,
  recipeProvisioningDesignFurnishing,
  recipeProvisioningStandardDrink,
  recipeProvisioningStandardFood,
  recipeWoodworkingBlueprintFurnishing,
]

test("the specialized item type pages offer the nine recipe subtypes the filter offered by hand", () => {
  expect(numberedOptions(SUBTYPES, (row) => row.esoSpecializedItemTypeNumber)).toEqual([
    { value: "170", label: "Food Recipe" },
    { value: "171", label: "Drink Recipe" },
    { value: "172", label: "Blacksmithing Diagram (Furnishing)" },
    { value: "173", label: "Clothier Pattern (Furnishing)" },
    { value: "174", label: "Enchanting Schematic (Furnishing)" },
    { value: "175", label: "Alchemy Formula (Furnishing)" },
    { value: "176", label: "Provisioning Design (Furnishing)" },
    { value: "177", label: "Woodworking Blueprint (Furnishing)" },
    { value: "178", label: "Jewelrycrafting Sketch (Furnishing)" },
  ])
})
