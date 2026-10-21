import type { VerifiedTooltips } from "akasha/temper/player/character/stat/temper-tooltip-case/properties/verified-tooltips.file-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type TemperTooltipCase = TemperThing & {
  verifiedTooltips: VerifiedTooltips
}
