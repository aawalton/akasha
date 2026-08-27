import type {
  DebugInfoList,
  GeoDebugEntries,
  GlobalObjectTable,
  Lib,
  MapNamesTable,
  SavedVarsTable,
  ZoneDataEntry,
  ZonePoiInfoTable,
} from "./types"

export function asLib(value: unknown): Lib {
  return value as Lib
}

export function asGlobalObjectTable(value: unknown): GlobalObjectTable {
  return value as GlobalObjectTable
}

export function asZoneDataEntry(value: unknown): ZoneDataEntry {
  return value as ZoneDataEntry
}

export function asMapNamesTable(value: unknown): MapNamesTable {
  return value as MapNamesTable
}

export function asGeoDebugEntries(value: unknown): GeoDebugEntries {
  return value as GeoDebugEntries
}

export function asZonePoiInfoTable(value: unknown): ZonePoiInfoTable {
  return value as ZonePoiInfoTable
}

export function asSavedVarsTable(value: unknown): SavedVarsTable {
  return value as SavedVarsTable
}

export function asDebugInfoList(value: unknown): DebugInfoList {
  return value as DebugInfoList
}
