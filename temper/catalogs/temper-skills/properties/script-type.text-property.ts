import type { TextProperty } from "@akasha/pages/text-property"

export type ScriptType = string

export const scriptType = {
  id: "01a05fca-cb86-7ada-8ab9-4822a45c4ebf",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "script-type",
  propertySlug: "script-type",
  definition: "which of the three scripts a scribing source yields",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
