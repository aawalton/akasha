import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { validateWatcherToken } from "akasha/temper/watcher/modules/watcher-token-check/watcher-token-check.module.code.ts"
import {
  landMineRows,
  storedQuestOf,
} from "akasha/temper/web/modules/mine-row-landing/mine-row-landing.module.code.ts"

const MAX_QUESTS_PER_REQUEST = 1000

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

  if (items.length > MAX_QUESTS_PER_REQUEST) {
    return Response.json(
      {
        error: `Too many items: ${items.length} exceeds cap of ${MAX_QUESTS_PER_REQUEST}. Batch smaller.`,
      },
      { status: 400 }
    )
  }

  const minedAt = Date.now()
  const kept = await landMineRows({
    property: "quests",
    key: "questId",
    rows: items.map((quest) => storedQuestOf(quest, minedAt)),
  })
  if (!kept.ok) {
    console.error(`upsert-mined-quests: none of ${items.length} quest(s) was kept — ${kept.why}`)
    return Response.json({ error: kept.why, kept: 0 }, { status: 503 })
  }
  return Response.json({ kept: kept.kept })
}
