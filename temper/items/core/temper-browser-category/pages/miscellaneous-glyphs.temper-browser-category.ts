import type { TemperBrowserCategory } from "akasha/temper/items/core/temper-browser-category/temper-browser-category.page-type.types.ts"

export const miscellaneousGlyphs = {
  id: "01a0e10d-1b61-731c-a2f3-03c9e5367c34",
  type: "page-type/temper-browser-category",
  slug: "miscellaneous-glyphs",
  title: "Glyphs",
  displayOrder: 3,
  match: "Misc",
  itemTypes: [
    "temper-item-type/glyph-armor",
    "temper-item-type/glyph-jewelry",
    "temper-item-type/glyph-weapon",
  ],
  parent: "temper-browser-category/miscellaneous",
} as const satisfies TemperBrowserCategory
