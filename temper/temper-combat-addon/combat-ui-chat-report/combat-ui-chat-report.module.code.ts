import { getDb } from "@akasha/temper-combat-addon/combat-saved-variables"
import { LAST_FIGHTS } from "@akasha/temper-combat-addon/combat-selection"
import { getBuffDataAndUnits } from "@akasha/temper-combat-addon/combat-ui-buff-panel"
import {
  getBossTargetDamage,
  getCurrentReportData,
  getSelectionDamage,
  getSelectionHeal,
  getSingleTargetDamage,
  getTimedataPrefix,
  getUnitsByName,
} from "@akasha/temper-combat-addon/combat-ui-chat-numbers"
import { getSelections } from "@akasha/temper-combat-addon/combat-ui-state"
import { optionalNumberValue } from "@akasha/temper-combat-addon/combat-ui-stats-panels"

export const POSTTOCHAT_MODE_NONE = 0
export const POSTTOCHAT_MODE_SINGLE = 1
export const POSTTOCHAT_MODE_MULTI = 2
export const POSTTOCHAT_MODE_SINGLEANDMULTI = 3
export const POSTTOCHAT_MODE_SMART = 4
export const POSTTOCHAT_MODE_HEALING = 5
export const POSTTOCHAT_MODE_SELECTION = 6
export const POSTTOCHAT_MODE_SELECTION_HEALING = 7
export const POSTTOCHAT_MODE_SELECTED_UNIT = 8
export const POSTTOCHAT_MODE_SELECTED_UNITNAME = 9

globalThis.TEMPER_COMBAT_POSTTOCHAT_MODE_NONE = POSTTOCHAT_MODE_NONE
globalThis.TEMPER_COMBAT_POSTTOCHAT_MODE_SINGLE = POSTTOCHAT_MODE_SINGLE
globalThis.TEMPER_COMBAT_POSTTOCHAT_MODE_MULTI = POSTTOCHAT_MODE_MULTI
globalThis.TEMPER_COMBAT_POSTTOCHAT_MODE_SINGLEANDMULTI = POSTTOCHAT_MODE_SINGLEANDMULTI
globalThis.TEMPER_COMBAT_POSTTOCHAT_MODE_SMART = POSTTOCHAT_MODE_SMART
globalThis.TEMPER_COMBAT_POSTTOCHAT_MODE_HEALING = POSTTOCHAT_MODE_HEALING
globalThis.TEMPER_COMBAT_POSTTOCHAT_MODE_SELECTION = POSTTOCHAT_MODE_SELECTION
globalThis.TEMPER_COMBAT_POSTTOCHAT_MODE_SELECTION_HEALING = POSTTOCHAT_MODE_SELECTION_HEALING
globalThis.TEMPER_COMBAT_POSTTOCHAT_MODE_SELECTED_UNIT = POSTTOCHAT_MODE_SELECTED_UNIT
globalThis.TEMPER_COMBAT_POSTTOCHAT_MODE_SELECTED_UNITNAME = POSTTOCHAT_MODE_SELECTED_UNITNAME

export function postBuffUptime(
  this: void,
  fight: number | undefined,
  buffname: string,
  unitType?: string
): undefined {
  const data = fight != null ? LAST_FIGHTS[fight - 1] : undefined

  const db = getDb()
  const category = db.FightReport.category

  if (data == null) {
    return undefined
  }

  const timedata = getTimedataPrefix(data)

  const [buffDataTable, units] = getBuffDataAndUnits(unitType)
  const buffData = buffDataTable?.buffs?.[buffname]
  if (buffData == null) {
    return undefined
  }
  let totalUnitTime = optionalNumberValue(buffDataTable?.totalUnitTime)

  if (totalUnitTime != null) {
    totalUnitTime = totalUnitTime / 1000
  }

  let activetime = totalUnitTime ?? data.dpstime

  if (category === "healingOut" || category === "healingIn") {
    activetime = totalUnitTime ?? data.hpstime
  }

  const uptime = buffData.uptime / 1000
  const groupUptime = buffData.groupUptime / 1000

  const relativeUptimeString = string.format("%.1f%%", (uptime / activetime) * 100)
  const uptimeString = string.format("%d:%02d", uptime / 60, uptime % 60)

  let output: string

  if (groupUptime > uptime) {
    const relativeGroupUptimeString = string.format("%.1f%%", (groupUptime / activetime) * 100)
    const groupUptimeString = string.format("%d:%02d", groupUptime / 60, groupUptime % 60)

    output = zo_strformat(
      GetString(SI_TEMPER_COMBAT_POSTBUFF_FORMAT_GROUP),
      buffname,
      relativeUptimeString,
      uptimeString,
      units,
      relativeGroupUptimeString,
      groupUptimeString
    )
  } else {
    output = zo_strformat(
      GetString(SI_TEMPER_COMBAT_POSTBUFF_FORMAT),
      buffname,
      relativeUptimeString,
      uptimeString,
      units
    )
  }

  const channel =
    db.autoselectchatchannel === true
      ? IsUnitGrouped("player")
        ? CHAT_CHANNEL_PARTY
        : CHAT_CHANNEL_SAY
      : undefined

  StartChatInput(string.format("%s%s", timedata, output), channel)
  return undefined
}

