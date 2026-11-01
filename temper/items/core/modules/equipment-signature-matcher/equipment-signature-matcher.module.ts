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
    {
      decisionKind: "decision-kind/departure",
      statement: "Gear for a build a character is not set up as goes to that character's backpack.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A piece the character holds, worn or in its backpack, serves every build it fits.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Gear is equipped for a build set up before any goes to a backpack.",
    },
  ],
  createdAt: "2026-09-02T06:18:53.854Z",
  updatedAt: "2026-11-01T18:53:00.743Z",
} as const satisfies Module
