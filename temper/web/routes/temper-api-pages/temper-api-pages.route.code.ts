import { handoverReader } from "akasha/alan/harness/handover-rr/modules/handover-reader/handover-reader.module.code.ts"
import { answerPages } from "akasha/alan/harness/web-page-answer/.server/answer-pages/answer-pages.module.code.ts"
import { TEMPER_SITE } from "akasha/temper/web/modules/temper-handover-site/temper-handover-site.module.code.ts"

const READS_TEMPER = handoverReader(TEMPER_SITE)

export async function loader({
  request,
  params,
}: {
  request: Request
  params: { pageTypeSlug: string }
}): Promise<Response> {
  return answerPages(request, params.pageTypeSlug, READS_TEMPER)
}
