interface KeybindDataSource {
  actionName: string
  localizedActionName: string
  layerIndex: number
  categoryIndex: number
  actionIndex: number
}

interface KeybindRowData {
  actionName: string
  GetDataSource: () => KeybindDataSource
}

interface KeybindScrollEntry {
  typeId: number
  data?: KeybindRowData
}

interface KeybindScrollbar {
  GetValue: () => number
  SetValue: (value: number) => undefined
}

interface KeybindTimeline {
  Stop: () => undefined
}

interface KeybindDataType {
  setupCallback: (
    this: void,
    control: Control,
    data: KeybindRowData,
    ...args: unknown[]
  ) => undefined
  pool: { m_Factory: (this: void, pool: unknown, ...args: unknown[]) => Control }
}

interface KeybindScrollListControl extends Control {
  scrollbar: KeybindScrollbar
  timeline: KeybindTimeline
  dataTypes: Record<number, KeybindDataType>
}

interface KeybindingsSortFilterList {
  list: KeybindScrollListControl
  masterList: KeybindScrollEntry[]
  RefreshFilters: () => undefined
  FilterScrollList: (this: KeybindingsSortFilterList) => undefined
  BuildMasterList: (this: KeybindingsSortFilterList, ...args: unknown[]) => undefined
  SetLockedForUpdates: (this: KeybindingsSortFilterList, locked: boolean) => undefined
  RefreshVisible: (this: KeybindingsSortFilterList) => undefined
}

interface KeybindingManager {
  list: KeybindingsSortFilterList
  RefreshList: (this: KeybindingManager) => undefined
}

interface KeybindingsDataManager {
  GetKeybindData: (this: KeybindingsDataManager, ...args: unknown[]) => KeybindLayerData[]
}

interface KeybindActionData {
  localizedActionName: string
  actionName: string
  GetDataSource: () => KeybindDataSource
}

interface KeybindCategoryData {
  categoryName: string
  actions: KeybindActionData[]
}

interface KeybindLayerData {
  categories: KeybindCategoryData[]
}

interface KeybindButtonControl extends Control {
  nameLabel: Control
}

interface BindKeyDialogButton {
  SetEnabled: (this: BindKeyDialogButton, enabled: boolean) => undefined
}

interface BindKeyDialog {
  control: { bindButton: BindKeyDialogButton }
}

declare const KEYBOARD_KEYBINDING_MANAGER: KeybindingManager | undefined

declare const KEYBINDING_MANAGER: KeybindingManager | undefined

declare const KEYBINDINGS_MANAGER: KeybindingsDataManager

declare const KEYBINDINGS_FRAGMENT: SceneFragment

declare const BIND_KEY_DIALOG: BindKeyDialog

declare const ZO_Keybindings: Control

declare const ZO_KeybindingsLoadGamepadDefaults: KeybindButtonControl | undefined

declare const ZO_KeybindingsLoadKeyboardDefaults: KeybindButtonControl | undefined

declare const ZO_KeybindButtonTemplate_Setup: (
  this: void,
  button: Control,
  keybind: string,
  callback: (this: void, ...args: unknown[]) => undefined,
  text: string | number
) => undefined

declare function zo_strupper(this: void, text: string): string

declare function ZO_Keybindings_DoesKeyMatchAnyModifiers(
  this: void,
  key: number,
  mod1: number,
  mod2: number,
  mod3: number,
  mod4: number
): boolean

declare function BindKeyToAction(
  this: void,
  layerIndex: number,
  categoryIndex: number,
  actionIndex: number,
  bindingIndex: number,
  keyCode: number,
  mod1: number,
  mod2: number,
  mod3: number,
  mod4: number
): undefined

declare function UnbindAllKeysFromAction(
  this: void,
  layerIndex: number,
  categoryIndex: number,
  actionIndex: number
): undefined

declare function ZO_TriStateCheckButton_SetStateChangeFunction(
  this: void,
  checkBox: Control,
  fn: (this: void, control: Control, checkState: number) => undefined
): undefined

declare function ZO_TriStateCheckButton_SetState(
  this: void,
  checkBox: Control,
  state: number
): undefined

interface Control {
  SetInheritAlpha: (inherit: boolean) => undefined
}

interface WindowManager {
  GetFocusControl: () => Control | undefined
}
