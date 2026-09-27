import "akasha/temper/eso/type/lua-language-extensions/lua-language-extensions.type-declaration.d.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { temperLoreCategory } from "akasha/temper/catalog/pursuit/temper-lore-category/temper-lore-category.page-type.ts"
import type { TemperLoreCategory } from "akasha/temper/catalog/pursuit/temper-lore-category/temper-lore-category.page-type.types.ts"
import { temperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.ts"
import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"
import { temperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.ts"
import type { TemperLoreCollection } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-collection.page-type.types.ts"
import {
  heldLoreLibrary,
  holdLoreLibrary,
  type LoreLibrary,
  loreLibraryFrom,
} from "akasha/temper/player/completion/modules/held-lore-library/held-lore-library.module.code.ts"

type CategoryRead = Pick<TemperLoreCategory, "esoLoreCategoryId" | "title">

type CollectionRead = Pick<
  TemperLoreCollection,
  "slug" | "esoLoreCategoryId" | "esoCollectionIndex" | "title"
>

type BookRead = Pick<TemperLoreBook, "collection" | "bookIndex" | "title">

export function loreLibraryOfPages(): LoreLibrary {
  const held = heldLoreLibrary()
  if (held !== null) return held
  const byType = new Map<string, readonly Value[]>()
  byType.set(temperLoreCategory.slug, $pagesOfType<CategoryRead>(temperLoreCategory))
  byType.set(temperLoreCollection.slug, $pagesOfType<CollectionRead>(temperLoreCollection))
  byType.set(temperLoreBook.slug, $pagesOfType<BookRead>(temperLoreBook))
  return holdLoreLibrary(loreLibraryFrom((pageTypeSlug) => byType.get(pageTypeSlug) ?? []))
}
