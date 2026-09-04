import type { CmxFight } from "@akasha/temper-combat-addon/combat-core-types"
import type { Fight as SavedFightShape } from "@akasha/temper-combat-addon/combat-fight-data-types"
import {
  Delete,
  DeleteLog,
  GetNumFights,
  getFight,
  Load,
  Save,
} from "@akasha/temper-combat-addon/combat-saved-fights"
import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import { LAST_FIGHTS } from "@akasha/temper-combat-addon/combat-selection"
import { searchtable, toggleFightList } from "@akasha/temper-combat-addon/combat-ui-helpers"
import {
  getCurrentFight,
  getFightData,
  getSelections,
} from "@akasha/temper-combat-addon/combat-ui-state"

export function editTitleStart(this: void, control: Control): undefined {
  const label = control.GetNamedChild<LabelControl>("Name")
  const editbox = control.GetNamedChild<EditControl>("Edit")
  if (label == null || editbox == null) {
    return undefined
  }

  label.SetHidden(true)
  editbox.SetHidden(false)

  editbox.SetText(label.GetText())
  editbox.SelectAll()
  editbox.TakeFocus()
  return undefined
}

export function editTitleEnd(this: void, editbox: EditControl & Control): undefined {
  const control = editbox.GetParent()
  const label = control?.GetNamedChild<LabelControl>("Name")

  editbox.SetHidden(true)
  label?.SetHidden(false)

  const newtext = editbox.GetText()

  label?.SetText(newtext)

  const fightData = getFightData()
  if (fightData != null) {
    fightData.fightlabel = newtext
  }
  return undefined
}

export function clearSelections(this: void): undefined {
  const category = getDb().FightReport.category
  const selections = getSelections()

  selections.ability[category] = undefined
  selections.unit[category] = undefined
  selections.buff["buff"] = undefined
  selections.resource["resource"] = undefined
  return undefined
}

function isSavedFightInput(fight: CmxFight): fight is CmxFight & SavedFightShape {
  return fight.calculated != null
}

function isLoadedCmxFight(fight: SavedFightShape): fight is SavedFightShape & CmxFight {
  return typeof fight.starttime === "number" && typeof fight.endtime === "number"
}

interface NavButtonControl extends ButtonControl {
  func?: string
}

export function reportUpdate(this: void, fightId?: number): undefined {
  const report = TemperCombat_Report
  report.Update?.(report, fightId)
  return undefined
}

function isDisabled(this: void, control: ButtonControl): boolean {
  return control.GetState() === BSTATE_DISABLED
}

const NAV_BUTTON_FUNCTIONS: Record<
  string,
  (this: void, control: NavButtonControl, ...args: unknown[]) => undefined
> = {
  previous: (control) => {
    if (isDisabled(control)) {
      return undefined
    }
    return reportUpdate((getCurrentFight() ?? 0) - 1)
  },

  next: (control) => {
    if (isDisabled(control)) {
      return undefined
    }
    return reportUpdate((getCurrentFight() ?? 0) + 1)
  },

  last: (control) => {
    if (isDisabled(control)) {
      return undefined
    }
    return reportUpdate(LAST_FIGHTS.length)
  },

  load: (control) => {
    if (isDisabled(control)) {
      return undefined
    }
    return toggleFightList()
  },

  save: (control, _button, _upInside, _ctrl, _alt, shiftkey) => {
    if (isDisabled(control)) {
      return undefined
    }
    const fightData = getFightData()
    if (fightData == null) {
      return undefined
    }

    const numFights = GetNumFights()
    const lastsaved = getFight(numFights - 1)
    if (lastsaved !== undefined && lastsaved.date === fightData.date) {
      return undefined
    }

    const spaceLeft = getDb().maxSavedFights - numFights
    assert(spaceLeft > 0, zo_strformat(SI_TEMPER_COMBAT_SAVEDFIGHTS_FULL, 1 - spaceLeft))

    if (!isSavedFightInput(fightData)) {
      return undefined
    }
    Save(fightData, shiftkey === true)
    return reportUpdate()
  },

  delete: (control) => {
    if (isDisabled(control)) {
      return undefined
    }
    const currentFight = getCurrentFight()
    if (currentFight == null) {
      return undefined
    }
    table.remove(LAST_FIGHTS, currentFight)
    clearSelections()

    if (LAST_FIGHTS.length === 0) {
      return reportUpdate()
    }
    return reportUpdate(zo_min(currentFight, LAST_FIGHTS.length))
  },
}

