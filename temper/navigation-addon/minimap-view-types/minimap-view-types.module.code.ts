export interface LooseTable extends LooseMembers {
  [index: number]: LooseMember | undefined
}

export interface LooseMember extends LooseMembers {
  (this: void, ...args: unknown[]): LooseMember
  [index: number]: LooseMember | undefined
}

export interface LooseMembers {
  [key: string]: LooseMember | undefined
  Create: LooseMember
  Call: LooseMember
  Cancel: LooseMember
  StopTimer: LooseMember
  Then: LooseMember
  ThenDelay: LooseMember
  Do: LooseMember
  For: LooseMember
  While: LooseMember
  WaitUntil: LooseMember
  Delay: LooseMember
  Suspend: LooseMember
  Resume: LooseMember
  Finally: LooseMember
  OnError: LooseMember
  GetDebug: LooseMember
  SetDebug: LooseMember
  RemovePins: LooseMember
  CreatePin: LooseMember
  GetActiveObjects: LooseMember
  GetPlayerPin: LooseMember
  AddLocation: LooseMember
  ReleaseAllObjects: LooseMember
  RefreshCustomPins: LooseMember
  RefreshLocations: LooseMember
  UpdatePinsForMapSizeChange: LooseMember
  UpdateLocation: LooseMember
  UpdateSize: LooseMember
  GetPinType: LooseMember
  CreatePOIPinTag: LooseMember
  CreateWorldEventPOIPinTag: LooseMember
  CreateTravelNetworkPinTag: LooseMember
  MaskHasFlag: LooseMember
  GetCurrentNormalizedZoom: LooseMember
  SetCurrentNormalizedZoom: LooseMember
  CanInitializeMap: LooseMember
  ComputeMinZoom: LooseMember
  ComputeCurvedZoom: LooseMember
  SetMapZoomMinMax: LooseMember
  CanMapZoom: LooseMember
  Update: LooseMember
  ClearJumpToPinWhenAvailable: LooseMember
  IsInMode: LooseMember
  GetMode: LooseMember
  SetToMode: LooseMember
  PushSpecialMode: LooseMember
  PopSpecialMode: LooseMember
  SetMapByIndex: LooseMember
  SetMapHeader: LooseMember
  ClearMapHeader: LooseMember
  TryShowSpectacleMapHeader: LooseMember
  RefreshMapFrameAnchor: LooseMember
  UpdateFloorAndLevelNavigation: LooseMember
  IsPreventingMapNavigation: LooseMember
  IsShowing: LooseMember
  IsHidden: LooseMember
  AddFragment: LooseMember
  RemoveFragment: LooseMember
  GetCurrentScene: LooseMember
  RegisterCallback: LooseMember
  UnregisterCallback: LooseMember
  FireCallbacks: LooseMember
  Refresh: LooseMember
  SetConditional: LooseMember
  SetAllowShowHideTimeUpdates: LooseMember
  GetControl: LooseMember
  GetNamedChild: LooseMember
  GetParent: LooseMember
  GetHandler: LooseMember
  SetHandler: LooseMember
  GetDimensions: LooseMember
  SetDimensions: LooseMember
  GetWidth: LooseMember
  GetHeight: LooseMember
  SetWidth: LooseMember
  SetHeight: LooseMember
  GetCenter: LooseMember
  GetLeft: LooseMember
  GetRight: LooseMember
  GetTextureFileDimensions: LooseMember
  ClearAnchors: LooseMember
  SetAnchor: LooseMember
  SetHidden: LooseMember
  SetColor: LooseMember
  SetAlpha: LooseMember
  SetTexture: LooseMember
  SetTextureRotation: LooseMember
  SetCenterColor: LooseMember
  SetEdgeColor: LooseMember
  SetCenterTexture: LooseMember
  SetEdgeTexture: LooseMember
  SetInsets: LooseMember
  SetDrawLayer: LooseMember
  SetDrawLevel: LooseMember
  SetPixelRoundingEnabled: LooseMember
  SetMouseEnabled: LooseMember
  SetClampedToScreenInsets: LooseMember
  SetExcludeFromResizeToFitExtents: LooseMember
  SetDimensionConstraints: LooseMember
  SetVerticalAlignment: LooseMember
  SetFont: LooseMember
  SetText: LooseMember
  SetRotation: LooseMember
  StopMovingOrResizing: LooseMember
  CreateControl: LooseMember
  New: LooseMember
  UnpackRGB: LooseMember
  SetRGB: LooseMember
  GetFontInfo: LooseMember
  AddMessage: LooseMember
}

