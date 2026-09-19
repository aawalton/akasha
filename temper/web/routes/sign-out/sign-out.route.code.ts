import { signedOutCookie } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import {
  signOutAction,
  signOutLoader,
} from "akasha/alan/harness/supabase-rr/modules/sign-out-route/sign-out-route.module.code.ts"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"

export async function action({ request }: { request: Request }) {
  return signOutAction(request, [await signedOutCookie(TEMPER_SITE)])
}

export function loader() {
  return signOutLoader()
}
