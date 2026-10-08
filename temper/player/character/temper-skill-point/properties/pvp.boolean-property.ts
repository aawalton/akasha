import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const pvp = {
  id: "01a0c621-d1a9-7038-b83c-67261a3d7bce",
  type: "page-type/boolean-property",
  slug: "pvp",
  propertySlug: "pvp",
  definition: "whether a skill point is reached only through player-versus-player territory",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A source reached without player-versus-player territory states nothing here.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-21T22:41:40.265Z",
  updatedAt: "2026-09-21T22:42:20.000Z",
} as const satisfies BooleanProperty
