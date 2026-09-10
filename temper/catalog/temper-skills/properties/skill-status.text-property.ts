import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type SkillStatus = string

export const skillStatus = {
  id: "01a05fca-cb87-719f-b348-33ad77e63005",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "skill-status",
  propertySlug: "status",
  definition: "how far temper works out what a skill does",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
