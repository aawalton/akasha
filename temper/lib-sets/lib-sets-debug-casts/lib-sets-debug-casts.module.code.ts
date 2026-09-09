export type SetNamesTable = { [setId: number]: { [lang: string]: string } }
export function asSetNamesTable(value: unknown): SetNamesTable {
  return value as SetNamesTable
}

export type SetNamesTableOpt = { [setId: number]: { [lang: string]: string } | undefined }
export function asSetNamesTableOpt(value: unknown): SetNamesTableOpt {
  return value as SetNamesTableOpt
}

export type SetItemIdsTable = { [setId: number]: { [itemId: number]: number } }
export function asSetItemIdsTable(value: unknown): SetItemIdsTable {
  return value as SetItemIdsTable
}

export type SetItemIdsTableOpt = SetItemIdsTable | undefined
export function asSetItemIdsTableOpt(value: unknown): SetItemIdsTableOpt {
  return value as SetItemIdsTableOpt
}

export type NewSetIdsSV = { [world: string]: { [api: string]: unknown } }
export function asNewSetIdsSV(value: unknown): NewSetIdsSV {
  return value as NewSetIdsSV
}

export type NewSetIdsByWorld = {
  [world: string]: { [api: number]: { [index: number]: unknown } }
}
export function asNewSetIdsByWorldOpt(value: unknown): NewSetIdsByWorldOpt {
  return value as NewSetIdsByWorldOpt
}
export type NewSetIdsByWorldOpt = NewSetIdsByWorld | undefined

export interface DebugGetAllDataRun {
  clientLang?: string
  running?: boolean
  finished?: boolean
  DateTimeStart?: string
  DateTimeEnd?: string
  langDone?: { [lang: string]: unknown }
  LanguageChangeDateTime?: string
  LanguageChangeTo?: string
  LastErrorDateTime?: string
  LastError?: string
}

export type DebugGetAllDataSV = { [api: number]: DebugGetAllDataRun }
export function asDebugGetAllDataSV(value: unknown): DebugGetAllDataSV {
  return value as DebugGetAllDataSV
}

export type WayshrineSV = { [nodeId: number]: string }
export function asWayshrineSV(value: unknown): WayshrineSV {
  return value as WayshrineSV
}

export type DungeonFinderKeyboard =
  | { navigationTree?: { rootNode?: { children?: { [index: number]: unknown } } } }
  | undefined
export function asDungeonFinderKeyboard(value: unknown): DungeonFinderKeyboard {
  return value as DungeonFinderKeyboard
}

export type LibZoneOpt = LibSetsDebugLibZone | undefined
export function asLibZoneOpt(value: unknown): LibZoneOpt {
  return value as LibZoneOpt
}
