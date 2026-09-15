import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { answerPricingPost } from "akasha/temper/web/modules/pricing-post-answer/pricing-post-answer.module.code.ts"

type RequestBody = {
  wtToken: string
  platform: string
  server: string
  priceType: string
  data: unknown
}

function isRequestBody(v: unknown): v is RequestBody {
  if (!isRecord(v)) return false
  return (
    typeof v.wtToken === "string" &&
    v.wtToken.length > 0 &&
    typeof v.platform === "string" &&
    v.platform.length > 0 &&
    typeof v.server === "string" &&
    v.server.length > 0 &&
    typeof v.priceType === "string" &&
    v.priceType.length > 0 &&
    "data" in v
  )
}

export function action({ request }: { request: Request }): Promise<Response> {
  return answerPricingPost(request, isRequestBody)
}
