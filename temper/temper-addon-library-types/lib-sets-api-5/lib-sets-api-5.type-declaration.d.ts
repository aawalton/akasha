interface LibSetsApi {
  itemSetCollectionBookMoreOptionsButton?: LibSetsMoreOptionsButton

  currentAPIVersion: number

  debugGetAllDataIsRunning: boolean

  OpenSetItemCollectionBrowserForCurrentZone: (
    this: void,
    useParentZoneId?: boolean
  ) => boolean | undefined
}

interface LibSetsApi {
  DebugGetWayshrineInfo: (this: void) => { [nodeId: number]: string } | undefined
  DebugResetSavedVariables: (this: void, noReloadInfo?: boolean, onlyNames?: boolean) => void
  DebugCompressSetItemIdsNow: (
    this: void,
    setsDataTable?: { [setId: number]: { [itemId: number]: number } },
    noReloadInfo?: boolean
  ) => void
  DebugGetAllZoneInfo: (this: void) => void
  DebugGetAllMapNames: (this: void) => void
  DebugGetAllWayshrineInfoOfCurrentMap: (this: void) => void
  DebugGetAllWayshrineNames: (this: void) => void
  DebugGetAllSetNames: (this: void, noReloadInfo?: boolean) => void
  DebugScanAllSetData: (
    this: void,
    keepUncompressedetItemIds?: boolean,
    noReloadInfo?: boolean
  ) => void
  DebugGetDungeonFinderData: (
    this: void,
    dungeonFinderIndex?: number,
    noReloadInfo?: boolean
  ) => void
  DebugGetAllAchievementCategoryNames: (
    this: void,
    achievementStartId?: number,
    achievementEndId?: number,
    noReloadInfo?: boolean,
    ingameList?: boolean
  ) => void
  DebugGetAllCollectibleDLCNames: (this: void, noReloadInfo?: boolean) => void
  DebugGetAllCollectibleNames: (this: void, noReloadInfo?: boolean) => void
  DebugShowNewSetIds: (this: void, noChatOutput?: boolean) => void
  DebugGetAllNames: (this: void, noReloadInfo?: boolean) => void
  debugBuildMixedSetNames: (this: void) => void

  GetDungeonFinderDataFromChildNodes: (
    this: void,
    treeNode: unknown,
    retTable: string[] | undefined,
    extra: unknown
  ) => number
  OpenDungeonFinder: (
    this: void,
    dungeonFinderIndex: number | undefined,
    callback: (this: void, dungeonFinderIndex?: number, noReloadInfo?: boolean) => void,
    noReloadInfo: boolean
  ) => void
}

interface LibSetsApi {
  CopyDialog: LibSetsCopyDialog
}

interface LibSetsApi {
  commandsLsp?: { [langKey: string]: LibSlashCommanderCommand }
  buildLSCSetSearchAutoComplete: (this: void) => void
}

interface LibSetsApi {
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

  GetSpecialZoneNameById: (this: void, zoneId: number, lang?: string) => string | undefined
  GetCurrentZoneName: (this: void) => LuaMultiReturn<[string | undefined, string | undefined]>
  GetAllDropZones: (this: void) => unknown
  GetAllDropLocationNames: (this: void, lang?: string) => unknown
  GetDLCInfo: (this: void, dlcId: number) => LuaMultiReturn<[string, number | undefined]>

  OpenSetItemCollectionBookForItemLink: (this: void, itemLink: string) => void
  ShowSettingsMenu: (this: void, ...args: unknown[]) => void

  RegisterCustomTooltipHook: (this: void, tooltipControlName: string, addonName: string) => boolean

  SearchUI: {
    name: string
    controlName: LuaMap<boolean, string>
    control: LuaMap<boolean, unknown>
    KeyboardVars: { minWidth: number; minHeight: number }
  }

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

interface LibSetsApi {
  GetDropMechanicTexture: (this: void, dropMechanicId: number | undefined) => string | undefined
  IsLibSetsCustomTooltipEnabled: (this: void, value?: string) => boolean
  IsLibSetsTooltipEnabled: (this: void) => void
  HookTooltipControls: (
    this: void,
    onlyAddonAdded?: boolean,
    customAddonTooltipCtrl?: unknown
  ) => void
  loadTooltipHooks: (this: void, wasInputModeChanged?: boolean) => void

  LAMsettingsPanel?: unknown

  GetZoneName: (this: void, zoneId: number | undefined, lang?: string) => string | undefined
  GetDLCName: (this: void, dlcId: number | undefined, lang?: string) => string | undefined
  GetDungeonZoneIdParentZoneId: (this: void, zoneId: number | undefined) => number | undefined
  GetPublicDungeonZoneIdParentZoneId: (this: void, zoneId: number | undefined) => number | undefined
  addUIButtons?: (this: void) => void
  addSetCollectionsSearchItemLinkContextMenuEntry?: (this: void) => void
  LCM?: unknown
}
