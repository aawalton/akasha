import type { AccountData } from "../craft-account-init/craft-account-init.module.code.ts"
import {
  blueprintSearch,
  blueprintShowCategory,
  closeBlueprintWindow,
} from "../craft-blueprint-furnisher/craft-blueprint-furnisher.module.code.ts"
import type { CharacterData } from "../craft-char-init/craft-char-init.module.code.ts"
import { drawCharacters } from "../craft-character-panel/craft-character-panel.module.code.ts"
import {
  cookSearchRecipe,
  cookShowCategory,
  cookShowVanilla,
} from "../craft-cooking/craft-cooking.module.code.ts"
import { isItemStoredForTemperCrafting } from "../craft-inventory/craft-inventory.module.code.ts"
import {
  closeRecipeWindow,
  recipeSearch,
  recipeShowCategory,
} from "../craft-recipe-cooking/craft-recipe-cooking.module.code.ts"
import { runeSetValue } from "../craft-rune-crafting/craft-rune-crafting.module.code.ts"
import { refineAll } from "../craft-rune-refining/craft-rune-refining.module.code.ts"
import {
  closeStyle,
  hideCrownStyles,
  hideKnownBlueprints,
  hideKnownRecipes,
  hidePerfectedStyles,
  hideStyles,
  hideUnknownBlueprints,
  hideUnknownRecipes,
  hideUnknownStyles,
  setAllStyles,
} from "../craft-style-tracking/craft-style-tracking.module.code.ts"
import { setTimer, tooltip } from "../craft-tooltips/craft-tooltips.module.code.ts"
import {
  controlCloseAll,
  controlShow,
  showMain,
} from "../craft-ui-updates/craft-ui-updates.module.code.ts"
import { queue, travelToNode } from "../craft-utilities/craft-utilities.module.code.ts"
import {
  getItemQuantity,
  isLearnable,
  isResearchable,
} from "../craft-validation/craft-validation.module.code.ts"
import {
  openBlueprintWindow,
  openCharacterPanel,
  openRecipeWindow,
  openSettings,
  runeAspect,
  runeCraftGlyph,
  runeMode,
  saveAnchor,
  saveCoords,
  setTitleText,
} from "../craft-xml-handlers/craft-xml-handlers.module.code.ts"
import { toSet } from "../crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"
import { runeShowMode } from "../rune-mode/rune-mode.module.code.ts"
import { runeView } from "../rune-panel/rune-panel.module.code.ts"

interface TemperCraftingApi {
  Title: string
  Version: string
  Account: AccountData | undefined
  Character: CharacterData | undefined
  LAM: Control | undefined
  BlueprintSearch: typeof blueprintSearch
  BlueprintShowCategory: typeof blueprintShowCategory
  CloseBlueprintWindow: typeof closeBlueprintWindow
  CloseRecipeWindow: typeof closeRecipeWindow
  CloseStyle: typeof closeStyle
  ControlCloseAll: typeof controlCloseAll
  ControlShow: typeof controlShow
  CookSearchRecipe: typeof cookSearchRecipe
  CookShowCategory: typeof cookShowCategory
  CookShowVanilla: typeof cookShowVanilla
  DrawCharacters: typeof drawCharacters
  HideCrownStyles: typeof hideCrownStyles
  HideKnownBlueprints: typeof hideKnownBlueprints
  HideKnownRecipes: typeof hideKnownRecipes
  HidePerfectedStyles: typeof hidePerfectedStyles
  HideStyles: typeof hideStyles
  HideUnknownBlueprints: typeof hideUnknownBlueprints
  HideUnknownRecipes: typeof hideUnknownRecipes
  HideUnknownStyles: typeof hideUnknownStyles
  Queue: typeof queue
  RecipeSearch: typeof recipeSearch
  RecipeShowCategory: typeof recipeShowCategory
  RefineAll: typeof refineAll
  RuneSetValue: typeof runeSetValue
  RuneShowMode: typeof runeShowMode
  RuneView: typeof runeView
  SetAllStyles: typeof setAllStyles
  SetTimer: typeof setTimer
  ShowMain: typeof showMain
  Tooltip: typeof tooltip
  TravelToNode: typeof travelToNode
  OpenBlueprintWindow: typeof openBlueprintWindow
  OpenCharacterPanel: typeof openCharacterPanel
  OpenRecipeWindow: typeof openRecipeWindow
  OpenSettings: typeof openSettings
  RuneAspect: typeof runeAspect
  RuneCraftGlyph: typeof runeCraftGlyph
  RuneMode: typeof runeMode
  SaveAnchor: typeof saveAnchor
  SaveCoords: typeof saveCoords
  SetTitleText: typeof setTitleText
  GetItemQuantity: typeof getItemQuantity
  IsResearchable: typeof isResearchable
  IsLearnable: typeof isLearnable
  IsItemStoredForTemperCrafting: typeof isItemStoredForTemperCrafting
  Set: typeof toSet
}

