import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const completion = {
  id: "01a05fc7-243a-7845-a43d-fcbdc7c24ce0",
  type: "file-property",
  slug: "completion",
  propertySlug: "completion",
  definition: "what the game says has been finished, as the game handed it over",
  extensions: ["json"],
  types: "ts",
} as const satisfies FileProperty
