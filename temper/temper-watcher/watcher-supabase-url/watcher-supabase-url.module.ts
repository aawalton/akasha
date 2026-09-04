import type { Module } from "@akasha/code-system/module"

export const watcherSupabaseUrl = {
  id: "01a06370-eddf-75e8-9dfd-6168b1faa1fc",
  pageTypeSlug: "module",
  slug: "watcher-supabase-url",
  definition: "the supabase address and anonymous key the watcher worker reaches the web with",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A compiled worker carries the address the build put in.",
    },
    {
      invariantKind: "departure",
      statement: "The address is put in at build time by the bundler rather than read at run time.",
    },
    {
      invariantKind: "departure",
      statement: "An address put in as an empty string counts as none put in.",
    },
    {
      invariantKind: "departure",
      statement: "A worker running from source reads the environment.",
    },
    {
      invariantKind: "departure",
      statement: "An unset address falls back to the address temper is served from.",
    },
    {
      invariantKind: "departure",
      statement: "An unset anonymous key falls back to an empty string.",
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
