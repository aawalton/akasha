import type { Module } from "@akasha/code-system/module"

export const questsConstants = {
  id: "01a0635f-391c-775e-86c4-3735dadf76f5",
  pageTypeSlug: "module",
  slug: "quests-constants",
  definition: "the name the addon loads under and the name its saved variables are kept under",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The saved-variables name is built from the addon name.",
    },
    {
      invariantKind: "departure",
      statement: "The saved-variables layout carries the version the layout was written under.",
    },
  ],
} as const satisfies Module
