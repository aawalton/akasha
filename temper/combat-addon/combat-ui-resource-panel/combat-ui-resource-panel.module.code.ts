import { LOG_LEVEL_DEBUG, log } from "../combat-core-log/combat-core-log.module.code.ts"
import type { ResourceAbilityData } from "../combat-core-types/combat-core-types.module.code.ts"
import { getFormattedAbilityName } from "../combat-lib-constants/combat-lib-constants.module.code.ts"
import { getDb } from "../combat-saved-variables/combat-saved-variables.module.code.ts"
import { spairs } from "../combat-sorted-pairs/combat-sorted-pairs.module.code.ts"
import type { RowAnchor } from "../combat-ui-buff-panel/combat-ui-buff-panel.module.code.ts"
import {
  adjustRowSize,
  resetBars,
} from "../combat-ui-main-panel/combat-ui-main-panel.module.code.ts"
import type {
  BarsPanelControl,
  SelectionRowControl,
} from "../combat-ui-selection/combat-ui-selection.module.code.ts"
import {
  getDx,
  getFightData,
  getSelections,
} from "../combat-ui-state/combat-ui-state.module.code.ts"

function updateResourceBars(
  this: void,
  panel: BarsPanelControl,
  anchor: RowAnchor,
  data: Record<number, ResourceAbilityData> | undefined,
  totalRate: number,
  selectedresources: Record<number, unknown> | undefined,
  color: [number, number, number, number]
): RowAnchor {
  let currentanchor = anchor
  const scrollchild = GetControl(panel, "PanelScrollChild")
  if (scrollchild == null || data == null) {
    return currentanchor
  }

  const showids = getDb().showDebugIds

  for (const [abilityId, ability] of spairs(
    data,
    (t, a, b) => (t[a]?.value ?? 0) > (t[b]?.value ?? 0)
  )) {
    if ((ability.ticks ?? 0) <= 0) {
      continue
    }

    const label = getFormattedAbilityName(abilityId)

    let highlight = false
    if (selectedresources != null) {
      highlight = selectedresources[abilityId] != null
    }

    const dbug = showids ? string.format("(%d) ", abilityId) : ""
    const name = dbug + label

    const count = ability.ticks
    const rate = ability.rate ?? 0
    const ratio = rate / totalRate

    const bars = panel.bars ?? []
    panel.bars = bars
    const rowId = bars.length + 1

    const rowName = `${scrollchild.GetName()}Row${rowId}`
    const row =
      GetControl<SelectionRowControl>(rowName) ??
      CreateControlFromVirtual<SelectionRowControl>(
        rowName,
        scrollchild,
        "TemperCombat_ResourceRowTemplate"
      )
    row.SetAnchor(...currentanchor)
    row.SetHidden(false)

    const header = panel.GetNamedChild("Header")
    if (header != null) {
      adjustRowSize(row, header)
    }

    row.GetNamedChild("HighLight")?.SetHidden(!highlight)

    const nameControl = row.GetNamedChild<LabelControl>("Name")
    nameControl?.SetText(name)
    const maxwidth = nameControl?.GetWidth() ?? 0

    const barControl = row.GetNamedChild<BackdropControl>("Bar")
    barControl?.SetWidth(maxwidth * ratio)
    barControl?.SetCenterColor(...color)
    row.GetNamedChild<LabelControl>("Count")?.SetText(tostring(count))
    row.GetNamedChild<LabelControl>("Rate")?.SetText(string.format("%.0f", rate))

    currentanchor = [TOPLEFT, row, BOTTOMLEFT, 0, getDx()]

    bars[rowId - 1] = row

    row.dataId = abilityId
    row.type = "resource"
    row.id = rowId
    row.panel = panel
  }

  return currentanchor
}

export function updateResourcePanel(this: void, panel: Control): undefined {
  log("UI", LOG_LEVEL_DEBUG, "Updating ResourcePanel")

  const subpanel1 = panel.GetNamedChild<BarsPanelControl>("Gains")
  const subpanel2 = panel.GetNamedChild<BarsPanelControl>("Drains")
  if (subpanel1 == null || subpanel2 == null) {
    return undefined
  }

  resetBars(subpanel1)
  resetBars(subpanel2)

  const fightData = getFightData()
  if (fightData == null) {
    return undefined
  }

  let key: number
  let color1: [number, number, number, number]
  let color2: [number, number, number, number]

  const rightpanel = getDb().FightReport.rightpanel

  if (rightpanel === "magicka") {
    key = COMBAT_MECHANIC_FLAGS_MAGICKA
    color1 = [0.3, 0.4, 0.6, 1]
    color2 = [0.4, 0.3, 0.6, 1]
  } else if (rightpanel === "stamina") {
    key = COMBAT_MECHANIC_FLAGS_STAMINA
    color1 = [0.4, 0.6, 0.3, 1]
    color2 = [0.4, 0.45, 0.05, 1]
  } else {
    return undefined
  }

  const data = fightData.calculated?.resources[key]
  if (data == null) {
    return undefined
  }

  const selectedresources = getSelections().resource["resource"]

  const scrollchild1 = GetControl(subpanel1, "PanelScrollChild")
  if (scrollchild1 != null) {
    const anchor1: RowAnchor = [TOPLEFT, scrollchild1, TOPLEFT, 0, 1]
    updateResourceBars(
      subpanel1,
      anchor1,
      data.gains,
      data.gainRate ?? 0,
      selectedresources,
      color1
    )
  }

  const scrollchild2 = GetControl(subpanel2, "PanelScrollChild")
  if (scrollchild2 != null) {
    const anchor2: RowAnchor = [TOPLEFT, scrollchild2, TOPLEFT, 0, 1]
    updateResourceBars(
      subpanel2,
      anchor2,
      data.drains,
      data.drainRate ?? 0,
      selectedresources,
      color2
    )
  }
  return undefined
}
