import type { Module } from "@akasha/code-system/module"

export const domGuardSetting = {
  id: "01a06558-bbb0-7003-8022-162ffcc6b8a0",
  pageTypeSlug: "module",
  slug: "dom-guard-setting",
  definition: "halting a component test run without a document and saying how to run it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The test runner preloads the module rather than a test importing the module.",
    },
    {
      invariantKind: "departure",
      statement: "A missing document throws and everything else passes through silently.",
    },
    {
      invariantKind: "absence",
      statement: "The module declares no name a test reaches for.",
    },
  ],
} as const satisfies Module
