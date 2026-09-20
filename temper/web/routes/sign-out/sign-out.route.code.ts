import {
  leaveHandover,
  leavingShown,
} from "akasha/alan/harness/handover-rr/modules/handover-leaving/handover-leaving.module.code.ts"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"

export async function action() {
  return leaveHandover(TEMPER_SITE)
}

export function loader() {
  return leavingShown(TEMPER_SITE)
}
