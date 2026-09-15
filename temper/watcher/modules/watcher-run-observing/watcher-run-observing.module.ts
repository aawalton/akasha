import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherRunObserving = {
  id: "01a06370-eddf-7f43-904c-153ff0755c99",
  type: "module",
  slug: "watcher-run-observing",
  definition: "how each thing the watcher tries is watched and turned into a sync operation",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every kind of file names the operations a run of that kind is expected to do.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An operation that returns is synced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An operation that throws is an upload failure with the error thrown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A throw is caught rather than reaching the caller.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chain halts at the first operation that is not synced.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every operation after the halt is recorded as skipped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A side file the caller named no path for is written without being observed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A side file whose addon folder is absent is recorded as skipped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A side file export is asked for no path where the addon folder is absent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every operation has the moment the operation ran.",
    },
  ],
} as const satisfies Module
