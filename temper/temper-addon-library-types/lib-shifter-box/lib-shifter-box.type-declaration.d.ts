interface ShifterBox {
  ClearLeftList: (this: ShifterBox) => undefined
  ClearRightList: (this: ShifterBox) => undefined
  AddEntriesToLeftList: (this: ShifterBox, entries: Record<string | number, unknown>) => undefined
  AddEntriesToRightList: (this: ShifterBox, entries: Record<string | number, unknown>) => undefined
  GetLeftListEntriesFull: (this: ShifterBox) => Record<string | number, unknown>
  GetRightListEntriesFull: (this: ShifterBox) => Record<string | number, unknown>
  SetDimensions: (this: ShifterBox, width: number, height: number) => undefined
  SetAnchor: (
    this: ShifterBox,
    anchorPoint: number,
    relativeTo: unknown,
    relativePoint: number,
    offsetX: number,
    offsetY: number
  ) => undefined
  SetHidden: (this: ShifterBox, hidden: boolean) => undefined
  SetEnabled: (this: ShifterBox, enabled: boolean) => undefined
  RegisterCallback: (
    this: ShifterBox,
    eventId: number,
    callback: (this: void, ...args: unknown[]) => undefined
  ) => undefined
}

interface LibShifterBoxCustomSettings {
  callbackRegister?: Record<number, (this: void, ...args: unknown[]) => unknown>
  leftList?: Record<string, unknown>
  rightList?: Record<string, unknown>
  [key: string]: unknown
}

interface LibShifterBoxStatic {
  (
    this: void,
    addonName: string,
    uniqueAddonName: string,
    parentControl: unknown,
    customSettings?: LibShifterBoxCustomSettings
  ): ShifterBox
  EVENT_LEFT_LIST_CREATED: number
  EVENT_RIGHT_LIST_CREATED: number
  EVENT_LEFT_LIST_ROW_ON_MOUSE_ENTER: number
  EVENT_LEFT_LIST_ROW_ON_MOUSE_EXIT: number
  EVENT_LEFT_LIST_ROW_ON_DRAG_START: number
  EVENT_RIGHT_LIST_ROW_ON_DRAG_END: number
  EVENT_ENTRY_MOVED: number
  EVENT_ENTRY_HIGHLIGHTED: number
}

declare const LibShifterBox: LibShifterBoxStatic

declare const LIBSHIFTERBOX_ALLREADY_LOADED: number
declare const LIBSHIFTERBOX_EMPTY: number
declare const LIBSHIFTERBOX_DRAG_MULTIPLE: number

declare let LSB_Debug: LuaTable<AnyNotNil, Record<string, unknown>> | undefined
