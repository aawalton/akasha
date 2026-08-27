import { foodDrink } from "./i18n"
import { add as logAdd } from "./log"
import { matRowFromLink } from "./mat-row"
import { FOODDRINK_TO_RECIPE_ITEM_ID } from "./provisioning-recipe-map"
import type { MatList } from "./types"
import { fail } from "./util"

export interface Recipe {
  class: string
  fooddrink_item_id: number | undefined
  recipe_item_id: number | undefined
  recipe_link: string | undefined
  is_known: boolean | undefined
  mat_list: MatList
  fooddrink_link: string | undefined
  fooddrink_name: string | undefined
  fooddrink_item_type?: number | undefined
  fooddrink_specialized_item_type?: number | undefined
}

interface RecipeArgs {
  fooddrink_item_id?: number | undefined
  recipe_item_id?: number | undefined
  recipe_link?: string | undefined
  is_known?: boolean | undefined
}

export function newRecipe(args: RecipeArgs): Recipe {
  return {
    class: "provisioning",
    fooddrink_item_id: args.fooddrink_item_id,
    recipe_item_id: args.recipe_item_id,
    recipe_link: args.recipe_link,
    is_known: args.is_known,
    mat_list: [],
    fooddrink_link: undefined,
    fooddrink_name: undefined,
  }
}

export function recipeFromFoodDrinkItemId(fooddrink_item_id: number): Recipe | undefined {
  const o = newRecipe({ fooddrink_item_id })
  o.recipe_item_id = FOODDRINK_TO_RECIPE_ITEM_ID[fooddrink_item_id]
  if (o.recipe_item_id === undefined) {
    return undefined
  }
  o.recipe_link = string.format(
    "|H1:item:%d:1:36:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0|h|h",
    o.recipe_item_id
  )
  o.fooddrink_link = GetItemLinkRecipeResultItemLink(o.recipe_link, LINK_STYLE_DEFAULT)
  o.fooddrink_name = foodDrink(GetItemLinkItemId(o.fooddrink_link))
  o.is_known = IsItemLinkRecipeKnown(o.recipe_link)

  const [fooddrink_item_type, fooddrink_specialized_item_type] = GetItemLinkItemType(
    o.fooddrink_link
  )
  o.fooddrink_item_type = fooddrink_item_type
  o.fooddrink_specialized_item_type = fooddrink_specialized_item_type

  const log_t = {
    fooddrink_item_id,
    recipe_item_id: o.recipe_item_id,
    recipe_link: o.recipe_link,
    fooddrink_link: o.fooddrink_link,
    fooddrink_name: o.fooddrink_name,
    is_known: o.is_known,
    fooddrink_item_type: o.fooddrink_item_type,
    fooddrink_specialized_item_type: o.fooddrink_specialized_item_type,
  }
  logAdd(log_t)

  const mat_ct = GetItemLinkRecipeNumIngredients(o.recipe_link)
  const cook_ct = 2
  for (let ingr_index = 1; ingr_index <= mat_ct; ingr_index += 1) {
    const [, , ingr_ct] = GetItemLinkRecipeIngredientInfo(o.recipe_link, ingr_index)
    const ingr_link = GetItemLinkRecipeIngredientItemLink(
      o.recipe_link,
      ingr_index,
      LINK_STYLE_DEFAULT
    )
    if (0 < ingr_ct && ingr_link !== "") {
      const mr = matRowFromLink(ingr_link, ingr_ct * cook_ct)
      if (mr !== undefined) {
        o.mat_list[o.mat_list.length] = mr
      }
    }
  }
  return o
}

export function findRecipe(fooddrink_item_id: number): Recipe | undefined {
  const recipe = recipeFromFoodDrinkItemId(fooddrink_item_id)
  if (recipe === undefined) {
    return fail("TemperWrit: recipe not found:" + tostring(fooddrink_item_id))
  }
  return recipe
}

export interface ProvisioningNamespace {
  savedVarVersion: number
  FOODDRINK_TO_RECIPE_ITEM_ID: Readonly<Record<number, number>>
  FindRecipe: (this: void, fooddrink_item_id: number) => Recipe | undefined
  Parser?: { class: string }
}

const provisioningNamespace: ProvisioningNamespace = {
  savedVarVersion: 2,
  FOODDRINK_TO_RECIPE_ITEM_ID,
  FindRecipe: findRecipe,
}

TemperWrit.Provisioning = provisioningNamespace
