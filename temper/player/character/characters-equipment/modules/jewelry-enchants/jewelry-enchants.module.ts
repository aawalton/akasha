import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const jewelryEnchants = {
  id: "01a0616f-8e17-7f4a-88b7-d9d36af92429",
  type: "page-type/module",
  slug: "jewelry-enchants",
  definition: "every glyph a jewelry piece takes, and what each is worth at a quality",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The glyphs and their worth at each quality are read from the enchant pages, live.",
    },
  ],
  createdAt: "2026-09-02T09:24:55.959Z",
  updatedAt: "2026-09-27T04:03:27.000Z",
} as const satisfies Module
