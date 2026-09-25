import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const affixScriptPages = {
  id: "01a0d8a3-d5ac-798a-b287-7cde5870ec37",
  type: "page-type/module",
  slug: "affix-script-pages",
  definition: "every affix script page, by the affix script it is",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages are imported rather than read, so a browser holds them as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An affix script a build can name with no page here fails the typecheck.",
    },
  ],
} as const satisfies Module
