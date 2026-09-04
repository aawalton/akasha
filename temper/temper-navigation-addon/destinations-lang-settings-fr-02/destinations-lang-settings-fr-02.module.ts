import type { Module } from "@akasha/code-system/module"

export const destinationsLangSettingsFr02 = {
  id: "01a06269-2a0f-7c14-bc67-03923def06d3",
  pageTypeSlug: "module",
  slug: "destinations-lang-settings-fr-02",
  definition: "one run of the destinations settings strings in French",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The records here are one unbroken run of the table's order.",
    },
    {
      invariantKind: "departure",
      statement: "The run is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
