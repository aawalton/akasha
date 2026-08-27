interface ZoObjectClass {
  Subclass<T = object>(this: ZoObjectClass): T
  New<T = object>(this: void, self: object): T
}
declare const ZO_Object: ZoObjectClass

interface WorldMapManagerControl {
  UnregisterForEvent(this: WorldMapManagerControl, event: number): boolean
}

interface WorldMapManager {
  control: WorldMapManagerControl
}

declare const WORLD_MAP_MANAGER: WorldMapManager
