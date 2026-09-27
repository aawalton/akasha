import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { heldReading } from "akasha/page/service/modules/held-reading/held-reading.module.code.ts"
import {
  heldKeyedTitles,
  holdKeyedTitles,
  KEYED_TITLE_FIELDS,
  type KeyedTitles,
  keyedTitlesFrom,
} from "akasha/temper/items/core/modules/keyed-titles/keyed-titles.module.code.ts"

const EVERY = 500

const kept = new Map<string, () => Promise<KeyedTitles>>()

function keptFor(pageTypeSlug: string): () => Promise<KeyedTitles> {
  const found = kept.get(pageTypeSlug)
  if (found !== undefined) return found
  const made = heldReading([pageTypeSlug], async () => {
    const { rows } = await getPages({ pageTypeSlug, select: KEYED_TITLE_FIELDS, limit: EVERY })
    return holdKeyedTitles(keyedTitlesFrom(pageTypeSlug, rows))
  })
  kept.set(pageTypeSlug, made)
  return made
}

export async function loadKeyedTitles(pageTypeSlug: string): Promise<KeyedTitles> {
  return heldKeyedTitles(pageTypeSlug) ?? (await keptFor(pageTypeSlug)())
}
