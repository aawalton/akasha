import type { Key } from "../../../things/properties/key.text-property.ts"
import type { Alliance } from "../temper-companion-things/properties/alliance.text-property.ts"
import type { ClassPassiveId } from "../temper-companion-things/properties/class-passive-id.text-property.ts"
import type { EsoCompanionId } from "../temper-companion-things/properties/eso-companion-id.number-property.ts"
import type { PassiveEffects } from "../temper-companion-things/properties/passive-effects.page-property-entry.ts"
import type { Subtitle } from "../temper-companion-things/properties/subtitle.text-property.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.types.ts"

export type TemperEsoCompanion = TemperCompanionThing & {
  key: Key
  subtitle?: Subtitle
  alliance: Alliance
  esoCompanionId: EsoCompanionId
  classPassiveId?: ClassPassiveId
  passiveEffects?: PassiveEffects
}
