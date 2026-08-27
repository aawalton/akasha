declare const ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT: number
declare const ZO_COMBO_BOX_ENTRY_TEMPLATE_LABEL_PADDING: number
declare const ZO_SCROLL_BAR_WIDTH: number
declare const ZO_SCROLLABLE_COMBO_BOX_LIST_PADDING_Y: number
declare const MAX_TEXT_CHAT_INPUT_CHARACTERS: number
declare const DONT_ANIMATE_INSTANTLY: number
declare const MENU_TYPE_DEFAULT: number
declare const ZO_REMOTE_SCENE_CHANGE_ORIGIN: number
declare const ZO_COMBOBOX_SUPPRESS_UPDATE: number

declare const ZO_KEYBOARD_NEW_ICON: string
declare const ZO_GAMEPAD_UNSELECTED_COLOR: ZoColorDef
declare const ZO_SORT_BY_NAME: Record<string, unknown>

declare const SCREEN_NARRATION_MANAGER: Record<string, unknown>

declare function zo_clamp(value: number, min: number, max: number): number
declare function zo_mixin(target: object, ...sources: object[]): object
declare function GetAnimationManager(this: void): Record<string, unknown>
declare function GetEventManager(this: void): Record<string, unknown>
declare function ApplyTemplateToControl(this: void, control: Control, templateName: string): void
declare function MouseIsOver(this: void, control: Control): boolean
declare function RequestAlert(this: void, category: number, soundId: string, text: string): void
declare function ZO_Alert(this: void, category: number, soundId: string, text: string): void
declare function ZO_CheckButton_OnClicked(this: void, buttonControl: Control): void
declare function ZO_ComboBox_HideDropdown(this: void, control: Control): void
declare function ZO_IsElementInNumericallyIndexedTable(
  this: void,
  tbl: readonly unknown[],
  element: unknown
): boolean
declare function ZO_Options_OnMouseEnter(this: void, ...args: unknown[]): void
declare function ZO_ScrollList_Commit(this: void, scrollControl: Control): void
declare function ZO_ScrollList_SetHeight(this: void, scrollControl: Control, height: number): void
declare function ZO_Scroll_SetUseFadeGradient(
  this: void,
  scrollControl: Control,
  use: boolean
): void

interface ZoComboBoxInstance {
  GetSpacing(this: ZoComboBoxInstance): number
  SetVisible(this: ZoComboBoxInstance, visible: boolean): void
  SetDropdownObject(this: ZoComboBoxInstance, dropdownObject: unknown): void
  GetEntries(this: ZoComboBoxInstance): unknown[]
  IsItemSelected(this: ZoComboBoxInstance, item: unknown): boolean
  GetNumSelectedEntries(this: ZoComboBoxInstance): number
  AddItemToSelected(this: ZoComboBoxInstance, item: unknown): void
  RemoveItemFromSelected(this: ZoComboBoxInstance, item: unknown): void
  GetSelectionBlockedErrorText(this: ZoComboBoxInstance): string
  RefreshSelectedItemText(this: ZoComboBoxInstance): void
  SetSelectedItemText(this: ZoComboBoxInstance, text: string): void
  SetSortsItems(this: ZoComboBoxInstance, sortsItems: boolean): void
  ClearAllSelections(this: ZoComboBoxInstance): void
  GetContainer(this: ZoComboBoxInstance): Control
  OnClearItems(this: ZoComboBoxInstance): void
  [key: string]: unknown
}
interface ZoComboBoxClass {
  Subclass(this: ZoComboBoxClass): ZoComboBoxClass
  New(this: ZoComboBoxClass, ...args: unknown[]): ZoComboBoxInstance
  [key: string]: unknown
}
declare const ZO_ComboBox: ZoComboBoxClass

interface ZoComboBoxDropdownKeyboardInstance {
  IsOwnedByComboBox(this: ZoComboBoxDropdownKeyboardInstance, comboBox: unknown): boolean
  GetHighlightFromPool(this: ZoComboBoxDropdownKeyboardInstance): Control
  SetupEntry(this: ZoComboBoxDropdownKeyboardInstance, ...args: unknown[]): void
  SetupEntryBase(
    this: ZoComboBoxDropdownKeyboardInstance,
    control: Control,
    data: unknown,
    list: unknown
  ): void
  IsHidden(this: ZoComboBoxDropdownKeyboardInstance): boolean
  [key: string]: unknown
}
interface ZoComboBoxDropdownKeyboardClass {
  Subclass(this: ZoComboBoxDropdownKeyboardClass): ZoComboBoxDropdownKeyboardClass
  New(this: ZoComboBoxDropdownKeyboardClass, ...args: unknown[]): ZoComboBoxDropdownKeyboardInstance
  OnEntryMouseUp: (control: Control, button: number, upInside: boolean) => void
  [key: string]: unknown
}
declare const ZO_ComboBoxDropdown_Keyboard: ZoComboBoxDropdownKeyboardClass

interface ZoRadioButtonGroupInstance {
  m_buttons: Record<string, unknown>
  Add(this: ZoRadioButtonGroupInstance, button: Control, ...args: unknown[]): void
  Remove(this: ZoRadioButtonGroupInstance, button: Control): void
  SetButtonState(this: ZoRadioButtonGroupInstance, ...args: unknown[]): void
  HandleClick(this: ZoRadioButtonGroupInstance, ...args: unknown[]): void
  Clear(this: ZoRadioButtonGroupInstance): void
  [key: string]: unknown
}
interface ZoRadioButtonGroupClass {
  Subclass(this: ZoRadioButtonGroupClass): ZoRadioButtonGroupClass
  New(this: ZoRadioButtonGroupClass, ...args: unknown[]): ZoRadioButtonGroupInstance
  [key: string]: unknown
}
declare const ZO_RadioButtonGroup: ZoRadioButtonGroupClass

interface ZoObjectClass {
  Subclass(this: ZoObjectClass): ZoObjectClass
  New(this: void, self: object): Record<string, unknown>
  [key: string]: unknown
}
declare const ZO_Object: ZoObjectClass

interface ZoAnchorInstance {
  SetTarget(this: ZoAnchorInstance, target: Control): void
  AddToControl(this: ZoAnchorInstance, control: Control): void
  [key: string]: unknown
}
interface ZoAnchorClass {
  New(
    this: ZoAnchorClass,
    pointOnMe: number,
    relativeTo: Control | undefined,
    pointOnTarget: number,
    offsetX: number,
    offsetY: number
  ): ZoAnchorInstance
  [key: string]: unknown
}
declare const ZO_Anchor: ZoAnchorClass

interface ZoEntryDataInstance {
  [key: string]: unknown
}
interface ZoEntryDataClass {
  New(this: ZoEntryDataClass, item: unknown): ZoEntryDataInstance
  [key: string]: unknown
}
declare const ZO_EntryData: ZoEntryDataClass
