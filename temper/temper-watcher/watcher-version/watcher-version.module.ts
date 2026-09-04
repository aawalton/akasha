import type { Module } from "@akasha/code-system/module"

export const watcherVersion = {
  id: "01a06370-eddf-7a1c-97ea-eec451828f6a",
  pageTypeSlug: "module",
  slug: "watcher-version",
  definition: "the version the watcher worker reports itself as",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A compiled worker carries the commit the build put in.",
    },
    {
      invariantKind: "departure",
      statement: "The commit is put in at build time by the bundler rather than read at run time.",
    },
    {
      invariantKind: "departure",
      statement: "A worker running from source reports itself as dev.",
    },
    {
      invariantKind: "constraint",
      statement: "The bundler replaces a bare name rather than a path.",
    },
    {
      invariantKind: "constraint",
      statement: "Moving this file does not change what the bundler puts in.",
    },
    {
      invariantKind: "absence",
      statement: "No test here reaches the branch the bundler puts in.",
    },
  ],
} as const satisfies Module
