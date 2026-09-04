import type {
  PIN_TYPE_CLUES,
  PIN_TYPE_SURVEYS,
  PIN_TYPE_TREASURE,
} from "../treasure-constants/treasure-constants.module.code.ts"

export type PinType = typeof PIN_TYPE_TREASURE | typeof PIN_TYPE_SURVEYS | typeof PIN_TYPE_CLUES

export type PinLayout = readonly [x: number, y: number, texture: string, itemId: number]

export type AllData = Record<number, Partial<Record<PinType, readonly PinLayout[]>>>

export interface PinRecord {
  itemId: number
  mapId: number
  pinType: PinType
  x: number
  y: number
  texture: string
}

export interface LibTreasureData {
  ITEMS_DATA: Record<number, PinRecord>
  MAP_ID_DATA: Record<number, PinRecord[]>
  TEXTURE_NAME_DATA: Record<string, PinRecord>
  BOOK_ID: Record<number, number>
}

export interface LibTreasureTable {
  name: string
  version: number | undefined
  data: LibTreasureData
  icons: string[]
}