export type AsyncCallback = (this: void, ...args: unknown[]) => unknown

export interface AnyAsyncTask {
  Call: (...args: unknown[]) => AnyAsyncTask
  Then: (...args: unknown[]) => AnyAsyncTask
  Finally: (...args: unknown[]) => AnyAsyncTask
  For: (...args: unknown[]) => AnyAsyncTask
  Do: (...args: unknown[]) => AnyAsyncTask
  While: (...args: unknown[]) => AnyAsyncTask
  WaitUntil: (...args: unknown[]) => AnyAsyncTask
  Cancel: (...args: unknown[]) => AnyAsyncTask
  StopTimer: (...args: unknown[]) => AnyAsyncTask
  OnError: (...args: unknown[]) => AnyAsyncTask
  Delay: (...args: unknown[]) => AnyAsyncTask
  ThenDelay: (...args: unknown[]) => AnyAsyncTask
  Suspend: (...args: unknown[]) => AnyAsyncTask
  Resume: (...args: unknown[]) => AnyAsyncTask
  [key: string]: unknown
}

export interface MapScene {
  IsShowing: () => boolean
}

export interface ColorDef extends ZoColorDef {
  SetAlpha: (alpha: number) => undefined
}

export interface CenterScreenAnnounce {
  AddMessage: (...args: unknown[]) => undefined
}

export interface MiniMapControl extends Control {
  GetTextureFileDimensions: () => LuaMultiReturn<[number, number]>
  SetText: (text: string | number) => undefined
  SetFont: (font: string) => undefined
  SetColor: (r: number, g: number, b: number, a?: number) => undefined
  SetCenterColor: (r: number, g: number, b: number, a?: number) => undefined
  SetEdgeColor: (r: number, g: number, b: number, a?: number) => undefined
  SetCenterTexture: (textureFile: string) => undefined
  SetEdgeTexture: (
    texture: string | undefined,
    width: number,
    height: number,
    padding?: number
  ) => undefined
  SetInsets: (
    left: number,
    right: number,
    top: number,
    bottom: number,
    surfaceIndex?: number
  ) => undefined
  SetTextureRotation: (radians: number, centerX?: number, centerY?: number) => undefined
  SetPixelRoundingEnabled: (enabled: boolean) => undefined
  SetVerticalAlignment: (alignment: number) => undefined
  StopMovingOrResizing: () => undefined
}

export interface MiniMapPin {
  GetControl: () => MiniMapControl
  GetPinType: () => number
  UpdateSize: () => undefined
  UpdateLocation: () => undefined
}

export interface MiniMapPinManager {
  GetActiveObjects: () => LooseTable
  ReleaseAllObjects: () => undefined
  GetPlayerPin: () => LooseTable
  CreatePin: (...args: unknown[]) => undefined
  RemovePins: (...args: unknown[]) => undefined
  AddLocation: (index: number) => undefined
}

export interface MiniMapScene {
  IsShowing: () => boolean
  IsHidden: () => boolean
  SetAllowShowHideTimeUpdates: (allow: boolean) => undefined
  SetConditional: (conditionalFunction: (this: void) => boolean) => undefined
  Refresh: () => undefined
  RegisterCallback: (
    event: string,
    callback: (this: void, ...args: never[]) => undefined
  ) => undefined
  UnregisterCallback: (
    event: string,
    callback?: (this: void, ...args: never[]) => undefined
  ) => undefined
}

export interface MiniMapPanAndZoom {
  GetCurrentNormalizedZoom: () => number
  SetCurrentNormalizedZoom: (zoom: number) => undefined
  ClearJumpToPinWhenAvailable: () => undefined
  CanInitializeMap: () => boolean
  SetMapZoomMinMax: (minZoom: number, maxZoom: number) => undefined
  ComputeMinZoom: () => number
  ComputeCurvedZoom: (targetNormalizedZoom: number) => number
}

export interface MiniMapCallbackManager {
  RegisterCallback: (...args: unknown[]) => undefined
  UnregisterCallback: (...args: unknown[]) => undefined
}
