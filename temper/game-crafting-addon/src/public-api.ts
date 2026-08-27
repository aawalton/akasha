import {
  BlueprintSearch,
  BlueprintShowCategory,
  CloseBlueprintWindow,
} from "./core/blueprint-furnisher"
import { DrawCharacters } from "./core/character-panel"
import { CookSearchRecipe, CookShowCategory, CookShowVanilla } from "./core/cooking"
import { GetItemQuantity, IsLearnable, IsResearchable } from "./core/data-validation"
import { IsItemStoredForTemperCrafting } from "./core/inventory"
import { CloseRecipeWindow, RecipeSearch, RecipeShowCategory } from "./core/recipe-cooking"
import { RuneSetValue } from "./core/rune-crafting"
import { RefineAll } from "./core/rune-refining"
import { RuneShowMode } from "./core/rune-views/mode"
import { RuneView } from "./core/rune-views/panel"
import {
  CloseStyle,
  HideCrownStyles,
  HideKnownBlueprints,
  HideKnownRecipes,
  HidePerfectedStyles,
  HideStyles,
  HideUnknownBlueprints,
  HideUnknownRecipes,
  HideUnknownStyles,
  SetAllStyles,
} from "./core/style-tracking"
import { SetTimer, Tooltip } from "./core/tooltips"
import { ControlCloseAll, ControlShow, ShowMain } from "./core/ui-updates"
import { Queue, TravelToNode } from "./core/utilities"
import {
  OpenBlueprintWindow,
  OpenCharacterPanel,
  OpenRecipeWindow,
  OpenSettings,
  RuneAspect,
  RuneCraftGlyph,
  RuneMode,
  SaveAnchor,
  SaveCoords,
  SetTitleText,
} from "./core/xml-handlers"
import type { AccountData } from "./data/account-init"
import type { CharacterData } from "./data/char-init"
import { toSet } from "./helpers"
import { state } from "./state"

interface TemperCraftingApi {
  Title: string
  Version: string
  Account: AccountData | undefined
  Character: CharacterData | undefined
  LAM: Control | undefined
  BlueprintSearch: typeof BlueprintSearch
  BlueprintShowCategory: typeof BlueprintShowCategory
  CloseBlueprintWindow: typeof CloseBlueprintWindow
  CloseRecipeWindow: typeof CloseRecipeWindow
  CloseStyle: typeof CloseStyle
  ControlCloseAll: typeof ControlCloseAll
  ControlShow: typeof ControlShow
  CookSearchRecipe: typeof CookSearchRecipe
  CookShowCategory: typeof CookShowCategory
  CookShowVanilla: typeof CookShowVanilla
  DrawCharacters: typeof DrawCharacters
  HideCrownStyles: typeof HideCrownStyles
  HideKnownBlueprints: typeof HideKnownBlueprints
  HideKnownRecipes: typeof HideKnownRecipes
  HidePerfectedStyles: typeof HidePerfectedStyles
  HideStyles: typeof HideStyles
  HideUnknownBlueprints: typeof HideUnknownBlueprints
  HideUnknownRecipes: typeof HideUnknownRecipes
  HideUnknownStyles: typeof HideUnknownStyles
  Queue: typeof Queue
  RecipeSearch: typeof RecipeSearch
  RecipeShowCategory: typeof RecipeShowCategory
  RefineAll: typeof RefineAll
  RuneSetValue: typeof RuneSetValue
  RuneShowMode: typeof RuneShowMode
  RuneView: typeof RuneView
  SetAllStyles: typeof SetAllStyles
  SetTimer: typeof SetTimer
  ShowMain: typeof ShowMain
  Tooltip: typeof Tooltip
  TravelToNode: typeof TravelToNode
  OpenBlueprintWindow: typeof OpenBlueprintWindow
  OpenCharacterPanel: typeof OpenCharacterPanel
  OpenRecipeWindow: typeof OpenRecipeWindow
  OpenSettings: typeof OpenSettings
  RuneAspect: typeof RuneAspect
  RuneCraftGlyph: typeof RuneCraftGlyph
  RuneMode: typeof RuneMode
  SaveAnchor: typeof SaveAnchor
  SaveCoords: typeof SaveCoords
  SetTitleText: typeof SetTitleText
  GetItemQuantity: typeof GetItemQuantity
  IsResearchable: typeof IsResearchable
  IsLearnable: typeof IsLearnable
  IsItemStoredForTemperCrafting: typeof IsItemStoredForTemperCrafting
  Set: typeof toSet
}

declare global {
  var TemperCrafting: TemperCraftingApi
}

const temperCraftingApi: TemperCraftingApi = {
  Title: state.Title,
  Version: state.Version,
  Account: undefined,
  Character: undefined,
  LAM: undefined,
  BlueprintSearch,
  BlueprintShowCategory,
  CloseBlueprintWindow,
  CloseRecipeWindow,
  CloseStyle,
  ControlCloseAll,
  ControlShow,
  CookSearchRecipe,
  CookShowCategory,
  CookShowVanilla,
  DrawCharacters,
  HideCrownStyles,
  HideKnownBlueprints,
  HideKnownRecipes,
  HidePerfectedStyles,
  HideStyles,
  HideUnknownBlueprints,
  HideUnknownRecipes,
  HideUnknownStyles,
  Queue,
  RecipeSearch,
  RecipeShowCategory,
  RefineAll,
  RuneSetValue,
  RuneShowMode,
  RuneView,
  SetAllStyles,
  SetTimer,
  ShowMain,
  Tooltip,
  TravelToNode,
  OpenBlueprintWindow,
  OpenCharacterPanel,
  OpenRecipeWindow,
  OpenSettings,
  RuneAspect,
  RuneCraftGlyph,
  RuneMode,
  SaveAnchor,
  SaveCoords,
  SetTitleText,
  GetItemQuantity,
  IsResearchable,
  IsLearnable,
  IsItemStoredForTemperCrafting,
  Set: toSet,
}

const guardDeferredDataMembers: Record<string, boolean> = {
  Account: true,
  Character: true,
  LAM: true,
}
const guardWarned: Record<string, boolean> = {}
setmetatable(temperCraftingApi, {
  __index: (_self: TemperCraftingApi, key: string): unknown => {
    if (guardDeferredDataMembers[key]) {
      return undefined
    }
    if (!guardWarned[key]) {
      guardWarned[key] = true
      d(
        `[TemperCrafting][GUARD] member '${key}' resolved nil at call (v${state.Version}); suppressed UI crash — please report this recurrence`
      )
    }
    return (): undefined => undefined
  },
})

globalThis.TemperCrafting = temperCraftingApi

export { temperCraftingApi }
