import type { PinnedReading } from "akasha/temper/player/character/stat/temper-combat-case/properties/pinned-reading.file-property.types.ts"
import type { VerifiedHits } from "akasha/temper/player/character/stat/temper-combat-case/properties/verified-hits.file-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperCombatCase = TemperThing & {
  verifiedHits: VerifiedHits
  pinnedReading: PinnedReading
}
