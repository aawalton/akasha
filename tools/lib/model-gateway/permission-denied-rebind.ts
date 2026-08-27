import type { OAuthEffects } from "../oauth-effects.ts"
import type { OAuthCredential } from "../oauth-types.ts"
import { classifyPermissionDenied } from "./permission-denied.ts"

export type PermissionDeniedRebindOutcome =
  | { kind: "response"; response: Response }
  | { kind: "rebind"; account: string; cred: OAuthCredential }

export type PermissionDeniedRebindArgs = {
  res: Response
  currentAccount: string
  trail: readonly string[]
  tried: ReadonlySet<string>
  method: string
  pathname: string
  logPrefix: string
  pickAccount: (exclude: ReadonlySet<string>) => Promise<string | null>
  getFreshToken: (account: string) => Promise<OAuthCredential | null>
  logRes: (account: string, status: number) => undefined
  oauth: OAuthEffects
}

export async function attemptPermissionDeniedRebind(
  args: PermissionDeniedRebindArgs
): Promise<PermissionDeniedRebindOutcome> {
  const { res, currentAccount, trail, tried, method, pathname, logPrefix } = args
  const responseHeaders = res.headers
  const responseStatusText = res.statusText
  const bodyText = await res.text()
  const classification = classifyPermissionDenied(403, bodyText)
  if (!classification.matched) {
    if (trail.length === 1) {
      args.logRes(currentAccount, 403)
    } else {
      console.log(`${logPrefix} res ${method} ${pathname} account=${trail.join("→")} status=403`)
    }
    return {
      kind: "response",
      response: new Response(bodyText, {
        status: 403,
        statusText: responseStatusText,
        headers: responseHeaders,
      }),
    }
  }
  console.log(
    `${logPrefix} 403 permission_error observed account=${currentAccount}; disable+rebind reason=${classification.reason}`
  )
  await args.oauth.markAccountSubscriptionDisabled(currentAccount, classification.reason, logPrefix)

  const nextAccount = await args.pickAccount(tried)
  if (nextAccount == null || tried.has(nextAccount)) {
    const reason = nextAccount == null ? "no-viable-account" : "looped"
    console.log(
      `${logPrefix} res ${method} ${pathname} account=${trail.join("→")} status=403 rebind=${reason} disabled=true`
    )
    return {
      kind: "response",
      response: new Response(bodyText, {
        status: 403,
        statusText: responseStatusText,
        headers: responseHeaders,
      }),
    }
  }
  const nextCred = await args.getFreshToken(nextAccount)
  if (!nextCred) {
    console.log(
      `${logPrefix} res ${method} ${pathname} account=${trail.join("→")}→${nextAccount} status=403 rebind=no-fresh-token disabled=true`
    )
    return {
      kind: "response",
      response: new Response(bodyText, {
        status: 403,
        statusText: responseStatusText,
        headers: responseHeaders,
      }),
    }
  }
  return { kind: "rebind", account: nextAccount, cred: nextCred }
}
