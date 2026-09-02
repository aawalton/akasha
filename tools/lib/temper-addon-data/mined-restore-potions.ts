import { readFileSync } from "node:fs"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { rowsFileOf, rowsPartsOf } from "../../../page/rows-file.ts"
import type { MinedRestorePotion } from "./generators/potion-restore-metrics.ts"

/**
 * The sweep's rows are an `items` entry property on the `temper-mine` page named `eso`.
 *
 * They cannot be asked for. The recreation turned the old `temper-mined-item` page type into
 * `page-property-entry/items`, so no page type carries that slug and the store answers 400; and
 * the akasha mine page carries `quests` alone, because 188 MB of items is far over the byte
 * ceiling akasha holds a file to, which `temper-mine.page-type.ts` states as a gap. So the rows
 * are read from the file beside whichever page carries them, akasha's first. Which files those
 * are is asked of `rowsPartsOf`, the one statement of the `.partN` convention, rather than spelt
 * again here.
 */
const MINE_PAGES: readonly string[] = [
  "akasha/temper/temper-character/mines/pages/eso/eso.temper-mine.ts",
  "pages/temper-mine/eso.temper-mine.md",
]

const ITEMS = "items"

const RESTORES = "Restore "

const IMMEDIATELY = "immediately"

function itemPartsAt(root: string): readonly string[] {
  for (const page of MINE_PAGES) {
    const parts = rowsPartsOf(`${root}/${rowsFileOf(page, ITEMS)}`)
    if (parts.length > 0) return parts
  }
  return []
}

function potionOfLine(line: string): readonly MinedRestorePotion[] {
  let values: Record<string, unknown>
  try {
    values = JSON.parse(line) as Record<string, unknown>
  } catch {
    return []
  }
  const abilityDescription = String(values.abilityDescription ?? "")
  if (!abilityDescription.includes(RESTORES)) return []
  if (!abilityDescription.includes(IMMEDIATELY)) return []
  const itemId = Number(values.itemId)
  if (!Number.isFinite(itemId) || itemId === 0) return []
  return [{ itemId, name: String(values.name ?? values.title ?? ""), abilityDescription }]
}

export async function fetchMinedRestorePotions(): Promise<readonly MinedRestorePotion[]> {
  const root = rootFor(resolveRoots(), AKASHA)
  const parts = itemPartsAt(root)
  if (parts.length === 0) {
    throw new Error(
      `no page carries the sweep's \`${ITEMS}\` rows — looked beside ${MINE_PAGES.join(" and ")}`
    )
  }
  const found: MinedRestorePotion[] = []
  for (const path of parts) {
    for (const line of readFileSync(path, "utf8").split("\n")) {
      // Every row is one line and most name no restore, so the whole line is sieved before it is
      // parsed. The parse then reads the field itself, so a match anywhere else costs a parse and
      // answers nothing.
      if (!line.includes(RESTORES)) continue
      found.push(...potionOfLine(line))
    }
  }
  return found
}
