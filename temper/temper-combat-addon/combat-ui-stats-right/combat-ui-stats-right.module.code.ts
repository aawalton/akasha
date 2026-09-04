import { LOG_LEVEL_DEBUG, log } from "@akasha/temper-combat-addon/combat-core-log"
import type {
  DamageCategory,
  ResourceData,
  ResourceTable,
  StatData,
} from "@akasha/temper-combat-addon/combat-core-types"
import { LIBCOMBAT_CPTYPE_SLOTTED } from "@akasha/temper-combat-addon/combat-lib-constants"
import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import { spairs } from "@akasha/temper-combat-addon/combat-sorted-pairs"
import type { TooltipCarrier } from "@akasha/temper-combat-addon/combat-ui-helpers"
import { isNonNullObject } from "@akasha/temper-combat-addon/combat-ui-helpers"
import { numberValue, setChildText } from "@akasha/temper-combat-addon/combat-ui-main-panel"
import {
  getFightData,
  getSelections,
  getUiSelectionData,
} from "@akasha/temper-combat-addon/combat-ui-state"
import {
  COUNT_STRINGS,
  optionalNumberValue,
  POWER_TYPE_LABELS,
  STAT_FORMAT,
  STAT_KEYS_LEGACY,
  type StatFormatEntry,
} from "@akasha/temper-combat-addon/combat-ui-stats-panels"

