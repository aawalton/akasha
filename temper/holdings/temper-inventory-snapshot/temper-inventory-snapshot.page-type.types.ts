import type { CapturedAt } from "akasha/temper/catalog/temper-world/properties/captured-at.instant-property.types.ts"
import type { BagSizes } from "akasha/temper/holdings/temper-inventory-snapshot/properties/bag-sizes.page-property-entry.types.ts"
import type { ChunkCount } from "akasha/temper/holdings/temper-inventory-snapshot/properties/chunk-count.number-property.types.ts"
import type { CraftingLevels } from "akasha/temper/holdings/temper-inventory-snapshot/properties/crafting-levels.page-property-entry.types.ts"
import type { Currencies } from "akasha/temper/holdings/temper-inventory-snapshot/properties/currencies.page-property-entry.types.ts"
import type { Data } from "akasha/temper/holdings/temper-inventory-snapshot/properties/data.file-property.types.ts"
import type { LastFullScanAt } from "akasha/temper/holdings/temper-inventory-snapshot/properties/last-full-scan-at.instant-property.types.ts"
import type { OpenCooldowns } from "akasha/temper/holdings/temper-inventory-snapshot/properties/open-cooldowns.page-property-entry.types.ts"
import type { PlacedFurnishings } from "akasha/temper/holdings/temper-inventory-snapshot/properties/placed-furnishings.page-property-entry.types.ts"
import type { PriceSource } from "akasha/temper/holdings/temper-inventory-snapshot/properties/price-source.text-property.types.ts"
import type { SnapshotLocations } from "akasha/temper/holdings/temper-inventory-snapshot/properties/snapshot-locations.page-property-entry.types.ts"
import type { Stacks } from "akasha/temper/holdings/temper-inventory-snapshot/properties/stacks.page-property-entry.types.ts"
import type { TransmuteCrystalAmount } from "akasha/temper/holdings/temper-inventory-snapshot/properties/transmute-crystal-amount.number-property.types.ts"
import type { TransmuteCrystalCap } from "akasha/temper/holdings/temper-inventory-snapshot/properties/transmute-crystal-cap.number-property.types.ts"
import type { TotalValue } from "akasha/temper/holdings/thing/properties/total-value.number-property.types.ts"
import type { TemperHoldingsThing } from "akasha/temper/holdings/thing/temper-holdings-thing.page-type.types.ts"
import type { AccountPage } from "akasha/temper/thing/properties/account-page.text-property.types.ts"

export type TemperInventorySnapshot = TemperHoldingsThing & {
  accountPage: AccountPage
  capturedAt: CapturedAt
  totalValue: TotalValue
  chunkCount: ChunkCount
  stacks?: Stacks
  data?: Data
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
