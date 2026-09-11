import type { Alliance } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/alliance.text-property.types.ts"
import type { ClassPassiveId } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/class-passive-id.text-property.types.ts"
import type { EsoCompanionId } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/eso-companion-id.number-property.types.ts"
import type { PassiveEffects } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/passive-effects.page-property-entry.types.ts"
import type { Subtitle } from "akasha/temper/catalog/temper-companions/temper-companion-things/properties/subtitle.text-property.types.ts"
import type { TemperCompanionThing } from "akasha/temper/catalog/temper-companions/temper-companion-things/temper-companion-thing.page-type.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperEsoCompanion = TemperCompanionThing & {
  key: Key
  subtitle?: Subtitle
  alliance: Alliance
  esoCompanionId: EsoCompanionId
  classPassiveId?: ClassPassiveId
  passiveEffects?: PassiveEffects
}
