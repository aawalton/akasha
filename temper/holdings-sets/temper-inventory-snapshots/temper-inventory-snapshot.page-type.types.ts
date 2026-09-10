import type { CapturedAt } from "../../catalogs/temper-world/properties/captured-at.instant-property.ts"
import type { AccountPage } from "../../things/properties/account-page.text-property.ts"
import type { TotalValue } from "../things/properties/total-value.number-property.ts"
import type { TemperHoldingsThing } from "../things/temper-holdings-thing.page-type.types.ts"
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
