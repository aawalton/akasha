import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const equipmentSignatureMatcher = {
  id: "01a060c5-3c1e-7c9a-9222-d402989334a1",
  type: "page-type/module",
  slug: "equipment-signature-matcher",
  definition: "whether an item answers an equipment signature",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A signature naming a set is answered only by an item of that set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Build gear goes to no character already wearing each piece alike its build wants.",
    },
  ],
  createdAt: "2026-09-02T06:18:53.854Z",
  updatedAt: "2026-11-01T14:59:31.418Z",
} as const satisfies Module
