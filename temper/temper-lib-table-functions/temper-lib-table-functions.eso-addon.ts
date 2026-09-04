import type { EsoAddon } from "../../code-system/eso-addons/eso-addon.page-type.ts"

export const temperLibTableFunctions = {
  id: "01a06052-2ca3-74ef-b59e-f8d49f0ca734",
  pageTypeSlug: "eso-addon",
  slug: "temper-lib-table-functions",
  definition: "the table helpers every Temper addon in the game shares",
  manifest: "json",
  addonManifest: "json",
  bundleEntrySlug: "table-functions-entry",
  partSlugs: [
    "module/table-functions",
    "module/table-function-casts",
    "module/table-function-types",
    "module/table-functions-entry",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A helper reads the table handed in and writes nothing back.",
    },
    {
      invariantKind: "departure",
      statement: "A helper walking a table walks every table nested inside.",
    },
    {
      invariantKind: "departure",
      statement: "A helper handed no table answers about the value handed in.",
    },
    {
      invariantKind: "departure",
      statement: "The game reaches every helper through one global name.",
    },
    {
      invariantKind: "absence",
      statement: "No helper here depends on another addon.",
    },
  ],
} as const satisfies EsoAddon
