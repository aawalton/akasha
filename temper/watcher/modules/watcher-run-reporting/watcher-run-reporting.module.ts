import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherRunReporting = {
  id: "01a06381-35cf-7a90-aca5-09b5bd83b54c",
  type: "module",
  slug: "watcher-run-reporting",
  definition:
    "one run's operations merged into the watcher enrolment page for the signed-in account",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The account the operations belong to is handed in rather than read from a client here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The enrolment is found by the account the enrolment names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The report is held under one property as JSON text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Text already held under that property is read back as JSON before merging.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The moment reported is handed in rather than read from the clock here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The version reported is the version the watcher names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry held under no name is dropped rather than merged in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No account signed in leaves the enrolment unchanged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No enrolment page for the account is logged rather than raised.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A failure here is logged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No failure here reaches the caller.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
