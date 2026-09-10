import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type EnemyTypes = string

export const enemyTypes = {
  id: "01a06193-6ca6-7e57-b847-abc05109ad79",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "enemy-types",
  propertySlug: "enemy-types",
  definition: "the sort of enemy a test holds for",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
