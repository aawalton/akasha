import type { TextProperty } from "@akasha/pages/text-property"

export type TargetScope = string

export const targetScope = {
  id: "01a06193-6ca3-7e85-96e0-7cf3c6b79ba2",
  pageTypeSlug: "text-property",
  slug: "target-scope",
  propertySlug: "scope",
  definition: "how many the thing an effect lands on covers",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
