import { answerAsk } from "akasha/temper/web/.server/answer-ask/answer-ask.module.code.ts"

export async function action({ request }: { request: Request }): Promise<Response> {
  return answerAsk(request)
}
