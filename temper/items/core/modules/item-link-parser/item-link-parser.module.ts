import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const itemLinkParser = {
  id: "01a060bf-747c-74be-8914-30e2ea6cabe8",
  type: "page-type/module",
  slug: "item-link-parser",
  definition: "the fields an item link has, read out by their place in it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each field's place in the link is named once here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link with fewer fields than the game's shortest form parses to nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field with no number reads as zero.",
    },
  ],
  createdAt: "2026-09-02T06:12:35.068Z",
  updatedAt: "2026-09-21T15:18:52.000Z",
} as const satisfies Module
