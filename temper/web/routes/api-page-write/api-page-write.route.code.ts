import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { answerPageWrite } from "akasha/alan/harness/web-page-answer/.server/answer-page-write/answer-page-write.module.code.ts"
import { refusedBuildSave } from "akasha/temper/web/modules/build-save-guard/build-save-guard.module.code.ts"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"

const READS_TEMPER = handoverReader(TEMPER_SITE)

export async function action({ request }: { request: Request }): Promise<Response> {
  const refused = await refusedBuildSave(request)
  if (refused !== null) return refused
  return answerPageWrite(request, "temper-web", READS_TEMPER)
}
