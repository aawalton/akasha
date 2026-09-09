import type { TextProperty } from "@akasha/pages/text-property"

export type HdApplication = string

export const hdApplication = {
  id: "01a06193-6ca2-7a60-a837-a1ca59995789",
  pageTypeSlug: "text-property",
  slug: "hd-application",
  propertySlug: "hd-application",
  definition: "how healing done is read against a heal over time",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
} as const satisfies TextProperty
