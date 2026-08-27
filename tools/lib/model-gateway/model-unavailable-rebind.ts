
import type { OAuthEffects } from "../oauth-effects.ts"
import type { OAuthCredential } from "../oauth-types.ts"
import { classifyModelUnavailable, decideModelUnavailableAction } from "./model-unavailable.ts"

export type ModelUnavailableRebindOutcome =
  | { kind: "response"; response: Response }
  | { kind: "rebind"; account: string; cred: OAuthCredential }

export type ModelUnavailableRebindArgs = {
  res: Response
  currentAccount: string
  trail: readonly string[]
  tried: ReadonlySet<string>
  method: string
  pathname: string
  logPrefix: string
  markedByReason: Map<string, string>
  pickAccount: (exclude: ReadonlySet<string>) => Promise<string | null>
  getFreshToken: (account: string) => Promise<OAuthCredential | null>
  logRes: (account: string, status: number) => undefined
  oauth: OAuthEffects
}

export async function attemptModelUnavailableRebind(
  args: ModelUnavailableRebindArgs
): Promise<ModelUnavailableRebindOutcome> {
  const { res, currentAccount, trail, tried, method, pathname, logPrefix } = args
  const responseHeaders = res.headers
  const responseStatusText = res.statusText
  const bodyText = await res.text()
  const classification = classifyModelUnavailable(404, bodyText)
  if (!classification.matched) {
    console.error(
      `${logPrefix} upstream-terminal-error ${method} ${pathname} account=${trail.join("→")} status=404 rebind=none-unmatched`
    )
    return {
      kind: "response",
      response: new Response(bodyText, {
        status: 404,
        statusText: responseStatusText,
        headers: responseHeaders,
      }),
    }
  }
  const decision = decideModelUnavailableAction(
    args.markedByReason,
    classification.reason,
    currentAccount
  )
  if (decision.action === "global-unmark") {
    await args.oauth.clearAccountSubscriptionDisabled(decision.firstAccount, logPrefix)
    console.error(
      `${logPrefix} upstream-terminal-error ${method} ${pathname} account=${trail.join("→")} status=404 rebind=global-unmarked unmarked=${decision.firstAccount} reason=${classification.reason}`
    )
    return {
      kind: "response",
      response: new Response(bodyText, {
        status: 404,
        statusText: responseStatusText,
        headers: responseHeaders,
      }),
    }
  }
  console.log(
    `${logPrefix} 404 not_found observed account=${currentAccount}; disable+rebind reason=${classification.reason}`
  )
  await args.oauth.markAccountSubscriptionDisabled(
    currentAccount,
    `model_unavailable: ${classification.reason}`,
    logPrefix
  )
  args.markedByReason.set(classification.reason, currentAccount)

  const nextAccount = await args.pickAccount(tried)
  if (nextAccount == null || tried.has(nextAccount)) {
    const reason = nextAccount == null ? "no-viable-account" : "looped"
    console.error(
      `${logPrefix} upstream-terminal-error ${method} ${pathname} account=${trail.join("→")} status=404 rebind=${reason} disabled=true`
    )
    return {
      kind: "response",
      response: new Response(bodyText, {
        status: 404,
        statusText: responseStatusText,
        headers: responseHeaders,
      }),
    }
  }
  const nextCred = await args.getFreshToken(nextAccount)
  if (!nextCred) {
    console.error(
      `${logPrefix} upstream-terminal-error ${method} ${pathname} account=${trail.join("→")}→${nextAccount} status=404 rebind=no-fresh-token disabled=true`
    )
    return {
      kind: "response",
      response: new Response(bodyText, {
        status: 404,
        statusText: responseStatusText,
        headers: responseHeaders,
      }),
    }
  }
  return { kind: "rebind", account: nextAccount, cred: nextCred }
}
