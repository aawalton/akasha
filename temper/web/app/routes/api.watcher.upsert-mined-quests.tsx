import { patchRows } from "@shared/pages-query"
import { isRecord } from "@shared/utils-narrow/is-record"
import { MINE_NAME, MINED_QUEST_PAGE_TYPE } from "@/lib/mined-item-rows"
import { validateWatcherToken } from "@/lib/watcher-auth"
import type { Route } from "./+types/api.watcher.upsert-mined-quests"

const MAX_QUESTS_PER_REQUEST = 1000

const WRITER = "temper-watcher"

type MinedQuest = {
  questId: number
  name: string
  questType: number
  repeatableType: number
  zoneId: number
  zoneName: string
}

type RequestBody = {
  wtToken: string
  items: readonly MinedQuest[]
}

function isMinedQuest(v: unknown): v is MinedQuest {
  if (!isRecord(v)) return false
  return typeof v.questId === "number" && typeof v.name === "string"
}

function isRequestBody(v: unknown): v is RequestBody {
  if (!isRecord(v)) return false
  if (typeof v.wtToken !== "string" || v.wtToken.length === 0) return false
  if (!Array.isArray(v.items)) return false
  return v.items.every(isMinedQuest)
}

/** A quest is keyed by the number the game knows it by, as an item is. */
function rowOf(quest: MinedQuest): Record<string, unknown> {
  return { ...quest, slug: String(quest.questId), title: quest.name }
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

  if (items.length > MAX_QUESTS_PER_REQUEST) {
    return Response.json(
      {
        error: `Too many items: ${items.length} exceeds cap of ${MAX_QUESTS_PER_REQUEST}. Batch smaller.`,
      },
      { status: 400 }
    )
  }

  const written = await patchRows(MINED_QUEST_PAGE_TYPE, MINE_NAME, items.map(rowOf), WRITER)
  if (!written.ok) {
    return Response.json({ error: written.why }, { status: 502 })
  }
  return Response.json({ ok: true, upserted: items.length })
}
