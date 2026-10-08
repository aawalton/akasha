import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const server = {
  id: "01a06e4f-b738-785a-b942-ef91c66319dc",
  type: "page-type/select-property",
  slug: "server",
  propertySlug: "server",
  definition: "the megaserver of a player's account",
  values: ["NA", "EU"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A megaserver has its own trading prices.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-04T21:25:13.144Z",
  updatedAt: "2026-09-24T16:58:05.000Z",
} as const satisfies SelectProperty
