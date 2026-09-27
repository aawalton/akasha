import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  holdLoreLibrary,
  LORE_LIBRARY_READS,
  type LoreLibrary,
  loreLibraryFrom,
} from "akasha/temper/player/completion/modules/held-lore-library/held-lore-library.module.code.ts"

export function holdLoreLibraryFromCheckout(): LoreLibrary {
  const byType = new Map<string, readonly Value[]>()
  for (const [pageTypeSlug, keys] of LORE_LIBRARY_READS) {
    const asked = asking(akashaRoot(), { pageTypeSlug, keys } as never)
    if ("refused" in asked)
      throw new Error(`the ${pageTypeSlug} pages went unread — ${asked.refused}`)
    byType.set(pageTypeSlug, asked.rows as readonly Value[])
  }
  return holdLoreLibrary(loreLibraryFrom((slug) => byType.get(slug) ?? []))
}
