import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildSlug = {
  id: "01a0d665-ed00-7b5e-bc16-2e7a0178c558", type: "page-type/module",
  slug: "build-slug",
  definition: "the slug a character build or companion build is written under",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A build's slug is its name followed by a tag its key settles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One key always settles one tag.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name that makes no slug starting with a letter is written as `build`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tag is worked out alike in a browser and on a server.",
    },
  ],
} as const satisfies Module
