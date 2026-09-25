import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const watcherRunStatus = {
  id: "01a0640f-8510-71f3-afa2-898d69327ed2",
  type: "page-type/module",
  slug: "watcher-run-status",
  definition: "a verdict over the operations the watcher reported from its last run",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An operation is read as the enrolment declares it, and is judged again nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A missing file outranks a parse failure.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A parse failure outranks a failed upload.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A failed upload outranks a sync.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that attempted nothing confirms nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A summary has the very operations that decided the verdict.",
    },
  ],
} as const satisfies Module
