import { calculateFight } from "@akasha/temper-combat-addon/combat-analysis"
import { LOG_LEVEL_DEBUG, log } from "@akasha/temper-combat-addon/combat-core-log"
import type { CmxFight } from "@akasha/temper-combat-addon/combat-core-types"
import type { SavedFight } from "@akasha/temper-combat-addon/combat-fight-data-types"
import { getFights } from "@akasha/temper-combat-addon/combat-saved-fights"
import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import { generateSelectionStats, LAST_FIGHTS } from "@akasha/temper-combat-addon/combat-selection"
import type { TooltipCarrier } from "@akasha/temper-combat-addon/combat-ui-helpers"
import {
  adjustRowSize,
  resetBars,
  type ScalableRowControl,
} from "@akasha/temper-combat-addon/combat-ui-main-panel"
import {
  clearSelections,
  type FightListItemControl,
} from "@akasha/temper-combat-addon/combat-ui-nav"
import type { BarsPanelControl } from "@akasha/temper-combat-addon/combat-ui-selection"
import {
  getCurrentFight,
  getDx,
  getSelections,
  setAbilityStats,
  setCurrentFight,
  setFightData,
  setUiSelectionData,
  type UpdatableControl,
} from "@akasha/temper-combat-addon/combat-ui-state"
import { DPS_STRINGS } from "@akasha/temper-combat-addon/combat-ui-stats-panels"

function updateReportDeferred(this: void): undefined {
  const report = TemperCombat_Report
  report.Update?.(report)
  return undefined
}

export function updateFightReport(this: void, control: Control, fightId?: number): undefined {
  log("UI", LOG_LEVEL_DEBUG, "Updating FightReport")

  EVENT_MANAGER.UnregisterForUpdate("TemperCombat_Report_Update_Delay")

  const category = getDb().FightReport.category

  if (fightId == null || fightId !== getCurrentFight()) {
    clearSelections()
  }

  let resolvedId = fightId ?? getCurrentFight()

  if (resolvedId == null || resolvedId < 0 || LAST_FIGHTS[resolvedId - 1] == null) {
    if (LAST_FIGHTS.length === 0) {
      resolvedId = -1
    } else {
      resolvedId = LAST_FIGHTS.length
    }
  }

  setCurrentFight(resolvedId)

  const fightData = LAST_FIGHTS[resolvedId - 1]
  setFightData(fightData)

  if (fightData !== undefined && fightData.calculated == null && fightData.log != null) {
    calculateFight(fightData)
    updateReportDeferred()
    return undefined
  }
  if (fightData !== undefined && fightData.calculating === true) {
    EVENT_MANAGER.RegisterForUpdate("TemperCombat_Report_Update_Delay", 500, updateReportDeferred)
    return undefined
  }

  const selectionData =
    fightData !== undefined
      ? generateSelectionStats(fightData, category, getSelections())
      : undefined
  setUiSelectionData(selectionData)

  setAbilityStats([fightData, selectionData])

  for (let i = 2; i <= control.GetNumChildren(); i++) {
    const child = control.GetChild<UpdatableControl>(i)

    child?.Update?.(child)
  }
  return undefined
}

interface FightListPanelControl extends BarsPanelControl, UpdatableControl {
  numItems?: number
}

interface FightListRowControl extends ScalableRowControl, FightListItemControl {}

