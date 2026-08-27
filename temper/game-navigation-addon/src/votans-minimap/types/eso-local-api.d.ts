interface AnyTable extends AnyTableMembers {
  [index: number]: AnyTableMember | undefined
}
interface AnyTableMember extends AnyTableMembers {
  (this: void, ...args: unknown[]): AnyTableMember
  [index: number]: AnyTableMember | undefined
}
interface AnyTableMembers {
  [key: string]: AnyTableMember | undefined
  Create: AnyTableMember
  Call: AnyTableMember
  Cancel: AnyTableMember
  StopTimer: AnyTableMember
  Then: AnyTableMember
  ThenDelay: AnyTableMember
  Do: AnyTableMember
  For: AnyTableMember
  While: AnyTableMember
  WaitUntil: AnyTableMember
  Delay: AnyTableMember
  Suspend: AnyTableMember
  Resume: AnyTableMember
  Finally: AnyTableMember
  OnError: AnyTableMember
  GetDebug: AnyTableMember
  SetDebug: AnyTableMember
  RemovePins: AnyTableMember
  CreatePin: AnyTableMember
  GetActiveObjects: AnyTableMember
  GetPlayerPin: AnyTableMember
  AddLocation: AnyTableMember
  ReleaseAllObjects: AnyTableMember
  RefreshCustomPins: AnyTableMember
  RefreshLocations: AnyTableMember
  UpdatePinsForMapSizeChange: AnyTableMember
  UpdateLocation: AnyTableMember
  UpdateSize: AnyTableMember
  GetPinType: AnyTableMember
  CreatePOIPinTag: AnyTableMember
  CreateWorldEventPOIPinTag: AnyTableMember
  CreateTravelNetworkPinTag: AnyTableMember
  MaskHasFlag: AnyTableMember
  GetCurrentNormalizedZoom: AnyTableMember
  SetCurrentNormalizedZoom: AnyTableMember
  CanInitializeMap: AnyTableMember
  ComputeMinZoom: AnyTableMember
  ComputeCurvedZoom: AnyTableMember
  SetMapZoomMinMax: AnyTableMember
  CanMapZoom: AnyTableMember
  Update: AnyTableMember
  ClearJumpToPinWhenAvailable: AnyTableMember
  IsInMode: AnyTableMember
  GetMode: AnyTableMember
  SetToMode: AnyTableMember
  PushSpecialMode: AnyTableMember
  PopSpecialMode: AnyTableMember
  SetMapByIndex: AnyTableMember
  SetMapHeader: AnyTableMember
  ClearMapHeader: AnyTableMember
  TryShowSpectacleMapHeader: AnyTableMember
  RefreshMapFrameAnchor: AnyTableMember
  UpdateFloorAndLevelNavigation: AnyTableMember
  IsPreventingMapNavigation: AnyTableMember
  IsShowing: AnyTableMember
  IsHidden: AnyTableMember
  AddFragment: AnyTableMember
  RemoveFragment: AnyTableMember
  GetCurrentScene: AnyTableMember
  RegisterCallback: AnyTableMember
  UnregisterCallback: AnyTableMember
  FireCallbacks: AnyTableMember
  Refresh: AnyTableMember
  SetConditional: AnyTableMember
  SetAllowShowHideTimeUpdates: AnyTableMember
  GetControl: AnyTableMember
  GetNamedChild: AnyTableMember
  GetParent: AnyTableMember
  GetHandler: AnyTableMember
  SetHandler: AnyTableMember
  GetDimensions: AnyTableMember
  SetDimensions: AnyTableMember
  GetWidth: AnyTableMember
  GetHeight: AnyTableMember
  SetWidth: AnyTableMember
  SetHeight: AnyTableMember
  GetCenter: AnyTableMember
  GetLeft: AnyTableMember
  GetRight: AnyTableMember
  GetTextureFileDimensions: AnyTableMember
  ClearAnchors: AnyTableMember
  SetAnchor: AnyTableMember
  SetHidden: AnyTableMember
  SetColor: AnyTableMember
  SetAlpha: AnyTableMember
  SetTexture: AnyTableMember
  SetTextureRotation: AnyTableMember
  SetCenterColor: AnyTableMember
  SetEdgeColor: AnyTableMember
  SetCenterTexture: AnyTableMember
  SetEdgeTexture: AnyTableMember
  SetInsets: AnyTableMember
  SetDrawLayer: AnyTableMember
  SetDrawLevel: AnyTableMember
  SetPixelRoundingEnabled: AnyTableMember
  SetMouseEnabled: AnyTableMember
  SetClampedToScreenInsets: AnyTableMember
  SetExcludeFromResizeToFitExtents: AnyTableMember
  SetDimensionConstraints: AnyTableMember
  SetVerticalAlignment: AnyTableMember
  SetFont: AnyTableMember
  SetText: AnyTableMember
  SetRotation: AnyTableMember
  StopMovingOrResizing: AnyTableMember
  CreateControl: AnyTableMember
  New: AnyTableMember
  UnpackRGB: AnyTableMember
  SetRGB: AnyTableMember
  GetFontInfo: AnyTableMember
  AddMessage: AnyTableMember
}

