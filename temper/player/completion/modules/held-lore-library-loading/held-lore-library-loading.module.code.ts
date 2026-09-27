import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { heldReading } from "akasha/page/service/modules/held-reading/held-reading.module.code.ts"
import { asking } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import {
  heldLoreLibrary,
  holdLoreLibrary,
  LORE_LIBRARY_READS,
  type LoreLibrary,
  loreLibraryFrom,
} from "akasha/temper/player/completion/modules/held-lore-library/held-lore-library.module.code.ts"

const EVERY = 20000

async function readLoreLibrary(): Promise<LoreLibrary> {
  const byType = new Map<string, readonly Value[]>()
  await Promise.all(
    LORE_LIBRARY_READS.map(async ([pageTypeSlug, select]) => {
      const read = await getPages({ pageTypeSlug, select: [...select], limit: EVERY })
      byType.set(pageTypeSlug, read.rows)
    })
  )
  return holdLoreLibrary(loreLibraryFrom((pageTypeSlug) => byType.get(pageTypeSlug) ?? []))
}

const kept = heldReading(
  LORE_LIBRARY_READS.map(([pageTypeSlug]) => pageTypeSlug),
  readLoreLibrary
)

export async function loadLoreLibrary(): Promise<LoreLibrary> {
  return heldLoreLibrary() ?? (await kept())
}

export function loreLibraryAt(root: string): LoreLibrary {
  const byType = new Map<string, readonly Value[]>()
  for (const [pageTypeSlug, keys] of LORE_LIBRARY_READS) {
    const asked = asking(root, { pageTypeSlug, keys } as never)
    if ("refused" in asked) {
      throw new Error(`the ${pageTypeSlug} pages went unread — ${asked.refused}`)
    }
    byType.set(pageTypeSlug, asked.rows as readonly Value[])
  }
  return loreLibraryFrom((pageTypeSlug) => byType.get(pageTypeSlug) ?? [])
}
