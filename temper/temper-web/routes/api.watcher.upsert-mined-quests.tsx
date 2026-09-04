import { isRecord } from "@akasha/utils-narrow/is-record"
import { validateWatcherToken } from "../../temper-watcher/watcher-token-check/watcher-token-check.module.code.ts"
import { MINE_NAME, MINED_QUEST_PAGE_TYPE } from "../mined-item-rows/mined-item-rows.module.code.ts"
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

  // Same refusal as `api.watcher.upsert-mined-items`: a mined quest landed as a row, and a row
  // stands inside a page's body rather than at a path of its own, so `patchRows` has refused every
  // call since 4c1f05a264. The watcher has been posting here and reading 502 ever since.
  console.error(
    `upsert-mined-quests: ${items.length} quest(s) were not kept in \`${MINED_QUEST_PAGE_TYPE}/${MINE_NAME}\` — a row stands inside a page's body, and ${WRITER} has no way to reach one`
  )
  return Response.json(
    {
      error: `a row stands inside a page's body rather than at a path of its own, and the store writes a path and a whole body, so none of these ${items.length} quest(s) was kept. land the mine's body with \`writeFiles\` or \`patchFiles\`, or through the akasha command line`,
      upserted: 0,
    },
    { status: 503 }
  )
}