function updateFightListPanel(
  this: void,
  panel: FightListPanelControl,
  data: readonly (CmxFight | SavedFight)[],
  issaved: boolean
): undefined {
  const stringId = issaved ? "updateFightListPanelSaved" : "updateFightListPanelRecent"
  EVENT_MANAGER.UnregisterForUpdate(stringId)

  const scrollchild = GetControl<Control>(panel, "PanelScrollChild")
  if (scrollchild == null) {
    return undefined
  }
  let currentanchor: [number, Control, number, number, number] = [
    TOPLEFT,
    scrollchild,
    TOPLEFT,
    0,
    1,
  ]

  const rowBaseName = `${scrollchild.GetName()}Row`

  const numItems = panel.numItems ?? 0
  if (data.length > numItems) {
    for (let i = numItems + 1; i <= data.length; i++) {
      CreateControlFromVirtual(rowBaseName, scrollchild, "TemperCombat_FightlistRowTemplate", i)
      panel.numItems = i
      if (GetGameTimeSeconds() - GetFrameTimeSeconds() > 0.015) {
        EVENT_MANAGER.RegisterForUpdate(stringId, 50, () => {
          updateFightListPanel(panel, data, issaved)
        })
        panel.GetNamedChild("LoadingLabel")?.SetHidden(false)
        return undefined
      }
    }
  }
  panel.GetNamedChild("LoadingLabel")?.SetHidden(true)

  if (data.length === 0) {
    return undefined
  }

  const db = getDb()
  const bars = panel.bars ?? []
  panel.bars = bars
  const header = panel.GetNamedChild("Header")

  for (const [id, fight] of ipairs(data)) {
    const label = zo_strgsub(fight.fightlabel ?? "", ".+%:%d%d %- ([A-Z])", "%1")
    const legacyChar = fight.char
    const charname =
      fight.charData?.name ?? (typeof legacyChar === "string" ? legacyChar : undefined) ?? ""
    const zone = fight.zone ?? ""
    const subzone = fight.subzone ?? ""

    const zonestring = subzone !== "" ? string.format("%s, %s", subzone, zone) : undefined

    const date = fight.date
    const datestring = typeof date === "number" ? GetDateStringFromTimestamp(date) : (date ?? "")
    const timestring = string.format("%s, %s", datestring, fight.time ?? "")

    const fightlog =
      issaved && "stringlog" in fight && fight.stringlog != null ? fight.stringlog : fight.log
    const logState = fightlog === true || (typeof fightlog === "object" && fightlog.length > 0)

    let activetime = 1
    const category = db.FightReport.category

    if (category === "healingOut" || category === "healingIn") {
      activetime = zo_roundToNearest(fight.hpstime ?? 1, 0.1)
    } else {
      activetime = zo_roundToNearest(fight.dpstime ?? 1, 0.1)
    }

    const durationstring = string.format("%d:%04.1f", activetime / 60, activetime % 60)

    const dpsKey = DPS_STRINGS[db.FightReport.category]
    const dpsRaw = fight.calculated?.[dpsKey] ?? fight[dpsKey] ?? 0
    const dps = zo_round(typeof dpsRaw === "number" ? dpsRaw : 0)

    const row = GetControl<FightListRowControl>(rowBaseName, id)
    if (row == null) {
      continue
    }
    row.SetAnchor(...currentanchor)
    row.SetHidden(false)

    if (header != null) {
      adjustRowSize(row, header)
    }

    row.GetNamedChild<LabelControl>("Name")?.SetText(label)
    row.GetNamedChild<LabelControl>("Char")?.SetText(charname)

    const zoneControl = row.GetNamedChild<LabelControl & TooltipCarrier>("Zone")
    zoneControl?.SetText(zone)
    if (zoneControl != null) {
      zoneControl.tooltip = zonestring
    }

    row.GetNamedChild<LabelControl>("Time")?.SetText(timestring)
    row.GetNamedChild<LabelControl>("Duration")?.SetText(durationstring)
    row.GetNamedChild<LabelControl>("DPS")?.SetText(tostring(dps))

    const buttonControl = row.GetNamedChild("Buttons")
    const deleteLogControl = buttonControl?.GetNamedChild<ButtonControl>("DeleteLog")
    deleteLogControl?.SetState(logState ? BSTATE_NORMAL : BSTATE_DISABLED)

    currentanchor = [TOPLEFT, row, BOTTOMLEFT, 0, getDx()]

    bars[id - 1] = row

    row.id = id
    row.issaved = issaved
  }
  return undefined
}

export function updateFightList(this: void, panel: Control): undefined {
  log("UI", LOG_LEVEL_DEBUG, "Updating FightListPanel")

  if (panel.IsHidden()) {
    return undefined
  }

  const recentPanel = panel.GetNamedChild<FightListPanelControl>("Recent")
  const savedPanel = panel.GetNamedChild<FightListPanelControl>("Saved")
  if (recentPanel == null || savedPanel == null) {
    return undefined
  }

  resetBars(recentPanel)
  resetBars(savedPanel)

  const category = getDb().FightReport.category
  const label =
    category === "healingOut" || category === "healingIn"
      ? GetString(SI_TEMPER_COMBAT_HPS)
      : GetString(SI_TEMPER_COMBAT_DPS)

  GetControl<LabelControl>(recentPanel, "HeaderDPS")?.SetText(label)
  GetControl<LabelControl>(savedPanel, "HeaderDPS")?.SetText(label)

  updateFightListPanel(recentPanel, LAST_FIGHTS, false)
  updateFightListPanel(savedPanel, getFights() ?? [], true)
  return undefined
}
