import type { FileProperty } from "@akasha/pages-system/file-property"

export type Settings = "json"

export const settings = {
  id: "01a05fcd-f557-76dc-9c28-6c2035109440",
  pageTypeSlug: "file-property",
  slug: "settings",
  propertySlug: "settings",
  definition: "how a player has asked temper to behave, as temper wrote it out",
} as const satisfies FileProperty
