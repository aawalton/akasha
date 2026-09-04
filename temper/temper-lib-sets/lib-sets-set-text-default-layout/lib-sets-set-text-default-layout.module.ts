import type { Module } from "@akasha/code-system/module"

export const libSetsSetTextDefaultLayout = {
  id: "01a06231-8f1f-72c7-bfe2-63ccfb8e40b5",
  pageTypeSlug: "module",
  slug: "lib-sets-set-text-default-layout",
  definition: "the stock arrangement of a set's text parts when no pattern was given",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Traits needed and reconstruction cost share the bracket after the set type.",
    },
    {
      invariantKind: "departure",
      statement:
        "The drop text takes a coloured prefix naming whichever single part is switched on.",
    },
  ],
} as const satisfies Module
