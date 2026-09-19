import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherImportInventory = {
  id: "01a06381-35cf-784c-a7fd-ba657830b922",
  type: "page-type/module",
  slug: "watcher-import-inventory",
  definition: "one inventory scan read, valued, and filed as a net worth reading on its hour page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A scan stating no capture moment is timed from the moment the import runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture moment the scan states is read as whole seconds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reading is filed on the hour page for the moment the scan was captured.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the locations the account owns count toward net worth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An unmanaged guild bank is reported by name with the gold set aside with that bank.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new exclusion reason is a compile error rather than an unlabelled row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The report is returned as lines rather than written where the report is computed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Everything a run reaches outside itself is given to that run as an argument.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A filing refused ends the import rather than being reported.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scan is written onto the account page as well as counted toward net worth.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here opens a file.",
    },
  ],
} as const satisfies Module
