import { LOG_LEVEL_DEBUG, log } from "@akasha/temper-combat-addon/combat-core-log"
import type {
  CalculatedData,
  SelectedBuff,
  SelectionData,
} from "@akasha/temper-combat-addon/combat-core-types"
import { getFormattedAbilityIcon } from "@akasha/temper-combat-addon/combat-lib-constants"
import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import { generateSelectionStats } from "@akasha/temper-combat-addon/combat-selection"
import { spairs } from "@akasha/temper-combat-addon/combat-sorted-pairs"
import {
  adjustRowSize,
  numberValue,
  resetBars,
} from "@akasha/temper-combat-addon/combat-ui-main-panel"
import type {
  BarsPanelControl,
  SelectionRowControl,
} from "@akasha/temper-combat-addon/combat-ui-selection"
import {
  getDx,
  getFightData,
  getSelections,
  getUiSelectionData,
  type UISelections,
} from "@akasha/temper-combat-addon/combat-ui-state"

export interface BuffRowControl extends SelectionRowControl {
  parentrow?: BuffRowControl
  hasDetails?: boolean
}

export type RowAnchor = [number, Control, number, number, number]

export function effectColor(
  this: void,
  effectType: number | undefined,
  alpha: number
): [number, number, number, number] {
  if (effectType === BUFF_EFFECT_TYPE_BUFF) {
    return [0, 0.6, 0, alpha]
  }
  if (effectType === BUFF_EFFECT_TYPE_DEBUFF) {
    return [0.75, 0, 0.6, alpha]
  }
  return [0.6, 0.6, 0.6, alpha]
}

export function buffTextColor(this: void, isFavourite: boolean): [number, number, number, number] {
  return isFavourite ? [1, 0.8, 0.3, 1] : [1, 1, 1, 1]
}

export function buffSortFunction(
  this: void,
  data: Record<string, SelectedBuff>,
  a: string,
  b: string
): boolean {
  let ishigher = false
  const favs = getDb().FightReport.FavouriteBuffs

  const isFavA = favs[a]
  const isFavB = favs[b]

  if (isFavA === true && isFavB !== true) {
    ishigher = true
  } else if (isFavA === isFavB) {
    ishigher = (data[a]?.groupUptime ?? 0) > (data[b]?.groupUptime ?? 0)
  }

  return ishigher
}

export function getTotalUnitTime(
  this: void,
  buffData: SelectionData | CalculatedData
): number | undefined {
  const value = buffData.totalUnitTime
  return typeof value === "number" ? value : undefined
}

export function getBuffData(this: void): SelectionData | CalculatedData | undefined {
  const rightpanel = getDb().FightReport.rightpanel

  if (rightpanel === "buffsout") {
    return getUiSelectionData()
  }
  if (rightpanel === "buffs") {
    return getFightData()?.calculated
  }
  return undefined
}

function getUnitsByType(
  this: void,
  unitType: string | undefined
): Record<string | number, boolean> | undefined {
  if (unitType == null) {
    return undefined
  }

  const fightData = getFightData()
  if (fightData == null) {
    return undefined
  }

  const units: Record<string | number, boolean> = {}

  for (const [unitId, unit] of pairs(fightData.units)) {
    if (
      (unitType === "boss" && unit.bossId != null) ||
      (unitType === "group" &&
        (unit.unitType === COMBAT_UNIT_TYPE_GROUP || unit.unitType === COMBAT_UNIT_TYPE_PLAYER))
    ) {
      units[unitId] = true
    }
  }

  return units
}

export function getBuffDataAndUnits(
  this: void,
  unitType?: string
): LuaMultiReturn<[SelectionData | CalculatedData | undefined, number | string]> {
  const db = getDb()
  const rightpanel = db.FightReport.rightpanel
  const fightData = getFightData()

  let buffData: SelectionData | CalculatedData | undefined
  let units = 0
  let unitName = ""

  if (rightpanel === "buffsout") {
    const category = db.FightReport.category

    const tempSelections: UISelections = { ability: {}, unit: {}, buff: {}, resource: {} }
    ZO_DeepTableCopy(getSelections(), tempSelections)

    if (unitType != null) {
      tempSelections.unit[category] = getUnitsByType(unitType)
    }

    buffData = generateSelectionStats(fightData, category, tempSelections)

    const calculatedUnits = fightData?.calculated?.units ?? {}
    const unitSource: Record<number, unknown> =
      tempSelections.unit[category] ?? fightData?.units ?? {}

    for (const [unitId] of pairs(unitSource)) {
      const unit = calculatedUnits[unitId]
      const unitData = fightData?.units[unitId]
      if (unit == null || unitData == null) {
        continue
      }

      const unitTotalValue = numberValue(unit[`${category}Total`])

      const isNotEmpty = unitTotalValue > 0 || NonContiguousCount(unit.buffs) > 0
      const isEnemy =
        unitData.unitType !== COMBAT_UNIT_TYPE_GROUP &&
        unitData.unitType !== COMBAT_UNIT_TYPE_PLAYER_PET &&
        unitData.unitType !== COMBAT_UNIT_TYPE_PLAYER
      const isDamageCategory = category === "damageIn" || category === "damageOut"

      if (isNotEmpty && isEnemy === isDamageCategory) {
        units = units + 1
        unitName = unitData.name
      }
    }
  } else if (rightpanel === "buffs") {
    buffData = fightData?.calculated
  }

  return $multi(buffData, units === 1 ? unitName : units)
}

