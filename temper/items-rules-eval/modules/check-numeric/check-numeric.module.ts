import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkNumeric = {
  id: "01a06137-f967-7ff4-a7da-b8e750de7c13",
  type: "page-type/module",
  slug: "check-numeric",
  definition: "the condition check over an item's quality, level, and three value figures",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Required champion points above zero raise the level to 50 plus a tenth of the points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every numeric comparison defaults to the <= operator when the rule names no operator.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "maxValue and minValue are consulted only when the rule sets no marketValue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item with no value signal satisfies a zero threshold under <= and nothing higher.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A zero market-value threshold under <= is meant to take an item whose market value is unknown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An item priced by nothing is worth nothing only where the price source has a table.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A price source answering with no table makes that one threshold indeterminate rather than met.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A threshold an unknown value already fails is failed whether or not a table is there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A missing merchant value and a missing replacement value each count as zero.",
    },
  ],
} as const satisfies Module
