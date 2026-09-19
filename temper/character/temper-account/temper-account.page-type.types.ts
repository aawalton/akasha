import type { CapturedAt } from "akasha/temper/catalog/temper-world/properties/captured-at.instant-property.types.ts"
import type { BagSizes } from "akasha/temper/character/temper-account/properties/bag-sizes.page-property-entry.types.ts"
import type { CraftingLevels } from "akasha/temper/character/temper-account/properties/crafting-levels.page-property-entry.types.ts"
import type { Currencies } from "akasha/temper/character/temper-account/properties/currencies.page-property-entry.types.ts"
import type { Data } from "akasha/temper/character/temper-account/properties/data.file-property.types.ts"
import type { EsoDisplayName } from "akasha/temper/character/temper-account/properties/eso-display-name.text-property.types.ts"
import type { LastFullScanAt } from "akasha/temper/character/temper-account/properties/last-full-scan-at.instant-property.types.ts"
import type { PlacedFurnishings } from "akasha/temper/character/temper-account/properties/placed-furnishings.page-property-entry.types.ts"
import type { PriceSource } from "akasha/temper/character/temper-account/properties/price-source.text-property.types.ts"
import type { SnapshotLocations } from "akasha/temper/character/temper-account/properties/snapshot-locations.page-property-entry.types.ts"
import type { Stacks } from "akasha/temper/character/temper-account/properties/stacks.page-property-entry.types.ts"
import type { TransmuteCrystalAmount } from "akasha/temper/character/temper-account/properties/transmute-crystal-amount.number-property.types.ts"
import type { TransmuteCrystalCap } from "akasha/temper/character/temper-account/properties/transmute-crystal-cap.number-property.types.ts"
import type { WorldName } from "akasha/temper/character/temper-account/properties/world-name.text-property.types.ts"
import type { TemperCharacterThing } from "akasha/temper/character/thing/temper-character-thing.page-type.types.ts"
import type { TotalValue } from "akasha/temper/holdings/thing/properties/total-value.number-property.types.ts"

export type TemperAccount = TemperCharacterThing & {
  displayName?: EsoDisplayName
  worldName?: WorldName
  stacks?: Stacks
  locations?: SnapshotLocations
  bagSizes?: BagSizes
  currencies?: Currencies
  craftingLevels?: CraftingLevels
  placedFurnishings?: PlacedFurnishings
  capturedAt?: CapturedAt
  totalValue?: TotalValue
  lastFullScanAt?: LastFullScanAt
  priceSource?: PriceSource
  transmuteCrystalAmount?: TransmuteCrystalAmount
  transmuteCrystalCap?: TransmuteCrystalCap
  data?: Data
}
