import type { List } from "akasha/pages/types/page-properties/page-property.page-type.ts"
import type { baseRoles } from "akasha/temper/characters/companion-builds/properties/base-roles.select-property.ts"

export type BaseRoles = List<(typeof baseRoles.values)[number]>
