import type { TTCPriceEntry } from "@akasha/temper-trading-pricing/pricing-types"
import type {
  TTCListingEntry,
  TTCListingSearchParams,
} from "@akasha/temper-trading-pricing/ttc-listing-types"

export const BUDGET_STRATEGY = {
  Tight: 1.05,
  Normal: 1.1,
  Loose: 1.2,
  Scarce: 1.35,
} as const

export interface ShoppingItem {
  key: string
  searchParams: TTCListingSearchParams
  priceData?: TTCPriceEntry
}

export interface ItemBudget {
  key: string
  ceiling: number
  cheapestPrice: number
  multiplier: number
  strategy: keyof typeof BUDGET_STRATEGY
}

export interface TaggedListing {
  key: string
  listing: TTCListingEntry
  unitPrice: number
}

export interface PurchaseRecommendation {
  key: string
  listing: TTCListingEntry
  unitPrice: number
}

export interface ShoppingPlan {
  purchases: readonly PurchaseRecommendation[]
  locations: readonly string[]
  totalCost: number
  missingItems: readonly string[]
  budgets: readonly ItemBudget[]
  alternatives: Record<string, TaggedListing[]>
}
