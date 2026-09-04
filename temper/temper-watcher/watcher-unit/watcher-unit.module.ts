import type { Module } from "@akasha/code-system/module"

export const watcherUnit = {
  id: "01a06039-9c8a-7a1f-b8b9-82b0ca81bb70",
  pageTypeSlug: "module",
  slug: "watcher-unit",
  definition: "the systemd unit the temper watcher runs under, reached by name",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The unit is named here rather than handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A systemctl that answers anything other than zero reads as inactive.",
    },
    {
      invariantKind: "departure",
      statement: "A restart that succeeds is answered with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A restart that fails is answered with what systemctl said.",
    },
    {
      invariantKind: "departure",
      statement: "A unit that is not running carries no main process id.",
    },
    {
      invariantKind: "departure",
      statement: "A main process id of zero is no main process id.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here throws where systemctl refuses.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the unit file.",
    },
  ],
} as const satisfies Module
