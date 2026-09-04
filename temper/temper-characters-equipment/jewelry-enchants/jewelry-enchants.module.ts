import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const jewelryEnchants = {
  id: "01a0616f-8e17-7f4a-88b7-d9d36af92429",
  pageTypeSlug: "module",
  slug: "jewelry-enchants",
  definition: "every glyph a jewelry piece takes, and what each is worth at a quality",
  code: "ts",
  invariants: [
    {
      invariantKind: "upkeep",
      statement: "The generator writes this table outside akasha.",
    },
    {
      invariantKind: "upkeep",
      statement: "Both copies of this table move together.",
    },
  ],
} as const satisfies Module
