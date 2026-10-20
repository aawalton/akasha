import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const buildSaveGuard = {
  id: "01a159b4-53fe-7e67-ba60-bccbde67c3b3",
  type: "page-type/module",
  slug: "build-save-guard",
  definition: "the refusal of a build save naming no hash it replaces",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A browser's patch setting a character or companion build's hash names the hash it replaces.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A patch naming no such hash is refused before it reaches the page service.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A patch leaving a build's hash alone is let through.",
    },
  ],
  createdAt: "2026-10-20T14:25:52.637Z",
  updatedAt: "2026-10-20T14:25:52.637Z",
} as const satisfies Module
