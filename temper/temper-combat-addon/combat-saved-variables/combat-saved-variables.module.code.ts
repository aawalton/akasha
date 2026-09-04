import { SAVED_VARIABLES_NAME } from "@akasha/temper-combat-addon/combat-constants"
import type { DamageCategory } from "@akasha/temper-combat-addon/combat-core-types"
import {
  LIBCOMBAT_EVENT_DAMAGE_IN,
  LIBCOMBAT_EVENT_DAMAGE_OUT,
  LIBCOMBAT_EVENT_EFFECTS_IN,
  LIBCOMBAT_EVENT_EFFECTS_OUT,
  LIBCOMBAT_EVENT_GROUPEFFECTS_IN,
  LIBCOMBAT_EVENT_GROUPEFFECTS_OUT,
  LIBCOMBAT_EVENT_HEAL_IN,
  LIBCOMBAT_EVENT_HEAL_OUT,
  LIBCOMBAT_EVENT_MESSAGES,
  LIBCOMBAT_EVENT_PLAYERSTATS,
  LIBCOMBAT_EVENT_RESOURCES,
} from "@akasha/temper-combat-addon/combat-lib-constants"

export type PenetrationDebuffKey = "crusherValue" | "alkoshValue" | "tremorscaleValue"

export interface CategoryNumberMap {
  damageOut: number
  damageIn: number
  healingOut: number
  healingIn: number
}

export interface CategoryBooleanMap {
  damageOut: boolean
  damageIn: boolean
  healingOut: boolean
  healingIn: boolean
}

export interface WindowPosition {
  x: number
  y: number
}

export interface FightReportSettings {
  scale: number
  category: DamageCategory
  mainpanel: string
  rightpanel: string
  fightstatspanel: number
  useDisplayNames: boolean
  showPets: boolean
  SmoothWindow: number
  Cursor: boolean
  showWereWolf: boolean
  PlotColors: Record<number, [number, number, number, number]>
  ShowGroupBuffsInPlots: boolean
  FavouriteBuffs: Record<string, boolean>
  CLSelection: Record<number | string, boolean>
  hitCritLayout: CategoryNumberMap
  averageLayout: CategoryNumberMap
  maxValue: CategoryBooleanMap
}

export interface LiveReportSettings {
  enabled: boolean
  locked: boolean
  layout: string
  scale: number
  bgalpha: number
  alignmentleft: boolean
  damageOut: boolean
  damageOutSingle: boolean
  healOut: boolean
  damageIn: boolean
  healIn: boolean
  time: boolean
  healOutAbsolute: boolean
}

export interface ChatLogSettings {
  enabled: boolean
  name: string
  damageOut: boolean
  healingOut: boolean
  damageIn: boolean
  healingIn: boolean
}

export interface TemperCombatSettings extends Record<string, unknown> {
  accountwide: boolean

  fighthistory: number
  maxSavedFights: number
  keepbossfights: boolean
  chunksize: number

  recordgrp: boolean
  recordgrpinlarge: boolean

  showstacks: boolean
  crusherValue: number
  alkoshValue: number
  tremorscaleValue: number
  unitresistance: number

  lightmode: boolean
  offincyrodil: boolean
  lightmodeincyrodil: boolean

  autoselectchatchannel: boolean

  autoscreenshot: boolean
  autoscreenshotmintime: number

  showDebugIds: boolean

  TemperCombat_LiveReport: WindowPosition
  TemperCombat_Report: WindowPosition

  FightReport: FightReportSettings
  liveReport: LiveReportSettings
  chatLog: ChatLogSettings

  maxSVsize?: number
}

function maxStat(): number {
  const [, magicka] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_MAGICKA)
  const [, stamina] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_STAMINA)
  const [, health] = GetUnitPower("player", COMBAT_MECHANIC_FLAGS_HEALTH)

  let maxPower = COMBAT_MECHANIC_FLAGS_MAGICKA

  if (stamina > magicka) {
    maxPower = COMBAT_MECHANIC_FLAGS_STAMINA
  }
  if (health > magicka && health > stamina) {
    maxPower = COMBAT_MECHANIC_FLAGS_HEALTH
  }

  return maxPower
}

function defaultScale(): number {
  return zo_roundToNearest(
    1 / (tonumber(GetSetting(SETTING_TYPE_UI, UI_SETTING_CUSTOM_SCALE)) ?? 1),
    0.1
  )
}

