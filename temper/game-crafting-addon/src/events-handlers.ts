import { BlueprintLearned } from "./core/blueprint-furnisher"
import { CharacterInitialize } from "./core/character-panel-init"
import { CookShow, CookShowCategory } from "./core/cooking"
import { UpdateBag } from "./core/inventory"
import {
  UpdateAccountVars,
  UpdateInventory,
  UpdatePlayer,
  UpdateRecipeKnowledge,
} from "./core/player-state"
import { UpdateQuest } from "./core/quest-tracking"
import { RecipeLearned } from "./core/recipe-cooking"
import { UpdateAllStudies, UpdateResearch, UpdateResearchWindows } from "./core/research"
import { UpdatePanelIcon } from "./core/research-grid"
import { RuneShowMode } from "./core/rune-views/mode"
import { RuneHideVanillaUI, RuneInitialize, RuneView } from "./core/rune-views/panel"
import {
  HideCrownStyles,
  HideKnownBlueprints,
  HideKnownRecipes,
  HidePerfectedStyles,
  HideStyles,
  HideUnknownBlueprints,
  HideUnknownRecipes,
  HideUnknownStyles,
  UpdateStyleKnowledge,
} from "./core/style-tracking"
import { ControlCloseAll, InitPreviews } from "./core/ui-updates"
import { InventorySpace } from "./core/panel-init"
import { GetQuest, GetTimer } from "./core/utilities"
import type { RuneRefineGlyphEntry, RuneTable } from "./data/rune"
import { HideControl } from "./helpers"
import { MigrateJewelryIdSwap } from "./migrations/jewelry-swap"
import { MigrateStoragePrune } from "./migrations/storage-prune"
import { MigrateStudiesShape } from "./migrations/studies-shape"
import { state } from "./state"

const defined = <T>(value: T | undefined): T =>
  value ?? error("TemperCrafting: unexpected nil value")

type RuneJob = RuneTable["job"]
const asRuneJob = (value: { amount: number }): RuneJob => value as RuneJob

export function OnQuestConditionCounterChanged(
  this: void,
  _eventCode: number,
  journalIndex: number
): undefined {
  UpdateQuest(journalIndex)
}

export function OnRecipeLearned(
  this: void,
  _eventCode: number,
  list: number,
  id: number
): undefined {
  RecipeLearned(list, id)
  BlueprintLearned(list, id)
}

export function OnStyleLearned(
  this: void,
  _eventCode: number,
  _styleIndex: number,
  _chapterIndex: number,
  _isDefaultRacialStyle: boolean
): undefined {
  UpdateStyleKnowledge(true)
}

export function OnSmithingTraitResearchStarted(
  this: void,
  _eventCode: number,
  craft: number,
  line: number,
  trait: number
): undefined {
  const [, remaining] = GetSmithingResearchLineTraitTimes(craft, line, trait)
  if (remaining !== undefined) {
    defined(defined(defined(state.Data.crafting.researched[state.CurrentPlayer])[craft])[line])[
      trait
    ] = remaining + GetTimeStamp()
  }
  defined(defined(state.Account.crafting.stored[craft])[line])[trait] = {}
  UpdateResearchWindows()
  UpdatePanelIcon(craft, line, trait)
  GetTimer()
}

export function OnSmithingTraitResearchChange(
  this: void,
  _eventCode: number,
  _craft: number,
  _line: number,
  _trait: number
): undefined {
  UpdateResearch()
  UpdateResearchWindows()
}

export function OnStableInteractEnd(this: void, _eventCode: number): undefined {
  GetTimer()
}

