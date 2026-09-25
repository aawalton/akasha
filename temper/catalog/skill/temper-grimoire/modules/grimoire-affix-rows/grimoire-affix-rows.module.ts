import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const grimoireAffixRows = {
  id: "01a0d8d6-bfb1-7643-9c74-a5008642408e",
  type: "page-type/module",
  slug: "grimoire-affix-rows",
  definition: "every grimoire's affix rows, by the grimoire holding them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The rows are imported rather than read, so a browser holds them as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grimoire a scribed skill can name with no rows here fails the typecheck.",
    },
  ],
} as const satisfies Module
