import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const armorEnchants = {
  id: "01a0616f-8e17-7a0c-8406-2388ce2938e6",
  type: "page-type/module",
  slug: "armor-enchants",
  definition: "every glyph an armor piece takes, and what each is worth at a quality",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The glyphs and their worth at each quality are read from the enchant pages, live.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece carries the share of the glyph its armor type page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece's share of a glyph is rounded down, as the game rounds it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A small armor piece carries 0.405 of a glyph, as its enchant text shows.",
    },
  ],
  createdAt: "2026-09-02T09:24:55.959Z",
  updatedAt: "2026-10-20T17:53:52.840Z",
} as const satisfies Module
