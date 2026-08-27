interface LibSetsLib {
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

declare function ZO_WorldMap_ShowWorldMap(this: void): void
declare function ZO_WorldMap_IsPinGroupShown(this: void, mapFilterType: number): boolean
declare function ZO_WorldMap_MouseUp(
  this: void,
  control: unknown,
  mouseButton: number,
  upInside: boolean
): void

interface LibSetsDebugLibZone {
  GetAllZoneData?: (this: LibSetsDebugLibZone) => { [lang: string]: { [zoneId: number]: string } }
  givenZoneData?: { [lang: string]: { [zoneId: number]: string } }
}