export function postToChat(
  this: void,
  mode: number,
  fight?: number,
  unitContextMenuUnitId?: number
): undefined {
  const data = (fight != null ? LAST_FIGHTS[fight - 1] : undefined) ?? getCurrentReportData()

  if (data == null) {
    return undefined
  }

  const timedata = getTimedataPrefix(data)

  let output: string | undefined = ""

  let unitSelection: Record<number, unknown> | undefined

  if (mode === POSTTOCHAT_MODE_SELECTION) {
    unitSelection = getSelections().unit["damageOut"]
  } else if (mode === POSTTOCHAT_MODE_SELECTED_UNIT || mode === POSTTOCHAT_MODE_SELECTED_UNITNAME) {
    if (unitContextMenuUnitId == null) {
      return undefined
    }
    unitSelection =
      mode === POSTTOCHAT_MODE_SELECTED_UNIT
        ? { [unitContextMenuUnitId]: true }
        : getUnitsByName(data, unitContextMenuUnitId)
  }

  const [units, damage, selName, rawDpstime] = getSelectionDamage(data, unitSelection)
  const [bossUnits, totalBossDamage, , bossName, rawBossTime] = getBossTargetDamage(data)
  const [singleDamage, , , rawSingleTime] = getSingleTargetDamage(data)

  const dpstime = zo_roundToNearest(rawDpstime, 0.1)
  const singleTime = zo_roundToNearest(rawSingleTime, 0.1)

  const name = zo_strformat(
    SI_UNIT_NAME,
    unitSelection == null && bossName != null ? bossName : selName
  )

  const bossDamage = data.bossfight === true ? totalBossDamage : singleDamage
  const bossTime = zo_roundToNearest(data.bossfight === true ? rawBossTime : singleTime, 0.1)

  if (mode === POSTTOCHAT_MODE_HEALING) {
    const hpstime = zo_roundToNearest(data.hpstime, 0.01)
    const timeString = string.format("%d:%04.1f", hpstime / 60, hpstime % 60)

    const totalHPSString = ZO_CommaDelimitNumber(data.HPSOut)
    const totalHealingString = ZO_CommaDelimitNumber(data.healingOutTotal ?? 0)

    output = zo_strformat(
      GetString(SI_TEMPER_COMBAT_POSTHPS_FORMAT),
      name,
      totalHPSString,
      totalHealingString,
      timeString
    )
  } else if (mode === POSTTOCHAT_MODE_SELECTION_HEALING) {
    const [healUnits, healing, rawHealTime] = getSelectionHeal(
      data,
      getSelections().unit["healingOut"]
    )

    if (healing == null || rawHealTime == null) {
      return undefined
    }
    const healTime = zo_roundToNearest(rawHealTime, 0.1)

    const timeString = string.format("%d:%04.1f", healTime / 60, healTime % 60)

    const totalHealingString = ZO_CommaDelimitNumber(healing)
    const totalHPSString = ZO_CommaDelimitNumber(zo_floor(healing / healTime))

    output = zo_strformat(
      GetString(SI_TEMPER_COMBAT_POSTSELECTIONHPS_FORMAT),
      name,
      healUnits,
      totalHPSString,
      totalHealingString,
      timeString
    )
  } else if (units === 1 || mode === POSTTOCHAT_MODE_SINGLE) {
    const branchDamage = mode === POSTTOCHAT_MODE_SELECTED_UNIT ? damage : singleDamage
    const damageTime = mode === POSTTOCHAT_MODE_SELECTED_UNIT ? dpstime : singleTime

    const singleDPSString = ZO_CommaDelimitNumber(zo_floor(branchDamage / damageTime))
    const singleDamageString = ZO_CommaDelimitNumber(branchDamage)
    const timeString = string.format("%d:%04.1f", damageTime / 60, damageTime % 60)

    output = zo_strformat(
      GetString(SI_TEMPER_COMBAT_POSTDPS_FORMAT),
      name,
      singleDPSString,
      singleDamageString,
      timeString
    )
  } else if (bossUnits > 0 && mode === POSTTOCHAT_MODE_SMART) {
    const bosses = bossUnits > 1 ? string.format(" (+%d)", bossUnits - 1) : ""
    const bossTimeString = string.format("%d:%04.1f", bossTime / 60, bossTime % 60)

    const bossDPSString = ZO_CommaDelimitNumber(zo_floor(bossDamage / bossTime))
    const bossDamageString = ZO_CommaDelimitNumber(bossDamage)

    output = zo_strformat(
      GetString(SI_TEMPER_COMBAT_POSTSMARTDPS_FORMAT),
      name,
      bosses,
      bossDPSString,
      bossDamageString,
      bossTimeString
    )
  } else if (units > 1 && (mode === POSTTOCHAT_MODE_MULTI || mode === POSTTOCHAT_MODE_SMART)) {
    const timeString = string.format("%d:%04.1f", dpstime / 60, dpstime % 60)

    const totalDPSString = ZO_CommaDelimitNumber(zo_floor(data.DPSOut))
    const totalDamageString = ZO_CommaDelimitNumber(damage)

    output = zo_strformat(
      GetString(SI_TEMPER_COMBAT_POSTMULTIDPS_FORMAT),
      name,
      units - 1,
      totalDPSString,
      totalDamageString,
      timeString
    )
  } else if (mode === POSTTOCHAT_MODE_SINGLEANDMULTI) {
    const bossString =
      bossUnits > 1
        ? string.format("%s (+%d)", GetString(SI_TEMPER_COMBAT_BOSS_DPS), bossUnits - 1)
        : bossUnits === 1
          ? GetString(SI_TEMPER_COMBAT_BOSS_DPS)
          : GetString(SI_TEMPER_COMBAT_DPS)
    const timeString = string.format("%d:%04.1f", dpstime / 60, dpstime % 60)
    const bossTimeString = string.format("%d:%04.1f", bossTime / 60, bossTime % 60)

    const bossDPSString = ZO_CommaDelimitNumber(zo_floor(bossDamage / bossTime))
    const bossDamageString = ZO_CommaDelimitNumber(bossDamage)

    const totalDPSString = ZO_CommaDelimitNumber(zo_floor(data.DPSOut))
    const totalDamageString = ZO_CommaDelimitNumber(damage)

    const stringA = zo_strformat(
      GetString(SI_TEMPER_COMBAT_POSTALLDPS_FORMAT_A),
      name,
      units - 1,
      totalDPSString,
      totalDamageString,
      timeString
    )
    const stringB = zo_strformat(
      GetString(SI_TEMPER_COMBAT_POSTALLDPS_FORMAT_B),
      bossString,
      bossDPSString,
      bossDamageString,
      bossTimeString
    )

    output = string.format("%s, %s", stringA, stringB)
  } else if (mode === POSTTOCHAT_MODE_SELECTION || mode === POSTTOCHAT_MODE_SELECTED_UNITNAME) {
    if (unitSelection == null) {
      return undefined
    }

    const extraUnits =
      units > 1 && mode === POSTTOCHAT_MODE_SELECTED_UNITNAME
        ? string.format(" (x%d)", units)
        : units > 1
          ? string.format(" (+%d)", units - 1)
          : ""

    const dpsString = ZO_CommaDelimitNumber(zo_floor(damage / dpstime))
    const damageString = ZO_CommaDelimitNumber(damage)
    const timeString = string.format("%d:%04.1f", dpstime / 60, dpstime % 60)

    output = zo_strformat(
      GetString(SI_TEMPER_COMBAT_POSTSELECTIONDPS_FORMAT),
      name,
      extraUnits,
      dpsString,
      damageString,
      timeString
    )
  }

  const channel =
    getDb().autoselectchatchannel === false ? "" : IsUnitGrouped("player") ? "/p " : "/say "

  const outputtext = string.format("%s%s", timedata, output)

  CHAT_SYSTEM.textEntry.SetText(channel + outputtext)
  CHAT_SYSTEM.Maximize()
  CHAT_SYSTEM.textEntry.Open()
  CHAT_SYSTEM.textEntry.FadeIn()
  return undefined
}

TemperCombat.PosttoChat = postToChat
