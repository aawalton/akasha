import { answerPageWrite } from "akasha/alan/harness/web-page-answer/.server/answer-page-write/answer-page-write.module.code.ts"

export async function action({ request }: { request: Request }): Promise<Response> {
  return answerPageWrite(request, "temper-web")
}
