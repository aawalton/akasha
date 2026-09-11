import type { RuleMatcherContext } from "akasha/temper/items-rules-core/rule-matcher-context-types/rule-matcher-context-types.module.code.ts"
import type { StockDestinationContext } from "akasha/temper/items-rules-core/stock-destination-types/stock-destination-types.module.code.ts"
import {
  type CharacterId,
  characterId,
} from "akasha/temper/items-rules-core/use-destination-types/use-destination-types.module.code.ts"

export function buildStockDestinationContext(context: RuleMatcherContext): StockDestinationContext {
  const readOne = (itemId: number, charId: CharacterId): number => {
    const charStock = context.consumableStock.get(itemId)
    if (charStock === undefined) return 0
    return charStock.get(charId) ?? 0
  }
  return {
    characterPriority: context.characterPriority.map((id) => characterId(id)),
    getStockOnChar: readOne,
    getStockOnCharForGroup: (itemIds, charId) => {
      let sum = 0
      for (const id of itemIds) sum += readOne(id, charId)
      return sum
    },
  }
}
