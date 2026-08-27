interface ZoObjectSubclass {
  [key: string]: unknown
}
interface ZoObjectClass {
  Subclass<T extends ZoObjectSubclass = ZoObjectSubclass>(): T
  New: <T = object>(this: void, self: object) => T
}
declare const ZO_Object: ZoObjectClass

declare function ZO_ScrollList_AddCategory(listControl: object, categoryId: unknown): void
declare function ZO_ScrollList_ShowCategory(listControl: object, categoryId: unknown): void
declare function ZO_ScrollList_HideCategory(listControl: object, categoryId: unknown): void

declare function ZO_ScrollList_GetData(rowControl: Control): unknown

declare function ZO_ScrollList_CreateDataEntry(
  typeId: number,
  data: object,
  categoryId: unknown
): object

declare function ZO_ScrollList_GetDataControl(
  listControl: object,
  data: unknown
): Control | undefined

declare function ZO_ScrollList_ScrollRelative(
  listControl: object,
  value: number,
  onScrollCompleteCallback?: unknown,
  instant?: boolean
): void

declare function ZO_ScrollList_EnableSelection(
  listControl: object,
  highlightTemplate: string,
  selectionCallback: (this: void, ...args: unknown[]) => void
): void

declare function ZO_ScrollList_AddDataType(
  listControl: object,
  typeId: number,
  templateName: string,
  height: number,
  setupCallback: (this: void, ...args: never[]) => void,
  hideCallback?: ((this: void, ...args: never[]) => void) | undefined,
  dataTypeSelectSound?: string | undefined,
  resetControlCallback?: ((this: void, ...args: never[]) => void) | undefined
): void

declare function ZO_SortHeader_OnMouseExit(headerControl: Control): void

interface ZoSortHeaderGroup {
  headerContainer: Control
  SetEnabled(enabled: boolean): void
}

declare function moc(): Control | undefined

declare const GuiMouse: Control

declare const ZoFontGame: object

declare function GetStringWidthScaledPixels(font: object, text: string, fontScale: number): number

declare const ZO_SCROLL_BAR_WIDTH: number

interface AnimationTimeline {
  PlayForward(): void
  PlayBackward(): void
  PlayInstantlyToStart(): void
  PlayInstantlyToEnd(): void
}
interface AnimationManager {
  CreateTimelineFromVirtual(this: void, timelineName: string, control: Control): AnimationTimeline
}
declare const ANIMATION_MANAGER: AnimationManager

declare const SI_SEARCH_FILTER_BY: number
declare const SI_COLOR_PICKER_CURRENT: number

declare const LIBSHIFTERBOX_ALLREADY_LOADED: number
declare const LIBSHIFTERBOX_EMPTY: number
declare const LIBSHIFTERBOX_DRAG_MULTIPLE: number

declare const LibAddonMenu2: object | undefined

interface Control {
  GetDesiredWidth(): number
  WasTruncated(): boolean
  SetAnchor(...args: unknown[]): void
}

declare let LSB_Debug: LuaTable<AnyNotNil, Record<string, unknown>> | undefined
