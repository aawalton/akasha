import type { PinType } from "../lost-treasure-constants/lost-treasure-constants.module.code.ts"

export interface PinPlacement {
  itemId: number
  x: number
  y: number
}

export interface PinData extends PinPlacement {
  pinType: PinType
  mapId: number
  texture: string
  zone: string
  itemName: string
  lastOpenedTreasureMap: string
  lastOpenedBookId: number
}

export interface ItemCacheEntry {
  uniqueIdString: string
  itemId: number
  itemLink: string
}

export interface SlotData {
  bag: number
  index: number
  specializedItemType: number
  name: string
  uniqueId: Id64
}
