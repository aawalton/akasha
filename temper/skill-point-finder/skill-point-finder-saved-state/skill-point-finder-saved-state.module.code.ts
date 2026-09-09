import { checkSavedVars } from "../skill-point-finder-points/skill-point-finder-points.module.code.ts"
import {
  requireSVar,
  STATE,
} from "../skill-point-finder-state/skill-point-finder-state.module.code.ts"
import type {
  PointsData,
  Rgb,
  Settings,
} from "../skill-point-finder-types/skill-point-finder-types.module.code.ts"

interface LegacySettings extends Settings {
  MWC?: boolean
  SSC?: boolean
  EWC?: boolean
  GMC?: boolean
  BWC?: boolean
}

interface LegacyPtsData extends PointsData {
  MWChar?: number
  SUChar?: number
  SSChar?: number
  EWChar?: number
  GMChar?: number
  BWChar?: number
}

function backfillColor<K extends string>(
  this: void,
  live: Partial<Record<K, Rgb>>,
  saved: Partial<Record<K, Rgb>>,
  key: K,
  fallback: Rgb
): undefined {
  if (live[key] === undefined) {
    live[key] = fallback
    saved[key] = fallback
  }
}

export function loadSettings(this: void, charId: string): undefined {
  const sv = requireSVar()
  if (checkSavedVars(sv.settings[charId])) {
    const saved = sv.settings[charId]
    if (saved !== undefined) {
      STATE.settings = TemperTableFunctions.CopyTable(saved)
      backfillColor(STATE.settings.GSP, saved.GSP, "progColor", [1, 1, 1])
      backfillColor(STATE.settings.SQS, saved.SQS, "progColorSS", [0.7843, 0.3922, 0])
      backfillColor(STATE.settings.SQS, saved.SQS, "progColorZQ", [0.7843, 0.3922, 0])
    }
  }
}

const ZONE_RENAMES: readonly [old: string, next: string][] = [
  ["TG", "HB"],
  ["RO", "WR"],
  ["DB", "GC"],
  ["MW", "VV"],
]

export function migrateSavedVariables(this: void): undefined {
  const sVar = requireSVar()
  for (const char of STATE.charData) {
    const ptsData: LegacyPtsData | undefined = sVar.ptsData[char.charId]
    if (ptsData === undefined) {
      continue
    }

    const zonePoints = ptsData.ZQ
    for (const [oldKey, newKey] of ZONE_RENAMES) {
      const merged = zonePoints[newKey] ?? zonePoints[oldKey]
      if (merged !== undefined) {
        zonePoints[newKey] = merged
      }
      delete zonePoints[oldKey]
    }

    const skyshards = ptsData.SS
    const wp = skyshards["WP"] ?? skyshards["MQ"]
    if (wp !== undefined) {
      skyshards["WP"] = wp
    }
    delete skyshards["MQ"]

    const settings: LegacySettings | undefined = sVar.settings[char.charId]
    if (settings !== undefined) {
      settings.TUT =
        settings.MWC === true ||
        settings.SSC === true ||
        settings.EWC === true ||
        settings.GMC === true ||
        settings.BWC === true ||
        settings.TUT
      delete settings.MWC
      delete settings.SSC
      delete settings.EWC
      delete settings.GMC
      delete settings.BWC
    }

    ptsData.tutorial =
      ptsData.MWChar === 1 ||
      ptsData.SUChar === 1 ||
      ptsData.EWChar === 1 ||
      ptsData.GMChar === 1 ||
      ptsData.BWChar === 1
        ? 1
        : ptsData.tutorial
    delete ptsData.MWChar
    delete ptsData.SSChar
    delete ptsData.EWChar
    delete ptsData.GMChar
    delete ptsData.BWChar
  }
}
