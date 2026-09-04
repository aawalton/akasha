import type { Module } from "@akasha/code-system/module"

export const treasureApi = {
  id: "01a061d5-d0c0-73e1-8312-b0bc2d8d34a1",
  pageTypeSlug: "module",
  slug: "treasure-api",
  definition: "what an addon asks the library about a treasure map or a survey",
  code: "ts",
  invariants: [
    {
      invariantKind: "gap",
      statement: "The lore book lookup answers nothing for any book.",
    },
  ],
} as const satisfies Module
