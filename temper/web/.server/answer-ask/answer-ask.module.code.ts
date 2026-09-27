import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { postingTo } from "akasha/page/query/modules/store-reaching/store-reaching.module.code.ts"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"

const SIGNED_IN_ONLY = "this route answers a signed-in reader only"

const TAKES = "the question is carried as a JSON body"

async function carried(request: Request, path: string, what: string): Promise<Response> {
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
  const reached = await postingTo(path, what, body)
  if (!reached.ok) {
    return Response.json({ refused: reached.why }, { status: reached.status ?? 502 })
  }
  return Response.json(reached.body)
}

export async function answerAsk(request: Request): Promise<Response> {
  return carried(request, "/ask", "an ask carried through the web")
}

export async function answerShape(request: Request): Promise<Response> {
  return carried(request, "/shape", "a shape asked through the web")
}
