import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const rotationBreakdownRows = {
  id: "01a06110-abe5-7eeb-859b-48fffcfee56d",
  pageTypeSlug: "module",
  slug: "rotation-breakdown-rows",
  definition: "the rows a companion rotation is broken down into when it is explained",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This code is written out from the companion pages rather than by hand.",
    },
  ],
} as const satisfies Module
