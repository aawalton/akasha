import type { VerifiedStats } from "akasha/temper/player/character/stat/temper-stat-case/properties/verified-stats.file-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperStatCase = TemperThing & {
  verifiedStats: VerifiedStats
}
