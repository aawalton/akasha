import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { carriedToStore } from "akasha/page/query/modules/store-carrying/store-carrying.module.code.ts"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"

async function temperSignedIn(request: Request): Promise<boolean> {
  return (await signedInAs(TEMPER_SITE, request)) !== null
}

export async function answerAsk(request: Request): Promise<Response> {
  return carriedToStore(request, "/ask", "an ask carried through tempereso.com", temperSignedIn)
}

export async function answerShape(request: Request): Promise<Response> {
  return carriedToStore(request, "/shape", "a shape asked through tempereso.com", temperSignedIn)
}
