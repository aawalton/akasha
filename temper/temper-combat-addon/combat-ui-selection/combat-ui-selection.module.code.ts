import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import {
  getCurrentFight,
  getLastSelections,
  getSelections,
  type SelectionTable,
} from "@akasha/temper-combat-addon/combat-ui-state"

export type SelectType = "ability" | "unit" | "buff" | "resource"

export interface BarsPanelControl extends Control {
  bars?: SelectionRowControl[]
}

export interface SelectionRowControl extends Control {
  id?: number
  dataId?: number | string
  type?: SelectType
  panel?: BarsPanelControl
  scale?: number
}

export function addSelection(
  this: void,
  row: SelectionRowControl,
  button: number,
  _upInside: boolean,
  ctrlkey: boolean,
  _alt: boolean,
  shiftkey: boolean
): undefined {
  const id = row.id
  const dataId = row.dataId
  const selecttype = row.type

  if (button !== MOUSE_BUTTON_INDEX_LEFT && button !== MOUSE_BUTTON_INDEX_MIDDLE) {
    return undefined
  }

  if (id == null || dataId == null || selecttype == null) {
    return undefined
  }

  const db = getDb()
  const category =
    selecttype === "buff"
      ? "buff"
      : selecttype === "resource"
        ? "resource"
        : db.FightReport.category

  const selectionTables: Record<string, SelectionTable | undefined> = getSelections()[selecttype]
  const lastSelectionTable = getLastSelections()[selecttype]

  let sel = selectionTables[category]
  let lastsel = lastSelectionTable[category]
  const bars = row.panel?.bars

  if (button === MOUSE_BUTTON_INDEX_MIDDLE) {
    selectionTables[category] = undefined
    lastSelectionTable[category] = undefined
    updateReport()
    return undefined
  }

  if (sel == null) {
    sel = { [dataId]: id }
    lastsel = id
  } else if (shiftkey && !ctrlkey && lastsel != null) {
    const istart = zo_min(lastsel, id)
    const iend = zo_max(lastsel, id)

    sel = {}

    for (let i = istart; i <= iend; i++) {
      const irowcontrol = bars?.[i - 1]
      if (irowcontrol?.dataId != null) {
        sel[irowcontrol.dataId] = i
      }
    }
  } else if (ctrlkey && !shiftkey) {
    if (sel[dataId] != null) {
      lastsel = undefined
      sel[dataId] = undefined
    } else {
      lastsel = id
      sel[dataId] = id
    }
  } else if (shiftkey && ctrlkey && lastsel != null) {
    const istart = zo_min(lastsel, id)
    const iend = zo_max(lastsel, id)

    for (let i = istart; i <= iend; i++) {
      const irowcontrol = bars?.[i - 1]
      if (irowcontrol?.dataId != null) {
        sel[irowcontrol.dataId] = i
      }
    }
  } else if (!shiftkey && !ctrlkey) {
    if (lastsel === id && sel[dataId] != null) {
      lastsel = undefined
      sel = undefined
    } else {
      lastsel = id
      sel = { [dataId]: id }
    }
  }

  lastSelectionTable[category] = lastsel
  selectionTables[category] = sel
  updateReport()
  return undefined
}

function updateReport(this: void): undefined {
  const report = TemperCombat_Report
  report.Update?.(report, getCurrentFight())
  return undefined
}

TemperCombat.AddSelection = addSelection
