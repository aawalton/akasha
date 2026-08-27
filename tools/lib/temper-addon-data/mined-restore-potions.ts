import { askComposed } from "./pages-bridge.ts"
import type { MinedRestorePotion } from "./generators/potion-restore-metrics.ts"

const MINED_ITEM_PAGE_TYPE = "temper-mined-item"

const MINED_ITEM_CEILING_MS = 60_000

function minedItemFetcher(url: string, init: RequestInit): Promise<Response> {
  return fetch(url, { ...init, signal: AbortSignal.timeout(MINED_ITEM_CEILING_MS) })
}

export async function fetchMinedRestorePotions(): Promise<readonly MinedRestorePotion[]> {
  const asked = await askComposed(
    {
      "page-type": MINED_ITEM_PAGE_TYPE,
      where: { abilityDescription: { contains: "Restore " } },
      keys: ["itemId", "name", "title", "abilityDescription"],
    },
    minedItemFetcher
  )
  if (!asked.ok) throw new Error(asked.why)
  return asked.answer.rows.flatMap((row) => {
    const itemId = Number(row.values.itemId)
    const abilityDescription = String(row.values.abilityDescription ?? "")
    if (!Number.isFinite(itemId) || itemId === 0 || abilityDescription === "") return []
    if (!abilityDescription.includes("immediately")) return []
    const name = String(row.values.name ?? row.values.title ?? "")
    return [{ itemId, name, abilityDescription }]
  })
}
