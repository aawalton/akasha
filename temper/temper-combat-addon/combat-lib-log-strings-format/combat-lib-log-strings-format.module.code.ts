import {
  ABILITY_ID_ZEN,
  getFormattedAbilityIcon,
  getFormattedAbilityName,
  LIBCOMBAT_MESSAGE_WEAPONSWAP,
  LIBCOMBAT_STAT_CRITICALRESISTANCE,
  LIBCOMBAT_STAT_MAXHEALTH,
  LIBCOMBAT_STAT_MAXMAGICKA,
  LIBCOMBAT_STAT_MAXSTAMINA,
  LIBCOMBAT_STAT_PHYSICALRESISTANCE,
  LIBCOMBAT_STAT_SPELLCRIT,
  LIBCOMBAT_STAT_SPELLCRITBONUS,
  LIBCOMBAT_STAT_SPELLPENETRATION,
  LIBCOMBAT_STAT_SPELLPOWER,
  LIBCOMBAT_STAT_SPELLRESISTANCE,
  LIBCOMBAT_STAT_STATUS_EFFECT_CHANCE,
  LIBCOMBAT_STAT_WEAPONCRIT,
  LIBCOMBAT_STAT_WEAPONCRITBONUS,
  LIBCOMBAT_STAT_WEAPONPENETRATION,
  LIBCOMBAT_STAT_WEAPONPOWER,
} from "@akasha/temper-combat-addon/combat-lib-constants"
import { LOG_LEVEL_DEBUG, log } from "@akasha/temper-combat-addon/combat-lib-log"
import type {
  BossHpLogLine,
  DeathLogLine,
  MessagesLogLine,
  PerformanceLogLine,
  PlayerStatsLogLine,
  SkillTimingsLogLine,
} from "@akasha/temper-combat-addon/combat-lib-log-lines"
import {
  getDeathFormatString,
  getMessageString,
  getResurrectString,
  getSkillsFormatString,
  STRING_DECREASED,
  STRING_FORMATSTRING_SKILLDELAY,
  STRING_INCREASED,
  STRING_IS_AT,
  STRING_MESSAGE_BAR,
  STRING_STAT_SPELL_CRIT_DONE,
  STRING_STAT_STATUS_EFFECT_CHANCE,
  STRING_STAT_WEAPON_CRIT_DONE,
  STRING_UNITTYPE_GROUP,
  STRING_UNITTYPE_OTHER,
  STRING_UNITTYPE_PET,
  STRING_UNITTYPE_PLAYER,
  STRING_YOU,
} from "@akasha/temper-combat-addon/combat-lib-log-strings-text"
import type { Fight, UnitEntry } from "@akasha/temper-combat-addon/combat-lib-types"

export type CombatLogLine = (number | string | undefined)[]

export type LogColor = [number, number, number]

export type FormattedLogLine = LuaMultiReturn<
  [text: string | undefined, color: LogColor | undefined]
>

export const CRIT_FORMAT = "|cFFCC99<<1>>|r"

let statStringsCache: Record<number, string> | undefined

