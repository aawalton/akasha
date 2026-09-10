import type { Key } from "../../../things/properties/key.text-property.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.types.ts"

export type TemperCompanionSkillSlot = TemperCompanionThing & {
  key: Key
}
