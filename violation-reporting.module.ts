import type { Module } from "@akasha/code-system/module"

export const violationReporting = {
  id: "01a06829-124f-75d7-b0a3-f03d0155c184",
  pageTypeSlug: "module",
  slug: "violation-reporting",
  definition: "how a check says what it found and what the check exits with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run that certifies nothing says so before it says what it found.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run that certifies nothing exits as a tool error rather than as clean or as refused.",
    },
    {
      invariantKind: "departure",
      statement: "A run that found nothing and certifies nothing prints no success line.",
    },
    {
      invariantKind: "departure",
      statement: "A clean run exits zero and a run that found violations exits one.",
    },
    {
      invariantKind: "departure",
      statement: "The population bound is said on the line that carries the count.",
    },
    {
      invariantKind: "departure",
      statement: "The shortfall is said after the violations rather than before them.",
    },
    {
      invariantKind: "departure",
      statement: "In json form a violation is one line and the coverage goes to the error stream.",
    },
    {
      invariantKind: "departure",
      statement: "In json form nothing is said about certifying beyond that coverage.",
    },
    {
      invariantKind: "departure",
      statement: "A violation is said as file, line and message where the violation carries them.",
    },
    {
      invariantKind: "departure",
      statement: "Violations are grouped only where the caller says what to group them by.",
    },
    {
      invariantKind: "departure",
      statement: "The footer names the remediation where the caller gave one.",
    },
    {
      invariantKind: "departure",
      statement: "A tool error writes to the error stream and exits two.",
    },
    {
      invariantKind: "departure",
      statement: "The streams written to are the caller's where the caller named them.",
    },
  ],
} as const satisfies Module