function getStatStrings(): Record<number, string> {
  if (statStringsCache !== undefined) {
    return statStringsCache
  }
  statStringsCache = {
    [LIBCOMBAT_STAT_MAXMAGICKA]: "|c8888ff" + GetString(SI_DERIVEDSTATS4) + "|r ",
    [LIBCOMBAT_STAT_SPELLPOWER]: "|c8888ff" + GetString(SI_DERIVEDSTATS25) + "|r ",
    [LIBCOMBAT_STAT_SPELLCRIT]: "|c8888ff" + GetString(SI_DERIVEDSTATS23) + "|r ",
    [LIBCOMBAT_STAT_SPELLCRITBONUS]: "|c8888ff" + STRING_STAT_SPELL_CRIT_DONE + "|r ",
    [LIBCOMBAT_STAT_SPELLPENETRATION]: "|c8888ff" + GetString(SI_DERIVEDSTATS34) + "|r ",

    [LIBCOMBAT_STAT_MAXSTAMINA]: "|c88ff88" + GetString(SI_DERIVEDSTATS29) + "|r ",
    [LIBCOMBAT_STAT_WEAPONPOWER]: "|c88ff88" + GetString(SI_DERIVEDSTATS1) + "|r ",
    [LIBCOMBAT_STAT_WEAPONCRIT]: "|c88ff88" + GetString(SI_DERIVEDSTATS16) + "|r ",
    [LIBCOMBAT_STAT_WEAPONCRITBONUS]: "|c88ff88" + STRING_STAT_WEAPON_CRIT_DONE + "|r ",
    [LIBCOMBAT_STAT_WEAPONPENETRATION]: "|c88ff88" + GetString(SI_DERIVEDSTATS33) + "|r ",

    [LIBCOMBAT_STAT_MAXHEALTH]: "|cffff88" + GetString(SI_DERIVEDSTATS7) + "|r ",
    [LIBCOMBAT_STAT_PHYSICALRESISTANCE]: "|cffff88" + GetString(SI_DERIVEDSTATS22) + "|r ",
    [LIBCOMBAT_STAT_SPELLRESISTANCE]: "|cffff88" + GetString(SI_DERIVEDSTATS13) + "|r ",
    [LIBCOMBAT_STAT_CRITICALRESISTANCE]: "|cffff88" + GetString(SI_DERIVEDSTATS24) + "|r ",
    [LIBCOMBAT_STAT_STATUS_EFFECT_CHANCE]: "|cdddddd" + STRING_STAT_STATUS_EFFECT_CHANCE + "|r ",
  }
  return statStringsCache
}

const LOG_COLORS: Record<number | string, string> = {
  [DAMAGE_TYPE_NONE]: "|cE6E6E6",
  [DAMAGE_TYPE_GENERIC]: "|cE6E6E6",
  [DAMAGE_TYPE_PHYSICAL]: "|cf4f2e8",
  [DAMAGE_TYPE_FIRE]: "|cff6600",
  [DAMAGE_TYPE_SHOCK]: "|cffff66",
  [DAMAGE_TYPE_OBLIVION]: "|cd580ff",
  [DAMAGE_TYPE_COLD]: "|cb3daff",
  [DAMAGE_TYPE_EARTH]: "|cbfa57d",
  [DAMAGE_TYPE_MAGIC]: "|c9999ff",
  [DAMAGE_TYPE_DROWN]: "|ccccccc",
  [DAMAGE_TYPE_DISEASE]: "|cc48a9f",
  [DAMAGE_TYPE_POISON]: "|c9fb121",
  [DAMAGE_TYPE_BLEED]: "|cc20a38",
  heal: "|c55ff55",
  buff: "|c00cc00",
  debuff: "|cff3333",
  resource: "|cffffff",
}

export function getDamageColor(damageType: number | string): string | undefined {
  return LOG_COLORS[damageType]
}

export function getAbilityString(
  abilityId: number,
  damageType: number | string,
  fontsize: number,
  showIds?: boolean,
  stacks?: number
): string {
  const stackCount = stacks ?? 0

  const icon = zo_iconFormat(getFormattedAbilityIcon(abilityId), fontsize, fontsize)
  const name = getFormattedAbilityName(abilityId)
  const damageColor = getDamageColor(damageType)

  const format =
    abilityId === ABILITY_ID_ZEN
      ? "<<5[/$dx /$dx ]>><<1>> <<2>><<3>><<4[/ ($d)/ ($d)]>>|r"
      : "<<5[//$dx ]>><<1>> <<2>><<3>><<4[/ ($d)/ ($d)]>>|r"
  const abilityString = ZO_CachedStrFormat(
    format,
    icon,
    damageColor,
    name,
    showIds === true ? abilityId : 0,
    stackCount
  )

  return abilityString
}