export function OnCraftingStationInteract(
  this: void,
  _eventCode: number,
  craftSkill: number
): undefined {
  if (state.Account.options.usecook || state.Account.options.userune) {
    if (craftSkill === CRAFTING_TYPE_PROVISIONING || craftSkill === CRAFTING_TYPE_ENCHANTING) {
      state.Cook.craftLevel = GetNonCombatBonus(NON_COMBAT_BONUS_PROVISIONING_LEVEL)
      state.Cook.qualityLevel = GetNonCombatBonus(NON_COMBAT_BONUS_PROVISIONING_RARITY_LEVEL)
    }
  }
  if (state.Account.options.usecook && craftSkill === CRAFTING_TYPE_PROVISIONING) {
    CookShowCategory(state.Character.recipe)
    CookShow()
    InventorySpace(TemperCrafting_CookSpaceButtonName)

    if (!state.Cook.hooksInitialized && !IsInGamepadPreferredMode()) {
      if (ZO_ProvisionerTopLevelTabsButton2 !== undefined) {
        ZO_PreHookHandler(ZO_ProvisionerTopLevelTabsButton2, "OnMouseDown", CookFoodTabShow)
      } else {
        d("[TemperCrafting] ERROR: ZO_ProvisionerTopLevelTabsButton2 no existe.")
      }

      if (ZO_ProvisionerTopLevelTabsButton3 !== undefined) {
        ZO_PreHookHandler(ZO_ProvisionerTopLevelTabsButton3, "OnMouseDown", CookDrinkTabShow)
      } else {
        d("[TemperCrafting] ERROR: ZO_ProvisionerTopLevelTabsButton3 no existe.")
      }

      if (ZO_ProvisionerTopLevelTabsButton4 !== undefined) {
        ZO_PreHookHandler(ZO_ProvisionerTopLevelTabsButton4, "OnMouseDown", CookFurnitureTabShow)
      } else {
        d("[TemperCrafting] ERROR: ZO_ProvisionerTopLevelTabsButton4 no existe.")
      }

      state.Cook.hooksInitialized = true
    }
  }
  if (state.Account.options.userune && craftSkill === CRAFTING_TYPE_ENCHANTING) {
    state.Extern = false
    let useCSRune = true
    if (
      (!state.Account.options.userunecreation && state.Character.runemode === "craft") ||
      (!state.Account.options.useruneextraction && state.Character.runemode === "refine") ||
      (!state.Account.options.userunerecipe && state.Character.runemode === "furniture")
    ) {
      useCSRune = false
    }
    RuneInitialize(useCSRune)
    RuneHideVanillaUI(useCSRune)
    RuneShowMode()
    const soundPlayer = CRAFTING_RESULTS.enchantSoundPlayer
    soundPlayer.PlaySound = function (this: void) {
      return
    }
    InventorySpace(TemperCrafting_RuneSpaceButtonName)
  }
  if (state.Account.options.usequest) {
    GetQuest()
    const quest = state.Quest[craftSkill]
    if (quest !== undefined) {
      const title = quest.name + "\n"
      let out = ""
      for (const [, step] of pairs(quest.work)) {
        out = out + step + "\n"
      }
      if (state.Quest[craftSkill] !== undefined) {
        TemperCrafting_QuestText.SetText(title + out)
        TemperCrafting_Quest.SetHidden(false)
      }
    }
  }
  if (
    craftSkill === CRAFTING_TYPE_BLACKSMITHING ||
    craftSkill === CRAFTING_TYPE_CLOTHIER ||
    craftSkill === CRAFTING_TYPE_WOODWORKING ||
    craftSkill === CRAFTING_TYPE_JEWELRYCRAFTING
  ) {
    UpdateResearch()
    UpdateResearchWindows()
  }
}

