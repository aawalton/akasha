import type { SelectProperty } from "@akasha/pages-system/select-property"

export const server = {
  id: "01a06e4f-b738-785a-b942-ef91c66319dc",
  pageTypeSlug: "select-property",
  slug: "server",
  propertySlug: "server",
  definition: "the megaserver a player's account trades on",
  values: ["NA", "EU"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A megaserver holds its own trading prices.",
    },
  ],
} as const satisfies SelectProperty

export type Server = (typeof server.values)[number]
