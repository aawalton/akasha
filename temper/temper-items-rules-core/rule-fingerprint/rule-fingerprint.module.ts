import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ruleFingerprint = {
  id: "01a06276-e3e7-7ec2-b97e-e6c2f4eafda8",
  pageTypeSlug: "module",
  slug: "rule-fingerprint",
  definition: "one string representing everything a rule matches on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Two rules matching the same items have the same fingerprint.",
    },
    {
      invariantKind: "departure",
      statement: "A filter with no condition on a rule adds nothing to that rule's string.",
    },
  ],
} as const satisfies Module
