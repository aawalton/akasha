import type { InstantProperty } from "@akasha/pages/instant-property"

export type UpdatedAt = string

export const updatedAt = {
  id: "01a07293-b84f-74d7-90cc-6208d5fc468f",
  pageTypeSlug: "instant-property",
  slug: "updated-at",
  propertySlug: "updated-at",
  definition: "when a rule was last changed by the player who holds it",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The game is told this so the game knows which rules it has already seen.",
    },
    {
      invariantKind: "departure",
      statement: "This is the moment the player changed the rule rather than the moment it landed.",
    },
  ],
} as const satisfies InstantProperty
