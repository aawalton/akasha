import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillPointFinderWindow = {
  id: "01a060ec-584e-72ce-a94a-9620a363a2f2",
  type: "page-type/module",
  slug: "skill-point-finder-window",
  definition: "the skill point window opening and closing",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each section of the window, and the character total, sits on a panel.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sections' panels are laid out by `skill-point-finder-panels`.",
    },
  ],
  createdAt: "2026-09-02T07:01:36.974Z",
  updatedAt: "2026-10-18T23:45:59.702Z",
} as const satisfies Module
