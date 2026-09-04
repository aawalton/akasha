import type { Module } from "@akasha/code-system/module"

export const watcherRunReporting = {
  id: "01a06381-35cf-7a90-aca5-09b5bd83b54c",
  pageTypeSlug: "module",
  slug: "watcher-run-reporting",
  definition:
    "one run's operations merged into the watcher enrolment page for the signed-in account",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The account the operations belong to is handed in rather than read from a client here.",
    },
    {
      invariantKind: "departure",
      statement: "The enrolment is found by the account the enrolment names.",
    },
    {
      invariantKind: "departure",
      statement: "The report is held under one property as JSON text.",
    },
    {
      invariantKind: "departure",
      statement: "Text already held under that property is read back as JSON before merging.",
    },
    {
      invariantKind: "departure",
      statement: "The moment reported is handed in rather than read from the clock here.",
    },
    {
      invariantKind: "departure",
      statement: "The version reported is the version the watcher names.",
    },
    {
      invariantKind: "departure",
      statement: "An entry held under no name is dropped rather than merged in.",
    },
    {
      invariantKind: "departure",
      statement: "No account signed in leaves the enrolment unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "No enrolment page for the account is logged rather than raised.",
    },
    {
      invariantKind: "departure",
      statement: "A failure here is logged.",
    },
    {
      invariantKind: "departure",
      statement: "No failure here reaches the caller.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
