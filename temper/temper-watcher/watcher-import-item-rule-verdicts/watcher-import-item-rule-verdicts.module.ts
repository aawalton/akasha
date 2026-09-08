import type { Module } from "@akasha/code/module"

export const watcherImportItemRuleVerdicts = {
  id: "01a06381-35cf-75cc-986a-2d84d969ddd4",
  pageTypeSlug: "module",
  slug: "watcher-import-item-rule-verdicts",
  definition:
    "the verdicts an add-on queued for an item, read from saved variables and written into rule settings",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A verdict is read from the first account-wide table the file has.",
    },
    {
      invariantKind: "departure",
      statement: "A verdict names an item by id and by name.",
    },
    {
      invariantKind: "departure",
      statement: "A verdict's action is either sell or nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An entry with a key the schema does not name is refused whole.",
    },
    {
      invariantKind: "departure",
      statement: "A queued entry refused is still counted among the entries found.",
    },
    {
      invariantKind: "departure",
      statement: "Materializing fewer verdicts than were found is reported as an error.",
    },
    {
      invariantKind: "constraint",
      statement: "Everything a run reaches outside itself is given to that run as an argument.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the saved-variables file.",
    },
    {
      invariantKind: "departure",
      statement: "Settings that could not be read are not amended and not written back.",
    },
    {
      invariantKind: "departure",
      statement: "The settings blob is asked for under `files`.",
    },
    {
      invariantKind: "departure",
      statement: "A blob answering as its file's ending is refused rather than read as unset.",
    },
    {
      invariantKind: "departure",
      statement: "A write lands the whole blob beside the page with the rules amended in it.",
    },
    {
      invariantKind: "departure",
      statement: "Unreadable settings read as an empty rule set.",
    },
    {
      invariantKind: "departure",
      statement: "Writing an empty rule set loses those settings.",
    },
    {
      invariantKind: "departure",
      statement: "This module declares its own shape for a queued verdict.",
    },
    {
      invariantKind: "gap",
      statement: "The add-on's own verdict type is unreachable from this package.",
    },
  ],
} as const satisfies Module
