import type { EveryBuild } from "akasha/temper/player/character/build-interface/properties/every-build.boolean-property.types.ts"
import type { EveryPassiveStar } from "akasha/temper/player/character/build-interface/properties/every-passive-star.boolean-property.types.ts"
import type { InterfacePassives } from "akasha/temper/player/character/build-interface/properties/interface-passives.record-property.types.ts"
import type { LeftOutPassives } from "akasha/temper/player/character/build-interface/properties/left-out-passives.multi-relation-property.types.ts"
import type { PassiveLineCategories } from "akasha/temper/player/character/build-interface/properties/passive-line-categories.multi-relation-property.types.ts"
import type { PassiveLines } from "akasha/temper/player/character/build-interface/properties/passive-lines.multi-relation-property.types.ts"
import type { SlottedStars } from "akasha/temper/player/character/build-interface/properties/slotted-stars.multi-relation-property.types.ts"
import type { TemperThing } from "akasha/temper/thing/temper-thing.page-type.types.ts"

export type BuildInterface = TemperThing & {
  everyBuild?: EveryBuild
  passiveLines?: PassiveLines
  passiveLineCategories?: PassiveLineCategories
  leftOutPassives?: LeftOutPassives
  interfacePassives?: InterfacePassives
  everyPassiveStar?: EveryPassiveStar
  slottedStars?: SlottedStars
}
