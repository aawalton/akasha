import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { answerPageTypes } from "akasha/alan/harness/web-page-answer/.server/answer-page-types/answer-page-types.module.code.ts"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"

const READS_TEMPER = handoverReader(TEMPER_SITE)

export async function loader({ request }: { request: Request }): Promise<Response> {
  return answerPageTypes(request, READS_TEMPER)
}
