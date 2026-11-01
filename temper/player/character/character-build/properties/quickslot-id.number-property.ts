import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const quickslotId = {
  id: "01a19946-cb82-70eb-977f-9c33cebc5f5e",
  type: "page-type/number-property",
  slug: "quickslot-id",
  propertySlug: "id",
  definition: "the game's id for what a quickslot holds",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item is held by its item id, and anything else by the id the game slots it by.",
    },
  ],
  types: "ts",
  createdAt: "2026-11-01T22:41:56.096Z",
  updatedAt: "2026-11-01T22:41:56.096Z",
} as const satisfies NumberProperty
