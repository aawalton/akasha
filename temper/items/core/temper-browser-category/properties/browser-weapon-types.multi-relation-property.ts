import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const browserWeaponTypes = {
  id: "01a0e11e-6894-7680-aa8e-e1e42184f449",
  type: "page-type/multi-relation-property",
  slug: "browser-weapon-types",
  propertySlug: "weapon-types",
  definition: "the kinds of weapon an item browser category takes",
  targetPageType: "page-type/temper-weapon-type",
  types: "ts",
} as const satisfies MultiRelationProperty
