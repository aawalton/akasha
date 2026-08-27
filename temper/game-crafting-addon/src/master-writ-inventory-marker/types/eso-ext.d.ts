interface Control {
  SetInheritScale(inherit: boolean): void
  SetFont?(font: string): void
}

interface InventoryRowSlotData {
  lootId?: number
}

interface MailData {
  numAttachments: number
}
interface MailInbox {
  RefreshAttachmentSlots?: (this: MailInbox) => void
  GetMailData(this: MailInbox, mailId: Id64, isMailFromGuild: boolean): MailData
  attachmentSlots?: Record<number, Control | undefined>
  mailId?: Id64
  isMailFromGuild?: boolean
}

interface InventorySortEntry {
  data?: InventoryRowSlotData
}
interface PlayerInventoryDefinition {
  sortFn?: (this: void, a: InventorySortEntry, b: InventorySortEntry) => boolean
  currentSortKey?: string
  currentSortOrder?: boolean
  temperReplacedSort?: boolean
}

interface PlayerInventoryManager {
  GetTabFilterInfo: (
    this: void,
    self: PlayerInventoryManager,
    inventoryType: number,
    tabControl?: unknown
  ) => LuaMultiReturn<unknown[]>
}

interface TradeSlotColumn {
  Control?: Control
}
interface TradeWindow {
  Columns: Record<number, Record<number, TradeSlotColumn | undefined>>
}
declare const TRADE: TradeWindow

declare function zo_strlen(this: void, str: string): number

declare function ZO_ScrollList_GetDataTypeTable(
  this: void,
  list: Control,
  typeId: number
): ZoScrollListDataType | undefined

declare function ZO_CurrencyControl_SetSimpleCurrency(
  this: void,
  control: Control,
  currencyType: number,
  amount: number,
  options: unknown
): void

declare const ITEM_SLOT_CURRENCY_OPTIONS: unknown

interface LamDropdownData {
  scrollable?: boolean
}