export function updateFightStatsPanelRight(this: void, panel: Control): undefined {
  log("UI", LOG_LEVEL_DEBUG, "Updating FightStatsPanelRight")

  const fightData = getFightData()
  const selectionData = getUiSelectionData()
  const db = getDb()
  const powerType = db.FightReport.fightstatspanel
  const rawCategory = db.FightReport.category
  const category: DamageCategory = rawCategory === "healingIn" ? "healingOut" : rawCategory

  const calculated = fightData?.calculated
  const calcRecord: Record<string, unknown> = calculated ?? {}
  const calcVersion = calculated?.calcVersion ?? 1

  const statsById: Record<number, StatData> = calculated?.stats ?? {}
  const stats: Record<string, unknown> = istable(statsById) ? statsById : {}
  const fightStatsRaw = fightData != null && "stats" in fightData ? fightData.stats : undefined
  const fightStats: Record<string, unknown> = istable(fightStatsRaw) ? fightStatsRaw : {}

  const avgkey = category === "damageOut" || category === "damageIn" ? "dmgavg" : "healavg"
  const avgvaluesRaw =
    (powerType === COMBAT_MECHANIC_FLAGS_HEALTH ? stats["dmginavg"] : undefined) ?? stats[avgkey]
  const avgvalues: Record<string, unknown> = istable(avgvaluesRaw) ? avgvaluesRaw : {}
  const totalvalue =
    powerType === COMBAT_MECHANIC_FLAGS_HEALTH
      ? (optionalNumberValue(calcRecord["damageInTotal"]) ??
        optionalNumberValue(calcRecord[`${category}Total`]))
      : optionalNumberValue(calcRecord[`${category}Total`])
  const countvalue = optionalNumberValue(calcRecord[`${COUNT_STRINGS[category]}Total`])

  const resources: ResourceTable = calculated?.resources ?? {}

  const magicka: Partial<ResourceData> = resources[COMBAT_MECHANIC_FLAGS_MAGICKA] ?? {}
  const stamina: Partial<ResourceData> = resources[COMBAT_MECHANIC_FLAGS_STAMINA] ?? {}
  const ultimate: Partial<ResourceData> = resources[COMBAT_MECHANIC_FLAGS_ULTIMATE] ?? {}

  const magickacontrol = panel.GetNamedChild("ResourceMagicka")
  if (magickacontrol != null) {
    setChildText(magickacontrol, "Value", string.format("%.0f", magicka.gainRate ?? 0))
    setChildText(magickacontrol, "Value2", string.format("%.0f", magicka.drainRate ?? 0))
  }

  const staminacontrol = panel.GetNamedChild("ResourceStamina")
  if (staminacontrol != null) {
    setChildText(staminacontrol, "Value", string.format("%.0f", stamina.gainRate ?? 0))
    setChildText(staminacontrol, "Value2", string.format("%.0f", stamina.drainRate ?? 0))
  }

  const ultimatecontrol = panel.GetNamedChild("ResourceUltimate")
  if (ultimatecontrol != null) {
    setChildText(ultimatecontrol, "Value", string.format("%.2f", ultimate.gainRate ?? 0))
    setChildText(ultimatecontrol, "Value2", string.format("%.2f", ultimate.drainRate ?? 0))
  }

  const stringKey = `SI_TEMPER_COMBAT_STATS${POWER_TYPE_LABELS[powerType] ?? ""}`

  const statWindowControl = panel.GetNamedChild("AttackStats")
  if (statWindowControl == null) {
    return undefined
  }
  const keys = STAT_FORMAT[powerType]

  const resdata: Record<string, unknown> =
    (getSelections().unit[category] != null ? selectionData : undefined) ?? calculated ?? {}

  for (let i = 1; i <= 4; i++) {
    let text = ZO_CachedStrFormat("<<1>>:", GetString(stringKey, i))
    const rowcontrol = statWindowControl.GetNamedChild<TooltipCarrier>(`Row${i}`)
    if (rowcontrol == null) {
      continue
    }

    const entry = keys?.[i - 1]
    let dataKey: number | string | undefined = entry?.[0]
    const displayformat = entry?.[1]
    const convert = entry?.[2]
    const statData = typeof dataKey === "number" ? statsById[dataKey] : undefined
    if (calcVersion < 2 && typeof dataKey === "number") {
      dataKey = STAT_KEYS_LEGACY[dataKey]
    }

    if (text !== "" && dataKey != null) {
      let maxvalueNum = statData?.max ?? numberValue(fightStats[`max${dataKey}`])

      if (convert === true) {
        maxvalueNum = GetCriticalStrikeChance(maxvalueNum)
      }
      if (dataKey === COMBAT_MECHANIC_FLAGS_HEALTH && i === 4) {
        maxvalueNum = maxvalueNum / 68
      }
      const maxvalueText =
        displayformat != null ? string.format(displayformat, maxvalueNum) : tostring(maxvalueNum)

      let avgvalue: number | string | undefined =
        statData?.[avgkey] ??
        optionalNumberValue(avgvalues[`avg${dataKey}`]) ??
        optionalNumberValue(stats[`avg${dataKey}`])

      if (avgvalue == null) {
        const legacyvalue = optionalNumberValue(avgvalues[`sum${dataKey}`])
        avgvalue =
          legacyvalue != null
            ? legacyvalue /
              zo_max(
                (convert != null && convert !== false ? countvalue : undefined) ?? totalvalue ?? 1,
                1
              )
            : maxvalueNum
      }

      if (typeof avgvalue === "number") {
        if (convert != null && convert !== false) {
          avgvalue = GetCriticalStrikeChance(avgvalue)
        }
        if (displayformat != null) {
          avgvalue = string.format(displayformat, avgvalue)
        }
      }

      if (i === 4 && powerType !== COMBAT_MECHANIC_FLAGS_HEALTH) {
        rowcontrol.tooltip = []
        const tooltiplines: string[] = []
        let backstabberTT: string | undefined
        const cp = fightData?.CP

        if (cp != null && cp.version != null && cp.version >= 2) {
          const backstabber = cp[1]?.stars[31]

          if (
            backstabber != null &&
            backstabber[0] >= 10 &&
            backstabber[1] === LIBCOMBAT_CPTYPE_SLOTTED
          ) {
            text = ZO_CachedStrFormat("<<1>>*:", GetString(stringKey, i))
            backstabberTT = GetString(SI_TEMPER_COMBAT_BACKSTABBER_TT)
          }
        }

        const critvaluesRaw =
          powerType === COMBAT_MECHANIC_FLAGS_MAGICKA
            ? resdata["spellCrit"]
            : powerType === COMBAT_MECHANIC_FLAGS_STAMINA
              ? resdata["weaponCrit"]
              : undefined
        const critvalues = isNonNullObject<Record<number, number>>(critvaluesRaw)
          ? critvaluesRaw
          : undefined

        if (critvalues != null) {
          let sum = 0
          let effectiveSum = 0
          let totalDamage = 0
          const maxCritBonus = 125
          const trimmedCritValues: Record<number, number> = { [125]: 0 }
          let stepsize = 10

          for (const [crit, damage] of pairs(critvalues)) {
            sum = sum + crit * damage
            effectiveSum = effectiveSum + zo_min(crit, maxCritBonus) * damage
            totalDamage = totalDamage + damage

            if (crit < 130 && crit >= 120) {
              stepsize = 5
            }

            const trimmedkey = zo_ceil(crit / stepsize) * stepsize
            trimmedCritValues[trimmedkey] = (trimmedCritValues[trimmedkey] ?? 0) + damage
          }

          totalDamage = zo_max(totalDamage, 1)
          tooltiplines.push(GetString(SI_TEMPER_COMBAT_CRITBONUS_TT))

          let sumdamage = 0
          for (const [crit, damage] of spairs(trimmedCritValues)) {
            sumdamage = sumdamage + damage

            const sumdamageRatio = 100 * (sumdamage / totalDamage)
            const damageRatio = (100 * damage) / totalDamage
            const color = crit === 125 ? "|cffbb88" : damageRatio > 5 ? "|cffffff" : ""
            tooltiplines.push(string.format("<%s%2d%%: %5.1f%%", color, crit, sumdamageRatio))
          }

          avgvalue = string.format(
            displayformat ?? "",
            zo_max(effectiveSum / totalDamage, numberValue(avgvalues[`avg${dataKey}`]))
          )

          rowcontrol.tooltip = tooltiplines.length > 2 ? tooltiplines : undefined
          if (backstabberTT != null) {
            tooltiplines.unshift(backstabberTT)
          }

          tooltiplines.push(" ")
          tooltiplines.push(
            string.format("%s: %.1f%%", GetString(SI_TEMPER_COMBAT_AVERAGE), sum / totalDamage)
          )
        }
      } else {
        rowcontrol.tooltip = undefined
      }

      setChildText(rowcontrol, "Label", text)
      setChildText(
        rowcontrol,
        "Value",
        typeof avgvalue === "string" ? avgvalue : tostring(avgvalue)
      )
      setChildText(rowcontrol, "Value2", maxvalueText)
      rowcontrol.SetHidden(false)
    } else {
      rowcontrol.SetHidden(true)
    }
  }

  updatePenetrationRows(statWindowControl, {
    category,
    powerType,
    keys,
    statsById,
    stats,
    fightStats,
    avgvalues,
    avgkey,
    resdata,
    stringKey,
  })
  return undefined
}

