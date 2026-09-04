import type { TextProperty } from "@akasha/pages-system/text-property"

export type ValidRoles = string

export const validRoles = {
  id: "01a05fcf-90fe-7faf-8ab5-b05131821f7e",
  pageTypeSlug: "text-property",
  slug: "valid-roles",
  propertySlug: "valid-roles",
  definition: "a role a skill suits",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
} as const satisfies TextProperty
