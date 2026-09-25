import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryRuleFromPages = {
  id: "01a072ae-f698-75c0-bcb4-f2b491d93e68",
  type: "page-type/module",
  slug: "inventory-rule-from-pages",
  definition: "a rule a player holds read back from the page and the entries beside it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule's id is the part of its page's slug after the leading `rule-`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where a rule falls among the rules is read from `display-order` alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A condition value is read as JSON where that value parses as JSON and as text otherwise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "JSON that is no form a condition holds stops the read naming the rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tier's eligibility is held against the shape an eligibility declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tier's eligibility is read from the character tests on that leg's line, one test to a record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill line a test names is read as the slug alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What that read yields is held against the shape a condition declares before it reaches a rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value that shape refuses stops the read naming the rule, the condition and what it held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A property the page leaves unsaid is left off the rule rather than written empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row short of a key every rule has stops the read naming the rule and the key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row beside the page short of a field its shape declares stops the read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every rule a read was handed is in what that read returns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An action, a goal, a category and a condition field are read as the slug alone, whatever names each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "No two rules of one account share a display order, since `inventory-rule-to-pages` refuses a tie.",
    },
  ],
} as const satisfies Module
