import type { Module } from "@akasha/code-system/module"

export const errorsTriage = {
  id: "01a060cd-5652-7220-90d5-d163aee6caa2",
  pageTypeSlug: "module",
  slug: "errors-triage",
  definition: "whether an error came from the build now deployed or from one left in memory",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An error whose loaded build differs from the deployed build came from memory.",
    },
    {
      invariantKind: "departure",
      statement: "An error whose loaded build matches the deployed build is happening now.",
    },
    {
      invariantKind: "departure",
      statement: "An error against an addon with no deployed build is judged unknown.",
    },
    {
      invariantKind: "departure",
      statement: "An addon the game attributed is judged ahead of an addon a signature inferred.",
    },
    {
      invariantKind: "departure",
      statement: "An error attributed to nothing and inferring nothing is judged unknown.",
    },
    {
      invariantKind: "departure",
      statement: "A judgement drawn from an inferred addon is named apart from an attributed one.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a file.",
    },
  ],
} as const satisfies Module
