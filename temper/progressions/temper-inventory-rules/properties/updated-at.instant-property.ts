import type { InstantProperty } from "@akasha/pages/instant-property"

export type UpdatedAt = string

export const updatedAt = {
  id: "01a07293-b84f-74d7-90cc-6208d5fc468f",
  pageTypeSlug: "instant-property",
  type: "instant-property",
  slug: "updated-at",
  propertySlug: "updated-at",
  definition: "when a rule was last changed by the player who holds it",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The game is told when a rule changed so the game knows which rules the game has already seen.",
    },
    {
      invariantKind: "departure",
      statement:
        "This instant is the moment the player changed the rule rather than the moment the rule landed.",
    },
  ],
} as const satisfies InstantProperty
