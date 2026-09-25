import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherImportItemRuleVerdicts = {
  id: "01a06381-35cf-75cc-986a-2d84d969ddd4",
  type: "page-type/module",
  slug: "watcher-import-item-rule-verdicts",
  definition:
    "the verdicts an add-on queued for an item, read from saved variables and written as item rule pages",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A verdict is read from the first account-wide table the file has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A verdict names an item by id and by name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A verdict's action is either sell or nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry with a key the schema does not name is refused whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A queued entry refused is still counted among the entries found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Materializing fewer verdicts than were found is reported as an error.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Everything a run reaches outside itself is given to that run as an argument.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the saved-variables file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A verdict is upserted as the item rule page for its item on the user's account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item rule page already naming the item takes the verdict unless it is locked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item rule page that cannot be read raises, and no page is written.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads or writes the settings blob.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The shape a queued verdict is read with is checked against the add-on's own type.",
    },
  ],
} as const satisfies Module
