import { LOG_LEVEL_DEBUG, log } from "@akasha/temper-combat-addon/combat-core-log"
import type { AbilityData } from "@akasha/temper-combat-addon/combat-core-types"
import {
  getFormattedAbilityIcon,
  getFormattedAbilityName,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import { getDamageColor } from "@akasha/temper-combat-addon/combat-lib-log-strings-format"
import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import { getShowOverHeal } from "@akasha/temper-combat-addon/combat-selection"
import { spairs } from "@akasha/temper-combat-addon/combat-sorted-pairs"
import type { RowAnchor } from "@akasha/temper-combat-addon/combat-ui-buff-panel"
import { isNonNullObject } from "@akasha/temper-combat-addon/combat-ui-helpers"
import {
  adjustRowSize,
  numberValue,
  resetBars,
  setChildText,
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
} from "@akasha/temper-combat-addon/combat-ui-state"
import {
  COUNT_STRINGS,
  DPS_STRINGS,
  optionalNumberValue,
} from "@akasha/temper-combat-addon/combat-ui-stats-panels"

type HitCritLayout = [string, string, string, string]

let hitCritLayoutTableCache: Record<number, HitCritLayout> | undefined

function getHitCritLayoutTable(this: void): Record<number, HitCritLayout> {
  hitCritLayoutTableCache = hitCritLayoutTableCache ?? {
    1: ["Critical", "Total", GetString(SI_TEMPER_COMBAT_CRITS), GetString(SI_TEMPER_COMBAT_HITS)],
    2: ["Total", "Critical", GetString(SI_TEMPER_COMBAT_HITS), GetString(SI_TEMPER_COMBAT_CRITS)],
    3: ["Normal", "Critical", GetString(SI_TEMPER_COMBAT_NORM), GetString(SI_TEMPER_COMBAT_CRITS)],
    4: ["Blocked", "Total", GetString(SI_TEMPER_COMBAT_BLOCKS), GetString(SI_TEMPER_COMBAT_HITS)],
    5: ["Total", "Blocked", GetString(SI_TEMPER_COMBAT_HITS), GetString(SI_TEMPER_COMBAT_BLOCKS)],
    6: ["Normal", "Blocked", GetString(SI_TEMPER_COMBAT_NORM), GetString(SI_TEMPER_COMBAT_BLOCKS)],
  }
  return hitCritLayoutTableCache
}

type AverageLayout = [string, string, string]

let averageLayoutTableCache: Record<number, AverageLayout> | undefined

function getAverageLayoutTable(this: void): Record<number, AverageLayout> {
  averageLayoutTableCache = averageLayoutTableCache ?? {
    1: ["Total", GetString(SI_TEMPER_COMBAT_AVE), GetString(SI_TEMPER_COMBAT_HITS)],
    2: ["Normal", GetString(SI_TEMPER_COMBAT_AVE_N), GetString(SI_TEMPER_COMBAT_NORMAL_HITS)],
    3: ["Critical", GetString(SI_TEMPER_COMBAT_AVE_C), GetString(SI_TEMPER_COMBAT_CRITS)],
    4: ["Blocked", GetString(SI_TEMPER_COMBAT_AVE_B), GetString(SI_TEMPER_COMBAT_BLOCKS)],
  }
  return averageLayoutTableCache
}

function refreshAbilityPanel(this: void): undefined {
  const abilityPanel = TemperCombat_Report_AbilityPanel
  abilityPanel.Update?.(abilityPanel)
  return undefined
}

function addHitCritMenuItem(this: void, id: number): undefined {
  const db = getDb()
  const category = db.FightReport.category
  const hitCritLayout = getHitCritLayoutTable()[id]
  if (hitCritLayout == null) {
    return undefined
  }
  const text = string.format("%s/%s", hitCritLayout[2], hitCritLayout[3])

  AddCustomMenuItem(text, () => {
    db.FightReport.hitCritLayout[category] = id
    refreshAbilityPanel()
  })
  return undefined
}

export function hitCritContextMenu(this: void, control: Control, _button: number): undefined {
  ClearMenu()

  if (getDb().FightReport.category === "damageIn") {
    addHitCritMenuItem(4)
    addHitCritMenuItem(5)
    addHitCritMenuItem(6)
  }

  addHitCritMenuItem(1)
  addHitCritMenuItem(2)
  addHitCritMenuItem(3)

  ShowMenu(control)
  return undefined
}

function addAverageMenuItem(this: void, id: number): undefined {
  const db = getDb()
  const averageLayout = getAverageLayoutTable()[id]
  if (averageLayout == null) {
    return undefined
  }

  const text = string.format("%s %s", GetString(SI_TEMPER_COMBAT_AVERAGE), averageLayout[2])
  const category = db.FightReport.category

  AddCustomMenuItem(text, () => {
    db.FightReport.averageLayout[category] = id
    refreshAbilityPanel()
  })
  return undefined
}

export function averageContextMenu(this: void, control: Control, _button: number): undefined {
  ClearMenu()

  addAverageMenuItem(1)
  addAverageMenuItem(2)
  addAverageMenuItem(3)

  if (getDb().FightReport.category === "damageIn") {
    addAverageMenuItem(4)
  }

  ShowMenu(control)
  return undefined
}

export function minMaxContextMenu(this: void, control: Control, _button: number): undefined {
  ClearMenu()

  const db = getDb()
  const category = db.FightReport.category

  AddCustomMenuItem(string.format("%s", GetString(SI_TEMPER_COMBAT_MAX)), () => {
    db.FightReport.maxValue[category] = true
    refreshAbilityPanel()
  })
  AddCustomMenuItem(string.format("%s", GetString(SI_TEMPER_COMBAT_MIN)), () => {
    db.FightReport.maxValue[category] = false
    refreshAbilityPanel()
  })

  ShowMenu(control)
  return undefined
}

export function updateAbilityPanel(this: void, barsPanel: BarsPanelControl): undefined {
  log("UI", LOG_LEVEL_DEBUG, "Updating AbilityPanel")

  resetBars(barsPanel)

  const db = getDb()
  const settings = db.FightReport

  const category = settings.category
  const hitCritLayoutId = settings.hitCritLayout[category]
  const averageLayoutId = settings.averageLayout[category]
  const hitCritLayout = getHitCritLayoutTable()[hitCritLayoutId] ?? ["Critical", "Total", "", ""]
  const averageLayout = getAverageLayoutTable()[averageLayoutId] ?? ["Total", "", ""]
  const minmax = settings.maxValue[category]

  const isDamage = category === "damageIn" || category === "damageOut"
  const showOverHeal = getShowOverHeal() && category === "healingOut"

  let valueColumnLabel = isDamage
    ? GetString(SI_TEMPER_COMBAT_DAMAGE)
    : GetString(SI_TEMPER_COMBAT_HEALING)

  if (showOverHeal) {
    valueColumnLabel = `${valueColumnLabel}*`
  }

  const header = barsPanel.GetNamedChild("Header")
  if (header == null) {
    return undefined
  }

  setChildText(header, "Total", valueColumnLabel)

  const headerCritString = showOverHeal ? GetString(SI_TEMPER_COMBAT_OH) : hitCritLayout[2]
  const headerHitString = showOverHeal ? GetString(SI_TEMPER_COMBAT_HEALS) : hitCritLayout[3]
  const headerCritRatioString = showOverHeal
    ? GetString(SI_TEMPER_COMBAT_OH)
    : hitCritLayoutId > 3
      ? GetString(SI_TEMPER_COMBAT_BLOCKS)
      : GetString(SI_TEMPER_COMBAT_CRITS)

  setChildText(header, "Crits", headerCritString)
  setChildText(header, "Hits", `/${headerHitString}`)
  setChildText(header, "CritRatio", `${headerCritRatioString}%`)
  setChildText(header, "Average", averageLayout[1])
  setChildText(header, "MinMax", GetString(minmax ? SI_TEMPER_COMBAT_MAX : SI_TEMPER_COMBAT_MIN))

  const fightData = getFightData()
  if (fightData == null) {
    return undefined
  }

  const selections = getSelections()
  const selectedabilities = selections.ability[category]
  const selectedunits = selections.unit[category]

  const totalkey = "Total"
  const totalAmountKey = showOverHeal ? "healingOutAbsolute" : category + totalkey
  const countString = COUNT_STRINGS[category]

  const selectionData = getUiSelectionData()
  let data: Record<string, unknown>
  let totaldmg: number

  if (selectedunits != null) {
    data = selectionData ?? {}
    totaldmg = selectionData?.totalValueSum ?? 0
  } else {
    data = fightData.calculated ?? {}
    totaldmg = numberValue(data[totalAmountKey])
  }

  const scrollchild = GetControl(barsPanel, "PanelScrollChild")
  if (scrollchild == null) {
    return undefined
  }
  let currentanchor: RowAnchor = [TOPLEFT, scrollchild, TOPLEFT, 0, 1]

  const totalHitKey = showOverHeal ? "healsOutAbsolute" : countString + totalkey
  const critKey = showOverHeal
    ? "healsOutOverflow"
    : hitCritLayoutId > 3
      ? `${countString}Blocked`
      : `${countString}Critical`

  const ratioKey1 = showOverHeal ? "healsOutOverflow" : countString + hitCritLayout[0]
  const ratioKey2 = showOverHeal ? "healsOutAbsolute" : countString + hitCritLayout[1]

  const avgKey1 = showOverHeal ? "healingOutAbsolute" : category + averageLayout[0]
  const avgKey2 = showOverHeal ? "healsOutAbsolute" : countString + averageLayout[0]

  const dpsKey = showOverHeal ? "HPSAOut" : DPS_STRINGS[category]

  const showids = db.showDebugIds

  const abilityTableRaw = data[category]
  const abilityTable: Record<number, AbilityData> = isNonNullObject<Record<number, AbilityData>>(
    abilityTableRaw
  )
    ? abilityTableRaw
    : {}

  for (const [abilityId, ability] of spairs(
    abilityTable,
    (t, a, b) => numberValue(t[a]?.[totalAmountKey]) > numberValue(t[b]?.[totalAmountKey])
  )) {
    if (numberValue(ability[totalAmountKey]) <= 0) {
      continue
    }

    let highlight = false

    if (selectedabilities != null) {
      highlight = selectedabilities[abilityId] != null
    }

    const icon = getFormattedAbilityIcon(abilityId)

    const duration = GetAbilityDuration(abilityId)

    const dot =
      (duration != null && duration > 0) || (IsAbilityPassive(abilityId) && isDamage) ? "*" : ""
    const pet = ability.pet ? " (pet)" : ""
    const dbug = showids ? string.format("(%d) ", abilityId) : ""
    const color =
      (ability.damageType != null ? getDamageColor(ability.damageType) : undefined) ?? ""

    const name = `${dbug}${color}${ability.name ?? getFormattedAbilityName(abilityId)}${dot}${pet}|r`

    const dps = optionalNumberValue(ability[dpsKey])
    const total = optionalNumberValue(ability[totalAmountKey])
    const ratio = total != null && totaldmg > 0 ? total / totaldmg : undefined

    const crits = optionalNumberValue(ability[critKey])
    const hits = optionalNumberValue(ability[totalHitKey])
    const critratio = crits != null && hits != null && hits > 0 ? (100 * crits) / hits : undefined

    const ratio1 = optionalNumberValue(ability[ratioKey1])
    const ratio2 = optionalNumberValue(ability[ratioKey2])

    const avg1 = numberValue(ability[avgKey1])
    const avg2 = numberValue(ability[avgKey2])

    const avg = avg2 !== 0 ? avg1 / avg2 : undefined
    const minmaxValue: number | string = showOverHeal
      ? "-"
      : ((minmax ? optionalNumberValue(ability.max) : undefined) ??
        optionalNumberValue(ability.min) ??
        0)

    const bars = barsPanel.bars ?? []
    barsPanel.bars = bars
    const rowId = bars.length + 1

    const rowName = `${scrollchild.GetName()}Row${rowId}`
    const row =
      GetControl<SelectionRowControl>(rowName) ??
      CreateControlFromVirtual<SelectionRowControl>(
        rowName,
        scrollchild,
        "TemperCombat_AbilityRowTemplate"
      )
    row.SetAnchor(...currentanchor)
    row.SetHidden(false)

    adjustRowSize(row, header)

    row.GetNamedChild("HighLight")?.SetHidden(!highlight)
    row.GetNamedChild<TextureControl>("Icon")?.SetTexture(icon)

    const nameControl = row.GetNamedChild<LabelControl>("Name")
    nameControl?.SetText(name)
    const maxwidth = nameControl?.GetWidth() ?? 0

    row.GetNamedChild("Bar")?.SetWidth(maxwidth * (ratio ?? 0))

    setChildText(row, "Fraction", ratio != null ? string.format("%.1f%%", 100 * ratio) : "-")
    setChildText(row, "PerSecond", dps != null ? string.format("%.0f", dps) : "-")
    setChildText(row, "Total", total != null ? tostring(total) : "-")
    setChildText(row, "Crits", ratio1 != null ? tostring(ratio1) : "-")
    setChildText(row, "Hits", string.format("/%d", ratio2 ?? 0))
    setChildText(row, "CritRatio", critratio != null ? string.format("%.0f%%", critratio) : "-")
    setChildText(row, "Average", avg != null ? string.format("%.0f", avg) : "-")
    setChildText(row, "MinMax", tostring(minmaxValue))

    currentanchor = [TOPLEFT, row, BOTTOMLEFT, 0, getDx()]

    bars[rowId - 1] = row

    row.dataId = abilityId
    row.type = "ability"
    row.id = rowId
    row.panel = barsPanel
  }
  return undefined
}

TemperCombat.HitCritContextMenu = hitCritContextMenu
TemperCombat.AverageContextMenu = averageContextMenu
TemperCombat.MinMaxContextMenu = minMaxContextMenu
