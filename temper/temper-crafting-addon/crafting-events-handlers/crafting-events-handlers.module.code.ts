import { blueprintLearned } from "../craft-blueprint-furnisher/craft-blueprint-furnisher.module.code.ts"
import { characterInitialize } from "../craft-character-panel-init/craft-character-panel-init.module.code.ts"
import { cookShow, cookShowCategory } from "../craft-cooking/craft-cooking.module.code.ts"
import { updateBag } from "../craft-inventory/craft-inventory.module.code.ts"
import { migrateJewelryIdSwap } from "../craft-mig-jewelry-swap/craft-mig-jewelry-swap.module.code.ts"
import { migrateStoragePrune } from "../craft-mig-storage-prune/craft-mig-storage-prune.module.code.ts"
import { migrateStudiesShape } from "../craft-mig-studies-shape/craft-mig-studies-shape.module.code.ts"
import { inventorySpace } from "../craft-panel-init/craft-panel-init.module.code.ts"
import {
  updateAccountVars,
  updateInventory,
  updatePlayer,
  updateRecipeKnowledge,
} from "../craft-player-state/craft-player-state.module.code.ts"
import { updateQuest } from "../craft-quest-tracking/craft-quest-tracking.module.code.ts"
import { recipeLearned } from "../craft-recipe-cooking/craft-recipe-cooking.module.code.ts"
import {
  updateAllStudies,
  updateResearch,
  updateResearchWindows,
} from "../craft-research/craft-research.module.code.ts"
import { updatePanelIcon } from "../craft-research-grid/craft-research-grid.module.code.ts"
import type { RuneRefineGlyphEntry, RuneTable } from "../craft-rune/craft-rune.module.code.ts"
import {
  hideCrownStyles,
  hideKnownBlueprints,
  hideKnownRecipes,
  hidePerfectedStyles,
  hideStyles,
  hideUnknownBlueprints,
  hideUnknownRecipes,
  hideUnknownStyles,
  updateStyleKnowledge,
} from "../craft-style-tracking/craft-style-tracking.module.code.ts"
import { controlCloseAll, initPreviews } from "../craft-ui-updates/craft-ui-updates.module.code.ts"
import { getQuest, getTimer } from "../craft-utilities/craft-utilities.module.code.ts"
import { hideControl } from "../crafting-helpers/crafting-helpers.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"
import { runeShowMode } from "../rune-mode/rune-mode.module.code.ts"
import {
  runeHideVanillaUI,
  runeInitialize,
  runeView,
} from "../rune-panel/rune-panel.module.code.ts"

const defined = <T>(value: T | undefined): T =>
  value ?? error("TemperCrafting: unexpected nil value")

type RuneJob = RuneTable["job"]
const asRuneJob = (value: { amount: number }): RuneJob => value as RuneJob

export function onQuestConditionCounterChanged(
  this: void,
  _eventCode: number,
  journalIndex: number
): undefined {
  updateQuest(journalIndex)
}

export function onRecipeLearned(
  this: void,
  _eventCode: number,
  list: number,
  id: number
): undefined {
  recipeLearned(list, id)
  blueprintLearned(list, id)
}

export function onStyleLearned(
  this: void,
  _eventCode: number,
  _styleIndex: number,
  _chapterIndex: number,
  _isDefaultRacialStyle: boolean
): undefined {
  updateStyleKnowledge(true)
}

export function onSmithingTraitResearchStarted(
  this: void,
  _eventCode: number,
  craft: number,
  line: number,
  trait: number
): undefined {
  const [, remaining] = GetSmithingResearchLineTraitTimes(craft, line, trait)
  if (remaining !== undefined) {
    defined(defined(defined(STATE.Data.crafting.researched[STATE.CurrentPlayer])[craft])[line])[
      trait
    ] = remaining + GetTimeStamp()
  }
  defined(defined(STATE.Account.crafting.stored[craft])[line])[trait] = {}
  updateResearchWindows()
  updatePanelIcon(craft, line, trait)
  getTimer()
}

export function onSmithingTraitResearchChange(
  this: void,
  _eventCode: number,
  _craft: number,
  _line: number,
  _trait: number
): undefined {
  updateResearch()
  updateResearchWindows()
}

export function onStableInteractEnd(this: void, _eventCode: number): undefined {
  getTimer()
}

