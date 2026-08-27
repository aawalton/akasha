interface LibSetsLib {
  buildSetTypeInfo: (
    this: void,
    setData: { setType?: number; setId?: number; classId?: number; [key: string]: unknown },
    withTexture?: boolean
  ) => LuaMultiReturn<[string, string | undefined]>
  BuildSetDataText: (
    this: void,
    setData: { [key: string]: unknown },
    itemLink: string | undefined,
    withoutHeaderLine?: boolean
  ) => LuaMultiReturn<[string, { [part: string]: LibSetsSetInfoPart }, string]>

  GetDropMechanicTexture: (this: void, dropMechanicId: number) => string | undefined
  GetDropMechanicName: (
    this: void,
    dropMechanicId: number,
    lang?: string
  ) => LuaMultiReturn<[string | undefined, string | undefined]>
  GetSpecialZoneNameById: (this: void, zoneId: number, lang?: string) => string | undefined
  GetZoneName: (this: void, zoneId: number, lang?: string) => string | undefined
  GetCurrentZoneName: (this: void) => LuaMultiReturn<[string | undefined, string | undefined]>
  GetAllDropZones: (this: void) => { [zoneId: number]: boolean } | undefined
  GetAllDropLocationNames: (this: void, lang?: string) => { [idx: number]: string } | undefined
  GetDLCInfo: (this: void, dlcId: number) => LuaMultiReturn<[string, number | undefined]>

  openMapOfZoneId: (this: void, zoneId: number) => void
  showWayshrineNodeIdOnMap: (this: void, wayshrineNodeIndex: number) => void
  OpenSetItemCollectionBookForItemLink: (this: void, itemLink: string) => void
  ShowSettingsMenu: (this: void, ...args: unknown[]) => void

  RegisterCustomTooltipHook: (this: void, tooltipControlName: string, addonName: string) => boolean

  SearchUI: LibSetsSearchUIDescriptorExt

  searchUIKeyboard?: LibSetsSearchUIKeyboardObject

  XMLGetDynamicWidth?: (
    this: void,
    XMLcontrol: SearchUIControl | undefined,
    minWidth?: number | string | ((this: void, control: SearchUIControl) => number),
    maxWidth?: number | string | ((this: void, control: SearchUIControl) => number),
    applyValues?: boolean,
    minHeight?: number,
    maxHeight?: number,
    forceMaxWidth?: boolean
  ) => number | string | undefined
}

type LibSetsSearchUIDescriptorExt = {
  name: string
  controlName: LuaMap<boolean, string>
  control: LuaMap<boolean, unknown>
  KeyboardVars: { minWidth: number; minHeight: number }

  favoriteIcon: string

  [favoriteIconKey: string]: unknown

  favoriteIconTextStar: string
  favoriteIconTexts: { [category: string]: string | undefined }

  MAX_NUM_SET_BONUS: number
  searchTypeDefault: number
  scrollListDataTypeDefault: number
}

interface LibSetsSetInfoPart {
  enabled: boolean
  data?: unknown
  dataClean?: unknown
  text?: string
  textClean?: string
  icon?: string
}
