import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const quickslotKind = {
  id: "01a19946-cb82-714e-8c49-e40ffe6bb901",
  type: "page-type/select-property",
  slug: "quickslot-kind",
  propertySlug: "kind",
  definition: "what sort of thing a quickslot holds",
  values: ["item", "collectible", "emote", "quick-chat"],
  types: "ts",
  createdAt: "2026-11-01T22:41:56.096Z",
  updatedAt: "2026-11-01T22:41:56.096Z",
} as const satisfies SelectProperty
