declare const COMPANION_EQUIPMENT_KEYBOARD: object

interface PlayerInventoryManager {
  suppressItemAlert?: boolean
  suppressItemAddedAlert?: boolean
  newItemList?: unknown[]
  flashingSlots?: Record<string, unknown>
  listeningControls?: Record<string, Control | undefined>
}

interface SceneFragment {
  callbackRegistry?: {
    StateChange?: Array<Array<((oldState: number, newState: number) => void) | undefined>>
  }
}

declare const ZO_SharedInventoryManager: Record<string, unknown>

interface TradingHouseDataType {
  setupCallback?: (this: void, ...args: never[]) => void
}
declare const TRADING_HOUSE: {
  searchResultsList: {
    dataTypes: Record<number, TradingHouseDataType>
  }
}

declare function ZO_ScrollList_ResetToTop(this: void, scrollList: Control): void
declare function ZO_ScrollList_ScrollAbsolute(this: void, scrollList: Control, offset: number): void
declare function ZO_Scroll_UpdateScrollBar(this: void, scrollContainer: Control): void

interface ScrollbarButtonsCache {
  vertical?: Record<string, Control | undefined>
  horizontal?: Record<string, Control | undefined>
}

interface ScrollbarControl extends Control {
  FCOChangeStuffScrollbarButtons?: ScrollbarButtonsCache
}

interface ScrollbarParentControl {
  useScrollbar?: boolean
  scrollbar?: ScrollbarControl
}

interface EsoInventoryContainer {
  useScrollbar?: boolean
  scrollbar?: ScrollbarControl
}

declare const ZO_PlayerInventoryList: ScrollbarParentControl
declare const ZO_GuildBankBackpack: ScrollbarParentControl
declare const ZO_CraftBagList: ScrollbarParentControl
declare const ZO_FurnitureVaultList: ScrollbarParentControl
declare const ZO_VengeanceInventory: unknown
declare const ZO_VengeanceInventoryList: ScrollbarParentControl

declare const SCENE_FRAGMENT_SHOWING: number

declare function SecurePostHook(
  existingGlobalFunctionName: string,
  hookFunction: (this: void, ...args: never[]) => void
): void