export function initNavButtons(this: void, rowControl: Control): undefined {
  for (let i = 1; i <= rowControl.GetNumChildren(); i++) {
    const child = rowControl.GetChild<NavButtonControl>(i)

    if (child != null) {
      const handler = child.func != null ? NAV_BUTTON_FUNCTIONS[child.func] : undefined
      if (handler == null) {
        child.SetHandler("OnMouseUp", undefined)
      } else {
        child.SetHandler("OnMouseUp", (_control, ...rest) => handler(child, ...rest))
      }
    }
  }
  return undefined
}

export interface FightListItemControl extends Control {
  id?: number
  issaved?: boolean
}

export function loadItem(this: void, listitem: FightListItemControl): undefined {
  const issaved = listitem.issaved
  const id = listitem.id ?? 1

  let isLoaded: boolean | undefined
  let loadId: number | undefined
  const savedFight = getFight(id - 1)

  if (issaved === true && savedFight !== undefined) {
    const [found, key] = searchtable(LAST_FIGHTS, "date", savedFight.date)
    isLoaded = found
    loadId = typeof key === "number" ? key : undefined
    if (isLoaded === true && loadId != null) {
      const candidate = LAST_FIGHTS[loadId - 1]
      isLoaded = candidate !== undefined && candidate.time === savedFight.time
    }
  }

  toggleFightList()

  if (issaved === true && isLoaded === false) {
    const loadedfight = Load(id - 1)
    if (isLoadedCmxFight(loadedfight)) {
      table.insert(LAST_FIGHTS, loadedfight)
    }

    reportUpdate(LAST_FIGHTS.length)
  } else {
    const target = issaved === true && loadId != null ? loadId : id
    reportUpdate(target)
  }

  clearSelections()
  return undefined
}

export function deleteItem(this: void, control: Control): undefined {
  const row = control.GetParent()?.GetParent<FightListItemControl>()
  if (row == null) {
    return undefined
  }
  const issaved = row.issaved
  const id = row.id ?? 1

  if (issaved === true) {
    Delete(id - 1)
    reportUpdate()
  } else {
    table.remove(LAST_FIGHTS, id)
    if (LAST_FIGHTS.length === 0) {
      reportUpdate()
    } else {
      reportUpdate(zo_min(getCurrentFight() ?? LAST_FIGHTS.length, LAST_FIGHTS.length))
    }
  }

  toggleFightList(undefined, true)
  return undefined
}

export function deleteItemLog(this: void, control: Control): undefined {
  const row = control.GetParent()?.GetParent<FightListItemControl>()
  if (row == null) {
    return undefined
  }
  const issaved = row.issaved
  const id = row.id ?? 1

  if (issaved === true) {
    DeleteLog(id - 1)
  } else {
    const fight = LAST_FIGHTS[id - 1]
    if (fight !== undefined) {
      fight.log = []
    }
  }

  toggleFightList(undefined, true)
  return undefined
}

TemperCombat.EditTitleStart = editTitleStart
TemperCombat.EditTitleEnd = editTitleEnd
TemperCombat.InitNavButtons = initNavButtons
TemperCombat.LoadItem = loadItem
TemperCombat.DeleteItem = deleteItem
TemperCombat.DeleteItemLog = deleteItemLog
