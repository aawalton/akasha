import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"
import { redirect } from "react-router"

export function loader(): Response {
  return redirect(TEMPER_SITE.signInPath)
}
