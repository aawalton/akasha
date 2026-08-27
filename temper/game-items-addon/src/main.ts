import "./public-api"

import { InitializeBankActionPanel } from "./bank-action-panel"
import { InitializeInventoryBrowser, ToggleInventoryBrowser } from "./browser"
import { ADDON_NAME, BANK_BAGS, PERSONAL_BAGS } from "./constants"
import { scanAccountCurrencies, scanCharacterCurrencies } from "./currency"
import { registerEquipmentLockOverlay } from "./equipment-lock-overlay"
import { registerInventoryEvents } from "./events"
import { onTemperInventorySubcommand } from "./explain-slash-command"
import { InitializeFilterBar } from "./filter-bar-init"
import { registerHudFields } from "./hud-fields"
import { InitializeInventoryActionPanel } from "./inventory-action-panel"
import { registerInventoryLockOverlay } from "./inventory-lock-overlay"
import { scanCompanionWorn, scanCraftBag, scanPersonalBags } from "./inventory-ops"
import { pruneConfirmedVerdicts } from "./item-rule-verdict-store"
import { registerLocationTooltip } from "./location-tooltip"
import { registerMailHandler } from "./mail-handler"
import { cleanupExpiredCooldowns } from "./open-cooldown-protection"
import { finishPerfTrace, startPerfTrace } from "./perf"
import { handleTemperPlanCommand } from "./plan"
import { pruneStaleAnnotations } from "./quest-annotations"
import { getCompiledConfig } from "./rules-core"
import { registerConfirmDialog } from "./rules-core-confirm-dialog"
import { repackGuildBank } from "./rules-dispatch-guild-repack"
import { rescanInventory } from "./rules-eval"
import { onTemperRulesCommand } from "./rules-slash-command"
import {
  getSavedVariables,
  initializeSavedVariables,
  migrateCraftedField,
  migrateEmptyLocationKey,
  migrateHouseBankLocationKeys,
  migrateItemLinkDerivedFields,
  pruneDeletedCharacters,
} from "./saved-variables"
import { pruneStaleTemperLocks } from "./temper-lock-store"
import { registerTooltipHook } from "./tooltip-cooldown"
import { registerTooltipLockIcon } from "./tooltip-lock-icon"
import { registerRuleTooltipHook } from "./tooltip-rule-line"
import { probeMasterWrits } from "./writ-master-probe"
export function Initialize(): undefined {
  const perfStart = startPerfTrace()
  initializeSavedVariables()
  cleanupExpiredCooldowns()
  registerTooltipHook()
  registerRuleTooltipHook()
  registerTooltipLockIcon()
  registerLocationTooltip()
  migrateHouseBankLocationKeys()
  migrateItemLinkDerivedFields()
  migrateCraftedField()
  migrateEmptyLocationKey()
  pruneStaleAnnotations()
  const prunedLocks = pruneStaleTemperLocks([...PERSONAL_BAGS, ...BANK_BAGS])
  if (prunedLocks > 0) d(`[${ADDON_NAME}] Pruned ${prunedLocks} stale Temper Lock(s)`)
  const compiledForPrune = getCompiledConfig()
  if (compiledForPrune !== undefined) {
    const prunedVerdicts = pruneConfirmedVerdicts(compiledForPrune)
    if (prunedVerdicts > 0)
      d(`[${ADDON_NAME}] Pruned ${prunedVerdicts} confirmed item-rule verdict(s)`)
  }
  pruneDeletedCharacters()
  registerInventoryEvents()
  registerInventoryLockOverlay()
  registerEquipmentLockOverlay()
  registerConfirmDialog()
  InitializeInventoryActionPanel()
  InitializeBankActionPanel()
  InitializeFilterBar()
  InitializeInventoryBrowser()
  registerHudFields()
  registerMailHandler()

  SLASH_COMMANDS["/temperinv"] = function (this: void): undefined {
    scanPersonalBags()
    scanCraftBag()
    scanCharacterCurrencies()
    scanAccountCurrencies()
    if (HasActiveCompanion()) {
      scanCompanionWorn()
    }
    d(`[${ADDON_NAME}] Manual scan complete`)
  }

  SLASH_COMMANDS["/temperscan"] = function (this: void): undefined {
    rescanInventory()
    d(`[${ADDON_NAME}] Inventory rules rescan complete`)
  }

  SLASH_COMMANDS["/temperrepack"] = function (this: void): undefined {
    repackGuildBank()
  }

  SLASH_COMMANDS["/temperplan"] = function (this: void): undefined {
    handleTemperPlanCommand()
  }

  SLASH_COMMANDS["/temperrules"] = onTemperRulesCommand

  SLASH_COMMANDS["/temperbrowse"] = function (this: void): undefined {
    ToggleInventoryBrowser()
  }

  globalThis.TemperHud?.registerCommand({
    name: "inventory",
    description: "Inventory rule diagnostics (explain / explain-buy)",
    addon: "TemperInventory",
    handler: onTemperInventorySubcommand,
  })

  SLASH_COMMANDS["/tempermwprobe"] = function (this: void): undefined {
    probeMasterWrits()
  }

  for (const entry of [
    { name: "/temperinv", description: "Manual inventory + currency scan" },
    { name: "/temperscan", description: "Rescan inventory rules" },
    { name: "/temperrepack", description: "Repack the guild bank" },
    { name: "/temperplan", description: "Print pending inventory actions" },
    { name: "/temperrules", description: "Manage inventory rules" },
    { name: "/temperbrowse", description: "Toggle the inventory browser" },
    { name: "/tempermwprobe", description: "Probe master writs" },
  ]) {
    globalThis.TemperHud?.registerCommand({
      name: entry.name,
      description: entry.description,
      addon: "TemperInventory",
    })
  }

  getSavedVariables().perf = finishPerfTrace(perfStart)
}

EVENT_MANAGER.RegisterForEvent(
  ADDON_NAME,
  EVENT_ADD_ON_LOADED,
  function (this: void, _event: number, addonName: string): undefined {
    if (addonName !== ADDON_NAME) return
    EVENT_MANAGER.UnregisterForEvent(ADDON_NAME, EVENT_ADD_ON_LOADED)
    Initialize()
  }
)
