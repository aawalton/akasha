interface ZoCallbackObject {
  RegisterCallback: (
    this: ZoCallbackObject,
    key: number | string,
    callback: (this: void, ...args: unknown[]) => void,
    ...args: unknown[]
  ) => void
  FireCallbacks: (this: ZoCallbackObject, key: number | string, ...args: unknown[]) => void
}

declare const ZO_IsConsoleUI: (this: void) => boolean

declare const IgnoreMouseDownEditFocusLoss: (this: void, ...args: unknown[]) => void

declare const ZO_Menu_EnterItem: (this: void, control: Control) => void

declare const ZO_Menu_ExitItem: (this: void, control: Control) => void

declare const ZO_Menu_ClickItem: (this: void, control: Control, button: number) => void

declare const ZO_CheckButton_SetUnchecked: (this: void, checkButton: Control) => void

interface ZoInventorySlotActions {
  m_contextMenuMode?: boolean
  Show: (this: ZoInventorySlotActions) => void
  AddSlotAction: (this: ZoInventorySlotActions, ...args: unknown[]) => void
  GetPrimaryActionName: (this: ZoInventorySlotActions, ...args: unknown[]) => unknown
  AddCustomSlotAction?: (this: ZoInventorySlotActions, ...args: unknown[]) => void
}

interface SocialListOwner {
  [handlerName: string]: ((this: void, ...args: unknown[]) => unknown) | undefined
}

declare const FRIENDS_LIST: SocialListOwner

declare const IGNORE_LIST: SocialListOwner

declare const GROUP_LIST: SocialListOwner

declare const GUILD_ROSTER_KEYBOARD: SocialListOwner

interface Control {
  CreateControl: <T extends Control = Control>(name: string, controlType: number) => T
  GetDrawLayer: () => number
  GetDrawTier: () => number
  GetDrawLevel: () => number
  SetClampedToScreen: (clamped: boolean) => void
}

interface TooltipControl {
  GetOwner: () => Control | undefined
}

interface SharedChatSystem {
  ShowPlayerContextMenu: (
    this: SharedChatSystem,
    playerName: string,
    rawName: string,
    ...rest: unknown[]
  ) => unknown
}

declare const SharedChatSystem: SharedChatSystem
