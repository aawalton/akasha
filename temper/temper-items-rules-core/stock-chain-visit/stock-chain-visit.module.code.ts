import type {
  CharEligibility,
  DestinationChain,
  MoveToDestination,
} from "../inventory-rule-types/inventory-rule-types.module.code.ts"

export const BY_PRIORITY_DESTINATION = "character:by-priority"

export interface StockSurplusTier {
  readonly destination: MoveToDestination
  readonly cap: number | undefined
}

export interface StockChainVisitPlan {
  readonly fillTargetQuantity: number
  readonly charEligibility: CharEligibility | undefined
  readonly surplusCascade: readonly StockSurplusTier[]
  readonly surplusDestination: MoveToDestination | undefined
}

export function planStockChainVisit(chain: DestinationChain): StockChainVisitPlan | undefined {
  let fillIndex = -1
  for (let i = 0; i < chain.length; i++) {
    const tier = chain[i]
    if (tier !== undefined && tier.destination === BY_PRIORITY_DESTINATION) {
      fillIndex = i
      break
    }
  }
  if (fillIndex === -1) return undefined

  const fillTier = chain[fillIndex]
  if (fillTier === undefined) return undefined

  const surplusCascade: StockSurplusTier[] = []
  for (let i = fillIndex + 1; i < chain.length; i++) {
    const tier = chain[i]
    if (tier !== undefined) {
      surplusCascade.push({ destination: tier.destination, cap: tier.targetQuantity })
    }
  }

  return {
    fillTargetQuantity: fillTier.targetQuantity ?? 0,
    charEligibility: fillTier.charEligibility,
    surplusCascade,
    surplusDestination: surplusCascade[0]?.destination,
  }
}
