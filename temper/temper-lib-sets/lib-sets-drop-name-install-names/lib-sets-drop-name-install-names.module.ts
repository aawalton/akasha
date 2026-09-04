import type { Module } from "@akasha/code-system/module"

export const libSetsDropNameInstallNames = {
  id: "01a061d6-3e2c-7086-af34-b1aa34b67fc9",
  pageTypeSlug: "module",
  slug: "lib-sets-drop-name-install-names",
  definition:
    "the eight drop mechanic name tables placed on the library under their language codes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The tables are written onto the library global rather than exported.",
    },
    {
      invariantKind: "gap",
      statement: "An empty branch sits where the newer API version's entries would go.",
    },
  ],
} as const satisfies Module
