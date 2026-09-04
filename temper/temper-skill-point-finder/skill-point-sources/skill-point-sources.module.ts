import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const skillPointSources = {
  id: "01a060ec-5851-77ac-a8f1-6163b058a0b4",
  pageTypeSlug: "module",
  slug: "skill-point-sources",
  definition: "every place in The Elder Scrolls Online hands a character a skill point",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A source is named by the identifier the game knows that source by.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here counts what a character has earned.",
    },
  ],
} as const satisfies Module
