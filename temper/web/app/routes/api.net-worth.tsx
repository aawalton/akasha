import { askComposed } from "@shared/pages-query/ask"
import { getUser } from "@shared/supabase-rr/auth/server"
import type { Route } from "./+types/api.net-worth"

const NET_WORTH_SNAPSHOT_PAGE_TYPE = "temper-net-worth-snapshot"

const SNAPSHOT_KEYS = [
  "id",
  "userId",
  "dataTimestamp",
  "totalValue",
  "excludedGuildBankValue",
] as const

const UNANSWERED =
  "the page query service did not answer, so this route holds no snapshots to report; an empty list would read as an account with no readings"

/**
 * A snapshot's numbers arrive as text, because a page file carries no types of
 * its own. Whoever reads a history counts on numbers, so they are numbers here.
 */
type Snapshot = {
  readonly id: string
  readonly dataTimestamp: number
  readonly totalValue: number
  readonly excludedGuildBankValue?: number
}

function numberIn(values: Readonly<Record<string, unknown>>, key: string): number | null {
  const one = values[key]
  if (typeof one !== "string" || one.trim() === "") return null
  const read = Number(one)
  return Number.isFinite(read) ? read : null
}

function snapshotOf(values: Readonly<Record<string, unknown>>): readonly Snapshot[] {
  const dataTimestamp = numberIn(values, "dataTimestamp")
  const totalValue = numberIn(values, "totalValue")
  if (dataTimestamp === null || totalValue === null) return []
  const excluded = numberIn(values, "excludedGuildBankValue")
  return [
    {
      id: typeof values.id === "string" ? values.id : "",
      dataTimestamp,
      totalValue,
      ...(excluded === null ? {} : { excludedGuildBankValue: excluded }),
    },
  ]
}

export async function loader({ request }: Route.LoaderArgs): Promise<Response> {
  const { user, headers } = await getUser(request)
  if (user === null) {
    return Response.json(
      { error: "this route answers a signed-in reader only" },
      { status: 401, headers }
    )
  }

  const { searchParams } = new URL(request.url)
  const said = Number(searchParams.get("since") ?? "")
  if (!Number.isFinite(said)) {
    return Response.json(
      { error: "`since` is the epoch millisecond the window opens at" },
      { status: 400, headers }
    )
  }

  const asked = await askComposed({
    "page-type": NET_WORTH_SNAPSHOT_PAGE_TYPE,
    where: { userId: user.id, dataTimestamp: { "at-or-after": String(said) } },
    keys: SNAPSHOT_KEYS,
    "sort-by": "dataTimestamp",
  })
  if (!asked.ok) {
    return Response.json({ error: UNANSWERED, unread: [asked.why] }, { status: 503, headers })
  }

  const rows = asked.answer.rows.flatMap((row) => snapshotOf(row.values))
  return Response.json({ rows }, { headers })
}
