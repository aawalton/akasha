import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const settings = {
  id: "01a05fcd-f557-76dc-9c28-6c2035109440",
  type: "file-property",
  slug: "settings",
  propertySlug: "settings",
  definition: "how a player has asked temper to behave, as temper wrote it out",
  extensions: ["json"],
  types: "ts",
} as const satisfies FileProperty
