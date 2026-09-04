import type { Module } from "@akasha/code-system/module"

export const addonMenuTypes = {
  id: "01a06100-0000-7000-8000-000000000010",
  pageTypeSlug: "module",
  slug: "addon-menu-types",
  definition: "the declared shape of every widget's data table and of the control it becomes",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Any widget field may be a value or a function returning that value.",
    },
    {
      invariantKind: "departure",
      statement: "One control interface carries the fields of every widget type as optional.",
    },
    {
      invariantKind: "constraint",
      statement: "Value-bearing widgets require both a getFunc and a setFunc.",
    },
    {
      invariantKind: "absence",
      statement: "No declaration in this file emits Lua.",
    },
  ],
} as const satisfies Module
