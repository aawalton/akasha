import { isRecord } from "@akasha/utils/narrow/is-record"
import type { SetBonusEntry } from "akasha/temper/items-core/item-tooltip-types/item-tooltip-types.module.code.ts"
import { validateWatcherToken } from "../../../watcher/watcher-token-check/watcher-token-check.module.code.ts"
import {
  MINE_NAME,
  MINED_ITEM_PAGE_TYPE,
} from "../../mined-item-rows/mined-item-rows.module.code.ts"

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

  console.error(
    `upsert-mined-items: ${items.length} item(s) were not kept in \`${MINED_ITEM_PAGE_TYPE}/${MINE_NAME}\` — a row sits inside a page's body, and ${WRITER} has no way to reach one`
  )
  return Response.json(
    {
      error: `a row sits inside a page's body rather than at a path of its own, and the store writes a path and a whole body, so none of these ${items.length} item(s) was kept. land the mine's body with \`writeFiles\` or \`patchFiles\`, or through the akasha command line`,
      upserted: 0,
    },
    { status: 503 }
  )
}
