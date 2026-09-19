import { signInAt } from "akasha/alan/harness/handover-rr/modules/handover-arrival/handover-arrival.module.code.ts"
import {
  canonicalUrlFor,
  TEMPER_SITE,
} from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"
import { redirect } from "react-router"

export function loader({ request }: { request: Request }) {
  throw redirect(canonicalUrlFor(request) ?? signInAt(TEMPER_SITE, request))
}
