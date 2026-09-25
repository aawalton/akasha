import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildVersionPageType = {
  id: "01a0d89d-06f0-7eb8-8829-32d2898f9816",
  type: "page-type/module",
  slug: "build-version-page-type",
  definition: "the page type a build's versions are, and the address those versions name it by",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character build and a companion build keep their versions as two page types.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A version names its build by the build's address rather than by its id.",
    },
  ],
} as const satisfies Module
