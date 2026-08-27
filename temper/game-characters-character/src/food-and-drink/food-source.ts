import { createSourceFile } from "@temper/shared-formula-framework/utils/create-source-file"
import type { FoodOrDrinkTemplate } from "./food-or-drink-source"
import { FOOD } from "./food-source-data"

export const foods = createSourceFile<FoodOrDrinkTemplate>()(FOOD)
