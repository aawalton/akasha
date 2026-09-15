import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherImportItemRuleVerdicts = {
  id: "01a06381-35cf-75cc-986a-2d84d969ddd4",
  type: "module",
  slug: "watcher-import-item-rule-verdicts",
  definition:
    "the verdicts an add-on queued for an item, read from saved variables and written into rule settings",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A verdict is read from the first account-wide table the file has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A verdict names an item by id and by name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A verdict's action is either sell or nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry with a key the schema does not name is refused whole.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A queued entry refused is still counted among the entries found.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Materializing fewer verdicts than were found is reported as an error.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Everything a run reaches outside itself is given to that run as an argument.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes the saved-variables file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Settings that could not be read are not amended and not written back.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The settings blob is asked for under `files`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A blob answering as its file's ending is refused rather than read as unset.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write lands the whole blob beside the page with the rules amended in it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Settings the shape refuses raise rather than reading as an empty rule set.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A raise leaves the settings beside the page as the account already has them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "This module declares its own shape for a queued verdict.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The add-on's own verdict type is unreachable from this package.",
    },
  ],
} as const satisfies Module
