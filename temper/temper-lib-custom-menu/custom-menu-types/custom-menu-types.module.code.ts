export type Valued<T> = T | ((this: void, ...args: unknown[]) => T)

export type TooltipValue = string | ((this: void, control: Control, inside: boolean) => string)

export type HookFn = (this: void, ...args: unknown[]) => void

export interface MenuEntry {
  label: Valued<string>
  callback?: (this: void, ...args: unknown[]) => unknown
  itemType?: number
  tooltip?: TooltipValue
  checked?: Valued<boolean>
  disabled?: Valued<boolean>
  visible?: Valued<boolean>
  myfont?: Valued<string>
  normalColor?: Valued<ZoColorDef>
  highlightColor?: Valued<ZoColorDef>
}

export interface LcmLabel extends LabelControl {
  normalColor: ZoColorDef
  highlightColor: ZoColorDef
  GetTextDimensions: (this: LcmLabel) => LuaMultiReturn<[number, number]>
}

export interface LcmControlBase extends Control {
  index: number
  menuIndex?: number
  itemYPad?: number
  storedHeight?: number
  tooltip?: TooltipValue
  isDivider?: boolean
  isHeader?: boolean
  item?: LcmControlBase
  checkbox?: Control
  nameLabel: LcmLabel
}

export interface LcmRowControl extends LcmControlBase {
  OnSelect?: (this: void, checked?: boolean) => unknown
}

export interface LcmSubmenuParent extends LcmControlBase {
  OnSelect?: (this: LcmSubmenuParent, state: number) => void
}

export type PooledRow = LcmRowControl | LcmSubmenuParent

export interface LcmMenuEntry {
  item: LcmRowControl
  checkbox?: Control
  isDivider?: boolean
  isHeader?: boolean
}

export interface LcmMenu extends Control {
  items: LcmMenuEntry[]
  itemPool: ObjectPool<LcmRowControl> | ObjectPool<LcmSubmenuParent>
  checkBoxPool: ObjectPool<LcmRowControl> | ObjectPool<LcmSubmenuParent>
  menuPad: number
  height: number
}

export interface Submenu {
  control: Control
  highlight: Control
  window: Control
  items: LcmRowControl[]
  itemPool: ObjectPool<LcmRowControl>
  dividerPool: ObjectPool<LcmRowControl>
  checkBoxPool: ObjectPool<LcmRowControl>
  headerPool: ObjectPool<LcmRowControl>
  selectedIndex?: number
  parent?: LcmSubmenuParent
  refCount?: number
  SetSelectedIndex: (this: Submenu, index: number | undefined) => void
  UnselectItem: (this: Submenu, index: number | undefined) => void
  SelectItem: (this: Submenu, index: number | undefined) => void
  UpdateAnchors: (this: Submenu) => void
  Clear: (this: Submenu) => void
  AddItem: (
    this: Submenu,
    entry: MenuEntry,
    myfont: string | undefined,
    normalColor: ZoColorDef | undefined,
    highlightColor: ZoColorDef | undefined,
    itemYPad: number | undefined
  ) => void
  Show: (this: Submenu, parent: LcmSubmenuParent) => boolean
}

export interface Lib {
  DIVIDER: string
  headerFont: string
  enabledSpecialKeys: Record<number, boolean>
  CATEGORY_EARLY: number
  CATEGORY_PRIMARY: number
  CATEGORY_SECONDARY: number
  CATEGORY_TERTIARY: number
  CATEGORY_QUATERNARY: number
  CATEGORY_LATE: number
  contextMenuRegistry: ZoCallbackObject
  keybindRegistry: ZoCallbackObject
  playerContextMenuRegistry: ZoCallbackObject
  guildRosterContextMenuRegistry: ZoCallbackObject
  friendsListContextMenuRegistry: ZoCallbackObject
  ignoreListContextMenuRegistry: ZoCallbackObject
  groupListContextMenuRegistry: ZoCallbackObject
  itemPool: ObjectPool<LcmRowControl>
  submenuPool: ObjectPool<LcmSubmenuParent>
  checkBoxPool: ObjectPool<LcmRowControl>
  dividerPool: ObjectPool<LcmRowControl>
  headerPool: ObjectPool<LcmRowControl>
  submenu?: Submenu
  AddMenuItem: (
    this: void,
    mytext: string,
    myfunction?: ((this: void) => void) | undefined,
    itemType?: number,
    myFont?: string,
    normalColor?: unknown,
    highlightColor?: unknown,
    itemYPad?: number,
    ...rest: unknown[]
  ) => number
  AddSubMenuItem: (
    this: void,
    mytext: string,
    myfunction?: ((this: void) => void) | undefined,
    itemType?: number,
    myFont?: string,
    normalColor?: unknown,
    highlightColor?: unknown,
    itemYPad?: number,
    entries?: unknown,
    isDivider?: boolean
  ) => number
  RegisterContextMenu: (this: Lib, func: HookFn, category?: number, ...args: unknown[]) => void
  RegisterSpecialKeyContextMenu: (this: Lib, func: HookFn, ...args: unknown[]) => void
  RegisterPlayerContextMenu: (
    this: Lib,
    func: HookFn,
    category?: number,
    ...args: unknown[]
  ) => void
  RegisterGuildRosterContextMenu: (
    this: Lib,
    func: HookFn,
    category?: number,
    ...args: unknown[]
  ) => void
  RegisterFriendsListContextMenu: (
    this: Lib,
    func: HookFn,
    category?: number,
    ...args: unknown[]
  ) => void
  RegisterIgnoreListContextMenu: (
    this: Lib,
    func: HookFn,
    category?: number,
    ...args: unknown[]
  ) => void
  RegisterGroupListContextMenu: (
    this: Lib,
    func: HookFn,
    category?: number,
    ...args: unknown[]
  ) => void
  RegisterKeyStripEnter: (this: Lib, func: HookFn, category?: number, ...args: unknown[]) => void
  RegisterKeyStripExit: (this: Lib, func: HookFn, ...args: unknown[]) => void
  EnableSpecialKeyContextMenu: (this: Lib, key: number) => void
}
