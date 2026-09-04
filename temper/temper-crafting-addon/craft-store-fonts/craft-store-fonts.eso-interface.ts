import type { EsoInterface } from "@akasha/code-system/eso-interface"

export const craftStoreFonts = {
  id: "01a061c7-e8c0-7c94-9c43-2face07e8a6c",
  pageTypeSlug: "eso-interface",
  slug: "craft-store-fonts",
  definition: "the fonts the crafting windows are written in",
  markup: "xml",
  loadedAs: "XML/UI/CraftStore_Font.xml",
} as const satisfies EsoInterface
