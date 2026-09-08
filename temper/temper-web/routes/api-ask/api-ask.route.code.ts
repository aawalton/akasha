import { answerAsk } from "../../.server/answer-ask/answer-ask.module.code.ts"

export async function action({ request }: { request: Request }): Promise<Response> {
  return answerAsk(request)
}
