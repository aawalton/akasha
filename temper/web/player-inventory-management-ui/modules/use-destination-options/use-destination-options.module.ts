import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useDestinationOptions = {
  id: "01a0636c-5da1-796a-9415-a13769600062",
  type: "page-type/module",
  slug: "use-destination-options",
  definition: "the destinations a rule may send an item to",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A destination a venue or location type page names is labelled by that page's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The Craft Bag group's name is read from the craftbag location type page.",
    },
  ],
} as const satisfies Module
