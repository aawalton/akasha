import type { Module } from "@akasha/code-system/module"

export const housingStateTypes = {
  id: "01a06113-b7d2-7a53-af12-f4a88f37c476",
  pageTypeSlug: "module",
  slug: "housing-state-types",
  definition: "the shapes of the housing window's own settings and its running state",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies Module
