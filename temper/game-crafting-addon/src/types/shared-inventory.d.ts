interface SharedInventorySlotData {
  bagId: number
  slotIndex: number
  stackCount: number
  uniqueId: Id64
  itemType: number
  iconFile: string
  name: string
  quality: number
  uid?: string
  lnk?: string
}

interface SharedInventoryManager {
  GenerateFullSlotData(
    filterFunction: ((slotData: SharedInventorySlotData) => boolean) | undefined,
    ...bagIds: number[]
  ): SharedInventorySlotData[]
  RegisterCallback(callbackName: string, callback: (this: void, ...args: never[]) => void): void
}

declare const SHARED_INVENTORY: SharedInventoryManager
