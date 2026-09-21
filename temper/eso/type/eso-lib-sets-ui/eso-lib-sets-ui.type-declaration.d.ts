declare const SLOT_TYPE_STORE_BUY: number
declare const SLOT_TYPE_BUY_MULTIPLE: number
declare const SLOT_TYPE_STORE_BUYBACK: number

declare const ZO_CURRENCY_FORMAT_AMOUNT_ICON: number

declare const GAMEPAD_RIGHT_TOOLTIP: number

declare const DUNGEON_FINDER_KEYBOARD: unknown

declare const ITEM_SETS_BOOK_FRAGMENT: SceneFragment
declare const RETRAIT_STATION_RECONSTRUCT_FRAGMENT: SceneFragment

declare const ZO_ItemSetsBook_Keyboard_TopLevelFilters: Control

declare const ITEM_FILTER_UTILS: {
  GetEquipTypeFilterIcons: (this: void, equipType: number) => { up?: string } | undefined
  GetWeaponTypeFilterIcons: (this: void, weaponType: number) => { up?: string } | undefined
  GetEquipmentFilterTypeFilterDisplayInfo: (
    this: void,
    filterType: number
  ) => { icons?: { up?: string } } | undefined
}

interface ZoComboBoxClass {
  SetEntryMouseOverCallbacks?: unknown
  EnableMultiSelect?: unknown
  [key: string]: unknown
}

declare const GetClassColor: (this: void, classId: number) => unknown

declare const ZO_Inventory_GetBagAndIndex: (
  this: void,
  inventorySlot: unknown
) => LuaMultiReturn<[Bag | undefined, number | undefined]>

declare const ZO_PopupTooltip_SetLink: (this: void, itemLink: string) => void

declare const ZO_Currency_FormatKeyboard: (
  this: void,
  currencyType: number,
  amount: number | undefined,
  formatType: number,
  extraOptions?: { color?: unknown; iconInheritColor?: boolean }
) => string

declare const ZO_SortHeader_Initialize: (
  this: void,
  headerControl: object,
  text: string,
  key: string,
  initialDirection: boolean,
  textAlignment: number,
  font: string
) => void

declare const zo_mixin: (this: void, target: object, ...sources: object[]) => void

declare let ZO_WorldMap_PanToWayshrine: (this: void, wayshrineNodeId: number) => void
declare const ZO_WorldMap_IsPinGroupShown: (this: void, mapFilterType: number) => boolean
declare const ZO_WorldMap_MouseUp: (
  this: void,
  control: unknown,
  mouseButton: number,
  upInside: boolean
) => void