export function OnCraftCompleted(this: void, _eventCode: number, craftSkill: number): undefined {
  const inspirationGained = GetLastCraftingResultTotalInspiration()
  if (inspirationGained > 0) {
    state.Inspiration = `|t30:30:/esoui/art/currency/currency_inspiration.dds|t |c9095FF${inspirationGained}|r`
  }
  if (state.Account.options.usecook && craftSkill === CRAFTING_TYPE_PROVISIONING) {
    TemperCrafting_CookAmount.SetText("")
    zo_callLater(() => {
      CookShowCategory(state.Character.recipe, false)
    }, 500)
    InventorySpace(TemperCrafting_CookSpaceButtonName)
  }
  if (state.Account.options.userune && craftSkill === CRAFTING_TYPE_ENCHANTING) {
    TemperCrafting_RuneAmount.SetText("")
    const glyphs = state.Rune.refine.glyphs
    if (glyphs[0] !== undefined) {
      let remove = true
      while (remove) {
        const first = glyphs[0]
        if (first?.crafted === true && !state.Rune.refine.crafted) {
          glyphs.shift()
        } else {
          remove = false
        }
      }
      const head = glyphs[0]
      if (head !== undefined) {
        if (
          GetNumBagFreeSlots(BAG_BACKPACK) >= 3 ||
          (tonumber(GetSetting(SETTING_TYPE_LOOT, LOOT_SETTING_AUTO_ADD_TO_CRAFT_BAG)) === 1 &&
            IsESOPlusSubscriber())
        ) {
          ExtractEnchantingItem(defined(head.location[0])[0], defined(head.location[0])[1])
          PlaySound("Enchanting_Extract_Start_Anim")
          if (head.location.length === 1) {
            glyphs.shift()
          } else {
            head.location.shift()
          }
        } else {
          state.Chat.Print(state.Loc.nobagspace)
        }
      }
    }
    InventorySpace(TemperCrafting_RuneSpaceButtonName)
    zo_callLater(() => {
      RuneShowMode(true)
    }, 500)
  }
  UpdateBag()
}

export function OnEndCraftingStationInteract(
  this: void,
  _eventCode: number,
  craftSkill: number
): undefined {
  TemperCrafting_Quest.SetHidden(true)
  state.UIClosed = true

  if (state.Account.options.usecook && craftSkill === CRAFTING_TYPE_PROVISIONING) {
    TemperCrafting_Cook.SetHidden(true)
    const numProvisionerChildren = ZO_ProvisionerTopLevel.GetNumChildren()
    for (let x = 2; x <= numProvisionerChildren; x++) {
      const child = ZO_ProvisionerTopLevel.GetChild(x)
      if (child !== undefined) {
        child.SetAlpha(1)
      }
    }
    state.Cook.job = { amount: 0, list: undefined, id: undefined }
    const numCookChildren = TemperCrafting_CookFoodSectionScrollChild.GetNumChildren()
    for (let x = 1; x <= numCookChildren; x++) {
      HideControl(`TemperCrafting_CookFoodSectionScrollChildButton${x}`)
    }
  }
  if (state.Account.options.userune && craftSkill === CRAFTING_TYPE_ENCHANTING) {
    TemperCrafting_Rune.SetHidden(true)
    state.Extern = true
    const glyphs: Record<number, RuneRefineGlyphEntry | undefined> = state.Rune.refine.glyphs
    for (const [k] of pairs(glyphs)) {
      glyphs[k] = undefined
    }
    const numEnchantingChildren = ZO_EnchantingTopLevel.GetNumChildren()
    for (let x = 2; x <= numEnchantingChildren; x++) {
      const child = ZO_EnchantingTopLevel.GetChild(x)
      if (child !== undefined) {
        child.SetHidden(false)
      }
    }
    state.Rune.job = asRuneJob({ amount: 0 })
    const numRuneChildren = TemperCrafting_RuneGlyphSectionScrollChild.GetNumChildren()
    for (let x = 1; x <= numRuneChildren; x++) {
      HideControl(`TemperCrafting_RuneGlyphSectionScrollChildButton${x}`)
    }
  }
}

export function OnGameCameraUIModeChanged(this: void, _eventCode: number): undefined {
  if (state.UIClosed) {
    state.UIClosed = false
  }
}

export function OnActionLayerPushed(
  this: void,
  _eventCode: number,
  _layerIndex: number,
  _activeLayerIndex: number
): undefined {
  if (state.UIClosed) {
    ZO_KeybindStripControl.SetHidden(false)
    state.UIClosed = false
  }
}

export function NewMovementInUIMode(this: void, _eventCode: number): undefined {
  if (state.Account.options.closeonmove && !TemperCrafting_Panel.IsHidden()) {
    ControlCloseAll()
  }
}

