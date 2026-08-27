import type { OAuthEffects } from "../oauth-effects.ts"
import type { OAuthCredential } from "../oauth-types.ts"
import type { PickAccount } from "./account-picker.ts"
import type { Forward } from "./forward.ts"
import type { HoldRegistry } from "./hold-registry.ts"
import type { ObserverSlot } from "./observer-slot.ts"
import { runPreForwardQueue } from "./pre-forward-queue.ts"

function defaultSleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function buildMessageHandler(deps: {
  logPrefix: string
  pickAccount: PickAccount
  getFreshToken: (account: string) => Promise<OAuthCredential | null>
  forward: Forward
  oauth: OAuthEffects
  sleep?: (ms: number) => Promise<void>
  holdRegistry?: HoldRegistry
  getLogDir?: () => string
}): (req: Request, observerSlot: ObserverSlot) => Promise<Response> {
  const { logPrefix, pickAccount, getFreshToken, forward, oauth } = deps
  const sleep = deps.sleep ?? defaultSleep
  const holdRegistry = deps.holdRegistry
  const getLogDir = deps.getLogDir

  return async function handleMessages(
    req: Request,
    observerSlot: ObserverSlot
  ): Promise<Response> {
    const pathname = new URL(req.url).pathname
    const method = req.method
    try {
      const originalBody = method === "POST" ? await req.arrayBuffer() : null
      return await runPreForwardQueue({
        req,
        observerSlot,
        originalBody,
        method,
        pathname,
        deps: { logPrefix, pickAccount, getFreshToken, forward, oauth },
        sleep,
        holdRegistry,
        getLogDir,
      })
    } catch (err) {
      console.error(`${logPrefix} handler error:`, err)
      console.log(
        `${logPrefix} res ${method} ${pathname} account=- status=502 fallthrough=handler-error`
      )
      return new Response(null, { status: 502, statusText: "Bad Gateway" })
    }
  }
}
