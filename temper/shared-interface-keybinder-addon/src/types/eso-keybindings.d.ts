interface VkBind {
  keyCode: number
  mod1: number
  mod2: number
  mod3: number
  mod4: number
}

interface VkKeybindDataSource {
  actionName: string
  localizedActionName: string
  layerIndex: number
  categoryIndex: number
  actionIndex: number
}

interface VkKeybindRowData {
  GetDataSource(): VkKeybindDataSource
}

interface VkScrollEntry {
  typeId: number
  data: VkKeybindRowData
}

type VkScrollData = VkScrollEntry[]

interface VkKeybindDataType {
  setupCallback: (this: void, control: Control, data: VkKeybindRowData, ...args: unknown[]) => void
  pool: { m_Factory: (this: void, pool: unknown, ...args: unknown[]) => Control }
}

interface VkScrollListControl extends Control {
  dataTypes: Record<number, VkKeybindDataType>
}

interface VkKeybindListManager {
  list: VkScrollListControl
  BuildMasterList(this: VkKeybindListManager, ...args: unknown[]): void
  RefreshFilters(this: VkKeybindListManager): void
  SetLockedForUpdates(this: VkKeybindListManager, locked: boolean): void
  RefreshVisible(this: VkKeybindListManager): void
}

interface VkKeybindingManager {
  list: VkKeybindListManager
  RefreshList(this: VkKeybindingManager): void
}

interface VkActionData {
  localizedActionName: string
  actionName: string
  GetDataSource(): VkKeybindDataSource
}
interface VkCategoryData {
  categoryName: string
  actions: VkActionData[]
}
interface VkLayerData {
  categories: VkCategoryData[]
}

interface VkKeybindingsManager {
  GetKeybindData(this: VkKeybindingsManager, ...args: unknown[]): VkLayerData[]
}

interface VkSceneFragment {
  RegisterCallback(
    event: string,
    fn: (this: void, oldState: number, newState: number) => void
  ): void
}

interface VkBindButton {
  SetEnabled: (this: VkBindButton, enabled: boolean) => void
}
interface VkBindKeyDialog {
  control: { bindButton: VkBindButton }
}

interface VkKeybindButtonControl extends Control {
  nameLabel: Control
}

declare const KEYBINDING_MANAGER: VkKeybindingManager
declare const KEYBOARD_KEYBINDING_MANAGER: VkKeybindingManager | undefined
declare const KEYBINDINGS_MANAGER: VkKeybindingsManager
declare const KEYBINDINGS_FRAGMENT: VkSceneFragment
declare const BIND_KEY_DIALOG: VkBindKeyDialog

declare const ZO_Keybindings: Control
declare const ZO_KeybindingsLoadGamepadDefaults: VkKeybindButtonControl | undefined
declare const ZO_KeybindingsLoadKeyboardDefaults: VkKeybindButtonControl | undefined

declare const TRISTATE_CHECK_BUTTON_CHECKED: number
declare const TRISTATE_CHECK_BUTTON_UNCHECKED: number
declare const TRISTATE_CHECK_BUTTON_INDETERMINATE: number
declare const SCENE_FRAGMENT_SHOWING: number
declare const SCENE_FRAGMENT_HIDING: number

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
): void
declare function UnbindAllKeysFromAction(
  this: void,
  layerIndex: number,
  categoryIndex: number,
  actionIndex: number
): void
declare function ZO_Keybindings_DoesKeyMatchAnyModifiers(
  this: void,
  key: number,
  mod1: number,
  mod2: number,
  mod3: number,
  mod4: number
): boolean
declare function zo_strupper(this: void, s: string): string
declare function zo_plainstrfind(this: void, str: string, sub: string): number | undefined
declare function ZO_TriStateCheckButton_SetStateChangeFunction(
  this: void,
  checkBox: Control,
  fn: (this: void, control: Control, checkState: number) => void
): void
declare function ZO_TriStateCheckButton_SetState(this: void, checkBox: Control, state: number): void
declare function ZO_KeybindButtonTemplate_Setup(
  this: void,
  control: Control,
  keybindName: string,
  callback: (this: void) => void,
  text: string
): void
declare function ZO_ScrollList_GetData(this: void, control: Control): VkKeybindRowData

interface Control {
  SetInheritAlpha(inherit: boolean): void
  SetInsets(left: number, top: number, right: number, bottom: number): void
}
interface EditControl {
  SetEditEnabled(enabled: boolean): void
}
interface WindowManager {
  GetFocusControl(): Control | undefined
  CreateControlFromVirtual<T extends Control = Control>(
    name: string | undefined,
    parent: Control | undefined,
    virtualName: string
  ): T
}

interface ZO_SavedVars {
  New<T extends object>(
    savedVariableTable: string,
    version: number,
    namespace: string | undefined,
    defaults: T,
    profile?: string,
    displayName?: string,
    characterName?: string
  ): T
}
