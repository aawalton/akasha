import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildUrl = {
  id: "01a0609f-53f9-74de-9c4c-1475434e5482",
  type: "page-type/module",
  slug: "build-url",
  definition: "the link a character build or companion build is reached at",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character build is linked under the `character-build` page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A companion build is linked under the `companion-build` page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build link has the build's own id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build link takes the readable part of the link from the build's name.",
    },
  ],
} as const satisfies Module
