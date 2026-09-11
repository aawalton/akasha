import type { TemperCompanionThing } from "akasha/temper/catalog/temper-companions/temper-companion-things/temper-companion-thing.page-type.types.ts"
import type { Category } from "akasha/temper/things/properties/category.text-property.types.ts"
import type { CompanionId } from "akasha/temper/things/properties/companion-id.text-property.types.ts"
import type { DisplayOrder } from "akasha/temper/things/properties/display-order.number-property.types.ts"
import type { Key } from "akasha/temper/things/properties/key.text-property.types.ts"

export type TemperCompanionSkillLine = TemperCompanionThing & {
  key: Key
  companionId: CompanionId
  category: Category
  displayOrder: DisplayOrder
}