interface CraftingGlobalTable {
  TemperCrafting: TemperCraftingApi
}

function asGlobalTable(this: void, value: unknown): CraftingGlobalTable {
  return value as CraftingGlobalTable
}

const TEMPER_CRAFTING_API: TemperCraftingApi = {
  Title: STATE.Title,
  Version: STATE.Version,
  Account: undefined,
  Character: undefined,
  LAM: undefined,
  BlueprintSearch: blueprintSearch,
  BlueprintShowCategory: blueprintShowCategory,
  CloseBlueprintWindow: closeBlueprintWindow,
  CloseRecipeWindow: closeRecipeWindow,
  CloseStyle: closeStyle,
  ControlCloseAll: controlCloseAll,
  ControlShow: controlShow,
  CookSearchRecipe: cookSearchRecipe,
  CookShowCategory: cookShowCategory,
  CookShowVanilla: cookShowVanilla,
  DrawCharacters: drawCharacters,
  HideCrownStyles: hideCrownStyles,
  HideKnownBlueprints: hideKnownBlueprints,
  HideKnownRecipes: hideKnownRecipes,
  HidePerfectedStyles: hidePerfectedStyles,
  HideStyles: hideStyles,
  HideUnknownBlueprints: hideUnknownBlueprints,
  HideUnknownRecipes: hideUnknownRecipes,
  HideUnknownStyles: hideUnknownStyles,
  Queue: queue,
  RecipeSearch: recipeSearch,
  RecipeShowCategory: recipeShowCategory,
  RefineAll: refineAll,
  RuneSetValue: runeSetValue,
  RuneShowMode: runeShowMode,
  RuneView: runeView,
  SetAllStyles: setAllStyles,
  SetTimer: setTimer,
  ShowMain: showMain,
  Tooltip: tooltip,
  TravelToNode: travelToNode,
  OpenBlueprintWindow: openBlueprintWindow,
  OpenCharacterPanel: openCharacterPanel,
  OpenRecipeWindow: openRecipeWindow,
  OpenSettings: openSettings,
  RuneAspect: runeAspect,
  RuneCraftGlyph: runeCraftGlyph,
  RuneMode: runeMode,
  SaveAnchor: saveAnchor,
  SaveCoords: saveCoords,
  SetTitleText: setTitleText,
  GetItemQuantity: getItemQuantity,
  IsResearchable: isResearchable,
  IsLearnable: isLearnable,
  IsItemStoredForTemperCrafting: isItemStoredForTemperCrafting,
  Set: toSet,
}

const GUARD_DEFERRED_DATA_MEMBERS: Record<string, boolean> = {
  Account: true,
  Character: true,
  LAM: true,
}
const GUARD_WARNED: Record<string, boolean> = {}
setmetatable(TEMPER_CRAFTING_API, {
  __index: (_self: TemperCraftingApi, key: string): unknown => {
    if (GUARD_DEFERRED_DATA_MEMBERS[key]) {
      return undefined
    }
    if (!GUARD_WARNED[key]) {
      GUARD_WARNED[key] = true
      d(
        `[TemperCrafting][GUARD] member '${key}' resolved nil at call (v${STATE.Version}); suppressed UI crash — please report this recurrence`
      )
    }
    return (): undefined => undefined
  },
})

asGlobalTable(globalThis).TemperCrafting = TEMPER_CRAFTING_API

export { TEMPER_CRAFTING_API }
