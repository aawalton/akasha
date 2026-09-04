import type { Module } from "@akasha/code-system/module"

export const dataminingPublicApi = {
  id: "01a06341-d9e8-7006-a2dc-0b3e1ae1c2a6",
  pageTypeSlug: "module",
  slug: "datamining-public-api",
  definition: "the global another addon reads the mined data through",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The global is named for the addon.",
    },
    {
      invariantKind: "departure",
      statement: "The global carries the way to the saved variables and nothing more.",
    },
  ],
} as const satisfies Module
