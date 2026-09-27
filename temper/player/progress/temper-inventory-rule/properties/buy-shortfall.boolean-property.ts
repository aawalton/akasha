import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const buyShortfall = {
  id: "01a0e30d-2433-7eaa-8c66-07ea59b9bc84",
  type: "page-type/boolean-property",
  slug: "buy-shortfall",
  propertySlug: "buy-shortfall",
  definition:
    "whether a stocking rule buys at a merchant or guild store what it holds short of its target",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule buys its shortfall only where the rule says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a rule whose action is stock buys its shortfall.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule buys toward the same target a rule crafting its shortfall crafts toward.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a rule holds is counted as a rule crafting its shortfall counts it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule buys its shortfall at a merchant selling an item the rule takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule buys its shortfall at the guild store the player is at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule naming item ids buys the first item in that order the merchant sells.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule buys no more than the gold carried and the merchant allow.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is bought is stocked by the rule's own chain like anything else it takes.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
