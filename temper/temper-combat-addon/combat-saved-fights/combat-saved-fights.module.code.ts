import {
  LOG_LEVEL_INFO,
  LOG_LEVEL_WARNING,
  log,
} from "@akasha/temper-combat-addon/combat-fight-data-log"
import type {
  Fight,
  FightDataSV,
  FightDataSVRaw,
  LogFilters,
  SavedFight,
  SavedFightMeta,
} from "@akasha/temper-combat-addon/combat-fight-data-types"
import { GLOBAL_DICT } from "@akasha/temper-combat-addon/combat-global-dictionary"
import {
  convertCombatLog,
  recoverCombatLog,
  reduceUnitIds,
} from "@akasha/temper-combat-addon/combat-log-conversion"

export const FIGHT_DATA_VERSION = 22

const [LDE] = assert(
  (globalThis as { LibDataEncode?: LibDataEncodeSurface }).LibDataEncode,
  "LibDataEncode wasn't found"
)

let sv: FightDataSV | undefined

function hasVersion(table: FightDataSVRaw): table is FightDataSV {
  return table.version !== undefined
}

function createDefaultSv(): FightDataSV {
  const fresh: FightDataSVRaw = []
  fresh.version = FIGHT_DATA_VERSION
  if (hasVersion(fresh)) {
    return fresh
  }
  return error("fight data: version missing after assignment")
}

function getSv(): FightDataSV {
  const current = sv
  if (current === undefined) {
    return error("fight data accessed before initializeFightData()")
  }
  return current
}

function getSavedVariableSize(data: object): number {
  let copy: object | undefined = {}
  collectgarbage("stop")
  const before = collectgarbage("count")
  ZO_DeepTableCopy(data, copy)
  const after = collectgarbage("count")
  const size = (after - before) / 1024
  collectgarbage("restart")
  copy = undefined
  collectgarbage()
  return size
}

function checkSavedVariable(data?: object): number {
  return getSavedVariableSize(data ?? getSv())
}

function copyFightMetaData(sourceFight: Fight, destFight?: SavedFightMeta): SavedFightMeta {
  if (destFight === undefined) {
    destFight = {}
  }

  destFight.fightlabel = sourceFight.fightlabel
  const charName = sourceFight.charData?.name ?? sourceFight.char ?? ""
  destFight.charData = { name: charName }
  destFight.zone = sourceFight.zone
  destFight.subzone = sourceFight.subzone
  destFight.date = sourceFight.date
  destFight.time = sourceFight.time
  destFight.calculated = {
    DPSOut: sourceFight.calculated.DPSOut,
    DPSIn: sourceFight.calculated.DPSIn,
    HPSOut: sourceFight.calculated.HPSOut,
    HPSIn: sourceFight.calculated.HPSIn,
  }
  destFight.hpstime = sourceFight.hpstime
  destFight.dpstime = sourceFight.dpstime

  return destFight
}

function saveFight(fight: Fight, filters?: boolean | LogFilters): undefined {
  const fightCopy = ZO_DeepTableCopy(fight)
  reduceUnitIds(fightCopy)
  const stringlog = convertCombatLog(fightCopy, filters)
  const savedData: SavedFight = {
    encodedStrings: LDE.Encode(fightCopy, true, GLOBAL_DICT),
    stringlog: stringlog,
    svversion: FIGHT_DATA_VERSION,
    log: stringlog !== undefined,
  }
  copyFightMetaData(fightCopy, savedData)
  getSv().push(savedData)
  return undefined
}

function isLegacyRawFight(row: SavedFight): row is SavedFight & Fight {
  return row.calculated !== undefined
}

function loadFight(id: number): Fight {
  const savedFight = getSv()[id]
  if (savedFight === undefined) {
    return error("no saved fight at index " + tostring(id))
  }
  let loadedFight: Fight
  if (savedFight.encodedStrings !== undefined && savedFight.svversion >= 14) {
    const [decoded] = LDE.Decode<Fight>(savedFight.encodedStrings, GLOBAL_DICT)
    loadedFight = decoded
    loadedFight.stringlog = savedFight.stringlog
    loadedFight.svversion = savedFight.svversion
  } else {
    const copied = ZO_DeepTableCopy(savedFight)
    if (!isLegacyRawFight(copied)) {
      return error("saved fight row is neither encoded nor a raw legacy fight")
    }
    loadedFight = copied
  }
  recoverCombatLog(loadedFight)
  return loadedFight
}

function deleteFight(id: number): undefined {
  getSv().splice(id, 1)
  return undefined
}

function deleteLog(id: number): undefined {
  const savedFight = getSv()[id]
  if (savedFight === undefined) {
    return error("no saved fight at index " + tostring(id))
  }
  savedFight.stringlog = []
  return undefined
}

function getNumFights(): number {
  if (sv === undefined) {
    return 0
  }
  return sv.length
}

function getFight(id: number): SavedFight | undefined {
  const current = getSv()
  if (id === -1) {
    return current[current.length - 1]
  }
  return current[id]
}

function getFights(): FightDataSV | undefined {
  return sv
}

export function copyFight(n: number): undefined {
  const current = getSv()
  const last = current[current.length - 1]
  if (last === undefined) {
    return undefined
  }
  for (let i = 1; i <= n; i++) {
    current.push(last)
  }
  return undefined
}

export function initializeFightData(): undefined {
  log(LOG_LEVEL_INFO, "Starting init of fight data ...")

  const existing = globalThis.TemperCombat_FightData
  if (existing === undefined || !hasVersion(existing)) {
    sv = createDefaultSv()
    globalThis.TemperCombat_FightData = sv
  } else {
    sv = existing
  }

  if (sv.version !== FIGHT_DATA_VERSION) {
    log(
      LOG_LEVEL_WARNING,
      "Saved fight data has version %d, expected %d. Conversion is not supported; fights remain readable via the legacy load path.",
      sv.version,
      FIGHT_DATA_VERSION
    )
  }

  log(LOG_LEVEL_INFO, "Init of fight data complete.")
  return undefined
}

export {
  checkSavedVariable as Check,
  deleteFight as Delete,
  deleteLog as DeleteLog,
  getFight,
  getFights,
  getNumFights as GetNumFights,
  loadFight as Load,
  saveFight as Save,
}
