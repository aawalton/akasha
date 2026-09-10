interface Control {
  SetClampedToScreenInsets: (left: number, top: number, right: number, bottom: number) => void
}

declare const CreateFont: (this: void, name: string, definition: string) => FontObject

declare const GetWindowManager: (this: void) => WindowManager

declare const MouseIsOver: (this: void, control: Control) => boolean

declare const NormalizeMousePositionToControl: (
  this: void,
  control: Control
) => LuaMultiReturn<[x: number, y: number]>

declare const NormalizePointToControl: (
  this: void,
  x: number,
  y: number,
  control: Control
) => LuaMultiReturn<[x: number, y: number]>

declare const zo_distance3D: (
  this: void,
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number
) => number

declare const ZO_GetPlatformTemplate: (this: void, name: string) => string

declare const ZO_Map_GetFastTravelNode: (this: void) => number

interface WorldMapManagerControl {
  UnregisterForEvent: (this: WorldMapManagerControl, event: number) => boolean
}

interface WorldMapManager {
  control: WorldMapManagerControl
  IsInMode: (this: WorldMapManager, mode: number) => boolean
  GetMode: (this: WorldMapManager) => number
  SetToMode: (this: WorldMapManager, mode: number) => void
  SetMapHeader: (this: WorldMapManager, headerInfo: unknown) => void
  ClearMapHeader: (this: WorldMapManager) => void
  PopSpecialMode: (this: WorldMapManager) => void
  IsPreventingMapNavigation: (this: WorldMapManager) => boolean
  UpdateFloorAndLevelNavigation: (this: WorldMapManager) => void
  inSpecialMode?: boolean
}

declare const WORLD_MAP_MANAGER: WorldMapManager

declare const ZO_WorldMapManager: WorldMapManager

declare const ZO_WorldMapPins_Manager: WorldMapPinManager

interface MapLocationPinsManager {
  RefreshLocations: (this: MapLocationPinsManager) => void
  AddLocation: (this: MapLocationPinsManager, locationIndex: number) => void
}

declare const ZO_MapLocationPins_Manager: MapLocationPinsManager | undefined

declare const ZO_FlagHelpers: {
  MaskHasFlag: (this: void, mask: number, flag: number) => boolean
}

interface TextureControl {
  GetTextureFileDimensions: () => LuaMultiReturn<[pixelWidth: number, pixelHeight: number]>
}

interface WorldMapCustomPinData {
  compassPinTypeString?: string
  onToggleCallback?: (this: void, compassPinType: string, enabled: boolean) => void
  [key: string]: unknown
}

interface WorldMapPinManager {
  AddCustomPin: (
    this: WorldMapPinManager,
    pinTypeString: string,
    pinTypeAddCallback: (this: void) => void
  ) => void
  customPins: Record<number, WorldMapCustomPinData | undefined>
}

interface FadeSceneFragment extends SceneFragment {
  control: Control
}

declare const ZO_WorldMapScroll: Control
declare const ZO_WorldMapContainer1: TextureControl | undefined
declare const ZO_WorldMapButtons: Control
declare const ZO_WorldMapButtonsBG: TextureControl
declare const ZO_WorldMapTitleBar: Control
declare const ZO_WorldMapTitleBarBG: TextureControl
declare const ZO_WorldMapTitle: LabelControl
declare const ZO_WorldMapMapFrame: BackdropControl
declare const ZO_WorldMapButtonsFloors_Keyboard: Control
declare const ZO_WorldMapButtonsFloors_Gamepad: Control
declare const ZO_WorldMapButtonsLevels_Gamepad: Control
declare const ZO_KeybindStripGamepadBackgroundTexture: Control
declare const ZO_CompassCenterOverPinLabel: Control
declare const ZO_CompassContainer: Control
declare const ZO_CompassFrameLeft: Control
declare const ZO_CompassFrameCenter: Control
declare const ZO_CompassFrameRight: Control

declare let ZO_WorldMap_UpdateMap: (this: void, ...args: unknown[]) => unknown
declare let ZO_WorldMap_GetMapDimensions: (
  this: void
) => LuaMultiReturn<[width: number, height: number]>
declare let ZO_WorldMap_GetMapTitle: (this: void, ...args: unknown[]) => unknown
declare let ZO_WorldMap_MouseDown: (this: void, ...args: unknown[]) => unknown
declare let ZO_WorldMap_OnResizeStop: (this: void, ...args: unknown[]) => unknown
declare let ZO_WorldMapTitleBar_OnMouseUp: (this: void, ...args: unknown[]) => unknown
declare let ZO_WorldMap_RefreshAllPOIs: (this: void, ...args: unknown[]) => unknown
declare let ZO_WorldMap_RefreshWayshrines: (this: void, ...args: unknown[]) => unknown

declare const ZO_WorldMap_OnResizeStart: (this: void, ...args: unknown[]) => unknown
declare const ZO_WorldMap_JumpToPlayer: (this: void, ...args: unknown[]) => unknown
declare const ZO_WorldMap_PanToPlayer: (this: void, ...args: unknown[]) => unknown
declare const ZO_WorldMap_ClearCustomZoomLevels: (this: void, ...args: unknown[]) => unknown
declare const ZO_WorldMap_OnHide: (this: void, ...args: unknown[]) => unknown
declare const ZO_WorldMap_HandlePinExit: (this: void, ...args: unknown[]) => unknown
declare const ZO_WorldMap_RemovePlayerWaypoint: (this: void, ...args: unknown[]) => unknown
declare const ZO_WorldMap_IsNormalizedPointInsideMapBounds: (
  this: void,
  x: number,
  y: number
) => boolean
declare const ZO_WorldMap_InteractKeybindForceHidden: (this: void, hidden: boolean) => void
declare const ZO_WorldMapTitleBar_OnDragStart: (this: void, ...args: unknown[]) => unknown

declare const WORLD_MAP_FRAGMENT: FadeSceneFragment
declare const MOUSE_UI_MODE_FRAGMENT: SceneFragment
declare const GAMEPAD_WORLD_MAP_TOOLTIP_FRAGMENT: FadeSceneFragment
declare const GAMEPAD_WORLD_MAP_INFO_FRAGMENT: FadeSceneFragment
declare const LOOT_SCENE: Scene
declare const SCRYING_SCENE: Scene
declare const SIEGE_BAR_SCENE: Scene
declare const SIEGE_BAR_UI_SCENE: Scene

declare const MAP_MODE_SMALL_CUSTOM: number
declare const MAP_MODE_LARGE_CUSTOM: number
declare const MAP_MODE_KEEP_TRAVEL: number
declare const MAP_MODE_FAST_TRAVEL: number

declare const SI_BATTLEGROUND_YOU: number
declare const SI_FURNITURETHEMETYPE1: number
declare const SI_GROUP_LEADER_TOOLTIP: number
declare const SI_MAPFILTER1: number
declare const SI_MAPFILTER2: number
declare const SI_MAPFILTER3: number
declare const SI_MAPFILTER4: number
declare const SI_MAPFILTER9: number
declare const SI_MAP_INFO_MODE_LOCATIONS: number
declare const SI_TOOLTIP_FORWARD_CAMP: number
declare const SI_TOOLTIP_UNIT_MAP_PLAYER_WAYPOINT: number
declare const SI_WINDOW_TITLE_WORLD_MAP_WITH_CAMPAIGN_NAME: number
declare const SI_WINDOW_TITLE_WORLD_MAP_WITH_DUNGEON_DIFFICULTY: number
