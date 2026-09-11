import type { Description } from "akasha/pages/properties/description.text-property.types.ts"
import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"
import type { IsPerfected } from "akasha/temper/characters/temper-mines/properties/is-perfected.boolean-property.types.ts"
import type { NumRequired } from "akasha/temper/characters/temper-mines/properties/num-required.number-property.types.ts"

export type SetBonuses = List<{
  description: Description
  isPerfected: IsPerfected
  numRequired: NumRequired
}>
