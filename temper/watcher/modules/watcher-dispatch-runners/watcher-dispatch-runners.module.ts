import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherDispatchRunners = {
  id: "01a15549-a636-7407-99a4-fcd952a762ab",
  type: "page-type/module",
  slug: "watcher-dispatch-runners",
  definition: "the import and export functions a dispatch runs for each kind of file",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every import and export a dispatch may run is named here once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The completion import runs once the companion and skill catalogues are read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The settings export runs once the companion catalogue is read.",
    },
  ],
  createdAt: "2026-10-19T17:50:52.469Z",
  updatedAt: "2026-10-19T17:50:52.469Z",
} as const satisfies Module
