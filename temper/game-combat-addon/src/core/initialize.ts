import { initializeActions } from "../actions/init"
import { ADDON_NAME } from "../constants"
import { setFightDataLog } from "../fight-data/log"
import { initializeFightData } from "../fight-data/saved-fights"
import { initializeLibCombat } from "../lib-combat/initialize"
import { setLibCombatLog } from "../lib-combat/log"
import { makeMenu } from "../menu/menu"
import { getSvDefaults, initializeSavedVariables } from "../saved-variables"
import { initializeUI } from "../ui/window"
import { setInCombat, setInitialized, setPlayername } from "./addon-state"
import { setPenetrationDebuffValue, variablePenetrationDebuffAbilityIds } from "./data-tables"
import { initCurrentData, initializeChat, updateEvents } from "./events"
import { log } from "./log"
import { registerSlashCommands } from "./slash"

export function initializeCore(): undefined {
  const db = initializeSavedVariables()

  setLibCombatLog((category, level, formatString, ...args) =>
    log(category, level, formatString, ...args)
  )
  setFightDataLog((level, formatString, ...args) => log("save", level, formatString, ...args))

  initializeLibCombat()

  for (const [debuffKey] of pairs(variablePenetrationDebuffAbilityIds)) {
    setPenetrationDebuffValue(debuffKey)
  }

  if (db.chatLog.enabled) {
    zo_callLater(initializeChat, 500)
  }

  setPlayername(zo_strformat(SI_UNIT_NAME, GetUnitName("player")))
  setInCombat(IsUnitInCombat("player"))

  initializeUI()

  EVENT_MANAGER.RegisterForEvent(`${ADDON_NAME}zone`, EVENT_ZONE_CHANGED, updateEvents)
  EVENT_MANAGER.RegisterForEvent(`${ADDON_NAME}group1`, EVENT_GROUP_UPDATE, updateEvents)
  EVENT_MANAGER.RegisterForEvent(`${ADDON_NAME}port`, EVENT_PLAYER_ACTIVATED, updateEvents)

  initCurrentData()

  makeMenu(getSvDefaults())

  setInitialized(true)
  initializeFightData()

  registerSlashCommands()

  initializeActions()
  return undefined
}
