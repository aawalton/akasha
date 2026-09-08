import { answerPageTypes } from "@akasha/web-page-answers/answer-page-types"

export async function loader({ request }: { request: Request }): Promise<Response> {
  return answerPageTypes(request)
}
