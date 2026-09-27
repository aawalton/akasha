import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { heldReading } from "akasha/page/service/modules/held-reading/held-reading.module.code.ts"
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
