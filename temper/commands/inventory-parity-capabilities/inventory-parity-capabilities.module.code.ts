import * as utilsNarrow from "@akasha/utils/narrow/assert-never"
import type { InventoryItemData } from "akasha/temper/temper-items-core/inventory-types/inventory-types.module.code.ts"
import * as parityRoutingModule from "../inventory-parity-routing/inventory-parity-routing.module.code.ts"
import * as parityAddonTraceModule from "../inventory-parity-trace/inventory-parity-trace.module.code.ts"

export interface ParityAddonTrace {
  readonly signals: {
    readonly itemType?: number
    readonly specializedItemType?: number
    readonly filterType?: number
    readonly traitType?: number
    readonly equipType?: number
    readonly armorType?: number
    readonly weaponType?: number
    readonly quality?: number
  }
  readonly classification: { readonly leafCategoryId: string }
  readonly orderedWalk: {
    readonly matched?: {
      readonly index: number
      readonly action: string
      readonly destination?: string | null
    }
    readonly rejections: readonly {
      readonly index: number
      readonly reason: string
      readonly detail?: string
    }[]
  }
}

export type MatchedRoute = parityRoutingModule.MatchedRoute

export type RoutingDiff = parityRoutingModule.RoutingDiff

interface AddonTrace {
  readonly loadParityAddonTraceFromContent: (content: string, itemId: number) => ParityAddonTrace
}

interface Routing {
  readonly matchedRouteFrom: (
    action: string | undefined,
    destination: string | null | undefined
  ) => MatchedRoute | undefined
  readonly computeRoutingDiff: (
    sourceCharId: string,
    item: InventoryItemData,
    webMatch: MatchedRoute | undefined,
    addonMatch: MatchedRoute | undefined
  ) => RoutingDiff
  readonly renderRoutingSection: (diff: RoutingDiff) => string
}

interface UtilsNarrow {
  readonly assertNever: (value: never) => never
}

export function parityAddonTrace(): Promise<AddonTrace> {
  return Promise.resolve(parityAddonTraceModule)
}

export function parityRouting(): Promise<Routing> {
  return Promise.resolve(parityRoutingModule)
}

export function parityNarrow(): Promise<UtilsNarrow> {
  return Promise.resolve(utilsNarrow)
}