export function OnReticleHiddenUpdate(this: void, _eventCode: number, hidden: boolean): undefined {
  if (!hidden && !TemperCrafting_Rune.IsHidden()) {
    RuneView(2)
  }
}

export function OnPlayerActivated(this: void, _eventCode: number, _initial: boolean): undefined {
  if (state.Debug) {
    zo_callLater(() => {
      CHAT_ROUTER.AddSystemMessage(
        "CS.Account.crafting.jewelryIdSwapMigrationAlreadyDoneDone: " +
          tostring(state.Account.crafting.jewelryIdSwapMigrationAlreadyDoneDone)
      )
    }, 50)
  }
  if (state.Account.crafting.jewelryIdSwapMigrationAlreadyDoneDone !== true) {
    zo_callLater(() => {
      CHAT_ROUTER.AddSystemMessage(
        "[TemperCrafting] The internal indices of the game for jewelry (rings and necklaces) got swapped by ZOS. TemperCrafting need to migrate its SavedVariables once. Starting..."
      )
    }, 50)
    MigrateJewelryIdSwap()
    state.Account.crafting.jewelryIdSwapMigrationAlreadyDoneDone = true
    zo_callLater(() => {
      CHAT_ROUTER.AddSystemMessage(
        "[TemperCrafting] Migration of TemperCrafting's SavedVariables finished."
      )
    }, 50)
  }

  MigrateStudiesShape()
  MigrateStoragePrune()
  UpdateAccountVars()
  UpdatePlayer()
  UpdateStyleKnowledge(true)
  UpdateRecipeKnowledge()
  UpdateAllStudies()
  UpdateInventory()
  CharacterInitialize()
  GetTimer()
  InitPreviews()
  UpdateResearch()
  UpdateResearchWindows()
  UpdateBag()
  HideStyles(true)
  HideCrownStyles(true)
  HidePerfectedStyles(true)
  HideUnknownStyles(true)
  HideKnownBlueprints(true)
  HideUnknownBlueprints(true)
  HideKnownRecipes(true)
  HideUnknownRecipes(true)
  state.Init = true
  EVENT_MANAGER.UnregisterForEvent("CSEE", EVENT_PLAYER_ACTIVATED)
}

export function OnPlayerDeactivated(this: void, _eventCode: number): undefined {
  UpdatePlayer(true)
  EVENT_MANAGER.UnregisterForEvent("CSEE", EVENT_PLAYER_DEACTIVATED)
}

export function OnChampionPerksSceneStateChange(
  this: void,
  _oldState: number,
  newState: number
): undefined {
  if (newState === SCENE_SHOWING) {
    ControlCloseAll()
    TemperCrafting_ButtonFrame.SetHidden(true)
  } else if (newState === SCENE_HIDDEN) {
    if (state.Account.options.showbutton) {
      TemperCrafting_ButtonFrame.SetHidden(false)
    }
  }
}

export function RuneCreationTabShow(this: void): undefined {
  state.Character.runemode = "craft"
  if (state.Account.options.userune && state.Account.options.userunecreation) {
    RuneShowMode()
  }
}

export function RuneExtractionTabShow(this: void): undefined {
  state.Character.runemode = "refine"
  if (state.Account.options.userune && state.Account.options.useruneextraction) {
    RuneShowMode()
  }
}

export function RuneRecipeTabShow(this: void): undefined {
  state.Character.runemode = "furniture"
  if (state.Account.options.userune) {
    RuneShowMode()
  }
}

export function CookFoodTabShow(this: void): undefined {
  if (state.Account.options.usecook) {
    CookShowCategory(1)
    CookShow()
  }
}

export function CookDrinkTabShow(this: void): undefined {
  if (state.Account.options.usecook) {
    CookShowCategory(8)
    CookShow()
  }
}

export function CookFurnitureTabShow(this: void): undefined {
  if (state.Account.options.usecook) {
    CookShowCategory(19)
    CookShow()
  }
}
