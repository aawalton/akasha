import { isInCombat } from "@akasha/temper-combat-addon/combat-addon-state"
import { REPORT_SCENE_NAME } from "@akasha/temper-combat-addon/combat-constants"
import { setUpdateReportHook } from "@akasha/temper-combat-addon/combat-core-events"
import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import { LAST_FIGHTS } from "@akasha/temper-combat-addon/combat-selection"
import type { LayoutControl } from "@akasha/temper-combat-addon/combat-ui-helpers"
import { initLiveReport } from "@akasha/temper-combat-addon/combat-ui-live-report"
import { initFightReport } from "@akasha/temper-combat-addon/combat-ui-report-init"
import type { SelectionRowControl } from "@akasha/temper-combat-addon/combat-ui-selection"
import {
  getFightData,
  getUiSelectionData,
  type ReportControl,
  resetSelections,
  setCurrentCLPage,
  setCurrentFight,
  UNCOLLAPSED_BUFFS,
  type UpdatableControl,
} from "@akasha/temper-combat-addon/combat-ui-state"

export function toggleFightReport(this: void): undefined {
  const db = getDb()

  if (!SCENE_MANAGER.IsShowing(REPORT_SCENE_NAME)) {
    SCENE_MANAGER.Toggle(REPORT_SCENE_NAME)

    const report = TemperCombat_Report
    report.Update?.(report, LAST_FIGHTS.length > 0 ? LAST_FIGHTS.length : undefined)

    SCENE_MANAGER.SetInUIMode(true)

    const lastFight = LAST_FIGHTS[LAST_FIGHTS.length - 1]
    if (
      LAST_FIGHTS.length > 0 &&
      !isInCombat() &&
      db.autoscreenshot &&
      (db.autoscreenshotmintime === 0 ||
        (lastFight !== undefined && lastFight.combattime > db.autoscreenshotmintime))
    ) {
      zo_callLater(TakeScreenshot, 400)
    }
  } else {
    SCENE_MANAGER.Toggle(REPORT_SCENE_NAME)
  }
  return undefined
}

export function getCMXData(this: void, dataType: string): Record<string, unknown> | undefined {
  let data: Record<string, unknown> | undefined = {}

  if (dataType === "selectionData") {
    const source = getUiSelectionData()
    if (source != null) {
      ZO_DeepTableCopy(source, data)
    }
  } else if (dataType === "fightData") {
    const source = getFightData()
    if (source != null) {
      ZO_DeepTableCopy(source, data)
    }
  } else {
    data = undefined
  }

  return data
}

let lastResize: [number, { x: number; y: number }] | undefined

export function resizing(this: void, control: BackdropControl, isResizing: boolean): undefined {
  if (control.IsHidden()) {
    return undefined
  }
  if (isResizing) {
    control.SetEdgeColor(1, 1, 1, 1)
    control.SetCenterColor(1, 1, 1, 0.2)
    control.SetDrawTier(2)
  } else {
    control.SetEdgeColor(1, 1, 1, 0)
    control.SetCenterColor(1, 1, 1, 0)
    control.SetDrawTier(0)

    if (lastResize === undefined) {
      return undefined
    }

    const [scale, newpos] = lastResize
    const parent = control.GetParent<Control & ReportControl>()
    if (parent == null) {
      return undefined
    }

    getDb()[parent.GetName()] = newpos

    parent.ClearAnchors()
    parent.SetAnchor(CENTER, undefined, TOPLEFT, newpos.x, newpos.y)
    parent.Resize?.(scale)
  }
  return undefined
}

export function newSize(
  this: void,
  control: LayoutControl,
  newLeft: number,
  newTop: number,
  newRight: number,
  newBottom: number,
  oldLeft: number,
  oldTop: number,
  oldRight: number,
  oldBottom: number
): undefined {
  const sizes = control.sizes
  if (sizes == null || control.IsHidden()) {
    return undefined
  }

  const [baseWidth, baseHeight] = sizes

  let newHeight = newBottom - newTop
  let newWidth = newRight - newLeft

  const oldHeight = oldBottom - oldTop
  const oldWidth = oldRight - oldLeft

  const heightChange = (newHeight - oldHeight) / oldHeight
  const widthChange = (newWidth - oldWidth) / oldWidth

  let newscale: number

  if (zo_abs(heightChange) > zo_abs(widthChange)) {
    newscale = newHeight / baseHeight
    newWidth = baseWidth * newscale

    control.SetWidth(newWidth)
  } else {
    newscale = newWidth / baseWidth
    newHeight = baseHeight * newscale

    control.SetHeight(newHeight)
  }

  newscale = zo_roundToNearest(newscale, 0.01)

  const [centerX, centerY] = control.GetCenter()

  lastResize = [newscale, { x: centerX, y: centerY }]
  return undefined
}

export function savePosition(this: void, control: Control): undefined {
  const [x, y] = control.GetCenter()

  getDb()[control.GetName()] = { x, y }
  return undefined
}

export function collapseButton(this: void, button: Control, _upInside?: boolean): undefined {
  const row = button.GetParent<SelectionRowControl>()
  const buffname = row?.dataId

  if (typeof buffname === "string") {
    if (UNCOLLAPSED_BUFFS[buffname] === true) {
      UNCOLLAPSED_BUFFS[buffname] = undefined
    } else {
      UNCOLLAPSED_BUFFS[buffname] = true
    }
  }

  const buffList =
    TemperCombat_Report.GetNamedChild("_RightPanel")?.GetNamedChild<UpdatableControl>("BuffList")
  buffList?.Update?.(buffList)
  return undefined
}

export function updateReport(fightId?: number): undefined {
  const report = TemperCombat_Report
  report.Update?.(report, fightId)
  return undefined
}

setUpdateReportHook(updateReport)

export function toggleReport(): undefined {
  toggleFightReport()
  return undefined
}

export function resizeReport(scale: number): undefined {
  const report = TemperCombat_Report
  report.Resize?.(scale)
  return undefined
}

export function initializeUI(): undefined {
  resetSelections()
  setCurrentFight(undefined)
  setCurrentCLPage(1)

  initFightReport(toggleFightReport)
  initLiveReport()
  return undefined
}

TemperCombat.GetCMXData = getCMXData
TemperCombat.Resizing = resizing
TemperCombat.NewSize = newSize
TemperCombat.SavePosition = savePosition
TemperCombat.CollapseButton = collapseButton