export function onCraftingStationInteract(
  this: void,
  _eventCode: number,
  craftSkill: number
): undefined {
  if (STATE.Account.options.usecook || STATE.Account.options.userune) {
    if (craftSkill === CRAFTING_TYPE_PROVISIONING || craftSkill === CRAFTING_TYPE_ENCHANTING) {
      STATE.Cook.craftLevel = GetNonCombatBonus(NON_COMBAT_BONUS_PROVISIONING_LEVEL)
      STATE.Cook.qualityLevel = GetNonCombatBonus(NON_COMBAT_BONUS_PROVISIONING_RARITY_LEVEL)
    }
  }
  if (STATE.Account.options.usecook && craftSkill === CRAFTING_TYPE_PROVISIONING) {
    cookShowCategory(STATE.Character.recipe)
    cookShow()
    inventorySpace(TemperCrafting_CookSpaceButtonName)

    if (!STATE.Cook.hooksInitialized && !IsInGamepadPreferredMode()) {
      if (ZO_ProvisionerTopLevelTabsButton2 !== undefined) {
        ZO_PreHookHandler(ZO_ProvisionerTopLevelTabsButton2, "OnMouseDown", cookFoodTabShow)
      } else {
        d("[TemperCrafting] ERROR: ZO_ProvisionerTopLevelTabsButton2 no existe.")
      }

      if (ZO_ProvisionerTopLevelTabsButton3 !== undefined) {
        ZO_PreHookHandler(ZO_ProvisionerTopLevelTabsButton3, "OnMouseDown", cookDrinkTabShow)
      } else {
        d("[TemperCrafting] ERROR: ZO_ProvisionerTopLevelTabsButton3 no existe.")
      }

      if (ZO_ProvisionerTopLevelTabsButton4 !== undefined) {
        ZO_PreHookHandler(ZO_ProvisionerTopLevelTabsButton4, "OnMouseDown", cookFurnitureTabShow)
      } else {
        d("[TemperCrafting] ERROR: ZO_ProvisionerTopLevelTabsButton4 no existe.")
      }

      STATE.Cook.hooksInitialized = true
    }
  }
  if (STATE.Account.options.userune && craftSkill === CRAFTING_TYPE_ENCHANTING) {
    STATE.Extern = false
    let useCSRune = true
    if (
      (!STATE.Account.options.userunecreation && STATE.Character.runemode === "craft") ||
      (!STATE.Account.options.useruneextraction && STATE.Character.runemode === "refine") ||
      (!STATE.Account.options.userunerecipe && STATE.Character.runemode === "furniture")
    ) {
      useCSRune = false
    }
    runeInitialize(useCSRune)
    runeHideVanillaUI(useCSRune)
    runeShowMode()
    const soundPlayer = CRAFTING_RESULTS.enchantSoundPlayer
    soundPlayer.PlaySound = function (this: void) {
      return
    }
    inventorySpace(TemperCrafting_RuneSpaceButtonName)
  }
  if (STATE.Account.options.usequest) {
    getQuest()
    const quest = STATE.Quest[craftSkill]
    if (quest !== undefined) {
      const title = quest.name + "\n"
      let out = ""
      for (const [, step] of pairs(quest.work)) {
        out = out + step + "\n"
      }
      if (STATE.Quest[craftSkill] !== undefined) {
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
    updateResearch()
    updateResearchWindows()
  }
}

export function onCraftCompleted(this: void, _eventCode: number, craftSkill: number): undefined {
  const inspirationGained = GetLastCraftingResultTotalInspiration()
  if (inspirationGained > 0) {
    STATE.Inspiration = `|t30:30:/esoui/art/currency/currency_inspiration.dds|t |c9095FF${inspirationGained}|r`
  }
  if (STATE.Account.options.usecook && craftSkill === CRAFTING_TYPE_PROVISIONING) {
    TemperCrafting_CookAmount.SetText("")
    zo_callLater(() => {
      cookShowCategory(STATE.Character.recipe, false)
    }, 500)
    inventorySpace(TemperCrafting_CookSpaceButtonName)
  }
  if (STATE.Account.options.userune && craftSkill === CRAFTING_TYPE_ENCHANTING) {
    TemperCrafting_RuneAmount.SetText("")
    const glyphs = STATE.Rune.refine.glyphs
    if (glyphs[0] !== undefined) {
      let remove = true
      while (remove) {
        const first = glyphs[0]
        if (first?.crafted === true && !STATE.Rune.refine.crafted) {
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
          STATE.Chat.Print(STATE.Loc.nobagspace)
        }
      }
    }
    inventorySpace(TemperCrafting_RuneSpaceButtonName)
    zo_callLater(() => {
      runeShowMode(true)
    }, 500)
  }
  updateBag()
}

export function onEndCraftingStationInteract(
  this: void,
  _eventCode: number,
  craftSkill: number
): undefined {
  TemperCrafting_Quest.SetHidden(true)
  STATE.UIClosed = true

  if (STATE.Account.options.usecook && craftSkill === CRAFTING_TYPE_PROVISIONING) {
    TemperCrafting_Cook.SetHidden(true)
    const numProvisionerChildren = ZO_ProvisionerTopLevel.GetNumChildren()
    for (let x = 2; x <= numProvisionerChildren; x++) {
      const child = ZO_ProvisionerTopLevel.GetChild(x)
      if (child !== undefined) {
        child.SetAlpha(1)
      }
    }
    STATE.Cook.job = { amount: 0, list: undefined, id: undefined }
    const numCookChildren = TemperCrafting_CookFoodSectionScrollChild.GetNumChildren()
    for (let x = 1; x <= numCookChildren; x++) {
      hideControl(`TemperCrafting_CookFoodSectionScrollChildButton${x}`)
    }
  }
  if (STATE.Account.options.userune && craftSkill === CRAFTING_TYPE_ENCHANTING) {
    TemperCrafting_Rune.SetHidden(true)
    STATE.Extern = true
    const glyphs: Record<number, RuneRefineGlyphEntry | undefined> = STATE.Rune.refine.glyphs
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
    STATE.Rune.job = asRuneJob({ amount: 0 })
    const numRuneChildren = TemperCrafting_RuneGlyphSectionScrollChild.GetNumChildren()
    for (let x = 1; x <= numRuneChildren; x++) {
      hideControl(`TemperCrafting_RuneGlyphSectionScrollChildButton${x}`)
    }
  }
}

export function onGameCameraUIModeChanged(this: void, _eventCode: number): undefined {
  if (STATE.UIClosed) {
    STATE.UIClosed = false
  }
}

export function onActionLayerPushed(
  this: void,
  _eventCode: number,
  _layerIndex: number,
  _activeLayerIndex: number
): undefined {
  if (STATE.UIClosed) {
    ZO_KeybindStripControl.SetHidden(false)
    STATE.UIClosed = false
  }
}

export function newMovementInUIMode(this: void, _eventCode: number): undefined {
  if (STATE.Account.options.closeonmove && !TemperCrafting_Panel.IsHidden()) {
    controlCloseAll()
  }
}

export function onReticleHiddenUpdate(this: void, _eventCode: number, hidden: boolean): undefined {
  if (!hidden && !TemperCrafting_Rune.IsHidden()) {
    runeView(2)
  }
}

export function onPlayerActivated(this: void, _eventCode: number, _initial: boolean): undefined {
  if (STATE.Debug) {
    zo_callLater(() => {
      CHAT_ROUTER.AddSystemMessage(
        "CS.Account.crafting.jewelryIdSwapMigrationAlreadyDoneDone: " +
          tostring(STATE.Account.crafting.jewelryIdSwapMigrationAlreadyDoneDone)
      )
    }, 50)
  }
  if (STATE.Account.crafting.jewelryIdSwapMigrationAlreadyDoneDone !== true) {
    zo_callLater(() => {
      CHAT_ROUTER.AddSystemMessage(
        "[TemperCrafting] The internal indices of the game for jewelry (rings and necklaces) got swapped by ZOS. TemperCrafting need to migrate its SavedVariables once. Starting..."
      )
    }, 50)
    migrateJewelryIdSwap()
    STATE.Account.crafting.jewelryIdSwapMigrationAlreadyDoneDone = true
    zo_callLater(() => {
      CHAT_ROUTER.AddSystemMessage(
        "[TemperCrafting] Migration of TemperCrafting's SavedVariables finished."
      )
    }, 50)
  }

  migrateStudiesShape()
  migrateStoragePrune()
  updateAccountVars()
  updatePlayer()
  updateStyleKnowledge(true)
  updateRecipeKnowledge()
  updateAllStudies()
  updateInventory()
  characterInitialize()
  getTimer()
  initPreviews()
  updateResearch()
  updateResearchWindows()
  updateBag()
  hideStyles(true)
  hideCrownStyles(true)
  hidePerfectedStyles(true)
  hideUnknownStyles(true)
  hideKnownBlueprints(true)
  hideUnknownBlueprints(true)
  hideKnownRecipes(true)
  hideUnknownRecipes(true)
  STATE.Init = true
  EVENT_MANAGER.UnregisterForEvent("CSEE", EVENT_PLAYER_ACTIVATED)
}

export function onPlayerDeactivated(this: void, _eventCode: number): undefined {
  updatePlayer(true)
  EVENT_MANAGER.UnregisterForEvent("CSEE", EVENT_PLAYER_DEACTIVATED)
}

export function onChampionPerksSceneStateChange(
  this: void,
  _oldState: number,
  newState: number
): undefined {
  if (newState === SCENE_SHOWING) {
    controlCloseAll()
    TemperCrafting_ButtonFrame.SetHidden(true)
  } else if (newState === SCENE_HIDDEN) {
    if (STATE.Account.options.showbutton) {
      TemperCrafting_ButtonFrame.SetHidden(false)
    }
  }
}

export function runeCreationTabShow(this: void): undefined {
  STATE.Character.runemode = "craft"
  if (STATE.Account.options.userune && STATE.Account.options.userunecreation) {
    runeShowMode()
  }
}

export function runeExtractionTabShow(this: void): undefined {
  STATE.Character.runemode = "refine"
  if (STATE.Account.options.userune && STATE.Account.options.useruneextraction) {
    runeShowMode()
  }
}

export function runeRecipeTabShow(this: void): undefined {
  STATE.Character.runemode = "furniture"
  if (STATE.Account.options.userune) {
    runeShowMode()
  }
}

export function cookFoodTabShow(this: void): undefined {
  if (STATE.Account.options.usecook) {
    cookShowCategory(1)
    cookShow()
  }
}

export function cookDrinkTabShow(this: void): undefined {
  if (STATE.Account.options.usecook) {
    cookShowCategory(8)
    cookShow()
  }
}

export function cookFurnitureTabShow(this: void): undefined {
  if (STATE.Account.options.usecook) {
    cookShowCategory(19)
    cookShow()
  }
}
