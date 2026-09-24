import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { EsoDisplayName } from "akasha/temper/player/character/temper-account/properties/eso-display-name.text-property.types.ts"
import type { LastScannedAt } from "akasha/temper/player/character/temper-account/properties/last-scanned-at.instant-property.types.ts"
import type { LocationId } from "akasha/temper/player/character/temper-account/properties/location-id.text-property.types.ts"

export type ReadingLocations = "jsonl"

export type ReadingLocationsRow = {
  id: Id
  locationId: LocationId
  displayName: EsoDisplayName
  lastScannedAt: LastScannedAt
}
