interface ShifterBox {
  ClearLeftList: (this: ShifterBox) => void
  ClearRightList: (this: ShifterBox) => void
  AddEntriesToLeftList: (this: ShifterBox, entries: Record<string | number, unknown>) => void
  AddEntriesToRightList: (this: ShifterBox, entries: Record<string | number, unknown>) => void
  GetLeftListEntriesFull: (this: ShifterBox) => Record<string | number, unknown>
  GetRightListEntriesFull: (this: ShifterBox) => Record<string | number, unknown>
  SetDimensions: (this: ShifterBox, width: number, height: number) => void
  SetAnchor: (
    this: ShifterBox,
    anchorPoint: number,
    relativeTo: unknown,
    relativePoint: number,
    offsetX: number,
    offsetY: number
  ) => void
  SetHidden: (this: ShifterBox, hidden: boolean) => void
  SetEnabled: (this: ShifterBox, enabled: boolean) => void
  RegisterCallback: (
    this: ShifterBox,
    eventId: number,
    callback: (this: void, ...args: unknown[]) => void
  ) => void
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
