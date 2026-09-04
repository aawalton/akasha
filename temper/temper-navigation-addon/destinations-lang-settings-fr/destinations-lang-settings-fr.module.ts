import type { Module } from "@akasha/code-system/module"

export const destinationsLangSettingsFr = {
  id: "01a06269-2a10-78f6-84dd-4bdeb018225f",
  pageTypeSlug: "module",
  slug: "destinations-lang-settings-fr",
  definition: "the destinations settings strings in French, joined from its runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
