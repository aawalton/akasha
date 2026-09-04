import type { Module } from "@akasha/code-system/module"

export const knowledgeLcccUtil = {
  id: "01a06212-55be-7ab3-821b-f37d1a394cf6",
  pageTypeSlug: "module",
  slug: "knowledge-lccc-util",
  definition: "the game facts every one of these libraries asks the same way",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Two libraries loading together publish whichever copy is newer.",
    },
  ],
} as const satisfies Module
