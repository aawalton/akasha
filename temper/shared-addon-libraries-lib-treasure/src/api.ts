import { asNumber } from "./casts"
import { icons } from "./icons"
import { lib } from "./lib-state"
import type { PinRecord } from "./types"

export function LibTreasure_GetAllItemsData(this: void): Record<number, PinRecord> {
  return lib.data.ITEMS_DATA
}

export function LibTreasure_GetItemIdData(this: void, itemId: number): PinRecord | undefined {
  return lib.data.ITEMS_DATA[itemId]
}

export function LibTreasure_GetMapIdData(this: void, mapId: number): PinRecord[] | undefined {
  return lib.data.MAP_ID_DATA[mapId]
}

export function LibTreasure_GetTextureData(this: void, textureName: string): PinRecord | undefined {
  return lib.data.TEXTURE_NAME_DATA[textureName]
}

export function LibTreasure_GetBookIdItemId(this: void, _bookId: number): number | undefined {
  const bookId = lib.data.BOOK_ID
  return bookId[asNumber(bookId)]
}

export function LibTreasure_GetIcons(this: void): string[] {
  return icons
}

export function LibTreasure_AddIcon(this: void, path: string): undefined {
  icons[icons.length] = path
  return undefined
}
