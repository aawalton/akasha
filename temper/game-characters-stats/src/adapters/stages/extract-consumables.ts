import { foodOrDrink } from "@temper/game-characters-character/food-and-drink/food-or-drink-source"
import { potions } from "@akasha/temper-alchemy/potion-source"
import { lookupSourceUnlessSentinel } from "./source-lookup"
import type { PipelineStage } from "./types"

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
