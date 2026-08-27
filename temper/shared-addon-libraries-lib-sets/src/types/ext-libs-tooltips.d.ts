declare const ComparativeTooltip1: unknown
declare const ComparativeTooltip2: unknown

declare function ZO_PopupTooltip_Hide(this: void): void
declare function ZO_PopupTooltip_SetLink(this: void, itemLink: string): void

declare const SI_NUMBER_FORMAT: number

declare const CURT_CHAOTIC_CREATIA: number
declare const ZO_CURRENCY_FORMAT_AMOUNT_ICON: number
declare const ZO_DEFAULT_TEXT: unknown
declare function ZO_Currency_FormatKeyboard(
  this: void,
  currencyType: number,
  amount: number | undefined,
  formatType: number,
  extraOptions?: { color?: unknown; iconInheritColor?: boolean }
): string

declare function ZO_IsElementInNumericallyIndexedTable(
  this: void,
  tab: unknown,
  element: unknown
): boolean

declare function zo_iconFormatInheritColor(
  this: void,
  iconPath: string,
  width: number | string,
  height: number | string
): string

declare function zo_iconTextFormatNoSpace(
  this: void,
  iconPath: string,
  width: number,
  height: number,
  text: string,
  iconInheritColor?: unknown
): string

declare const SLOT_TYPE_STORE_BUY: number
declare const SLOT_TYPE_BUY_MULTIPLE: number
declare const SLOT_TYPE_STORE_BUYBACK: number

declare const ZO_GameMenu_InGame: { gameMenu?: { [key: string]: unknown } }

declare type Bag = number

declare function moc(this: void): unknown

interface MailInbox {
  GetOpenMailId: (this: MailInbox) => number | undefined
}

interface Scene {
  IsShowing: (this: Scene) => boolean
}

declare const SI_GAME_MENU_ADDONS: number
declare const SI_GAME_MENU_SETTINGS: number
declare const SI_CHARACTER_SELECT_LOCATION_LABEL: number

interface LibSetsSearchUiHideHandle {
  HideUI: (this: LibSetsSearchUiHideHandle) => void
}
declare const LIBSETS_SEARCH_UI_KEYBOARD: LibSetsSearchUiHideHandle | undefined
declare const LIBSETS_SEARCH_UI_GAMEPAD: LibSetsSearchUiHideHandle | undefined

declare const GAMEPAD_LEFT_TOOLTIP: number
declare const GAMEPAD_RIGHT_TOOLTIP: number

interface GamepadTooltipManager {
  tooltips: { [tooltipType: number]: unknown }
  GetTooltip: (this: GamepadTooltipManager, tooltipType: number) => unknown
  GetTooltipInfo: (
    this: GamepadTooltipManager,
    tooltipType: number
  ) => { control: { container?: unknown } }
  ClearTooltip: (this: GamepadTooltipManager, tooltipType: number, reset?: boolean) => void
  LayoutItem: (
    this: GamepadTooltipManager,
    tooltipType: number,
    itemLink: string,
    a?: boolean,
    b?: unknown,
    c?: boolean
  ) => void
}
declare const GAMEPAD_TOOLTIPS: GamepadTooltipManager

interface LibAddonMenu2Surface {
  panelId?: unknown
  OpenToPanel: (this: LibAddonMenu2Surface, panel: unknown) => void
  RegisterAddonPanel: (
    this: LibAddonMenu2Surface,
    panelName: string,
    panelData: { [key: string]: unknown }
  ) => unknown
  RegisterOptionControls: (
    this: LibAddonMenu2Surface,
    panelName: string,
    optionsTable: unknown[]
  ) => void
}
