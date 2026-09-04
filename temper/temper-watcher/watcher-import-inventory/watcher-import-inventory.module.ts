import type { Module } from "@akasha/code-system/module"

export const watcherImportInventory = {
  id: "01a06381-35cf-784c-a7fd-ba657830b922",
  pageTypeSlug: "module",
  slug: "watcher-import-inventory",
  definition: "one inventory scan read, valued, and filed as a net worth reading on its hour page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A scan stating no capture moment is timed from the moment the import runs.",
    },
    {
      invariantKind: "departure",
      statement: "A capture moment the scan states is read as whole seconds.",
    },
    {
      invariantKind: "departure",
      statement: "The reading is filed on the hour page for the moment the scan was captured.",
    },
    {
      invariantKind: "departure",
      statement: "Only the locations the account owns count toward net worth.",
    },
    {
      invariantKind: "departure",
      statement:
        "An unmanaged guild bank is reported by name with the gold set aside with that bank.",
    },
    {
      invariantKind: "departure",
      statement: "A new exclusion reason is a compile error rather than an unlabelled row.",
    },
    {
      invariantKind: "departure",
      statement:
        "The report is returned as lines rather than written where the report is computed.",
    },
    {
      invariantKind: "departure",
      statement: "Everything a run reaches outside itself is given to that run as an argument.",
    },
    {
      invariantKind: "departure",
      statement: "A filing refused ends the import rather than being reported.",
    },
    {
      invariantKind: "gap",
      statement: "The snapshot and its chunks are counted and reported unfiled.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a file.",
    },
  ],
} as const satisfies Module
