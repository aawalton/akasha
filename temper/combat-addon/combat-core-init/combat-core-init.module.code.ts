import { initializeActions } from "../combat-actions-init/combat-actions-init.module.code.ts"
import {
  setInCombat,
  setInitialized,
  setPlayername,
} from "../combat-addon-state/combat-addon-state.module.code.ts"
import { ADDON_NAME } from "../combat-constants/combat-constants.module.code.ts"
import {
  initCurrentData,
  initializeChat,
  updateEvents,
} from "../combat-core-events/combat-core-events.module.code.ts"
import { log } from "../combat-core-log/combat-core-log.module.code.ts"
import {
  setPenetrationDebuffValue,
  VARIABLE_PENETRATION_DEBUFF_ABILITY_IDS,
} from "../combat-data-tables/combat-data-tables.module.code.ts"
import { setFightDataLog } from "../combat-fight-data-log/combat-fight-data-log.module.code.ts"
import { initializeLibCombat } from "../combat-lib-init/combat-lib-init.module.code.ts"
import { setLibCombatLog } from "../combat-lib-log/combat-lib-log.module.code.ts"
import { makeMenu } from "../combat-menu/combat-menu.module.code.ts"
import { initializeFightData } from "../combat-saved-fights/combat-saved-fights.module.code.ts"
import {
  getSvDefaults,
  initializeSavedVariables,
} from "../combat-saved-variables/combat-saved-variables.module.code.ts"
import { registerSlashCommands } from "../combat-slash-commands/combat-slash-commands.module.code.ts"
import { initializeUI } from "../combat-ui-window/combat-ui-window.module.code.ts"

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
