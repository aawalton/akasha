import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const companionFactory = {
  id: "01a06152-c2c8-7e6d-b07f-b8d4a1e94f30",
  pageTypeSlug: "module",
  slug: "companion-factory",
  definition:
    "factory for new and empty companion build states with role-derived default equipment",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Default weapons for a damage role are drawn at random rather than fixed.",
    },
    {
      invariantKind: "departure",
      statement: "An empty companion carries armor items of no-weight rather than empty slots.",
    },
    {
      invariantKind: "constraint",
      statement: "Every role-derived equipment piece is created at epic quality.",
    },
  ],
} as const satisfies Module
