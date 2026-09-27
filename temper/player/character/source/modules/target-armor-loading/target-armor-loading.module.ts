import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const targetArmorLoading = {
  id: "01a0e05b-db0c-74d1-b6f7-73473d64f37c",
  type: "page-type/module",
  slug: "target-armor-loading",
  definition: "the server read that holds the target armors before a build is made",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A change to a target armor page reads the target armors again.",
    },
  ],
} as const satisfies Module
