import { ACCOUNT_INIT } from "../craft-account-init/craft-account-init.module.code.ts"
import type { CharacterData } from "../craft-char-init/craft-char-init.module.code.ts"
import { CHAR_INIT } from "../craft-char-init/craft-char-init.module.code.ts"
import {
  drawCharacters,
  removeCharacter,
} from "../craft-character-panel/craft-character-panel.module.code.ts"
import { CRAFTING } from "../craft-crafting/craft-crafting.module.code.ts"
import { storagePurge, updateBag } from "../craft-inventory/craft-inventory.module.code.ts"
import * as Knowledge from "../craft-knowledge/craft-knowledge.module.code.ts"
import {
  inventorySpace,
  panelInitialize,
} from "../craft-panel-init/craft-panel-init.module.code.ts"
import {
  repairStored,
  updateGuildStore,
  updatePlayer,
  updateRecipeKnowledge,
} from "../craft-player-state/craft-player-state.module.code.ts"
import { addResearchItem, updateResearch } from "../craft-research/craft-research.module.code.ts"
import { updatePanelIcon } from "../craft-research-grid/craft-research-grid.module.code.ts"
import { registerSettings } from "../craft-set-lam/craft-set-lam.module.code.ts"
import { styleApi } from "../craft-styles-data/craft-styles-data.module.code.ts"
import { tooltipHandler } from "../craft-tooltip-handler/craft-tooltip-handler.module.code.ts"
import {
  controlShow,
  showMain,
  updateScreen,
} from "../craft-ui-updates/craft-ui-updates.module.code.ts"
import { queue, scrollText } from "../craft-utilities/craft-utilities.module.code.ts"
import {
  CB_ADD_RESEARCH_ITEM,
  CB_CONTROL_SHOW,
  CB_INVENTORY_SPACE,
  CB_UPDATE_PANEL_ICON,
  CB_UPDATE_PLAYER,
} from "../crafting-constants/crafting-constants.module.code.ts"
import {
  newMovementInUIMode,
  onActionLayerPushed,
  onChampionPerksSceneStateChange,
  onCraftCompleted,
  onCraftingStationInteract,
  onEndCraftingStationInteract,
  onGameCameraUIModeChanged,
  onPlayerActivated,
  onPlayerDeactivated,
  onQuestConditionCounterChanged,
  onRecipeLearned,
  onReticleHiddenUpdate,
  onSmithingTraitResearchChange,
  onSmithingTraitResearchStarted,
  onStableInteractEnd,
  onStyleLearned,
  runeCreationTabShow,
  runeExtractionTabShow,
  runeRecipeTabShow,
} from "../crafting-events-handlers/crafting-events-handlers.module.code.ts"
import {
  onInventorySingleSlotUpdate,
  onInventorySlotAdded,
  onInventorySlotRemoved,
  onMoneyUpdate,
  onStackSplitShow,
} from "../crafting-events-inventory/crafting-events-inventory.module.code.ts"
import { filterPublishedItems } from "../crafting-helpers/crafting-helpers.module.code.ts"
import { TEMPER_CRAFTING_API } from "../crafting-public-api/crafting-public-api.module.code.ts"
import { timed } from "../crafting-slot-handler-stats/crafting-slot-handler-stats.module.code.ts"
import { STATE } from "../crafting-state/crafting-state.module.code.ts"
import { initializeTemperPotions } from "../potion-init/potion-init.module.code.ts"
import { initializeTemperWrit } from "../writ-init/writ-init.module.code.ts"
import { initializeMasterWritInventoryMarker } from "../writ-mark-init/writ-mark-init.module.code.ts"

