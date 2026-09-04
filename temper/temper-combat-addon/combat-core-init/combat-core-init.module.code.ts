import { initializeActions } from "@akasha/temper-combat-addon/combat-actions-init"
import {
  setInCombat,
  setInitialized,
  setPlayername,
} from "@akasha/temper-combat-addon/combat-addon-state"
import { ADDON_NAME } from "@akasha/temper-combat-addon/combat-constants"
import {
  initCurrentData,
  initializeChat,
  updateEvents,
} from "@akasha/temper-combat-addon/combat-core-events"
import { log } from "@akasha/temper-combat-addon/combat-core-log"
import {
  setPenetrationDebuffValue,
  VARIABLE_PENETRATION_DEBUFF_ABILITY_IDS,
} from "@akasha/temper-combat-addon/combat-data-tables"
import { setFightDataLog } from "@akasha/temper-combat-addon/combat-fight-data-log"
import { initializeLibCombat } from "@akasha/temper-combat-addon/combat-lib-init"
import { setLibCombatLog } from "@akasha/temper-combat-addon/combat-lib-log"
import { makeMenu } from "@akasha/temper-combat-addon/combat-menu"
import { initializeFightData } from "@akasha/temper-combat-addon/combat-saved-fights"
import {
  getSvDefaults,
  initializeSavedVariables,
} from "@akasha/temper-combat-addon/combat-saved-variables"
import { registerSlashCommands } from "@akasha/temper-combat-addon/combat-slash-commands"
import { initializeUI } from "@akasha/temper-combat-addon/combat-ui-window"

export function initializeCore(): undefined {
  const db = initializeSavedVariables()

  setLibCombatLog((category, level, formatString, ...args) =>
    log(category, level, formatString, ...args)
  )
  setFightDataLog((level, formatString, ...args) => log("save", level, formatString, ...args))

  initializeLibCombat()

  for (const [debuffKey] of pairs(VARIABLE_PENETRATION_DEBUFF_ABILITY_IDS)) {
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
