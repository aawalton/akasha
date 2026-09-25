import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import type { SetBonusEntry } from "akasha/temper/items/core/modules/item-tooltip-types/item-tooltip-types.module.code.ts"
import { validateWatcherToken } from "akasha/temper/watcher/modules/watcher-token-check/watcher-token-check.module.code.ts"
import {
  landMineRows,
  storedItemOf,
} from "akasha/temper/web/modules/mine-row-landing/mine-row-landing.module.code.ts"

const MAX_ITEMS_PER_REQUEST = 1000

type MinedItem = {
  itemId: number
  name: string
  icon: string
  itemType: number
  specializedItemType: number
  equipType: number
  weaponType: number
  armorType: number
  weaponPower: number
  armorRating: number
  requiredLevel: number
  requiredCp: number
  merchantValue: number
  quality: number
  style: number
  filterType: number
  filterTypeSpecific: number
  isUnique: boolean
  isUniqueEquipped: boolean
  enchantHeader: string
  enchantDescription: string
  hasOnUseAbility: boolean
  abilityHeader: string
  abilityDescription: string
  abilityCooldown: number
  traitType: number
  traitDescription: string
  hasSet: boolean
  setId: number
  setName: string
  setMaxEquip: number
  setBonuses: readonly SetBonusEntry[] | null
  flavorText: string
}

type RequestBody = {
  wtToken: string
  items: readonly MinedItem[]
}

function isMinedItem(v: unknown): v is MinedItem {
  if (!isRecord(v)) return false
  return typeof v.itemId === "number" && typeof v.name === "string"
}

function isRequestBody(v: unknown): v is RequestBody {
  if (!isRecord(v)) return false
  if (typeof v.wtToken !== "string" || v.wtToken.length === 0) return false
  if (!Array.isArray(v.items)) return false
  return v.items.every(isMinedItem)
}

export async function action({ request }: { request: Request }): Promise<Response> {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  if (!isRequestBody(body)) {
    return Response.json({ error: "Malformed request body" }, { status: 400 })
  }

  const { wtToken, items } = body
  const validated = await validateWatcherToken(wtToken)
  if (!validated) {
    return Response.json({ error: "Invalid or expired watcher token" }, { status: 401 })
  }

  if (items.length > MAX_ITEMS_PER_REQUEST) {
    return Response.json(
      {
        error: `Too many items: ${items.length} exceeds cap of ${MAX_ITEMS_PER_REQUEST}. Batch smaller.`,
      },
      { status: 400 }
    )
  }

  const minedAt = Date.now()
  const kept = await landMineRows({
    property: "items",
    key: "itemId",
    rows: items.map((item) => storedItemOf(item, minedAt)),
  })
  if (!kept.ok) {
    console.error(`upsert-mined-items: none of ${items.length} item(s) was kept — ${kept.why}`)
    return Response.json({ error: kept.why, kept: 0 }, { status: 503 })
  }
  return Response.json({ kept: kept.kept })
}
