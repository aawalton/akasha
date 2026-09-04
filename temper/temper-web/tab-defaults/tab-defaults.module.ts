import type { Module } from "@akasha/code-system/module"

export const tabDefaults = {
  id: "01a0640f-850f-70cf-af93-e19e03bde002",
  pageTypeSlug: "module",
  slug: "tab-defaults",
  definition: "the tab a path opens on where the path names none",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path matching no prefix opens on no tab.",
    },
  ],
} as const satisfies Module
