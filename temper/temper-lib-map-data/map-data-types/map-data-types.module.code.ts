export type GlobalObjectTable = Record<string, unknown>

export type MetatableView = { __index?: Record<string | number, unknown> } | undefined

export type UserdataView = Record<string, ((this: void, ...args: unknown[]) => unknown) | undefined>

export interface MapIndexEntry {
  mapIndex: number
  mapTexture: string
  mapId: number
  zoneIndex: number
  zoneName: string
  zoneId: number
  mapsData: Record<string | number, unknown>
}

export interface CallbackType {
  EVENT_ZONE_CHANGED: string
  EVENT_LINKED_WORLD_POSITION_CHANGED: string
  EVENT_PLAYER_ACTIVATED: string
  OnWorldMapChanged: string
  WorldMapSceneStateChange: string
}

export interface Internal {
  show_log: boolean
  loggerName: string
  logger: DebugLogger | undefined

  dm: (this: Internal, logType: string, ...args: unknown[]) => undefined

  FireCallbackEventZoneChanged: (this: Internal) => undefined
  FireCallbackWorldPositionChanged: (this: Internal) => undefined
  FireCallbackEventPlayerActivated: (this: Internal) => undefined
  FireCallbackOnWorldMapChanged: (this: Internal) => undefined
  FireCallbackWorldMapSceneStateChange: (this: Internal) => undefined

  SetWasSetMapToPlayerLocationCalledFalse: (this: Internal) => undefined
  MapTextureMapIdUpdated: (this: Internal) => boolean
  CheckSetPlayerLocationQueue: (this: Internal) => undefined
  SetUpSetPlayerLocationQueue: (this: Internal) => undefined
  UpdateMapInfo: (this: Internal) => undefined
  ContainsIndex: (
    this: Internal,
    indexTable: Record<string, number[]>,
    indexToFind: number | undefined
  ) => boolean
}

export interface Lib {
  callbackType: CallbackType
  callbackObject: ZoCallbackObjectInstance

  mapNames: Record<number, string>
  mapNamesLookup: Record<string, number[]>
  zoneNames: Record<number, string>
  zoneNamesLookup: Record<string, number>
  textureNames: Record<number, string>
  textureNamesLookup: Record<string, number[]>

  mapType: number | undefined
  zoneIndex: number | undefined
  mapIndex: number | undefined
  mapId: number | undefined
  parentZoneMapId: number | undefined
  mapTexture: string | undefined
  isMainZone: boolean | undefined
  isSubzone: boolean | undefined
  isWorld: boolean | undefined
  isCosmic: boolean | undefined
  isMacroMap: boolean | undefined
  isDungeon: boolean | undefined
  zoneName: string | undefined
  mapName: string | undefined
  subzoneName: string | undefined
  subZoneId: number | undefined
  currentFloor: number | undefined
  numFloors: number | undefined
  reticleInteractionName: string | undefined
  lastInteractionTarget: string | undefined
  questShared: boolean
  pseudoMapIndex: number | undefined
  lastMapTexture: string | undefined
  lastMapId: number | undefined
  newSubzone: boolean
  wasSetMapToPlayerLocationCalled: boolean
  setMapToPlayerLocationQueueInProgress: boolean
  onPrepareForJumpInProgress: boolean
  onAddonLoadInProgress: boolean
  SetMapToPlayerLocationQueueStart: number

  zoneId: number | undefined
  worldX: number | undefined
  worldY: number | undefined
  worldZ: number | undefined
  normalizedX: number | undefined
  normalizedY: number | undefined
  libGPSX: number | undefined
  libGPSY: number | undefined

  MAPINDEX_MIN: number
  MAPINDEX_MAX: number
  MAX_NUM_MAPIDS: number
  MAX_NUM_ZONEINDEXES: number
  MAX_NUM_ZONEIDS: number
  MAX_ATTEMPT_MAP_UPDATE_SECONDS: number

  mapIndexData: Record<number, MapIndexEntry>

  RegisterCallback: (
    this: Lib,
    callbackName: string,
    callback: (this: void, ...args: unknown[]) => void
  ) => void
  UnregisterCallback: (
    this: Lib,
    callbackName: string,
    callback: (this: void, ...args: unknown[]) => void
  ) => void
  FireCallbacks: (this: Lib, callbackName: string, ...args: unknown[]) => void
  GetMapIdByTileTexture: (this: Lib, tileTexture: string) => number[] | undefined
  GetMapIdByMapName: (this: Lib, mapName: string) => number[] | undefined
  ReturnSingleIndex: (
    this: Lib,
    indexTable: Record<number, number> | undefined
  ) => number | undefined
  GetParentMapIdFromMapId: (this: Lib, mapId: number) => number
  GetParentMapIdFromZoneId: (this: Lib, zoneId: number) => number
  GetMapTileTextureFromMapId: (this: Lib, mapId: number) => undefined
  SetMapIdFromAPI: (this: Lib) => undefined
  IsOverlandMap: (this: Lib) => boolean
}
