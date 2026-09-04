import type { Module } from "@akasha/code-system/module"

export const housingPublish = {
  id: "01a06113-b7d2-7a85-8cd4-cd7db66c98e5",
  pageTypeSlug: "module",
  slug: "housing-publish",
  definition: "the housing add-on's name and version, put where other add-ons read both",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What other add-ons may read is published under one global name.",
    },
  ],
} as const satisfies Module
