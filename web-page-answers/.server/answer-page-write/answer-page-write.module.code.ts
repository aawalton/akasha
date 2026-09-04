import { readPageWrite, runPageWrite, TAKES, writesAs } from "@akasha/pages-access/answer-write"
import { getUser } from "@akasha/supabase-rr/auth-server"

let named: string | null = null

function namedOnce(writer: string): void {
  if (named === writer) return
  writesAs(writer)
  named = writer
}

export async function answerPageWrite(request: Request, writer: string): Promise<Response> {
  namedOnce(writer)
  const { user, headers } = await getUser(request)
  if (user === null) {
    return Response.json(
      { error: "this route answers a signed-in writer only" },
      { status: 401, headers }
    )
  }
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: TAKES }, { status: 400, headers })
  }
  const asked = readPageWrite(body)
  if (asked === null) {
    return Response.json({ error: TAKES }, { status: 400, headers })
  }
  try {
    return Response.json({ result: await runPageWrite(asked) }, { headers })
  } catch (err: unknown) {
    return Response.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 400, headers }
    )
  }
}
