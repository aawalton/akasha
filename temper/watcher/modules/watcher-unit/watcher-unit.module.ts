import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherUnit = {
  id: "01a06039-9c8a-7a1f-b8b9-82b0ca81bb70",
  type: "page-type/module",
  slug: "watcher-unit",
  definition: "the systemd unit the temper watcher runs under, reached by name",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The unit is named here rather than handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A systemctl that answers anything other than zero is taken as inactive.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A unit that is not running has no main process id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A main process id of zero is no main process id.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here throws where systemctl refuses.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the unit file.",
    },
  ],
} as const satisfies Module
