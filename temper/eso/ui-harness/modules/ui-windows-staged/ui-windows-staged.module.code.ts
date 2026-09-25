const CRAFTING = "temper.addon.pages.items.crafting-station.modules"

const TREASURE_DATA = "temper.addon.pages.world.collections.modules.treasure-data"

const NEXT_BOSS = "temper.addon.pages.temper-core.temper-events.modules"

const POWER_LASH = `
  GetUnitClassId = function() return 1 end
  IsUnitInCombat = function() return true end
  DoesUnitExist = function() return true end
  GetSlotTexture = function(slot)
    if slot == 3 then return "/esoui/art/icons/ability_dragonknight_001_a.dds" end
    return ""
  end
  GetNumBuffs = function() return 1 end
  GetUnitBuffInfo = function()
    return "Off Balance", 0, 1, 1, 1, "/esoui/art/icons/ability_debuff_offbalance.dds"
  end
  __bundle_require("temper.addon.pages.combat.modules.combat-action-power-lash.combat-action-power-lash.module.code")
    .powerLashPoll(GetGameTimeMilliseconds())
`

const TRADER_INFO = `
  local guildId = GetGuildId(1)
  GetCurrentTradingHouseGuildDetails = function()
    return guildId, GetGuildName(guildId), GetGuildAlliance(guildId)
  end
  SCENE_MANAGER:Show("tradinghouse")
  __ui_raise(EVENT_OPEN_TRADING_HOUSE)
`

const BANK_PLAN = `
  local panel = __bundle_require("temper.addon.pages.items.modules.inventory-bank-action-panel.inventory-bank-action-panel.module.code")
  SCENE_MANAGER:Show("bank")
  local characters, total = {}, 0
  for at = 1, 3 do
    characters[#characters + 1] = { label = zo_strformat("<<1>>", GetCharacterInfo(at)), count = at * 4 }
    total = total + at * 4
  end
  panel.refreshBankActionPanel({ totalUnits = total, characters = characters })
`

const CRAFTING_WRIT = `
  __bundle_require("${CRAFTING}.crafting-state.crafting-state.module.code").STATE.Account.options.usequest = true
  local steps = {
    { "Craft a Rubedite Sword: 0 / 1", 0, 1 },
    { "Craft a Rubedite Helm: 1 / 1", 1, 1 },
    { "Craft a Rubedite Girdle: 0 / 1", 0, 1 },
  }
  IsValidQuestIndex = function(index) return index == 1 end
  GetJournalQuestType = function() return QUEST_TYPE_CRAFTING end
  GetJournalQuestInfo = function()
    return "Blacksmith Writ", "", "Craft the items the writ asks for.", 0, "", false
  end
  GetJournalQuestNumConditions = function() return #steps end
  GetJournalQuestConditionInfo = function(_, _, at)
    local step = steps[at]
    return step[1], step[2], step[3], false, false
  end
  SCENE_MANAGER:Show("smithing")
  __ui_raise(EVENT_CRAFTING_STATION_INTERACT, CRAFTING_TYPE_BLACKSMITHING)
`

const SET_COPY_TEXT = `
  __bundle_require("temper.addon.pages.items.crafting-sets.modules.sets-core-lifecycle-loaded.sets-core-lifecycle-loaded.module.code")
    .startSetsLibrary()
  local lib = __bundle_require("temper.addon.pages.items.crafting-sets.modules.sets-lib.sets-lib.module.code").lib
  local name = "Mother's Sorrow"
  local text = table.concat({
    "(2 items) Adds 1096 Max Magicka",
    "(3 items) Adds 657 Spell Critical",
    "(4 items) Adds 657 Spell Critical",
    "(5 items) Adds 1528 Spell Critical",
  }, "\\n")
  lib.CopyDialog:Show({ text = text, setData = { name = name } }, { titleParams = { [1] = name } })
`

const LOST_TREASURE_MAP = `
  local data = __bundle_require("${TREASURE_DATA}.treasure-data.module.code").TREASURE_DATA
  local names = {}
  for textureName in pairs(data.TEXTURE_NAME_DATA) do names[#names + 1] = textureName end
  table.sort(names)
  local textureName = names[1]
  GetTreasureMapInfo = function()
    return "Treasure Map", "/esoui/art/treasuremaps/" .. textureName .. ".dds"
  end
  SCENE_MANAGER:Show("treasureMapInventory")
  __ui_raise(EVENT_SHOW_TREASURE_MAP, 1)
`

const MAP_TIMERS = `
  local imperialCity = __bundle_require("${NEXT_BOSS}.next-boss-constants.next-boss-constants.module.code")
    .MAP_ID_IMPERIAL_CITY
  GetCurrentMapId = function() return imperialCity end
  TemperNextBoss.enable()
  SCENE_MANAGER:Show("worldMap")
`

const ICON_PICKER = `
  local panelName = "TemperAddonMenuPanel_TemperWorldLostTreasureLAMSettings"
  CALLBACK_MANAGER:RegisterCallback("TemperAddonMenu-PanelControlsCreated", function(created)
    if created:GetName() ~= panelName then return end
    zo_callLater(function()
      local found
      local function walk(control)
        if found then return end
        if control.icon ~= nil and control.dropdown ~= nil then found = control return end
        for _, child in ipairs(control.uiChildren or {}) do walk(child) end
      end
      walk(created)
      if found then found.dropdown.uiHandlers.OnMouseUp(found.dropdown, MOUSE_BUTTON_INDEX_LEFT, true) end
    end, 0)
  end)
  TemperAddonMenu:OpenToPanel(WINDOW_MANAGER:GetControlByName(panelName))
`

export function ownWindow(slug: string, addon: string, control: string, opens: string) {
  return { slug, addon, savedVariables: [addon], shows: [] as string[], control, opens }
}

export const STAGED_WINDOWS = [
  ownWindow("power-lash-prompt", "TemperCombat", "TemperActions_PowerLashGuide", POWER_LASH),
  ownWindow("trader-info", "TemperItems", "TemperItemsListingsTraderInfo", TRADER_INFO),
  ownWindow("bank-plan", "TemperItems", "TemperBankActionPanel", BANK_PLAN),
  ownWindow(
    "crafting-panel",
    "TemperItems",
    "TemperItemsCrafting_Panel",
    `__bundle_require("${CRAFTING}.craft-ui-updates.craft-ui-updates.module.code").showMain()`
  ),
  ownWindow("crafting-writ", "TemperItems", "TemperItemsCrafting_Quest", CRAFTING_WRIT),
  ownWindow("set-copy-text", "TemperItems", "TemperItemsCraftingSetsCopyTextDialog", SET_COPY_TEXT),
  ownWindow("lost-treasure-map", "TemperWorld", "TemperLostTreasure_MiniMap", LOST_TREASURE_MAP),
  ownWindow("next-boss-map-timers", "Temper", "TemperNextBossMapTimers", MAP_TIMERS),
  ownWindow("icon-picker", "TemperWorld", "LAMIconPicker", ICON_PICKER),
]
