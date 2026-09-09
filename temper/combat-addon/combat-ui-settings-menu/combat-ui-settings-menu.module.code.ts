import { isObjectRecord } from "@akasha/utils/narrow/is-object-record"
import { calculateFight } from "../combat-analysis/combat-analysis.module.code.ts"
import type { CmxFight } from "../combat-core-types/combat-core-types.module.code.ts"
import { openSettings } from "../combat-menu/combat-menu.module.code.ts"
import { getDb } from "../combat-saved-variables/combat-saved-variables.module.code.ts"
import {
  getShowOverHeal,
  LAST_FIGHTS,
  setShowOverHeal,
} from "../combat-selection/combat-selection.module.code.ts"
import { exportBuild } from "../combat-ui-build-export/combat-ui-build-export.module.code.ts"
import {
  POSTTOCHAT_MODE_HEALING,
  POSTTOCHAT_MODE_MULTI,
  POSTTOCHAT_MODE_SELECTION,
  POSTTOCHAT_MODE_SELECTION_HEALING,
  POSTTOCHAT_MODE_SINGLE,
  POSTTOCHAT_MODE_SINGLEANDMULTI,
  POSTTOCHAT_MODE_SMART,
  postToChat,
} from "../combat-ui-chat-report/combat-ui-chat-report.module.code.ts"
import { getCurrentFight, getSelections } from "../combat-ui-state/combat-ui-state.module.code.ts"
import { updateReport } from "../combat-ui-window/combat-ui-window.module.code.ts"

function toggleShowIds(this: void): undefined {
  const db = getDb()
  db.showDebugIds = !db.showDebugIds
  updateReport()
  return undefined
}

function toggleShowPets(this: void): undefined {
  const db = getDb()
  db.FightReport.showPets = !db.FightReport.showPets
  updateReport()
  return undefined
}

function toggleOverhealMode(this: void): undefined {
  setShowOverHeal(!getShowOverHeal())
  updateReport()
  return undefined
}

function postSingleDPS(this: void): undefined {
  postToChat(POSTTOCHAT_MODE_SINGLE, getCurrentFight())
  return undefined
}

function postSmartDPS(this: void): undefined {
  postToChat(POSTTOCHAT_MODE_SMART, getCurrentFight())
  return undefined
}

function postMultiDPS(this: void): undefined {
  postToChat(POSTTOCHAT_MODE_MULTI, getCurrentFight())
  return undefined
}

function postAllDPS(this: void): undefined {
  postToChat(POSTTOCHAT_MODE_SINGLEANDMULTI, getCurrentFight())
  return undefined
}

function postSelectionDPS(this: void): undefined {
  postToChat(POSTTOCHAT_MODE_SELECTION, getCurrentFight())
  return undefined
}

function postHPS(this: void): undefined {
  postToChat(POSTTOCHAT_MODE_HEALING, getCurrentFight())
  return undefined
}

function postSelectionHPS(this: void): undefined {
  postToChat(POSTTOCHAT_MODE_SELECTION_HEALING, getCurrentFight())
  return undefined
}

export function settingsContextMenu(
  this: void,
  settingsbutton: Control,
  upInside: boolean
): undefined {
  if (!upInside) {
    return undefined
  }

  const db = getDb()

  const showIdString = db.showDebugIds ? SI_TEMPER_COMBAT_HIDEIDS : SI_TEMPER_COMBAT_SHOWIDS
  const showOverhealString = getShowOverHeal()
    ? SI_TEMPER_COMBAT_HIDEOVERHEAL
    : SI_TEMPER_COMBAT_SHOWOVERHEAL
  const showPetString = db.FightReport.showPets
    ? SI_TEMPER_COMBAT_MENU_HIDEPETS
    : SI_TEMPER_COMBAT_MENU_SHOWPETS_NAME

  const postoptions: LibCustomMenuEntry[] = []

  table.insert(postoptions, {
    label: GetString(SI_TEMPER_COMBAT_POSTSINGLEDPS),
    callback: postSingleDPS,
  })

  const currentFight = getCurrentFight()
  const fight = currentFight != null ? LAST_FIGHTS[currentFight - 1] : undefined

  if (fight !== undefined && fight.bossfight === true) {
    table.insert(postoptions, {
      label: GetString(SI_TEMPER_COMBAT_POSTSMARTDPS),
      callback: postSmartDPS,
    })
  }

  table.insert(postoptions, {
    label: GetString(SI_TEMPER_COMBAT_POSTMULTIDPS),
    callback: postMultiDPS,
  })
  table.insert(postoptions, {
    label: GetString(SI_TEMPER_COMBAT_POSTALLDPS),
    callback: postAllDPS,
  })

  const category = db.FightReport.category

  if (category === "damageOut" && getSelections().unit[category] != null) {
    table.insert(postoptions, {
      label: GetString(SI_TEMPER_COMBAT_POSTSELECTIONDPS),
      callback: postSelectionDPS,
    })
  }

  table.insert(postoptions, { label: GetString(SI_TEMPER_COMBAT_POSTHPS), callback: postHPS })

  if (category === "healingOut" && getSelections().unit[category] != null) {
    table.insert(postoptions, {
      label: GetString(SI_TEMPER_COMBAT_POSTSELECTIONHPS),
      callback: postSelectionHPS,
    })
  }

  ClearMenu()

  AddCustomMenuItem(GetString(showIdString), toggleShowIds)
  AddCustomMenuItem(GetString(showOverhealString), toggleOverhealMode)
  AddCustomMenuItem(GetString(showPetString), toggleShowPets)
  AddCustomMenuItem("ExportBuild", exportBuild)
  AddCustomSubMenuItem(GetString(SI_TEMPER_COMBAT_POSTDPS), postoptions)
  AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_SETTINGS), openSettings)

  const svversionRaw = fight !== undefined && isObjectRecord(fight) ? fight.svversion : undefined
  const svversion = typeof svversionRaw === "number" ? svversionRaw : undefined
  if (fight !== undefined && fight.log != null && (svversion == null || svversion > 2)) {
    const recalcFight: CmxFight = fight

    const calculate = () => {
      calculateFight(recalcFight)
      updateReport(getCurrentFight())
      return undefined
    }

    AddCustomMenuItem(GetString(SI_TEMPER_COMBAT_RECALCULATE), calculate)
  }

  ShowMenu(settingsbutton)
  AnchorMenu(settingsbutton)
  return undefined
}

TemperCombat.SettingsContextMenu = settingsContextMenu
