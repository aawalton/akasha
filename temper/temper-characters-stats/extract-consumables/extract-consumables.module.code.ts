import { potions } from "akasha/temper/temper-alchemy/potion-source/potion-source.module.code.ts"
import { foodOrDrink } from "../../character-sources/food-or-drink-source/food-or-drink-source.module.code.ts"
import type { PipelineStage } from "../pipeline-types/pipeline-types.module.code.ts"
import { lookupSourceUnlessSentinel } from "../source-lookup/source-lookup.module.code.ts"

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
