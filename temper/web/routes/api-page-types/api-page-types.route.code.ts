import { answerPageTypes } from "akasha/alan/harness/web-page-answer/.server/answer-page-types/answer-page-types.module.code.ts"

export async function loader({ request }: { request: Request }): Promise<Response> {
  return answerPageTypes(request)
}
