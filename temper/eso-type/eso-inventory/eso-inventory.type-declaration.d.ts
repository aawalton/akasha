interface InventoryRowSlotData {
  bagId?: number
  slotIndex?: number
}

interface ZoScrollListDataType {
  setupCallback?: (
    this: void,
    rowControl: Control,
    slotData: InventoryRowSlotData,
    list?: Control
  ) => void
}

interface ZoScrollListControl extends Control {
  dataTypes?: Record<number, ZoScrollListDataType | undefined>
}

interface PlayerInventoryDefinition {
  listView?: ZoScrollListControl
  additionalFilter?: (this: void, slotData: InventoryRowSlotData) => boolean
}

interface PlayerInventoryManager {
  inventories: Record<number, PlayerInventoryDefinition | undefined>
  UpdateList: (this: PlayerInventoryManager, inventoryType: number, ...args: unknown[]) => void
  ApplyBackpackLayout: (this: PlayerInventoryManager, layoutData: unknown) => void
  GetBackpackItem: (this: PlayerInventoryManager, slotIndex: number) => BackpackItemData | undefined
}

interface BackpackItemData {
  brandNew?: boolean
  age?: number
  statusSortOrder?: number
  [key: string]: unknown
}

declare const PLAYER_INVENTORY: PlayerInventoryManager
declare const INVENTORY_QUEST_ITEM: number
declare const INVENTORY_BACKPACK: number
declare const INVENTORY_BANK: number
declare const INVENTORY_GUILD_BANK: number
declare const INVENTORY_HOUSE_BANK: number
declare const INVENTORY_CRAFT_BAG: number

declare const ZO_ScrollList_RefreshVisible: (this: void, list: Control) => void
