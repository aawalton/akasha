import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const craftShortfall = {
  id: "01a0d4a2-748f-784d-9240-8cb27db9b45b",
  type: "page-type/boolean-property",
  slug: "craft-shortfall",
  propertySlug: "craft-shortfall",
  definition: "whether a stocking rule crafts what the account holds short of its target",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule crafts its shortfall only where the rule says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a rule whose action is stock crafts its shortfall.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule crafts toward the by-priority leg's quantity for each character that leg takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each leg after the by-priority leg adds its quantity to the target.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A leg with no quantity adds nothing to the target a rule crafts toward.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule whose chain has no by-priority leg crafts nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What a rule holds is counted in every character's bags, the bank and house storage.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "What a guild bank, the craft bag or a companion holds is not counted toward the target.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rule crafts its shortfall at a crafting station after the writs there are crafted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character short of a passive rank the craft needs crafts nothing and names it in chat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What is crafted is stocked by the rule's own chain like anything else it takes.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
