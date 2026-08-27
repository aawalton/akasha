
import {
  isForcedToolChoiceRejection,
  rewriteForcedToolChoiceToAuto,
} from "./forced-tool-choice.ts"

export type ForcedToolChoiceRewriteOutcome =
  | { kind: "response"; response: Response }
  | { kind: "retry"; rewrittenBody: ArrayBuffer }

export type ForcedToolChoiceRewriteArgs = {
  res: Response
  bodyBuffer: ArrayBuffer | null
  currentAccount: string
  trail: readonly string[]
  method: string
  pathname: string
  logPrefix: string
  logRes: (account: string, status: number) => undefined
}

export async function attemptForcedToolChoiceRewrite(
  args: ForcedToolChoiceRewriteArgs
): Promise<ForcedToolChoiceRewriteOutcome> {
  const { res, bodyBuffer, currentAccount, trail, method, pathname, logPrefix } = args
  const responseHeaders = res.headers
  const responseStatusText = res.statusText
  const bodyText = await res.text()
  const passthrough = (): ForcedToolChoiceRewriteOutcome => {
    if (trail.length === 1) {
      args.logRes(currentAccount, 400)
    } else {
      console.log(`${logPrefix} res ${method} ${pathname} account=${trail.join("→")} status=400`)
    }
    return {
      kind: "response",
      response: new Response(bodyText, {
        status: 400,
        statusText: responseStatusText,
        headers: responseHeaders,
      }),
    }
  }
  if (bodyBuffer == null || !isForcedToolChoiceRejection(400, bodyText)) return passthrough()
  const rewrittenBody = rewriteForcedToolChoiceToAuto(bodyBuffer)
  if (rewrittenBody == null) return passthrough()
  console.log(
    `${logPrefix} 400 forced-tool_choice observed account=${currentAccount}; rewrite tool_choice=auto + retry`
  )
  return { kind: "retry", rewrittenBody }
}
