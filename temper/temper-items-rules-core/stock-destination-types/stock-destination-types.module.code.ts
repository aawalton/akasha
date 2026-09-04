import type { CharacterId } from "../use-destination-types/use-destination-types.module.code.ts"

export interface StockDestinationContext {
  readonly characterPriority: ReadonlyArray<CharacterId>
  readonly getStockOnChar: (itemId: number, charId: CharacterId) => number
  readonly getStockOnCharForGroup?: (itemIds: ReadonlySet<number>, charId: CharacterId) => number
}
