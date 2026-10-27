import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherExportHudLayout = {
  id: "01a17ecc-c3cd-7282-87a0-1acd3f043790",
  type: "page-type/module",
  slug: "watcher-export-hud-layout",
  definition: "the HUD's docks and panels, written into the config of Temper's core add-on",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A dock is keyed by its slug and states its gap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel states its control, its dock's slug, its order, and whether it is fixed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel is fixed where its page says it never moves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Panels are written by dock and then by order, so an unchanged layout is unwritten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No config path given writes nothing and answers no hash.",
    },
  ],
  createdAt: "2026-10-27T19:18:31.117Z",
  updatedAt: "2026-10-27T19:18:31.117Z",
} as const satisfies Module
