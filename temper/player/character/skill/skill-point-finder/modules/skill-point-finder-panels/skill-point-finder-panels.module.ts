import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const skillPointFinderPanels = {
  id: "01a15168-6997-7ad5-8f29-b54afbc4e4eb",
  type: "page-type/module",
  slug: "skill-point-finder-panels",
  definition: "the inset panels the skill point window's sections sit on, and how tall each is",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel reaches 10 past its section on every side, inside the game's inset art.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every column of panels ends at one shared bottom, the tallest column's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel's height is worked out from the rows its section shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The window is as tall as its panels, header and footer need.",
    },
  ],
  createdAt: "2026-10-18T23:45:59.702Z",
  updatedAt: "2026-10-18T23:45:59.702Z",
} as const satisfies Module
