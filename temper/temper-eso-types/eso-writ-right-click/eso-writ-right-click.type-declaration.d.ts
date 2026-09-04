interface EsoGamepadInventoryInfo {
  dataSource?: { bagId: number; slotIndex: number }
}

interface EsoGamepadSlotActions {
  AddSlotAction: (
    this: EsoGamepadSlotActions,
    actionName: number | string,
    callback: (this: void) => void,
    keybindName: string
  ) => void
}

declare const SI_CRAFT_SEALED_WRIT: number

interface EsoStatusIconControl {
  AddIcon: (this: EsoStatusIconControl, texture: string, tint?: unknown, tooltip?: string) => void
  Show: (this: EsoStatusIconControl) => void
  ClearIcons: (this: EsoStatusIconControl) => void
}

interface EsoStatusControlSlotData {
  uniqueId?: Id64
}

interface EsoGamepadEntryControl {
  statusIndicator?: EsoStatusIconControl
}

interface EsoGamepadEntryData {
  uniqueId?: Id64
  overrideStatusIndicatorIcons?: boolean
}

declare const NO_TINT: unknown
