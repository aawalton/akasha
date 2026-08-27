import {
  CB_ADD_RESEARCH_ITEM,
  CB_CONTROL_SHOW,
  CB_INVENTORY_SPACE,
  CB_UPDATE_PANEL_ICON,
  CB_UPDATE_PLAYER,
} from "./constants"
import { DrawCharacters, RemoveCharacter } from "./core/character-panel"
import { StoragePurge, UpdateBag } from "./core/inventory"
import * as Knowledge from "./core/knowledge"
import {
  RepairStored,
  UpdateGuildStore,
  UpdatePlayer,
  UpdateRecipeKnowledge,
} from "./core/player-state"
import { AddResearchItem, UpdateResearch } from "./core/research"
import { UpdatePanelIcon } from "./core/research-grid"
import { STYLE } from "./core/styles-data"
import { TooltipHandler } from "./core/tooltip-handler"
import { ControlShow, ShowMain, UpdateScreen } from "./core/ui-updates"
import { InventorySpace, PanelInitialize } from "./core/panel-init"
import { Queue, ScrollText } from "./core/utilities"
import { AccountInit } from "./data/account-init"
import type { CharacterData } from "./data/char-init"
import { CharInit } from "./data/char-init"
import { Crafting } from "./data/crafting"
import {
  NewMovementInUIMode,
  OnActionLayerPushed,
  OnChampionPerksSceneStateChange,
  OnCraftCompleted,
  OnCraftingStationInteract,
  OnEndCraftingStationInteract,
  OnGameCameraUIModeChanged,
  OnPlayerActivated,
  OnPlayerDeactivated,
  OnQuestConditionCounterChanged,
  OnRecipeLearned,
  OnReticleHiddenUpdate,
  OnSmithingTraitResearchChange,
  OnSmithingTraitResearchStarted,
  OnStableInteractEnd,
  OnStyleLearned,
  RuneCreationTabShow,
  RuneExtractionTabShow,
  RuneRecipeTabShow,
} from "./events-handlers"
import {
  OnInventorySingleSlotUpdate,
  OnInventorySlotAdded,
  OnInventorySlotRemoved,
  OnMoneyUpdate,
  OnStackSplitShow,
} from "./events-inventory"
import { FilterPublishedItems } from "./helpers"
import { initializeMasterWritInventoryMarker } from "./master-writ-inventory-marker/init"
import { initializeTemperPotions } from "./potion-maker/init"
import { temperCraftingApi } from "./public-api"
import { RegisterSettings } from "./settings/lam"
import { timed } from "./slot-handler-stats"
import { state } from "./state"
import { initializeTemperWrit } from "./writ-worthy/init"

