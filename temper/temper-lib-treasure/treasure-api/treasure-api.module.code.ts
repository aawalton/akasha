import { asNumber } from "../treasure-casts/treasure-casts.module.code.ts"
import { ICONS } from "../treasure-icons/treasure-icons.module.code.ts"
import { LIB } from "../treasure-lib-state/treasure-lib-state.module.code.ts"
import type { PinRecord } from "../treasure-types/treasure-types.module.code.ts"

export function libTreasureGetAllItemsData(this: void): Record<number, PinRecord> {
  return LIB.data.ITEMS_DATA
}

export function libTreasureGetItemIdData(this: void, itemId: number): PinRecord | undefined {
  return LIB.data.ITEMS_DATA[itemId]
}

export function libTreasureGetMapIdData(this: void, mapId: number): PinRecord[] | undefined {
  return LIB.data.MAP_ID_DATA[mapId]
}

export function libTreasureGetTextureData(this: void, textureName: string): PinRecord | undefined {
  return LIB.data.TEXTURE_NAME_DATA[textureName]
}

export function libTreasureGetBookIdItemId(this: void, _bookId: number): number | undefined {
  const bookId = LIB.data.BOOK_ID
  return bookId[asNumber(bookId)]
}

export function libTreasureGetIcons(this: void): string[] {
  return ICONS
}

export function libTreasureAddIcon(this: void, path: string): undefined {
  ICONS[ICONS.length] = path
  return undefined
}
