import type { PageType } from "@akasha/pages-system/page-type"
import type { TemperHoldingsThing } from "../temper-holdings-things/temper-holdings-thing.page-type.ts"
import type { BagSizes } from "./properties/bag-sizes.page-property-entry.ts"
import type { ChunkCount } from "./properties/chunk-count.number-property.ts"
import type { CraftingLevels } from "./properties/crafting-levels.page-property-entry.ts"
import type { Currencies } from "./properties/currencies.page-property-entry.ts"
import type { Data } from "./properties/data.file-property.ts"
import type { LastFullScanAt } from "./properties/last-full-scan-at.instant-property.ts"
import type { OpenCooldowns } from "./properties/open-cooldowns.page-property-entry.ts"
import type { PlacedFurnishings } from "./properties/placed-furnishings.page-property-entry.ts"
import type { PriceSource } from "./properties/price-source.text-property.ts"
import type { SnapshotLocations } from "./properties/snapshot-locations.page-property-entry.ts"
import type { Stacks } from "./properties/stacks.page-property-entry.ts"
import type { TransmuteCrystalAmount } from "./properties/transmute-crystal-amount.number-property.ts"
import type { TransmuteCrystalCap } from "./properties/transmute-crystal-cap.number-property.ts"

export type TemperInventorySnapshot = TemperHoldingsThing & {
  chunkCount: ChunkCount
  data?: Data
  stacks?: Stacks
  lastFullScanAt?: LastFullScanAt
  priceSource?: PriceSource
  transmuteCrystalAmount?: TransmuteCrystalAmount
  transmuteCrystalCap?: TransmuteCrystalCap
  locations?: SnapshotLocations
  bagSizes?: BagSizes
  currencies?: Currencies
  craftingLevels?: CraftingLevels
  placedFurnishings?: PlacedFurnishings
  openCooldowns?: OpenCooldowns
}

export const temperInventorySnapshot = {
  id: "01a05fcb-fd2d-7480-88fb-8cc035361a6e",
  pageTypeSlug: "page-type",
  slug: "temper-inventory-snapshot",
  definition: "one whole reading of everything an account carries and banks",
  pluralSlug: "temper-inventory-snapshots",
  extendsSlug: "page-type/temper-holdings-thing",
  partSlugs: [
    "boolean-property/bop-tradeable",
    "boolean-property/bound",
    "boolean-property/crafted",
    "boolean-property/is-container",
    "boolean-property/known",
    "boolean-property/locked",
    "boolean-property/quest-relevant",
    "boolean-property/reconstructed",
    "boolean-property/stolen",
    "boolean-property/transmuted",
    "file-property/data",
    "instant-property/last-full-scan-at",
    "instant-property/last-scanned-at",
    "instant-property/ready-at",
    "number-property/amount-count",
    "number-property/bag",
    "number-property/bag-size",
    "number-property/chunk-count",
    "number-property/craft-type-id",
    "number-property/crafting-level",
    "number-property/currency-amount",
    "number-property/estimated-value",
    "number-property/furniture-category-id",
    "number-property/furniture-subcategory-id",
    "number-property/min-price",
    "number-property/replacement-cost",
    "number-property/sale-amount-count",
    "number-property/sale-avg",
    "number-property/slot",
    "number-property/stack-count",
    "number-property/suggested-price",
    "number-property/transmute-crystal-amount",
    "number-property/transmute-crystal-cap",
    "page-property-entry/bag-sizes",
    "page-property-entry/crafting-levels",
    "page-property-entry/currencies",
    "page-property-entry/snapshot-locations",
    "page-property-entry/open-cooldowns",
    "page-property-entry/placed-furnishings",
    "page-property-entry/stacks",
    "relation-property/currency-key",
    "text-property/collectible-link",
    "text-property/cooldown-key",
    "text-property/currency-scope",
    "text-property/furnishing-key",
    "text-property/furniture-category",
    "text-property/item-link",
    "text-property/location-id",
    "text-property/price-source",
  ],
  properties: [
    { pagePropertySlug: "account-page", required: true, many: false },
    { pagePropertySlug: "captured-at", required: true, many: false },
    { pagePropertySlug: "total-value", required: true, many: false },
    { pagePropertySlug: "chunk-count", required: true, many: false },
    { pagePropertySlug: "stacks", required: false, many: false },
    { pagePropertySlug: "data", required: false, many: false },
    { pagePropertySlug: "last-full-scan-at", required: false, many: false },
    { pagePropertySlug: "price-source", required: false, many: false },
    { pagePropertySlug: "transmute-crystal-amount", required: false, many: false },
    { pagePropertySlug: "transmute-crystal-cap", required: false, many: false },
    { pagePropertySlug: "page-property-entry/snapshot-locations", required: false, many: false },
    { pagePropertySlug: "bag-sizes", required: false, many: false },
    { pagePropertySlug: "currencies", required: false, many: false },
    { pagePropertySlug: "crafting-levels", required: false, many: false },
    { pagePropertySlug: "placed-furnishings", required: false, many: false },
    { pagePropertySlug: "open-cooldowns", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A slug opens with `at-` ahead of the moment the reading was taken.",
    },
    {
      invariantKind: "departure",
      statement: "One JSON document is written across every chunk a snapshot counts.",
    },
  ],
} as const satisfies PageType