export const UNIT_TYPE_STRING: Record<number, string> = {
  [COMBAT_UNIT_TYPE_PLAYER]: STRING_UNITTYPE_PLAYER,
  [COMBAT_UNIT_TYPE_PLAYER_PET]: STRING_UNITTYPE_PET,
  [COMBAT_UNIT_TYPE_GROUP]: STRING_UNITTYPE_GROUP,
  [COMBAT_UNIT_TYPE_OTHER]: STRING_UNITTYPE_OTHER,
}

export function getUnitName(units: Record<number, UnitEntry>, unitId: number | undefined): string {
  if (unitId == null) return ""
  return units[unitId]?.name ?? ""
}

export function formatPlayerStatsLine(
  logline: PlayerStatsLogLine,
  timeString: string,
  logFormat: string
): FormattedLogLine {
  const statchange = logline[2]
  const newvalue = logline[3]
  const statId = logline[4]

  const stat = getStatStrings()[statId]
  let change: number | string = statchange
  let value: number | string = newvalue

  if (statId === LIBCOMBAT_STAT_SPELLCRIT || statId === LIBCOMBAT_STAT_WEAPONCRIT) {
    value = string.format("%.1f%%", GetCriticalStrikeChance(newvalue))
    change = string.format("%.1f%%", GetCriticalStrikeChance(statchange))
  }

  if (statId === LIBCOMBAT_STAT_SPELLCRITBONUS || statId === LIBCOMBAT_STAT_WEAPONCRITBONUS) {
    value = string.format("%.1f%%", newvalue)
    change = string.format("%.1f%%", statchange)
  }

  if (statId === LIBCOMBAT_STAT_STATUS_EFFECT_CHANCE) {
    value = string.format("%.1f%%", newvalue)
    change = string.format("%.1f%%", statchange)
  }

  let changeText: string
  let changeValueText: string

  if (statchange > 0) {
    changeText = ZO_CachedStrFormat("|c00cc00<<1>>|r", STRING_INCREASED)
    changeValueText = ZO_CachedStrFormat(" |c00cc00(+<<1>>)|r", change)
  } else if (statchange < 0) {
    changeText = ZO_CachedStrFormat("|cff3333<<1>>|r", STRING_DECREASED)
    changeValueText = ZO_CachedStrFormat(" |cff3333(<<1>>)|r", change)
  } else {
    changeText = STRING_IS_AT
    changeValueText = ""
  }

  const color: LogColor = [0.8, 0.8, 0.8]
  const text = ZO_CachedStrFormat(logFormat, timeString, stat, changeText, value, changeValueText)
  return $multi(text, color)
}

export function formatMessageLine(logline: MessagesLogLine, timeString: string): FormattedLogLine {
  const message = logline[2]
  const bar: number | undefined = logline[3]
  let color: LogColor
  let messagetext: string

  if (message === LIBCOMBAT_MESSAGE_WEAPONSWAP) {
    color = [0.6, 0.6, 0.6]
    const formatstring = bar != null && bar > 0 ? "<<1>> (<<2>> <<3>>)" : "<<1>>"

    messagetext = ZO_CachedStrFormat(
      formatstring,
      getMessageString(LIBCOMBAT_MESSAGE_WEAPONSWAP),
      STRING_MESSAGE_BAR,
      bar
    )
  } else if (message != null) {
    color = [0.7, 0.7, 0.7]
    messagetext = typeof message === "number" ? getMessageString(message) : message
  } else {
    return $multi(undefined, undefined)
  }

  const text = ZO_CachedStrFormat("<<1>> <<2>>", timeString, messagetext)
  return $multi(text, color)
}

