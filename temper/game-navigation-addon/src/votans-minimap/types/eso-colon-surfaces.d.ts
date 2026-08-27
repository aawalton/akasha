interface MiniMapControl {
  SetTexture(textureFile: string): void
  SetPixelRoundingEnabled(enabled: boolean): void
  GetParent(): MiniMapControl
  GetRight(): number
}

interface MiniMapPinManager {
  GetActiveObjects(): AnyTable
  ReleaseAllObjects(): void
  GetPlayerPin(): AnyTable
  CreatePin(...args: unknown[]): void
  RemovePins(...args: unknown[]): void
  AddLocation(index: number): void
}

interface MiniMapScene {
  IsShowing(): boolean
  IsHidden(): boolean
  SetAllowShowHideTimeUpdates(allow: boolean): void
  SetConditional(conditionalFunction: (this: void) => boolean): void
  Refresh(): void
  RegisterCallback(event: string, callback: (this: void, ...args: never[]) => void): void
  UnregisterCallback(event: string, callback?: (this: void, ...args: never[]) => void): void
}

interface MiniMapPin {
  GetPinType(): number
  UpdateSize(): void
  UpdateLocation(): void
}

interface MiniMapPanAndZoom {
  GetCurrentNormalizedZoom(): number
  SetCurrentNormalizedZoom(zoom: number): void
  ClearJumpToPinWhenAvailable(): void
  CanInitializeMap(): boolean
  SetMapZoomMinMax(minZoom: number, maxZoom: number): void
  ComputeMinZoom(): number
  ComputeCurvedZoom(targetNormalizedZoom: number): number
}

interface MiniMapCallbackManager {
  RegisterCallback(...args: unknown[]): void
  UnregisterCallback(...args: unknown[]): void
}

interface CenterScreenAnnounce {
  AddMessage(...args: unknown[]): void
}
