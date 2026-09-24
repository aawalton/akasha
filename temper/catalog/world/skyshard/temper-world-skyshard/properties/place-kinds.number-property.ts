import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const placeKinds = {
  id: "01a0d5d4-6c7f-7d11-b6a8-b978871353e0",
  type: "page-type/number-property",
  slug: "place-kinds",
  propertySlug: "place-kinds",
  definition: "what a map says of the ground a place sits in, each kind a number from one to five",
  max: 5,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One is a town, two a delve, three a public dungeon, four under ground and five a group delve.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The first kind a place states is the one its tooltip names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A place stating no kind, a town or under ground is shown on the compass.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
