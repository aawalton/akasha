import type { Module } from "@akasha/code-system/module"

export const customMenuPublicApi = {
  id: "01a0605a-581f-70cd-a87d-789035bb7e50",
  pageTypeSlug: "module",
  slug: "custom-menu-public-api",
  definition: "the names the custom menu library puts in the game's global table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A header entry is added as a label drawn from the header pool.",
    },
    {
      invariantKind: "departure",
      statement: "A checkbox entry is indented by a fixed-width space.",
    },
  ],
} as const satisfies Module
