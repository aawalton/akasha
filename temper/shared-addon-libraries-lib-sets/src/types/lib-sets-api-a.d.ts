interface LibSetsLib {
  openMapOfZoneId: (
    this: void,
    zoneId: number | undefined,
    isParentZoneId?: boolean
  ) => boolean | undefined
  showWayshrineNodeIdOnMap: (this: void, wayshrineNodeId: number | undefined) => boolean | undefined

  IsCraftedSet: (this: void, setId: number | undefined) => boolean | undefined
  IsMonsterSet: (this: void, setId: number | undefined) => boolean | undefined
  IsDungeonSet: (this: void, setId: number | undefined) => boolean | undefined
  IsTrialSet: (
    this: void,
    setId: number | undefined
  ) => LuaMultiReturn<[boolean | undefined, boolean | undefined]>
  IsArenaSet: (this: void, setId: number | undefined) => boolean | undefined
  IsOverlandSet: (this: void, setId: number | undefined) => boolean | undefined
  IsCyrodiilSet: (this: void, setId: number | undefined) => boolean | undefined
  IsBattlegroundSet: (this: void, setId: number | undefined) => boolean | undefined
  IsImperialCitySet: (this: void, setId: number | undefined) => boolean | undefined
  IsSpecialSet: (this: void, setId: number | undefined) => boolean | undefined
  IsDailyRandomDungeonAndImperialCityRewardSet: (
    this: void,
    setId: number | undefined
  ) => boolean | undefined
  IsMythicSet: (this: void, setId: number | undefined) => boolean | undefined
  IsClassSet: (this: void, setId: number | undefined, classId?: number) => boolean | undefined

  IsDungeonZoneId: (this: void, zoneId: number | undefined) => boolean | undefined
  IsDungeonZoneIdTrial: (this: void, zoneId: number | undefined) => boolean | undefined
}

declare function ZO_WorldMap_SetMapByIndex(this: void, mapIndex: number): void
declare function ZO_WorldMap_PanToWayshrine(this: void, wayshrineNodeId: number): void
