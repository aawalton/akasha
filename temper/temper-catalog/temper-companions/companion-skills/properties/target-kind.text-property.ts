import type { TextProperty } from "@akasha/pages/text-property"

export type TargetKind = string

export const targetKind = {
  id: "01a06193-6c9e-705c-af85-3dc816a00a9a",
  pageTypeSlug: "text-property",
  slug: "target-kind",
  propertySlug: "type",
  definition: "who or what an effect lands on",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
