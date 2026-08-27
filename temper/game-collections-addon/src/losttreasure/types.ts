import type { PinType } from "./constants"

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
