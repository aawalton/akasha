import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherRunReporting = {
  id: "01a06381-35cf-7a90-aca5-09b5bd83b54c",
  type: "page-type/module",
  slug: "watcher-run-reporting",
  definition: "a run's operations merged into the watcher enrolment page for the signed-in account",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The account the operations belong to is handed in rather than read from a client here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The enrolment is found by the account the enrolment names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That account is named by the address of its account page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The report is written as the fields the enrolment declares for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The report is judged against those fields before anything is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A report those fields refuse is logged rather than written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A detail past what its field holds is shortened to fit rather than refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The moment reported is handed in rather than read from the clock here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The version reported is the version the watcher names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An operation held that those fields do not read is dropped rather than merged in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No account signed in leaves the enrolment unchanged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No enrolment page for the account is logged rather than raised.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A failure here is logged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No failure here reaches the caller.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
