import type { ScribingType } from "../shape"
import type { Category } from "../types"
import { Internal } from "./state"

function asScribingType(value: {
  order: number
  know: (this: void, id: number) => boolean
}): ScribingType {
  return value as ScribingType
}

Internal.Categories = [Internal.CATEGORY_RECIPE, Internal.CATEGORY_PLAN, Internal.CATEGORY_MOTIF]

const scribingTypes: Record<Category, ScribingType> = {}
scribingTypes[Internal.SCRIBE_GRIMOIRE] = asScribingType({
  order: 1,
  know: IsCraftedAbilityUnlocked,
})
scribingTypes[Internal.SCRIBE_SCRIPT] = asScribingType({
  order: 2,
  know: IsCraftedAbilityScriptUnlocked,
})
Internal.ScribingTypes = scribingTypes

Internal.ItemIdStores = [
  Internal.CATEGORY_RECIPE,
  Internal.CATEGORY_PLAN,
  Internal.CATEGORY_MOTIF,
  Internal.SCRIBE_GRIMOIRE,
  Internal.SCRIBE_SCRIPT,
]

Internal.DataStores = [
  Internal.CATEGORY_RECIPE,
  Internal.CATEGORY_PLAN,
  Internal.CATEGORY_MOTIF,
  Internal.CATEGORY_SCRIBING,
  Internal.CATEGORY_RESEARCH,
]

const knowFunctions: Record<Category, (this: void, itemLink: string) => boolean> = {}
knowFunctions[Internal.CATEGORY_RECIPE] = IsItemLinkRecipeKnown
knowFunctions[Internal.CATEGORY_PLAN] = IsItemLinkRecipeKnown
knowFunctions[Internal.CATEGORY_MOTIF] = IsItemLinkBookKnown
Internal.KnowFunctions = knowFunctions

const categoryLabels: Record<Category, string> = {}
categoryLabels[Internal.CATEGORY_RECIPE] = zo_strformat(
  "<<1>>",
  GetString("SI_ITEMTYPE", ITEMTYPE_RECIPE)
)
categoryLabels[Internal.CATEGORY_PLAN] = zo_strformat(
  "<<1>>",
  GetString(
    "SI_PROVISIONERSPECIALINGREDIENTTYPE_TRADINGHOUSERECIPECATEGORY",
    PROVISIONER_SPECIAL_INGREDIENT_TYPE_FURNISHING
  )
)
categoryLabels[Internal.CATEGORY_MOTIF] = zo_strformat(
  "<<1>>",
  GetString("SI_ITEMTYPE", ITEMTYPE_RACIAL_STYLE_MOTIF)
)
categoryLabels[Internal.CATEGORY_SCRIBING] = GetString(SI_SCRIBING_TITLE)
categoryLabels[Internal.CATEGORY_RESEARCH] = GetString(SI_SMITHING_TAB_RESEARCH)
Internal.CategoryLabels = categoryLabels

const itemQualityTranslation: Record<number, number> = {}
itemQualityTranslation[ITEM_FUNCTIONAL_QUALITY_TRASH] = Internal.QUALITY_LOW
itemQualityTranslation[ITEM_FUNCTIONAL_QUALITY_NORMAL] = Internal.QUALITY_LOW
itemQualityTranslation[ITEM_FUNCTIONAL_QUALITY_MAGIC] = Internal.QUALITY_LOW
itemQualityTranslation[ITEM_FUNCTIONAL_QUALITY_ARCANE] = Internal.QUALITY_MEDIUM
itemQualityTranslation[ITEM_FUNCTIONAL_QUALITY_ARTIFACT] = Internal.QUALITY_HIGH
itemQualityTranslation[ITEM_FUNCTIONAL_QUALITY_LEGENDARY] = Internal.QUALITY_HIGH
Internal.ItemQualityTranslation = itemQualityTranslation
