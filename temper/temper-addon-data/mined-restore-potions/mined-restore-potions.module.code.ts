import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { AKASHA, resolveRoots, rootFor } from "@akasha/pages-system/checkout-roots"
import { partAt } from "@akasha/pages-system/page-file-parts"
import type { MinedRestorePotion } from "../potion-restore-metrics/potion-restore-metrics.module.code.ts"

const MINE_PAGES: readonly string[] = [
  "akasha/temper/temper-character/mines/pages/eso/eso.temper-mine.ts",
  "pages/temper-mine/eso.temper-mine.md",
]

const ITEMS = "items"

const HELD = "jsonl"

const MARKDOWN = ".md"

const FIRST_PART = 1

const RESTORES = "Restore "

const IMMEDIATELY = "immediately"

function markdownPartAt(page: string, part: number): string {
  const stem = page.slice(0, -MARKDOWN.length)
  const section = part <= FIRST_PART ? ITEMS : `${ITEMS}.part${part}`
  return `${stem}.${section}.${HELD}`
}

function namedAt(page: string, part: number): string | null {
  const beside = partAt(page, ITEMS, HELD, part)
  if (beside !== null) return beside
  return page.endsWith(MARKDOWN) ? markdownPartAt(page, part) : null
}

function itemPartsAt(root: string): readonly string[] {
  for (const page of MINE_PAGES) {
    const found: string[] = []
    for (let part = FIRST_PART; ; part += 1) {
      const at = namedAt(page, part)
      if (at === null) break
      const whole = join(root, at)
      if (!existsSync(whole)) break
      found.push(whole)
    }
    if (found.length > 0) return found
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
      if (!line.includes(RESTORES)) continue
      found.push(...potionOfLine(line))
    }
  }
  return found
}
