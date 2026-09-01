import { patchRows } from "@shared/pages-query"
import { isRecord } from "@shared/utils-narrow/is-record"
import type { SetBonusEntry } from "@temper/game-items-core/item-tooltip-types"
import { MINE_NAME, MINED_ITEM_PAGE_TYPE } from "@/lib/mined-item-rows"
import { validateWatcherToken } from "@/lib/watcher-auth"
import type { Route } from "./+types/api.watcher.upsert-mined-items"

const MAX_ITEMS_PER_REQUEST = 1000

const WRITER = "temper-watcher"

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
  value: number
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

/**
 * The mine keys an item by the number the game knows it by, so `slug` is the
 * item id and a later mine of the same item replaces the row standing under it.
 */
function rowOf(item: MinedItem): Record<string, unknown> {
  return { ...item, slug: String(item.itemId), title: item.name }
}

export async function action({ request }: Route.ActionArgs): Promise<Response> {
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

  const written = await patchRows(MINED_ITEM_PAGE_TYPE, MINE_NAME, items.map(rowOf), WRITER)
  if (!written.ok) {
    return Response.json({ error: written.why }, { status: 502 })
  }
  return Response.json({ ok: true, upserted: items.length })
}
