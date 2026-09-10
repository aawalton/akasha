import type { Category } from "../../../things/properties/category.text-property.ts"
import type { CompanionId } from "../../../things/properties/companion-id.text-property.ts"
import type { DisplayOrder } from "../../../things/properties/display-order.number-property.ts"
import type { Key } from "../../../things/properties/key.text-property.ts"
import type { TemperCompanionThing } from "../temper-companion-things/temper-companion-thing.page-type.types.ts"

export type TemperCompanionSkillLine = TemperCompanionThing & {
  key: Key
  companionId: CompanionId
  category: Category
  displayOrder: DisplayOrder
}
