interface ZoObjectClass {
  Subclass<T = object>(this: ZoObjectClass): T
  New<T = object>(this: void, self: object): T
}
declare const ZO_Object: ZoObjectClass

interface ZoAnchorInstance {
  SetFromControlAnchor(this: ZoAnchorInstance, control: object, anchorIndex?: number): void
  GetOffsetX(this: ZoAnchorInstance): number
  GetOffsetY(this: ZoAnchorInstance): number
}

interface ZoAnchorClass {
  New(this: ZoAnchorClass): ZoAnchorInstance
}

declare const ZO_Anchor: ZoAnchorClass

declare const ZO_WorldMapContainer: object

declare function ZO_WorldMap_SetMapByIndex(this: void, mapIndex?: number): unknown

interface WorldMapPanAndZoom {
  SetCurrentNormalizedZoom(this: WorldMapPanAndZoom, zoom: number): unknown
  GetCurrentNormalizedZoom(this: WorldMapPanAndZoom): number
  SetCurrentOffset(this: WorldMapPanAndZoom, offsetX: number, offsetY: number): unknown
}

declare function zo_strsplit(this: void, separator: string, str: string): LuaMultiReturn<string[]>
