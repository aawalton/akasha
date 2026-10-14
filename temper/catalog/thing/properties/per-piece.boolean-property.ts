import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const perPiece = {
  id: "01a13af5-3158-71b2-a3e4-53598dffbba1",
  type: "page-type/boolean-property",
  slug: "per-piece",
  propertySlug: "per-piece",
  definition: "whether an effect counts once for each armor piece worn",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An effect stating no per-piece counts once for each piece.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An effect stating false counts once if any piece of its weight is worn.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-14T15:08:29.911Z",
  updatedAt: "2026-10-14T15:08:29.911Z",
} as const satisfies BooleanProperty
