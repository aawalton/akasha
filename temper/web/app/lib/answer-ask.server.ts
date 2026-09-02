import { postingTo } from "@akasha/pages-query/fetcher"
import { getUser } from "@akasha/supabase-rr/auth-server"

const SIGNED_IN_ONLY = "this route answers a signed-in reader only"

const TAKES = "an ask carries the question as a JSON body"

// The browser half of `pageStoreOrigin()` addresses the store at `<origin>/api/ask`, so this is
// where a question asked in a browser lands. It carries the body through to the store and answers
// what the store answered, unchanged, because the caller is `askComposed` and it reads the store's
// own shape.
export async function answerAsk(request: Request): Promise<Response> {
  const { user, headers } = await getUser(request)
  if (user === null) {
    return Response.json({ error: SIGNED_IN_ONLY }, { status: 401, headers })
  }
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: TAKES }, { status: 400, headers })
  }
  const reached = await postingTo("/ask", "an ask carried through the web", body)
  if (!reached.ok) {
    return Response.json({ refused: reached.why }, { status: reached.status ?? 502, headers })
  }
  return Response.json(reached.body, { headers })
}
