import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const procReading = {
  id: "01a05d02-889b-74a3-996f-1c5943d09b84",
  type: "module",
  slug: "proc-reading",
  definition: "the processes running now, read off `/proc` with the environment they carry",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the environment variables the caller names are read off a process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A process whose files will not open is left out rather than refusing the whole reading.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A process ending while that process is being read is a process that will not open.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The arguments a process was given are joined by a space.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A `/proc` that will not open is answered as no processes and said so.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A process state is the first letter alone of the state field the stat line has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A command name with brackets does not move the fields read past the command name.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows an environment variable's meaning.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here signals a process.",
    },
  ],
} as const satisfies Module
