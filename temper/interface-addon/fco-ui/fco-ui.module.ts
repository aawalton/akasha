import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const fcoUi = {
  id: "01a06115-1ad8-7a5e-a9fb-cd52f4b41690",
  pageTypeSlug: "module",
  slug: "fco-ui",
  definition: "the promotional event tracker the interface tweaks move",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "No shared guard is kept for the type each guard here narrows to.",
    },
  ],
} as const satisfies Module
