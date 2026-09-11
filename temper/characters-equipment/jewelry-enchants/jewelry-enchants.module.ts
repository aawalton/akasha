import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const jewelryEnchants = {
  id: "01a0616f-8e17-7f4a-88b7-d9d36af92429",
  pageTypeSlug: "module",
  type: "module",
  slug: "jewelry-enchants",
  definition: "every glyph a jewelry piece takes, and what each is worth at a quality",
  code: "ts",
  invariants: [
    {
      invariantKind: "upkeep",
      statement: "The generator writes this table outside akasha.",
    },
  ],
} as const satisfies Module
