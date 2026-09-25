import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemActionPages = {
  id: "01a0d88b-276f-7318-8e41-f51cf52601ca",
  type: "page-type/module",
  slug: "item-action-pages",
  definition: "every item action page, in the order a reader is offered the actions",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The item action pages are imported rather than read, so an add-on and a browser hold them as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every item action name is taken from these pages and written nowhere else.",
    },
  ],
} as const satisfies Module
