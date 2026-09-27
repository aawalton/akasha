import type { ShoppingSettings } from "akasha/temper/economy/shopping/modules/shopping-settings/shopping-settings.module.code.ts"
import type {
  PurchaseRecommendation,
  ShoppingPlan,
} from "akasha/temper/economy/shopping/modules/ttc-shopping-types/ttc-shopping-types.module.code.ts"
import type { Fills } from "akasha/temper/web/modules/use-web-phrases/use-web-phrases.module.code.tsx"

type OptimizerStatus = "idle" | "searching" | "complete" | "error"

type OptimizerFault = { readonly phrase: string; readonly fills: Fills } | { readonly told: string }

export interface OptimizerState {
  status: OptimizerStatus
  plan: ShoppingPlan | null
  progress: number
  searchCompleted: number
  searchTotal: number
  currentLocationIndex: number
  error: OptimizerFault | null
  missingItems: Set<string>
  initialPurchaseCount: number
  purchasedCount: number
  completedLocationCount: number
  spentTotal: number
}

export interface LocationPurchase {
  guildName: string
  purchases: readonly PurchaseRecommendation[]
}

export interface LocationSummary {
  location: string
  itemCount: number
  cost: number
}

export interface OptimizerDerived {
  currentLocation: string | null
  locationPurchases: readonly LocationPurchase[]
  routeSummary: readonly LocationSummary[]
  locationCount: number
  currentLocationCost: number
  stopNumber: number
  totalStops: number
}

export interface NotAvailableParam {
  raw: ShoppingSettings | null
  userId: string | null
}

export type ShoppingMarks = ShoppingSettings | Record<string, boolean> | undefined

export type UpdateShoppingMarks = (keys: readonly string[]) => Promise<void>
