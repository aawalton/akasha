declare function GetUIMousePosition(): LuaMultiReturn<[x: number, y: number]>

declare const AnchorMenu: (control: Control, offsetY?: number) => void

interface ColorPicker {
  Show: (
    callback: (this: void, r: number, g: number, b: number, a: number) => void,
    r: number,
    g: number,
    b: number,
    a?: number
  ) => void
}
declare const COLOR_PICKER: ColorPicker

declare function zo_strlower(s: string): string

interface ObjectPool<T> {
  AcquireObject: () => LuaMultiReturn<[T, number]>
  ReleaseAllObjects: () => void
  GetNextControlId: () => number
}

interface ZO_ObjectPool {
  New: <T>(
    factory: (this: void, pool: ObjectPool<T>) => T,
    reset: (this: void, obj: T) => void
  ) => ObjectPool<T>
}
declare const ZO_ObjectPool: ZO_ObjectPool

interface ComboBoxItem {
  name: string
}

interface ComboBox {
  AddItem: (entry: ComboBoxItem) => void
  ClearItems: () => void
  CreateItemEntry: ((
    this: ComboBox,
    name: string,
    callback: (
      this: void,
      comboBox: ComboBox,
      itemName: string,
      item: ComboBoxItem,
      selectionChanged?: boolean
    ) => void
  ) => ComboBoxItem) &
    ((this: ComboBox, name: string, callback: () => void) => ComboBoxItem)

  SelectItem: (item: ComboBoxItem) => void
  GetItems: () => ComboBoxItem[]
  GetSelectedItemData: () => ComboBoxItem | undefined
  SetSortsItems: (sortsItems: boolean) => void
  SetSelectedItem: (itemName: string) => void
  SetHeight: (height: number) => void
  m_name?: string
  ShowDropdownInternal: (this: ComboBox) => void
  HideDropdownInternal: (this: ComboBox) => void
  AddMenuItems: (this: ComboBox) => void
  SetFont: (this: ComboBox, font: string) => void
  m_dropdownObject?: { control: Control }
}

declare function ZO_ComboBox_ObjectFromContainer(control: Control): ComboBox

interface ZoMenuItemControl extends Control {
  tooltip?: string
}

interface ZoMenuItem {
  item: ZoMenuItemControl
  onMouseEnter?: ((...args: unknown[]) => void) | undefined
  onMouseExit?: ((...args: unknown[]) => void) | undefined
}

interface ZoMenu {
  items: ZoMenuItem[]
}
declare const ZO_Menu: ZoMenu

declare const ZO_PreHookHandler: <C extends Control>(
  control: C,
  handlerName: string,
  fn: (this: void, control: C, ...args: unknown[]) => boolean | undefined
) => void

declare function GetItemQualityColor(quality: number): ZoColor

interface TooltipControl extends Control {
  ClearLines: () => void
  SetAntiquityLead: (antiquityId: number) => void
  SetAbilityId: (abilityId: number) => void
  SetAction: (slotIndex: number, hotbarCategory: number) => void
  SetCompanionSkill: (abilityId: number) => void
  SetBagItem: (bagId: number, slotIndex: number, displayFlags?: number) => void
  AddLine: (
    text: string,
    font?: string,
    r?: number,
    g?: number,
    b?: number,
    lineAnchor?: number,
    modifyTextType?: number,
    textAlignment?: number,
    setToFullSize?: boolean
  ) => void
  AddVerticalPadding: (paddingY: number) => void
  SetLink: (link: string, ...rest: unknown[]) => void
  SetChampionSkill: (
    championSkillId: number,
    numPendingPoints: number,
    wouldBePurchased?: boolean,
    isSlotted?: boolean
  ) => void
}

declare const InformationTooltip: TooltipControl

declare const InformationTooltipTopLevel: TopLevelWindow

declare const AbilityTooltip: TooltipControl

declare const ItemTooltip: TooltipControl

declare const PopupTooltip: TooltipControl

declare const SkillTooltip: TooltipControl

declare const ChampionSkillTooltip: TooltipControl

declare const InitializeTooltip: (
  tooltip: TooltipControl,
  owner: Control,
  anchor: number,
  offsetX?: number,
  offsetY?: number,
  relativePoint?: number
) => void

declare const SetTooltipText: (
  tooltip: TooltipControl,
  text: string,
  colorOrRed?: ZoColorDef | number,
  green?: number,
  blue?: number
) => void

declare const ClearTooltip: (tooltip: TooltipControl) => void

interface ScrollContainer extends Control {
  GetNamedChild: <T extends Control = Control>(name: string) => T | undefined
}

interface EsoLootWindow {
  UpdateLootWindow: (...args: unknown[]) => void
}

interface EsoSystems {
  GetObject: ((this: EsoSystems, name: "loot") => EsoLootWindow) &
    ((this: EsoSystems, name: string) => Record<string, unknown>)
}
declare const SYSTEMS: EsoSystems

interface EsoLootShared {
  LootAllItems: (this: EsoLootShared) => void
}
declare const LOOT_SHARED: EsoLootShared

interface ZoGamepadEntryData {
  data: unknown
  currentValue: boolean
  SetIconTintOnSelection: (enabled: boolean) => undefined
  SetIconDisabledTintOnSelection: (enabled: boolean) => undefined
  SetHeader: (headingText: string) => undefined
  SetDataSource: (this: ZoGamepadEntryData, dataSource: object) => void
  [key: string]: unknown
}

interface ZoGamepadEntryDataClass {
  New: (
    this: ZoGamepadEntryDataClass,
    displayName: string | undefined,
    icon?: string,
    ...args: readonly unknown[]
  ) => ZoGamepadEntryData
}

declare const ZO_GamepadEntryData: ZoGamepadEntryDataClass

interface ComboBoxItem {
  id?: number
  data?: unknown
}

interface ObjectPool<T> {
  ReleaseObject: (key: number) => undefined
}

interface TooltipControl {
  SetWornItem: (slotIndex: number, ...rest: unknown[]) => undefined
  SetAttachedMailItem: (mailId: Id64, attachmentIndex: number, ...rest: unknown[]) => undefined
  SetBuybackItem: (entryIndex: number, ...rest: unknown[]) => undefined
  SetTradingHouseListing: (tradingHouseListingIndex: number, ...rest: unknown[]) => undefined
  SetTradeItem: (tradeWho: number, slotIndex: number, ...rest: unknown[]) => undefined
  SetQuestReward: (rewardIndex: number, ...rest: unknown[]) => undefined
}

interface TooltipControl {
  AddHeaderLine: (...args: unknown[]) => undefined
}

interface TooltipControl {
  GetOwner: () => Control | undefined
}

interface TooltipControl {
  SetCollectible: (
    this: TooltipControl,
    collectibleId: number,
    showVisualLayer: boolean,
    showBlockReason: boolean
  ) => void
  SetAntiquitySetFragment: (this: TooltipControl, antiquityId: number) => void
  AddControl: (this: TooltipControl, control: Control) => void
}

interface TooltipControl {
  SetLootItem: (lootId: number, ...rest: unknown[]) => void
  SetTradingHouseItem: (tradingHouseIndex: number, ...rest: unknown[]) => void
}

interface EsoSystems {
  RegisterKeyboardObject: (this: EsoSystems, name: string, object: unknown) => void
}