export function onAddOnLoaded(this: void): undefined {
  CALLBACK_MANAGER.RegisterCallback(CB_UPDATE_PLAYER, updatePlayer)
  CALLBACK_MANAGER.RegisterCallback(CB_ADD_RESEARCH_ITEM, addResearchItem)
  CALLBACK_MANAGER.RegisterCallback(CB_UPDATE_PANEL_ICON, updatePanelIcon)
  CALLBACK_MANAGER.RegisterCallback(CB_CONTROL_SHOW, controlShow)
  CALLBACK_MANAGER.RegisterCallback(CB_INVENTORY_SPACE, inventorySpace)

  const style = styleApi()
  STATE.Style = style
  style.RemoveUnpublishedStyles()
  style.compileStyles()
  style.compilePartialStyles({ 114: true, 119: true })
  CRAFTING.CompileTraits()
  STATE.Account = ZO_SavedVars.NewAccountWide(
    "TemperCrafting_Account",
    3,
    GetWorldName(),
    ACCOUNT_INIT
  )
  STATE.Character = ZO_SavedVars.NewCharacterIdSettings<CharacterData>(
    "TemperCrafting_Character",
    2,
    GetWorldName(),
    CHAR_INIT
  )
  TEMPER_CRAFTING_API.Account = STATE.Account
  TEMPER_CRAFTING_API.Character = STATE.Character

  EVENT_MANAGER.RegisterForUpdate("TemperCrafting", 1000, queue)

  STATE.Furnisher.recipelist = filterPublishedItems(STATE.Furnisher.recipelist)

  const craftingVars: Record<string, unknown> = STATE.Account.crafting
  delete craftingVars["research"]
  delete craftingVars["researched"]
  delete craftingVars["researching"]

  if (STATE.Character.income[1] !== GetDate()) {
    STATE.Character.income[1] = GetDate()
    STATE.Character.income[2] = GetCurrentMoney()
  }

  ZO_CreateStringId("SI_BINDING_NAME_CRAFTSTORE_WINDOW", STATE.Loc.TT[14])

  ZO_CreateStringId("SI_BINDING_NAME_CRAFTSTORE_STYLES", STATE.Loc.TT[35])
  ZO_CreateStringId("SI_BINDING_NAME_CRAFTSTORE_RUNES", STATE.Loc.TT[36])
  ZO_CreateStringId("SI_BINDING_NAME_CRAFTSTORE_PROVISIONING", STATE.Loc.TT[37])
  ZO_CreateStringId("SI_BINDING_NAME_CRAFTSTORE_FURNISHINGS", STATE.Loc.TT[38])

  SCENE_MANAGER.RegisterTopLevel(TemperCrafting_Panel, false)
  EVENT_MANAGER.RegisterForEvent(
    "CSEE",
    EVENT_QUEST_CONDITION_COUNTER_CHANGED,
    onQuestConditionCounterChanged
  )
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_RECIPE_LEARNED, onRecipeLearned)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_STYLE_LEARNED, onStyleLearned)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_TRADING_HOUSE_RESPONSE_RECEIVED, updateGuildStore)
  EVENT_MANAGER.RegisterForEvent(
    "CSEE",
    EVENT_SMITHING_TRAIT_RESEARCH_STARTED,
    onSmithingTraitResearchStarted
  )
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_STABLE_INTERACT_END, onStableInteractEnd)
  EVENT_MANAGER.RegisterForEvent(
    "CSEE",
    EVENT_SMITHING_TRAIT_RESEARCH_COMPLETED,
    onSmithingTraitResearchChange
  )
  EVENT_MANAGER.RegisterForEvent(
    "CSEE",
    EVENT_SMITHING_TRAIT_RESEARCH_CANCELED,
    onSmithingTraitResearchChange
  )
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_CRAFTING_STATION_INTERACT, onCraftingStationInteract)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_INVENTORY_FULL_UPDATE, updateBag)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_CRAFT_COMPLETED, onCraftCompleted)
  EVENT_MANAGER.RegisterForEvent(
    "CSEE",
    EVENT_END_CRAFTING_STATION_INTERACT,
    onEndCraftingStationInteract
  )
  EVENT_MANAGER.RegisterForEvent(
    "CSEE",
    EVENT_GAME_CAMERA_UI_MODE_CHANGED,
    onGameCameraUIModeChanged
  )
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_ACTION_LAYER_PUSHED, onActionLayerPushed)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_NEW_MOVEMENT_IN_UI_MODE, newMovementInUIMode)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_RETICLE_HIDDEN_UPDATE, onReticleHiddenUpdate)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_PLAYER_ACTIVATED, onPlayerActivated)
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_PLAYER_DEACTIVATED, onPlayerDeactivated)
  EVENT_MANAGER.RegisterForEvent(
    "CSEE",
    EVENT_INVENTORY_SINGLE_SLOT_UPDATE,
    timed(onInventorySingleSlotUpdate)
  )
  EVENT_MANAGER.RegisterForEvent("CSEE", EVENT_MONEY_UPDATE, onMoneyUpdate)

  CHAMPION_PERKS_SCENE.RegisterCallback("StateChange", onChampionPerksSceneStateChange)

  SHARED_INVENTORY.RegisterCallback("SlotAdded", timed(onInventorySlotAdded))
  SHARED_INVENTORY.RegisterCallback("SlotRemoved", timed(onInventorySlotRemoved))
  ZO_PreHookHandler(ZO_StackSplit, "OnShow", onStackSplitShow)
  ZO_PreHookHandler(ZO_EnchantingTopLevelModeMenuBarButton1, "OnMouseDown", runeCreationTabShow)
  ZO_PreHookHandler(ZO_EnchantingTopLevelModeMenuBarButton2, "OnMouseDown", runeExtractionTabShow)
  ZO_PreHookHandler(ZO_EnchantingTopLevelModeMenuBarButton3, "OnMouseDown", runeRecipeTabShow)

  const settingsPanel = registerSettings()
  TEMPER_CRAFTING_API.LAM = settingsPanel

  scrollText()
  tooltipHandler()
  if (
    type(STATE.Character.previewtype) === "string" ||
    STATE.Character.previewType === undefined ||
    STATE.Character.previewType === false
  ) {
    STATE.Character.previewtype = 1
  }
  style.updatePreview(STATE.Character.previewtype)
  panelInitialize()

  Knowledge.onInitialized("TemperCrafting", () => {
    if (STATE.Init) {
      Knowledge.rebuildAll()
      updateResearch()
      updateScreen()
      drawCharacters()
    }
  })

  initializeTemperWrit()
  initializeTemperPotions()
  Knowledge.onInitialized("TemperMasterWritInventoryMarker", () => {
    initializeMasterWritInventoryMarker()
  })
}

if (STATE.Debug) {
  _CS = STATE
  SLASH_COMMANDS["/_"] = () => {
    STATE.Chat.Print(_)
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

SLASH_COMMANDS["/tempercraft"] = showMain
SLASH_COMMANDS["/tc"] = showMain
SLASH_COMMANDS["/tcpurge"] = storagePurge
SLASH_COMMANDS["/tcrepair"] = repairStored
SLASH_COMMANDS["/tcrepairknowledge"] = updateRecipeKnowledge
SLASH_COMMANDS["/tcremovechar"] = removeCharacter

globalThis.TemperHud?.registerCommand({
  name: "/tempercraft",
  description: "Crafting storage & research window",
  addon: "TemperCrafting",
})
