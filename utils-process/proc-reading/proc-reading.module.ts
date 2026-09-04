import type { Module } from "../../code-system/modules/module.page-type.ts"

export const procReading = {
  id: "01a05d02-889b-74a3-996f-1c5943d09b84",
  pageTypeSlug: "module",
  slug: "proc-reading",
  definition: "the processes running now, read off `/proc` with the environment they carry",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only the environment variables the caller names are read off a process.",
    },
    {
      invariantKind: "departure",
      statement:
        "A process whose files will not open is left out rather than refusing the whole reading.",
    },
    {
      invariantKind: "departure",
      statement: "A process ending while it is being read is a process that will not open.",
    },
    {
      invariantKind: "departure",
      statement: "The arguments a process was given are joined by a space.",
    },
    {
      invariantKind: "departure",
      statement: "A `/proc` that will not open is answered as no processes and said so.",
    },
    {
      invariantKind: "departure",
      statement: "A process state is the first letter alone of what the stat line carries.",
    },
    {
      invariantKind: "departure",
      statement:
        "A command name carrying brackets does not move the fields read past the command name.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what an environment variable means.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here signals a process.",
    },
  ],
} as const satisfies Module
