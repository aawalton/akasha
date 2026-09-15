import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherSelfWriteGuard = {
  id: "01a0633f-8d1e-7131-89f2-3109de33dbad",
  type: "page-type/module",
  slug: "watcher-self-write-guard",
  definition: "how the watcher tells a file it wrote itself from one the game wrote",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Content is compared by its sha256 rather than by its bytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write-back never recorded is no reason to skip anything.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
