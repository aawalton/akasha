import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { answerFollow } from "akasha/alan/harness/web-page-answer/.server/answer-following/answer-following.module.code.ts"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"

const READS_TEMPER = handoverReader(TEMPER_SITE)

export function action({ request }: { request: Request }): Promise<Response> {
  return answerFollow(request, READS_TEMPER)
}