interface WorldMapManager {
  IsInMode(mode: number): boolean
  GetMode(): number
  SetToMode(mode: number): void
  SetMapHeader(headerInfo: unknown): void
  ClearMapHeader(): void
  PopSpecialMode(): void
  IsPreventingMapNavigation(): boolean
  UpdateFloorAndLevelNavigation(): void
  inSpecialMode?: boolean
  SetMapByIndex: AnyTableMember
  [key: string]: unknown
}
declare const WORLD_MAP_MANAGER: WorldMapManager
declare const ZO_WorldMapPins_Manager: AnyTable
declare const ZO_MapLocationPins_Manager: AnyTable | undefined
declare const ZO_FlagHelpers: AnyTable
declare const ZO_WorldMapManager: AnyTable

interface MapScene {
  IsShowing(): boolean
}

interface ColorDef extends ZoColorDef {
  SetAlpha(alpha: number): void
}

declare const GAMEPAD_WORLD_MAP_SCENE: AnyTable
declare const SCRYING_SCENE: AnyTable
declare const SIEGE_BAR_SCENE: AnyTable
declare const SIEGE_BAR_UI_SCENE: AnyTable
declare const LOOT_SCENE: AnyTable
declare const WORLD_MAP_FRAGMENT: AnyTable
declare const MOUSE_UI_MODE_FRAGMENT: AnyTable
declare const FOCUSED_QUEST_TRACKER: AnyTable
declare const GAMEPAD_WORLD_MAP_TOOLTIP_FRAGMENT: AnyTable
declare const GAMEPAD_WORLD_MAP_INFO_FRAGMENT: AnyTable

interface MiniMapControl extends AnyTable {
  GetName(): string
  GetWidth(): number
  GetHeight(): number
  GetDimensions(): LuaMultiReturn<[number, number]>
  GetCenter(): LuaMultiReturn<[number, number]>
  GetTextureFileDimensions(): LuaMultiReturn<[number, number]>
  GetFontInfo(): LuaMultiReturn<[string, number, string]>
  GetHandler(event: string): ((this: void, ...args: unknown[]) => unknown) | undefined
  SetHandler(event: string, handler: ((this: void, ...args: unknown[]) => void) | undefined): void
  GetNamedChild(suffix: string): MiniMapControl
  IsHidden(): boolean
  SetHidden(hidden: boolean): void
  SetAlpha(alpha: number): void
  SetWidth(width: number): void
  SetHeight(height: number): void
  SetDimensions(width: number, height: number): void
  SetDimensionConstraints(
    minWidth: number,
    minHeight: number,
    maxWidth: number,
    maxHeight: number
  ): void
  SetClampedToScreenInsets(left: number, top: number, right: number, bottom: number): void
  SetExcludeFromResizeToFitExtents(exclude: boolean): void
  SetVerticalAlignment(alignment: number): void
  ClearAnchors(): void
  SetAnchor(
    point: number,
    relativeTo?: unknown,
    relativePoint?: number,
    offsetX?: number,
    offsetY?: number
  ): void
  SetMouseEnabled(enabled: boolean): void
  SetText(text: string | number): void
  SetFont(font: string): void
  SetColor(r: number, g: number, b: number, a?: number): void
  SetCenterColor(r: number, g: number, b: number, a?: number): void
  SetEdgeColor(r: number, g: number, b: number, a?: number): void
  SetCenterTexture(textureFile: string): void
  SetEdgeTexture(texture: string | undefined, width: number, height: number, padding?: number): void
  SetInsets(left: number, right: number, top: number, bottom: number, surfaceIndex?: number): void
  SetDrawLayer(layer: number): void
  SetDrawLevel(level: number): void
  SetTextureRotation(radians: number, centerX?: number, centerY?: number): void
  StopMovingOrResizing(): void
}

