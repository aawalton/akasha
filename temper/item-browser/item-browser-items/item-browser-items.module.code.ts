import { ITEMS_PART_1 } from "../item-browser-items-1/item-browser-items-1.module.code.ts"
import { ITEMS_PART_2 } from "../item-browser-items-2/item-browser-items-2.module.code.ts"
import { ITEMS_PART_3 } from "../item-browser-items-3/item-browser-items-3.module.code.ts"

export interface RawItem {
  readonly id: number
  readonly flags: number
  readonly sources: ReadonlyArray<number | readonly number[]>
  readonly ext?: number
  readonly alt?: string
}

export const ITEMS: readonly RawItem[] = [...ITEMS_PART_1, ...ITEMS_PART_2, ...ITEMS_PART_3]
