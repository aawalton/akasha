import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillPointFinderTypes = {
  id: "01a060ec-584d-78d8-941c-a8b43c987a6c",
  pageTypeSlug: "module",
  slug: "skill-point-finder-types",
  definition: "the shapes the skill point window holds while the game runs",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here runs.",
    },
  ],
} as const satisfies Module
