import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { IsPerfected } from "akasha/temper/player/character/temper-mine/properties/is-perfected.boolean-property.types.ts"
import type { NumRequired } from "akasha/temper/player/character/temper-mine/properties/num-required.number-property.types.ts"

export type SetBonuses = List<{
  description: Description
  isPerfected: IsPerfected
  numRequired: NumRequired
}>
