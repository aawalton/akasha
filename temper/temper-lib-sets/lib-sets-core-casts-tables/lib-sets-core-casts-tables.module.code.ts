export type TypeToSetIdsTable = {
  [typeIndex: number]: { [setId: number]: boolean | undefined } | undefined
}
export function asTypeToSetIdsTable(value: unknown): TypeToSetIdsTable {
  return value as TypeToSetIdsTable
}

export type SetIdBoolOptMap = { [setId: number]: boolean | undefined }
export function asSetIdBoolOptMap(value: unknown): SetIdBoolOptMap {
  return value as SetIdBoolOptMap
}

export type TypeToSetIdNumberMap = { [typeIndex: number]: { [setId: number]: number } }
export function asTypeToSetIdNumberMap(value: unknown): TypeToSetIdNumberMap {
  return value as TypeToSetIdNumberMap
}

export type EquipTypeBoolMap = { [equipType: number]: boolean }
export function asEquipTypeBoolMap(value: unknown): EquipTypeBoolMap {
  return value as EquipTypeBoolMap
}

export type SetIdLangStringMapEntryOpt = {
  [setId: number]: { [lang: string]: string } | undefined
}
export function asSetIdLangStringMapEntryOpt(value: unknown): SetIdLangStringMapEntryOpt {
  return value as SetIdLangStringMapEntryOpt
}

export type SetIdLangStringOptMap = {
  [setId: number]: { [lang: string]: string | undefined }
}
export function asSetIdLangStringOptMap(value: unknown): SetIdLangStringOptMap {
  return value as SetIdLangStringOptMap
}

export type SetIdToStrRecordEntryOpt = {
  [setId: number]: { [key: string]: unknown } | undefined
}
export function asSetIdToStrRecordEntryOpt(value: unknown): SetIdToStrRecordEntryOpt {
  return value as SetIdToStrRecordEntryOpt
}

export type SetIdToStrRecordOpt = { [setId: number]: { [k: string]: unknown } } | undefined
export function asSetIdToStrRecordOpt(value: unknown): SetIdToStrRecordOpt {
  return value as SetIdToStrRecordOpt
}

export type SetIdTableOpt = { [setId: number]: unknown } | undefined
export function asSetIdTableOpt(value: unknown): SetIdTableOpt {
  return value as SetIdTableOpt
}

export type SetIdToNumKeyTable = { [setId: number]: { [k: number]: unknown } }
export function asSetIdToNumKeyTable(value: unknown): SetIdToNumKeyTable {
  return value as SetIdToNumKeyTable
}

export type CategoryBoolMapOpt = { [category: number]: boolean } | undefined
export function asCategoryBoolMapOpt(value: unknown): CategoryBoolMapOpt {
  return value as CategoryBoolMapOpt
}

export type SetIdPerfectedLinkMap = {
  [setId: number]: { setId: number; zoneId: number | undefined }
}
export function asSetIdPerfectedLinkMap(value: unknown): SetIdPerfectedLinkMap {
  return value as SetIdPerfectedLinkMap
}

export type LangDropLocationMap = {
  [lang: string]: { [dropLocationName: string]: unknown } | undefined
}
export function asLangDropLocationMap(value: unknown): LangDropLocationMap {
  return value as LangDropLocationMap
}

export type SetIdLangRecordEntryOpt = {
  [setId: number]: { [lang: string]: unknown } | undefined
}
export function asSetIdLangRecordEntryOpt(value: unknown): SetIdLangRecordEntryOpt {
  return value as SetIdLangRecordEntryOpt
}

export type LangIndexStringMapOpt =
  | {
      [lang: string]: { [idx: number]: string }
    }
  | undefined
export function asLangIndexStringMapOpt(value: unknown): LangIndexStringMapOpt {
  return value as LangIndexStringMapOpt
}

export type LangNameBoolMap = { [lang: string]: { [name: string]: boolean } }
export function asLangNameBoolMap(value: unknown): LangNameBoolMap {
  return value as LangNameBoolMap
}

export type TrialSetEntryOpt = { multiTrialSet?: unknown } | undefined
export function asTrialSetEntryOpt(value: unknown): TrialSetEntryOpt {
  return value as TrialSetEntryOpt
}

export type Wayshrine2ZoneOpt =
  | {
      [wayshrineNodeId: number]: number | undefined
    }
  | undefined
export function asWayshrine2ZoneOpt(value: unknown): Wayshrine2ZoneOpt {
  return value as Wayshrine2ZoneOpt
}

export type SetItemCollectionZoneMapping = {
  [idx: number]: {
    parentCategory?: number
    category: number
    zoneIds?: { [idx: number]: number }
    [k: string]: unknown
  }
}
export function asSetItemCollectionZoneMapping(value: unknown): SetItemCollectionZoneMapping {
  return value as SetItemCollectionZoneMapping
}

export type ScrollableMenuHandleOpt = { version?: string } | undefined
export function asScrollableMenuHandleOpt(value: unknown): ScrollableMenuHandleOpt {
  return value as ScrollableMenuHandleOpt
}

export type LibCustomMenuHandleOpt =
  | {
      RegisterContextMenu?: (
        this: unknown,
        callback: (this: void, ...args: unknown[]) => void,
        category: unknown
      ) => void
      CATEGORY_LATE?: unknown
    }
  | undefined
export function asLibCustomMenuHandleOpt(value: unknown): LibCustomMenuHandleOpt {
  return value as LibCustomMenuHandleOpt
}

export interface SearchUiKeyboardHandle {
  IsShown: (this: SearchUiKeyboardHandle) => boolean
  HideUI: (this: SearchUiKeyboardHandle) => void
}
export type SearchUiKeyboardOpt = SearchUiKeyboardHandle | undefined
export function asSearchUiKeyboardOpt(value: unknown): SearchUiKeyboardOpt {
  return value as SearchUiKeyboardOpt
}

export type DebugGetAllDataSvOpt =
  | { [api: number]: { running?: boolean; finished?: boolean } }
  | undefined
export function asDebugGetAllDataSvOpt(value: unknown): DebugGetAllDataSvOpt {
  return value as DebugGetAllDataSvOpt
}

export type ParamBoolMap = { [param: string]: boolean }
export function asParamBoolMap(value: unknown): ParamBoolMap {
  return value as ParamBoolMap
}

export type DebugParamMap = { [param: string]: string | ((this: void) => void) }
export function asDebugParamMap(value: unknown): DebugParamMap {
  return value as DebugParamMap
}

export type MoreOptionsButton = LibSetsMoreOptionsButton
export function asMoreOptionsButton(value: unknown): MoreOptionsButton {
  return value as MoreOptionsButton
}

export type SearchUiControl = SearchUIControl
export function asSearchUiControl(value: unknown): SearchUiControl {
  return value as SearchUiControl
}

export type Unknown = unknown
export function asUnknown(value: unknown): Unknown {
  return value as Unknown
}

export type RemoveLanguagesFullFn = (
  this: void,
  langTable: { [lang: string]: unknown } | undefined,
  lang: string
) => { [lang: string]: unknown } | undefined
export function asRemoveLanguagesFullFn(value: unknown): RemoveLanguagesFullFn {
  return value as RemoveLanguagesFullFn
}
