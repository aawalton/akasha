import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const equipmentSignatureMatcher = {
  id: "01a060c5-3c1e-7c9a-9222-d402989334a1",
  type: "page-type/module",
  slug: "equipment-signature-matcher",
  definition: "whether an item answers an equipment signature",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A signature naming a set is answered only by an item of that set.",
    },
  ],
  createdAt: "2026-09-02T06:18:53.854Z",
  updatedAt: "2026-10-28T21:23:21.139Z",
} as const satisfies Module
