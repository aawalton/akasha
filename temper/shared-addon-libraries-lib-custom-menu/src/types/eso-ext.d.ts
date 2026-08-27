interface ZoCallbackObject {
  RegisterCallback(
    this: ZoCallbackObject,
    key: number | string,
    callback: (this: void, ...args: unknown[]) => void,
    ...args: unknown[]
  ): void
  FireCallbacks(this: ZoCallbackObject, key: number | string, ...args: unknown[]): void
}

interface ZoCallbackObjectClass {
  New(this: ZoCallbackObjectClass): ZoCallbackObject
}
declare const ZO_CallbackObject: ZoCallbackObjectClass

declare const ZO_Menus: Control

declare var MENU_ADD_OPTION_HEADER: number

declare function zo_clamp(value: number, min: number, max: number): number

declare function ZO_IsConsoleUI(): boolean

declare function IgnoreMouseDownEditFocusLoss(this: void, ...args: unknown[]): void

declare function ZO_Menu_EnterItem(control: Control): void
declare function ZO_Menu_ExitItem(control: Control): void
declare function ZO_Menu_ClickItem(control: Control, button: number): void
declare function ZO_Menu_SetLastCommandWasFromMenu(fromMenu: boolean): void

declare function AddMenuItem(
  labelText: string,
  callback?: ((this: void) => void) | undefined,
  itemType?: number,
  myFont?: string,
  normalColor?: unknown,
  highlightColor?: unknown,
  itemYPad?: number,
  ...rest: unknown[]
): number

declare function ZO_CheckButton_OnClicked(checkButton: Control, button: number): void
declare function ZO_CheckButton_IsChecked(checkButton: Control): boolean
declare function ZO_CheckButton_SetToggleFunction(
  checkButton: Control,
  toggleFunction: ((this: void, checkButton: Control) => void) | undefined
): void
declare function ZO_CheckButton_SetCheckState(checkButton: Control, checked: boolean): void
declare function ZO_CheckButton_SetUnchecked(checkButton: Control): void

declare function ZO_ScrollList_GetData(control: Control): unknown

declare const ZO_WHITE: ZoColorDef
declare const ZO_DEFAULT_DISABLED_COLOR: ZoColorDef

interface ZoInventorySlotActions {
  m_contextMenuMode?: boolean
  Show(this: ZoInventorySlotActions): void
  AddSlotAction(this: ZoInventorySlotActions, ...args: unknown[]): void
  GetPrimaryActionName(this: ZoInventorySlotActions, ...args: unknown[]): unknown
  AddCustomSlotAction?: (this: ZoInventorySlotActions, ...args: unknown[]) => void
}
declare const ZO_InventorySlotActions: ZoInventorySlotActions

interface SocialListOwner {
  [handlerName: string]: ((this: void, ...args: unknown[]) => unknown) | undefined
}
declare const FRIENDS_LIST: SocialListOwner
declare const IGNORE_LIST: SocialListOwner
declare const GROUP_LIST: SocialListOwner
declare const GUILD_ROSTER_KEYBOARD: SocialListOwner

interface Control {
  CreateControl<T extends Control = Control>(name: string, controlType: number): T
  GetDrawLayer(): number
  GetDrawTier(): number
  GetDrawLevel(): number
  GetOwningWindow(): Control
  SetClampedToScreen(clamped: boolean): void
}

interface LabelControl {
  SetMaxLineCount(count: number): void
}

interface TextureControl {
  SetAddressMode(mode: number): void
}

interface BackdropControl {
  SetCenterTexture(textureFile: string): void
  SetInsets(left: number, top: number, right: number, bottom: number): void
  SetEdgeTexture(texture: string | undefined, width: number, height: number): void
}

interface TooltipControl {
  GetOwner(): Control | undefined
}

interface SharedChatSystem {
  ShowPlayerContextMenu(playerName: string, rawName: string, ...rest: unknown[]): unknown
}

declare const SharedChatSystem: SharedChatSystem