function buildSvDefaults(): TemperCombatSettings {
  return {
    accountwide: false,

    fighthistory: 25,
    maxSavedFights: 50,
    keepbossfights: false,
    chunksize: 1000,

    recordgrp: true,
    recordgrpinlarge: true,

    showstacks: true,
    crusherValue: 2108,
    alkoshValue: 6000,
    tremorscaleValue: 2640,
    unitresistance: 18200,

    lightmode: false,
    offincyrodil: false,
    lightmodeincyrodil: true,

    autoselectchatchannel: true,

    autoscreenshot: false,
    autoscreenshotmintime: 30,

    showDebugIds: false,

    TemperCombat_LiveReport: { x: 700, y: 500 },
    TemperCombat_Report: { x: GuiRoot.GetWidth() / 2, y: GuiRoot.GetHeight() / 2 - 75 },

    FightReport: {
      scale: defaultScale(),
      category: "damageOut",
      mainpanel: "FightStats",
      rightpanel: "buffs",
      fightstatspanel: maxStat(),

      useDisplayNames: false,
      showPets: true,

      SmoothWindow: 5,

      Cursor: true,

      showWereWolf: false,

      PlotColors: {
        [1]: [1, 1, 0, 0.66],
        [2]: [1, 0, 0, 0.66],
        [3]: [0, 1, 0, 0.66],
        [4]: [0, 0, 1, 0.66],
        [5]: [1, 0, 1, 0.66],
        [6]: [0.4, 1, 0.4, 0.4],
        [7]: [1, 0.4, 0.9, 0.4],
      },

      ShowGroupBuffsInPlots: true,

      FavouriteBuffs: {},

      CLSelection: {
        [LIBCOMBAT_EVENT_DAMAGE_OUT]: true,
        [LIBCOMBAT_EVENT_DAMAGE_IN]: false,
        [LIBCOMBAT_EVENT_HEAL_OUT]: false,
        [LIBCOMBAT_EVENT_HEAL_IN]: false,
        [LIBCOMBAT_EVENT_EFFECTS_IN]: false,
        [LIBCOMBAT_EVENT_EFFECTS_OUT]: false,
        [LIBCOMBAT_EVENT_GROUPEFFECTS_IN]: false,
        [LIBCOMBAT_EVENT_GROUPEFFECTS_OUT]: false,
        [LIBCOMBAT_EVENT_PLAYERSTATS]: false,
        [LIBCOMBAT_EVENT_RESOURCES]: false,
        [LIBCOMBAT_EVENT_MESSAGES]: false,
      },

      hitCritLayout: { damageOut: 1, damageIn: 1, healingOut: 1, healingIn: 1 },

      averageLayout: { damageOut: 1, damageIn: 1, healingOut: 1, healingIn: 1 },

      maxValue: { damageOut: true, damageIn: true, healingOut: true, healingIn: true },
    },

    liveReport: {
      enabled: true,
      locked: false,
      layout: "Compact",
      scale: defaultScale(),
      bgalpha: 95,
      alignmentleft: false,
      damageOut: true,
      damageOutSingle: false,
      healOut: true,
      damageIn: true,
      healIn: true,
      time: true,
      healOutAbsolute: false,
    },

    chatLog: {
      enabled: false,
      name: "CMX Combat Log",
      damageOut: true,
      healingOut: false,
      damageIn: false,
      healingIn: false,
    },
  }
}

let svDefaults: TemperCombatSettings | undefined
let db: TemperCombatSettings | undefined

export function getSvDefaults(): TemperCombatSettings {
  if (svDefaults === undefined) {
    svDefaults = buildSvDefaults()
  }
  return svDefaults
}

export function initializeSavedVariables(): TemperCombatSettings {
  const svmain = globalThis.TemperCombat_Save
  const svtable =
    svmain !== undefined && svmain.Default !== undefined
      ? svmain.Default[GetDisplayName()]
      : undefined

  if (svtable !== undefined) {
    for (const [k, v] of pairs(svtable)) {
      if (v.version != null && v.version < 5) {
        delete svtable[k]
      }
    }
  }

  const defaults = getSvDefaults()

  let loaded = ZO_SavedVars.NewAccountWide(SAVED_VARIABLES_NAME, 5, "Settings", defaults)
  if (!loaded.accountwide) {
    loaded = ZO_SavedVars.NewCharacterIdSettings(SAVED_VARIABLES_NAME, 5, "Settings", defaults)
  }

  db = loaded

  if (db.maxSVsize != null) {
    delete db.maxSVsize
  }

  return db
}

export function getDb(): TemperCombatSettings {
  if (db === undefined) {
    error("TemperCombat settings accessed before initialization")
  }
  return db
}
