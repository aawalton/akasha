import { landFromHandover } from "akasha/alan/harness/handover-rr/modules/handover-arrival/handover-arrival.module.code.ts"
import {
  canonicalUrlFor,
  TEMPER_SITE,
} from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"
import { redirect } from "react-router"

export async function loader({ request }: { request: Request }) {
  const canonical = canonicalUrlFor(request)
  if (canonical !== null) throw redirect(canonical)
  throw await landFromHandover(TEMPER_SITE, request)
}
