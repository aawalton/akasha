import { potions } from "akasha/temper/catalog/alchemy/modules/potion-source/potion-source.module.code.ts"
import { foodOrDrink } from "akasha/temper/character-source/modules/food-or-drink-source/food-or-drink-source.module.code.ts"
import type { PipelineStage } from "akasha/temper/character-stat/modules/pipeline-types/pipeline-types.module.code.ts"
import { lookupSourceUnlessSentinel } from "akasha/temper/character-stat/modules/source-lookup/source-lookup.module.code.ts"

export const extractConsumables: PipelineStage = (build, _context) => {
  const sources = []

  const consumableSource = lookupSourceUnlessSentinel(
    foodOrDrink,
    build.consumables.foodOrDrink,
    "no-food-or-drink"
  )
  if (consumableSource) {
    sources.push(consumableSource)
  }

  const potionSource = lookupSourceUnlessSentinel(potions, build.consumables.potion, "no-potion")
  if (potionSource) {
    sources.push(potionSource)
  }

  return sources
}
