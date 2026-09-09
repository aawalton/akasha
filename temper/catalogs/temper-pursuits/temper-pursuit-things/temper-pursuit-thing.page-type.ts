import type { PageType } from "@akasha/pages/page-type"

export const temperPursuitThing = {
  id: "01a06153-0ea9-7002-8317-f34518274d6f",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "temper-pursuit-thing",
  definition: "one node of a catalog the game shows a player's progress against",
  pluralSlug: "temper-pursuit-things",
  extends: ["page-type/temper-catalog-thing"],
  parts: ["number-property/eso-collectible-id"],
  properties: [
    { pageProperty: "number-property/eso-collectible-id", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A property more than one pursuit page type has is declared here.",
    },
  ],
  types: "ts",
} as const satisfies PageType
