import type { TextProperty } from "@akasha/pages-system/text-property"

export type LiveBuildId = string

export const liveBuildId = {
  id: "01a05fcd-f545-7d48-9dcc-6dc427e56e01",
  pageTypeSlug: "text-property",
  slug: "live-build-id",
  propertySlug: "live-build-id",
  definition: "the build a character is wearing right now",
  max: 36,
  nameFormatSlug: "name-format/lower-uuid",
} as const satisfies TextProperty
