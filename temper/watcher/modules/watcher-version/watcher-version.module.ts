import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherVersion = {
  id: "01a06370-eddf-7a1c-97ea-eec451828f6a",
  type: "module",
  slug: "watcher-version",
  definition: "the version the watcher worker reports itself as",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A compiled worker has the commit the build put in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The commit is put in at build time by the bundler rather than read at run time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A worker running from source reports itself as dev.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The bundler replaces a bare name rather than a path.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Moving this file does not change the commit the bundler puts in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No test here reaches the branch the bundler puts in.",
    },
  ],
} as const satisfies Module
