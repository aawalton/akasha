import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { postingTo } from "akasha/page/query/modules/store-reaching/store-reaching.module.code.ts"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"

const SIGNED_IN_ONLY = "this route answers a signed-in reader only"

const TAKES = "an ask carries the question as a JSON body"

export async function answerAsk(request: Request): Promise<Response> {
  const reader = await signedInAs(TEMPER_SITE, request)
  if (reader === null) {
    return Response.json({ error: SIGNED_IN_ONLY }, { status: 401 })
  }
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: TAKES }, { status: 400 })
  }
  const reached = await postingTo("/ask", "an ask carried through the web", body)
  if (!reached.ok) {
    return Response.json({ refused: reached.why }, { status: reached.status ?? 502 })
  }
  return Response.json(reached.body)
}
