import { FOODDRINK_TO_RECIPE_ITEM_ID_PART_1 } from "./provisioning-recipe-map-1"
import { FOODDRINK_TO_RECIPE_ITEM_ID_PART_2 } from "./provisioning-recipe-map-2"

export const FOODDRINK_TO_RECIPE_ITEM_ID: Readonly<Record<number, number>> = {
  ...FOODDRINK_TO_RECIPE_ITEM_ID_PART_1,
  ...FOODDRINK_TO_RECIPE_ITEM_ID_PART_2,
}