interface PenetrationRowContext {
  category: DamageCategory
  powerType: number
  keys: StatFormatEntry[] | undefined
  statsById: Record<number, StatData>
  stats: Record<string, unknown>
  fightStats: Record<string, unknown>
  avgvalues: Record<string, unknown>
  avgkey: "dmgavg" | "healavg"
  resdata: Record<string, unknown>
  stringKey: string
}

function updatePenetrationRows(
  this: void,
  statWindowControl: Control,
  ctx: PenetrationRowContext
): undefined {
  const {
    category,
    powerType,
    keys,
    statsById,
    stats,
    fightStats,
    avgvalues,
    avgkey,
    resdata,
    stringKey,
  } = ctx
  const db = getDb()

  const row5 = statWindowControl.GetNamedChild("Row5")
  const row6 = statWindowControl.GetNamedChild<TooltipCarrier>("Row6")
  const row7 = statWindowControl.GetNamedChild("Row7")
  if (row5 == null || row6 == null || row7 == null) {
    return undefined
  }

  if (
    category === "damageOut" &&
    (powerType === COMBAT_MECHANIC_FLAGS_MAGICKA || powerType === COMBAT_MECHANIC_FLAGS_STAMINA)
  ) {
    const resistvaluesRaw =
      powerType === COMBAT_MECHANIC_FLAGS_MAGICKA
        ? resdata["spellResistance"]
        : resdata["physicalResistance"]
    const resistvalues: Record<number, number> = isNonNullObject<Record<number, number>>(
      resistvaluesRaw
    )
      ? resistvaluesRaw
      : {}
    const statId = keys?.[4]?.[0] ?? 0
    const statData = statsById[statId]

    let sum = 0
    let effectiveSum = 0
    let totalDamage = 0
    let maxvalue = statData?.max ?? numberValue(fightStats[`max${statId}`])
    let overpen = 0
    const maxpen = db.unitresistance

    const trimmedResistvalues: Record<number, number> = { [18]: 0 }

    for (const [penetration, damage] of pairs(resistvalues)) {
      sum = sum + penetration * damage
      effectiveSum = effectiveSum + zo_min(penetration, maxpen) * damage
      maxvalue = zo_max(maxvalue, penetration)
      totalDamage = totalDamage + damage

      if (penetration - maxpen > 0) {
        overpen = overpen + damage
      }

      const trimmedkey = zo_floor((penetration + 800) / 1000)
      trimmedResistvalues[trimmedkey] = (trimmedResistvalues[trimmedkey] ?? 0) + damage
    }

    totalDamage = zo_max(totalDamage, 1)

    const tooltiplines: string[] = [GetString(SI_TEMPER_COMBAT_PENETRATION_TT)]

    let sumdamage = 0

    for (const [penetration, damage] of spairs(trimmedResistvalues)) {
      sumdamage = sumdamage + damage

      const sumdamageRatio = 100 * (sumdamage / totalDamage)
      const damageRatio = (100 * damage) / totalDamage

      const color = penetration === 18 ? "|cffbb88" : damageRatio > 5 ? "|cffffff" : ""

      tooltiplines.push(string.format("<%s%2d.2k: %5.1f%%", color, penetration, sumdamageRatio))
    }

    const averagePenetration = string.format(
      "%d",
      zo_max(zo_round(effectiveSum / totalDamage), numberValue(avgvalues[`avg${statId}`]))
    )
    const overPenetrationRatio = string.format("%.1f%%", (100 * overpen) / totalDamage)

    tooltiplines.push(" ")
    tooltiplines.push(
      string.format("%s: %d", GetString(SI_TEMPER_COMBAT_AVERAGE), zo_round(sum / totalDamage))
    )

    row5.SetHidden(false)
    row6.SetHidden(false)
    row7.SetHidden(false)

    const text5 = ZO_CachedStrFormat("<<1>>:", GetString(stringKey, 5))

    setChildText(row5, "Label", text5)
    setChildText(row5, "Value", averagePenetration)
    setChildText(row5, "Value2", tostring(maxvalue))

    const text6 = ZO_CachedStrFormat("<<1>>:", GetString(stringKey, 6))

    setChildText(row6, "Label", text6)
    setChildText(row6, "Value", overPenetrationRatio)
    row6.tooltip = tooltiplines.length > 4 ? tooltiplines : undefined

    const text7 = ZO_CachedStrFormat("<<1>>:", GetString(stringKey, 7))
    const entry = keys?.[5]
    const dataKey = entry?.[0]
    const displayformat = entry?.[1]
    const statData7 = dataKey != null ? statsById[dataKey] : undefined

    if (text7 !== "" && dataKey != null) {
      const maxvalue7 = statData7?.max ?? numberValue(fightStats[`max${dataKey}`])
      const avgvalue7 =
        statData7?.[avgkey] ??
        optionalNumberValue(avgvalues[`avg${dataKey}`]) ??
        optionalNumberValue(stats[`avg${dataKey}`]) ??
        0

      const maxvalueText =
        displayformat != null ? string.format(displayformat, maxvalue7) : tostring(maxvalue7)
      const avgvalueText =
        displayformat != null ? string.format(displayformat, avgvalue7) : tostring(avgvalue7)

      setChildText(row7, "Label", text7)
      setChildText(row7, "Value", avgvalueText)
      setChildText(row7, "Value2", maxvalueText)
      row7.SetHidden(false)
    } else {
      row7.SetHidden(true)
    }
  } else {
    row5.SetHidden(true)
    row6.SetHidden(true)
    row7.SetHidden(true)
    row6.tooltip = undefined
  }
  return undefined
}
