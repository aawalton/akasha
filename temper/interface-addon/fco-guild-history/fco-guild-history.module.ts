import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const fcoGuildHistory = {
  id: "01a06115-1ac9-7fb0-8f2d-ffc398b892a8",
  type: "module",
  slug: "fco-guild-history",
  definition: "the guild history window the interface tweaks page through",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "No shared guard is kept for the type each guard here narrows to.",
    },
  ],
} as const satisfies Module
