interface Compass {
  container: Control
}
declare const COMPASS: Compass

interface WindowManager {
  CreateControlFromVirtual<T extends Control = Control>(
    name: undefined,
    parent: Control | undefined,
    virtualName: string
  ): T
}

interface ZoControlPoolInstance {
  AcquireObject<T extends Control = Control>(
    this: ZoControlPoolInstance
  ): LuaMultiReturn<[T, number]>
  GetActiveObject<T extends Control = Control>(
    this: ZoControlPoolInstance,
    key: number
  ): T | undefined
  ReleaseObject(this: ZoControlPoolInstance, key: number): void
  ReleaseAllObjects(this: ZoControlPoolInstance): void
}

interface ZoControlPoolClass {
  Subclass<T = ZoControlPoolClass>(this: ZoControlPoolClass): T
  New<T = ZoControlPoolInstance>(
    this: void,
    self: object,
    templateName: string,
    parent: Control,
    namePrefix: string
  ): T
}
declare const ZO_ControlPool: ZoControlPoolClass

interface MapCustomPinData {
  compassPinTypeString?: string
  onToggleCallback?: (this: void, compassPinType: string, enabled: boolean) => void
  [key: string]: unknown
}

interface WorldMapPinManager {
  AddCustomPin(
    this: WorldMapPinManager,
    pinTypeString: string,
    pinTypeAddCallback: (this: void) => void
  ): void
  customPins: Record<number, MapCustomPinData | undefined>
}