export function formatSkillTimingsLine(
  logline: SkillTimingsLogLine,
  timeString: string
): FormattedLogLine {
  const reducedslot: number | undefined = logline[2]
  const abilityId = logline[3]
  const status = logline[4]
  const skillDelay = logline[5]

  if (reducedslot == null) {
    log(
      "events",
      LOG_LEVEL_DEBUG,
      "Invalid Slot: %s (%d), Status: %d)",
      GetAbilityName(abilityId),
      abilityId,
      status
    )

    return $multi(undefined, undefined)
  }

  const skillDelayString =
    skillDelay != null ? ZO_CachedStrFormat(STRING_FORMATSTRING_SKILLDELAY, skillDelay) : ""

  const logFormat = getSkillsFormatString(status)

  const isWeaponAttack = reducedslot % 10 === 1 || reducedslot % 10 === 2

  let formatstring = " |cddffbb<<1>>|r"

  if (isWeaponAttack) {
    formatstring = " |cffffff<<1>>|r"
  }

  const name = ZO_CachedStrFormat(formatstring, getFormattedAbilityName(abilityId))

  const color: LogColor = [0.9, 0.8, 0.7]

  const text = ZO_CachedStrFormat(logFormat, timeString, name, skillDelayString)
  return $multi(text, color)
}

export function formatBossHpLine(
  logline: BossHpLogLine,
  fight: Fight,
  timeString: string,
  logFormat: string
): FormattedLogLine {
  const bossId = logline[2]
  const currenthp = logline[3]
  const maxhp = logline[4]

  const unitId = fight.bosses[bossId]

  const bossName = getUnitName(fight.units, unitId)

  const percent = zo_round((currenthp / maxhp) * 100)

  const color: LogColor = [0.9, 0.7, 0.5]

  const text = ZO_CachedStrFormat(logFormat, timeString, bossName, percent, currenthp, maxhp)
  return $multi(text, color)
}

export function formatPerformanceLine(
  logline: PerformanceLogLine,
  timeString: string,
  logFormat: string
): FormattedLogLine {
  const fps = logline[2]
  const min = logline[3]
  const max = logline[4]
  const ping = logline[5]

  const color: LogColor = [0.9, 0.9, 0.9]

  const pingcolor =
    ping <= 50
      ? "99ff99"
      : ping <= 80
        ? "ccff99"
        : ping <= 120
          ? "ffff99"
          : ping <= 160
            ? "ffcc99"
            : "ff9999"
  const pingString = ZO_CachedStrFormat("|c<<1>><<2>>|r", pingcolor, ping)

  const fpsColor =
    fps >= 100
      ? "99ff99"
      : fps >= 60
        ? "ccff99"
        : fps >= 40
          ? "ffff99"
          : fps >= 25
            ? "ffcc99"
            : "ff9999"
  const fpsString = ZO_CachedStrFormat("|c<<1>><<2>>|r", fpsColor, fps)

  const minString =
    min < 0.5 * fps && min < 25
      ? ZO_CachedStrFormat("|cff9999<<1>>|r", min)
      : min < 0.7 * fps && min < 40
        ? ZO_CachedStrFormat("|cffddbb<<1>>|r", min)
        : min

  const text = ZO_CachedStrFormat(logFormat, timeString, fpsString, minString, max, pingString)
  return $multi(text, color)
}

export function formatDeathLine(
  logline: DeathLogLine,
  fight: Fight,
  timeString: string,
  fontsize: number,
  showIds: boolean
): FormattedLogLine {
  const state = logline[2]
  const unitId = logline[3]
  const otherId = logline[4]

  const logFormat = getDeathFormatString(state)

  const isSelf = fight.playerid === unitId

  const unitString = isSelf ? STRING_YOU : getUnitName(fight.units, unitId)

  let action = ""
  let otherString = ""

  if (state === 1 && otherId != null) {
    otherString = getAbilityString(otherId, DAMAGE_TYPE_GENERIC, fontsize, showIds)
  }

  if (state > 2) {
    action = getResurrectString(isSelf ? 1 : 2)
  }

  const text = ZO_CachedStrFormat(logFormat, timeString, unitString, action, otherString)

  const color: LogColor = [0.7, 0.7, 0.7]
  return $multi(text, color)
}
