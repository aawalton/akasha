import type { Module } from "@akasha/code-system/module"

export const addonMenuUiStrings = {
  id: "01a06100-0000-7000-8000-000000000011",
  pageTypeSlug: "module",
  slug: "addon-menu-ui-strings",
  definition: "the English display strings of the library, written out as one table",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "No translation table exists for any other language.",
    },
    {
      invariantKind: "departure",
      statement: "The author label is composed from a game string rather than written out.",
    },
    {
      invariantKind: "constraint",
      statement: "Each string is a plain field on one exported table.",
    },
  ],
} as const satisfies Module
