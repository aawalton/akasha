import { existsSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { housingClassicHomes } from "akasha/temper/catalog/pursuit/temper-collectible-category/pages/housing-classic-homes/housing-classic-homes.temper-collectible-category.ts"
import { housingNotableHomes } from "akasha/temper/catalog/pursuit/temper-collectible-category/pages/housing-notable-homes/housing-notable-homes.temper-collectible-category.ts"
import { housingStapleHomes } from "akasha/temper/catalog/pursuit/temper-collectible-category/pages/housing-staple-homes/housing-staple-homes.temper-collectible-category.ts"
import { temperCollectibleCategory } from "akasha/temper/catalog/pursuit/temper-collectible-category/temper-collectible-category.page-type.ts"
import { z } from "zod"

const HOMES = [housingClassicHomes, housingNotableHomes, housingStapleHomes]

const COLLECTIBLES = "collectibles"

const ROWS = "jsonl"

const HOME_ROW = z.object({ esoCollectibleId: z.number(), collectibleName: z.string() })

function rowOf(line: string): z.infer<typeof HOME_ROW> | undefined {
  try {
    const read = HOME_ROW.safeParse(JSON.parse(line))
    return read.success ? read.data : undefined
  } catch {
    return undefined
  }
}

export async function houseNames(): Promise<ReadonlyMap<number, string>> {
  const root = codeRoot()
  const names = new Map<number, string>()
  for (const home of HOMES) {
    const found = listedAt(root, temperCollectibleCategory.slug, home.slug)[0]
    const beside = found === undefined ? null : besideAt(found.path, COLLECTIBLES, ROWS)
    if (beside === null) continue
    const at = join(root, beside)
    if (!existsSync(at)) continue
    for (const line of (await readFile(at, "utf8")).split("\n")) {
      const row = line.trim() === "" ? undefined : rowOf(line)
      if (row !== undefined) names.set(row.esoCollectibleId, row.collectibleName)
    }
  }
  return names
}
