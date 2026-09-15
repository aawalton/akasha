import type { TemperCompanionThing } from "akasha/temper/catalog/temper-companions/temper-companion-thing/temper-companion-thing.page-type.types.ts"
import type { Key } from "akasha/temper/thing/properties/key.text-property.types.ts"

export type TemperCompanionSkillSlot = TemperCompanionThing & {
  key: Key
}
