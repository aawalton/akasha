import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const pinnedReading = {
  id: "01a16fd9-1775-71b8-a4da-badc2e31cfff",
  type: "page-type/file-property",
  slug: "pinned-reading",
  propertySlug: "pinned-reading",
  definition: "the reading a combat case was pinned from, as its character's readings held it",
  extensions: ["json"],
  runsFileLength: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The file is the reading's line, copied whole when the case is pinned.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The file outlives the line it was copied from in the character's readings.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-24T21:37:40.723Z",
  updatedAt: "2026-10-24T21:37:40.723Z",
} as const satisfies FileProperty