declare const ZO_WorldMap: MiniMapControl
declare const ZO_WorldMapContainer: MiniMapControl
declare const ZO_WorldMapContainer1: MiniMapControl | undefined
declare const ZO_WorldMapScroll: MiniMapControl
declare const ZO_WorldMapButtons: MiniMapControl
declare const ZO_WorldMapButtonsBG: MiniMapControl
declare const ZO_WorldMapTitleBar: MiniMapControl
declare const ZO_WorldMapTitleBarBG: MiniMapControl
declare const ZO_WorldMapTitle: MiniMapControl
declare const ZO_WorldMapMapFrame: MiniMapControl
declare const ZO_WorldMapButtonsFloors_Keyboard: MiniMapControl
declare const ZO_WorldMapButtonsFloors_Gamepad: MiniMapControl
declare const ZO_WorldMapButtonsLevels_Gamepad: MiniMapControl
declare const ZO_KeybindStripGamepadBackgroundTexture: MiniMapControl
declare const ZO_CompassCenterOverPinLabel: MiniMapControl
declare const ZO_CompassContainer: MiniMapControl
declare const ZO_CompassFrameLeft: MiniMapControl
declare const ZO_CompassFrameCenter: MiniMapControl
declare const ZO_CompassFrameRight: MiniMapControl
declare let VOTAN_MINIMAP_FONT: MiniMapControl

declare let ZO_WorldMap_UpdateMap: (this: void, ...args: unknown[]) => unknown
declare let ZO_WorldMap_GetMapDimensions: (this: void) => LuaMultiReturn<[number, number]>
declare let ZO_WorldMap_GetMapTitle: (this: void, ...args: unknown[]) => unknown
declare let ZO_WorldMap_MouseDown: (this: void, ...args: unknown[]) => unknown
declare let ZO_WorldMap_OnResizeStop: (this: void, ...args: unknown[]) => unknown
declare let ZO_WorldMapTitleBar_OnMouseUp: (this: void, ...args: unknown[]) => unknown
declare let ZO_WorldMap_RefreshAllPOIs: (this: void, ...args: unknown[]) => unknown
declare let ZO_WorldMap_RefreshWayshrines: (this: void, ...args: unknown[]) => unknown
declare let ZO_WorldMap_PanToWayshrine: (this: void, nodeIndex: number) => unknown
declare function ZO_WorldMap_OnResizeStart(this: void, ...args: unknown[]): unknown
declare function ZO_WorldMap_JumpToPlayer(this: void, ...args: unknown[]): unknown
declare function ZO_WorldMap_PanToPlayer(this: void, ...args: unknown[]): unknown
declare function ZO_WorldMap_ClearCustomZoomLevels(this: void, ...args: unknown[]): unknown
declare function ZO_WorldMap_OnHide(this: void, ...args: unknown[]): unknown
declare function ZO_WorldMap_HandlePinExit(this: void, ...args: unknown[]): unknown
declare function ZO_WorldMap_MouseUp(this: void, ...args: unknown[]): unknown
declare function ZO_WorldMap_RemovePlayerWaypoint(this: void, ...args: unknown[]): unknown
declare function ZO_WorldMap_IsPinGroupShown(this: void, filter: unknown): boolean
declare function ZO_WorldMap_IsNormalizedPointInsideMapBounds(
  this: void,
  x: number,
  y: number
): boolean
declare function ZO_WorldMap_InteractKeybindForceHidden(this: void, hidden: boolean): void
declare function ZO_WorldMap_GetMapDungeonDifficulty(this: void): number
declare function ZO_WorldMapTitleBar_OnDragStart(this: void, ...args: unknown[]): unknown
declare function ZO_GetPlatformTemplate(this: void, name: string): string
declare function ZO_AlertText_GetHandlers(this: void): AnyTable

declare function GetUIGlobalScale(this: void): number
declare function ZO_Map_GetFastTravelNode(this: void): number
declare function NormalizeMousePositionToControl(
  this: void,
  control: unknown
): LuaMultiReturn<[number, number]>
declare function NormalizePointToControl(
  this: void,
  x: number,
  y: number,
  control: unknown
): LuaMultiReturn<[number, number]>
declare function CreateFont(this: void, name: string, definition: string): MiniMapControl
declare function CreateControl(
  this: void,
  name: string,
  parent: unknown,
  controlType: unknown
): AnyTable

interface MiniMapWindowManager {
  CreateControl(name: string, parent: unknown, controlType: unknown): MiniMapControl
}
declare function GetWindowManager(this: void): MiniMapWindowManager
interface MiniMapPin {
  GetControl(): MiniMapControl
}
declare function MouseIsOver(this: void, control: unknown): boolean
declare function zo_plainstrfind(this: void, str: string, find: string): boolean
declare function zo_distance3D(
  this: void,
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number
): number
declare function zo_clamp(this: void, value: number, min: number, max: number): number

declare let ZO_WorldMap_ShowWorldMap: (this: void, ...args: unknown[]) => unknown
declare const CENTER_SCREEN_ANNOUNCE: CenterScreenAnnounce
