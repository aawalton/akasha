declare const ZO_DEFAULT_ENABLED_COLOR: ZoColorDef
declare const ZO_DEFAULT_DISABLED_COLOR: ZoColorDef
declare const ZO_DEFAULT_DISABLED_MOUSEOVER_COLOR: ZoColorDef
declare const ZO_NORMAL_TEXT: ZoColorDef
declare const ZO_SECOND_CONTRAST_TEXT: ZoColorDef
declare const ZO_DISABLED_TEXT: ZoColorDef
declare const ZO_ERROR_COLOR: ZoColorDef
declare const ZO_WHITE: ZoColorDef

declare function ZO_Options_OnMouseEnter(control: Control): void

declare function ZO_LinkHandler_OnLinkClicked(...args: unknown[]): unknown

interface EsoDialogTextField {
  text: string | number
}

interface EsoDialogButton {
  text: string | number
  callback?: (this: void, dialog?: unknown) => void
}

interface EsoDialogDescriptor {
  canQueue?: boolean
  title: EsoDialogTextField
  mainText: EsoDialogTextField
  buttons: EsoDialogButton[]
  noChoiceCallback?: (this: void, ...args: unknown[]) => void
}

declare const ESO_Dialogs: Record<string, EsoDialogDescriptor | undefined>

declare const _G: Record<string, unknown>

declare function ZO_ScrollList_ScrollAbsolute(list: object, value: number): void
declare function ZO_ScrollList_GetHeight(list: object): number
declare function ZO_ScrollList_Commit(list: object): void
declare function ZO_ScrollList_SelectData(
  list: object,
  data: unknown,
  control?: unknown,
  reselectingDuringRebuild?: boolean
): void
declare function ZO_ScrollList_GetData(control: Control): unknown
declare function ZO_ScrollList_EnableSelection(
  list: object,
  templateName: string,
  selectionCallback?: (
    this: void,
    previouslySelectedData: unknown,
    selectedData: unknown,
    reselectingDuringRebuild?: boolean
  ) => void
): void
declare function ZO_ScrollList_GetDataTypeTable(
  list: object,
  typeId: number
): ZoScrollListDataTypeTable
declare function ZO_ScrollList_MouseEnter(list: object, control: Control): void
declare function ZO_ScrollList_MouseExit(list: object, control: Control): void

interface ZoScrollListObjectPool {
  m_Factory: (this: void, pool: ZoScrollListObjectPool) => Control
}
interface ZoScrollListDataTypeTable {
  pool: ZoScrollListObjectPool
}

interface ZoFadeSceneFragment {
  GetControl(this: ZoFadeSceneFragment): Control
  RegisterCallback(
    this: ZoFadeSceneFragment,
    event: string,
    callback: (this: void, oldState: number, newState: number) => void
  ): void
}
interface ZoFadeSceneFragmentClass {
  New(
    this: ZoFadeSceneFragmentClass,
    control: Control,
    alwaysAnimate?: boolean,
    duration?: number
  ): ZoFadeSceneFragment
}
declare const ZO_FadeSceneFragment: ZoFadeSceneFragmentClass

interface ZoTreeNode {
  GetChildren(this: ZoTreeNode): ZoTreeNode[] | undefined
  GetData(this: ZoTreeNode): { id?: number } | undefined
  GetTree(this: ZoTreeNode): { SelectNode(this: unknown, node: ZoTreeNode): void }
}

interface ZoGameMenuHeader {
  GetChildren(this: ZoGameMenuHeader): ZoTreeNode[] | undefined
}

interface ZoGameMenuInGame {
  gameMenu: {
    headerControls: Record<string, ZoGameMenuHeader | undefined>
  }
}
declare const ZO_GameMenu_InGame: ZoGameMenuInGame

declare function ZO_GameMenu_AddSettingPanel(panelData: unknown): void

interface KeyboardOptionsObject {
  currentPanelId: number
  panelNames: Record<number, unknown>
  controlTable: Record<number, unknown>
  ApplySettings(this: KeyboardOptionsObject): void
  ChangePanels(this: KeyboardOptionsObject, panelId: number): void
}
declare const KEYBOARD_OPTIONS: KeyboardOptionsObject

declare function ZO_KeybindButtonTemplate_Setup(
  button: Control,
  keybind: string,
  callback: (this: void, ...args: unknown[]) => void,
  text: string | number
): void

declare function ZO_ReanchorControlForLeftSidePanel(control: Control): void

declare const ZO_Ingame_SavedVariables: Record<string, unknown>

interface SharedChatSystem {
  primaryContainer?: unknown
}

interface Control {
  CreateControl<T extends Control = Control>(name: string | undefined, controlType: number): T
  GetNamedChild<T extends Control = Control>(suffix: string): T
  SetDimensionConstraints(
    minWidth: number,
    minHeight: number,
    maxWidth: number,
    maxHeight: number
  ): void
  SetExcludeFromResizeToFitExtents(exclude: boolean): void
  SetResizeToFitDescendents(resize: boolean): void
  SetModifyTextType(modifyTextType: number): void
  SetHitInsets(left: number, top: number, right: number, bottom: number): void
}