export function OnAddOnLoaded(this: void): undefined {
  CALLBACK_MANAGER.RegisterCallback(CB_UPDATE_PLAYER, UpdatePlayer)
  CALLBACK_MANAGER.RegisterCallback(CB_ADD_RESEARCH_ITEM, AddResearchItem)
  CALLBACK_MANAGER.RegisterCallback(CB_UPDATE_PANEL_ICON, UpdatePanelIcon)
  CALLBACK_MANAGER.RegisterCallback(CB_CONTROL_SHOW, ControlShow)
  CALLBACK_MANAGER.RegisterCallback(CB_INVENTORY_SPACE, InventorySpace)

  const style = STYLE()
  state.Style = style
  style.RemoveUnpublishedStyles()
  style.CompileStyles()
  style.CompilePartialStyles({ 114: true, 119: true })
  Crafting.CompileTraits()
  state.Account = ZO_SavedVars.NewAccountWide(
    "TemperCrafting_Account",
    3,
    GetWorldName(),
    AccountInit
  )
  state.Character = ZO_SavedVars.NewCharacterIdSettings<CharacterData>(
    "TemperCrafting_Character",
    2,
    GetWorldName(),
    CharInit
  )
  TemperCrafting.Account = state.Account
  TemperCrafting.Character = state.Character

  EVENT_MANAGER.RegisterForUpdate("TemperCrafting", 1000, Queue)

  state.Furnisher.recipelist = FilterPublishedItems(state.Furnisher.recipelist)

  const craftingVars: Record<string, unknown> = state.Account.crafting
  delete craftingVars["research"]
  delete craftingVars["researched"]
  delete craftingVars["researching"]

  if (state.Character.income[1] !== GetDate()) {
    state.Character.income[1] = GetDate()
    state.Character.income[2] = GetCurrentMoney()
  }

  ZO_CreateStringId("SI_BINDING_NAME_CRAFTSTORE_WINDOW", state.Loc.TT[14])

  ZO_CreateStringId("SI_BINDING_NAME_CRAFTSTORE_STYLES", state.Loc.TT[35])
  ZO_CreateStringId("SI_BINDING_NAME_CRAFTSTORE_RUNES", state.Loc.TT[36])
  ZO_CreateStringId("SI_BINDING_NAME_CRAFTSTORE_PROVISIONING", state.Loc.TT[37])
  ZO_CreateStringId("SI_BINDING_NAME_CRAFTSTORE_FURNISHINGS", state.Loc.TT[38])

  SCENE_MANAGER.RegisterTopLevel(TemperCrafting_Panel, false)
  EVENT_MANAGER.RegisterForEvent(
    "CSEE",
    EVENT_QUEST_CONDITION_COUNTER_CHANGED,
    OnQuestConditionCounterChanged
  )
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_RECIPE_LEARNED, OnRecipeLearned)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_STYLE_LEARNED, OnStyleLearned)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_TRADING_HOUSE_RESPONSE_RECEIVED, UpdateGuildStore)
  EVENT_MANAGER.RegisterForEvent(
    "CSEE",
    EVENT_SMITHING_TRAIT_RESEARCH_STARTED,
    OnSmithingTraitResearchStarted
  )
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_STABLE_INTERACT_END, OnStableInteractEnd)
  EVENT_MANAGER.RegisterForEvent(
    "CSEE",
    EVENT_SMITHING_TRAIT_RESEARCH_COMPLETED,
    OnSmithingTraitResearchChange
  )
  EVENT_MANAGER.RegisterForEvent(
    "CSEE",
    EVENT_SMITHING_TRAIT_RESEARCH_CANCELED,
    OnSmithingTraitResearchChange
  )
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_CRAFTING_STATION_INTERACT, OnCraftingStationInteract)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_INVENTORY_FULL_UPDATE, UpdateBag)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_CRAFT_COMPLETED, OnCraftCompleted)
  EVENT_MANAGER.RegisterForEvent(
    "CSEE",
    EVENT_END_CRAFTING_STATION_INTERACT,
    OnEndCraftingStationInteract
  )
  EVENT_MANAGER.RegisterForEvent(
    "CSEE",
    EVENT_GAME_CAMERA_UI_MODE_CHANGED,
    OnGameCameraUIModeChanged
  )
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_ACTION_LAYER_PUSHED, OnActionLayerPushed)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_NEW_MOVEMENT_IN_UI_MODE, NewMovementInUIMode)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_RETICLE_HIDDEN_UPDATE, OnReticleHiddenUpdate)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_PLAYER_ACTIVATED, OnPlayerActivated)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_PLAYER_DEACTIVATED, OnPlayerDeactivated)
  EVENT_MANAGER.RegisterForEvent(
    "CSEE",
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    timed(OnInventorySingleSlotUpdate)
  )
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_MONEY_UPDATE, OnMoneyUpdate)

  CHAMPION_PERKS_SCENE.RegisterCallback("StateChange", OnChampionPerksSceneStateChange)

  SHARED_INVENTORY.RegisterCallback("SlotAdded", timed(OnInventorySlotAdded))
  SHARED_INVENTORY.RegisterCallback("SlotRemoved", timed(OnInventorySlotRemoved))
  ZO_PreHookHandler(ZO_StackSplit, "OnShow", OnStackSplitShow)
  ZO_PreHookHandler(ZO_EnchantingTopLevelModeMenuBarButton1, "OnMouseDown", RuneCreationTabShow)
  ZO_PreHookHandler(ZO_EnchantingTopLevelModeMenuBarButton2, "OnMouseDown", RuneExtractionTabShow)
  ZO_PreHookHandler(ZO_EnchantingTopLevelModeMenuBarButton3, "OnMouseDown", RuneRecipeTabShow)

  const settingsPanel = RegisterSettings()
  globalThis.TemperCrafting = temperCraftingApi
  TemperCrafting.LAM = settingsPanel

  ScrollText()
  TooltipHandler()
  if (
    type(state.Character.previewtype) === "string" ||
    state.Character.previewType === undefined ||
    state.Character.previewType === false
  ) {
    state.Character.previewtype = 1
  }
  style.UpdatePreview(state.Character.previewtype)
  PanelInitialize()

  Knowledge.OnInitialized("TemperCrafting", () => {
    if (state.Init) {
      Knowledge.RebuildAll()
      UpdateResearch()
      UpdateScreen()
      DrawCharacters()
    }
  })

  initializeTemperWrit()
  initializeTemperPotions()
  Knowledge.OnInitialized("TemperMasterWritInventoryMarker", () => {
    initializeMasterWritInventoryMarker()
  })
}

if (state.Debug) {
  _CS = state
  SLASH_COMMANDS["/_"] = () => {
    state.Chat.Print(_)
  }
  SLASH_COMMANDS["//"] = SLASH_COMMANDS["/reloadui"] ?? error("TemperCrafting: missing /reloadui")
  SLASH_COMMANDS["/langfr"] = () => {
    SetCVar("language.2", "fr")
  }
  SLASH_COMMANDS["/langen"] = () => {
    SetCVar("language.2", "en")
  }
  SLASH_COMMANDS["/langde"] = () => {
    SetCVar("language.2", "de")
  }
  SLASH_COMMANDS["/langru"] = () => {
    SetCVar("language.2", "ru")
  }
}

SLASH_COMMANDS["/tempercraft"] = ShowMain
SLASH_COMMANDS["/tc"] = ShowMain
SLASH_COMMANDS["/tcpurge"] = StoragePurge
SLASH_COMMANDS["/tcrepair"] = RepairStored
SLASH_COMMANDS["/tcrepairknowledge"] = UpdateRecipeKnowledge
SLASH_COMMANDS["/tcremovechar"] = RemoveCharacter

globalThis.TemperHud?.registerCommand({
  name: "/tempercraft",
  description: "Crafting storage & research window",
  addon: "TemperCrafting",
})
