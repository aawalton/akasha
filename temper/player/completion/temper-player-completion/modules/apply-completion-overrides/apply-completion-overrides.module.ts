import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const applyCompletionOverrides = {
  id: "01a06108-2fe9-7e94-a80a-0620a87e49b2",
  type: "page-type/module",
  slug: "apply-completion-overrides",
  definition: "raising a character's counted skill points to what a player claims by hand",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "An override never lowers the points a character already counts.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An override never carries a count past the largest count its source can give.",
    },
  ],
  createdAt: "2026-09-02T07:32:01.641Z",
  updatedAt: "2026-09-21T15:58:08.000Z",
} as const satisfies Module
