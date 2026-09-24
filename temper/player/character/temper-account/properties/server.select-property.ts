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
} as const satisfies SelectProperty