export function updateBuffPanelLegacy(this: void, panel: BarsPanelControl): undefined {
  log("UI", LOG_LEVEL_DEBUG, "Updating BuffPanel")

  resetBars(panel)

  const fightData = getFightData()
  if (fightData == null) {
    return undefined
  }

  const buffData = getBuffData()

  if (buffData == null) {
    return undefined
  }

  const scrollchild = GetControl(panel, "PanelScrollChild")
  if (scrollchild == null) {
    return undefined
  }

  const db = getDb()
  const selectedbuffs = getSelections().buff["buff"]
  let currentanchor: RowAnchor = [TOPLEFT, scrollchild, TOPLEFT, 0, 1]

  const maxtime = zo_max(
    zo_max(fightData.activetime ?? 0, fightData.dpstime ?? 0),
    fightData.hpstime ?? 0
  )

  const totalUnitTime = getTotalUnitTime(buffData) ?? maxtime * 1000
  const showids = db.showDebugIds
  const favs = db.FightReport.FavouriteBuffs

  for (const [buffName, buff] of spairs(buffData.buffs ?? {}, buffSortFunction)) {
    if (buff.groupUptime <= 0) {
      continue
    }

    const color = effectColor(buff.effectType, 0.6)
    const groupColor = effectColor(buff.effectType, 0.3)

    let highlight = false
    if (selectedbuffs != null) {
      highlight = selectedbuffs[buffName] != null
    }

    const iconRaw: string | number | undefined = buff.icon
    const icon = getFormattedAbilityIcon(iconRaw)
    const dbug = showids && typeof iconRaw === "number" ? string.format("(%d) ", iconRaw) : ""
    const name = dbug + buffName

    const uptimeRatio = buff.uptime / totalUnitTime
    const groupUptimeRatio = buff.groupUptime / totalUnitTime

    const count = buff.count
    const groupCount = buff.groupCount

    const hideGroupValues = count === groupCount && uptimeRatio === groupUptimeRatio

    const countFormat = hideGroupValues ? "%d" : "%d/%d"
    const uptimeFormat = hideGroupValues ? "%.0f" : "%.0f/%.0f"

    const bars = panel.bars ?? []
    panel.bars = bars
    const rowId = bars.length + 1

    const rowName = `${scrollchild.GetName()}Row${rowId}`
    const row =
      GetControl<BuffRowControl>(rowName) ??
      CreateControlFromVirtual<BuffRowControl>(rowName, scrollchild, "TemperCombat_BuffRowTemplate")
    row.SetAnchor(...currentanchor)
    row.SetHidden(false)

    const header = panel.GetNamedChild("Header")
    if (header != null) {
      adjustRowSize(row, header)
    }

    const textcolor = buffTextColor(favs[buffName] === true)

    row.GetNamedChild("HighLight")?.SetHidden(!highlight)
    row.GetNamedChild<TextureControl>("Icon")?.SetTexture(icon)

    const nameControl = row.GetNamedChild<LabelControl>("Name")
    nameControl?.SetText(name)
    nameControl?.SetColor(...textcolor)

    const maxwidth = nameControl?.GetWidth() ?? 0

    const groupBarControl = row.GetNamedChild<BackdropControl>("GroupBar")
    groupBarControl?.SetWidth(maxwidth * groupUptimeRatio)
    groupBarControl?.SetCenterColor(...groupColor)

    const playerBarControl = row.GetNamedChild<BackdropControl>("PlayerBar")
    playerBarControl?.SetWidth(maxwidth * uptimeRatio)
    playerBarControl?.SetCenterColor(...color)
    row.GetNamedChild<LabelControl>("Count")?.SetText(string.format(countFormat, count, groupCount))
    row
      .GetNamedChild<LabelControl>("Uptime")
      ?.SetText(string.format(uptimeFormat, uptimeRatio * 100, groupUptimeRatio * 100))

    currentanchor = [TOPLEFT, row, BOTTOMLEFT, 0, getDx()]

    bars[rowId - 1] = row

    row.dataId = buffName
    row.type = "buff"
    row.id = rowId
    row.panel = panel
  }
  return undefined
}
