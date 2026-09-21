import type { List } from "akasha/page/type/page-property/page-property.page-type.ts"
import type { baseRoles } from "akasha/temper/player/character/companion-build/properties/base-roles.select-property.ts"

export type BaseRoles = List<(typeof baseRoles.values)[number]>
