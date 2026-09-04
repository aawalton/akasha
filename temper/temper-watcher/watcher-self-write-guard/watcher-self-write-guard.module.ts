import type { Module } from "@akasha/code-system/module"

export const watcherSelfWriteGuard = {
  id: "01a0633f-8d1e-7131-89f2-3109de33dbad",
  pageTypeSlug: "module",
  slug: "watcher-self-write-guard",
  definition: "how the watcher tells a file it wrote itself from one the game wrote",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Content is compared by its sha256 rather than by its bytes.",
    },
    {
      invariantKind: "departure",
      statement: "A write-back never recorded is no reason to skip anything.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
