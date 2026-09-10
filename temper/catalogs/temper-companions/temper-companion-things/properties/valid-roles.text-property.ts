import type { List } from "@akasha/pages/page-property"
import type { TextProperty } from "@akasha/pages/text-property"

export type ValidRoles = List<string>

export const validRoles = {
  id: "01a05fcf-90fe-7faf-8ab5-b05131821f7e",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "valid-roles",
  propertySlug: "valid-roles",
  definition: "a role a skill suits",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
