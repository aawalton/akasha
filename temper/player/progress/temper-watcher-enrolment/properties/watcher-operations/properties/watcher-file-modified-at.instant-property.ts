import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const watcherFileModifiedAt = {
  id: "01a0d8b3-3ec6-73e3-aa4b-41abf489f744",
  type: "page-type/instant-property",
  slug: "watcher-file-modified-at",
  propertySlug: "file-modified-at",
  definition: "when the game last wrote the file a watcher's import read",
  types: "ts",
} as const satisfies InstantProperty
