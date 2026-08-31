
import { readFileSync, unwatchFile, watchFile } from "node:fs"
import { join } from "node:path"

import { CREDENTIAL_FILE_SCHEMA } from "./oauth-credential-file.ts"
import {
  decideIdentityPush,
  describeFailedIdentityWrite,
  type IdentityPushDecision,
} from "./oauth-identity-core.ts"
import { probeCredentialIdentity } from "./oauth-identity-probe.ts"
import { pageCredentialStore } from "./oauth-page-db.ts"
import { pinIdentityOnPage } from "./oauth-page-identity.ts"
import { accountUuidsFromPages } from "./oauth-page-state.ts"

function assertNeverIdentityDecision(decision: never): never {
  throw new Error(`pushCredentialFileToPage: unhandled identity decision ${JSON.stringify(decision)}`)
}

export interface PushCredentialOptions {
  readonly allowRebind?: boolean
}

export async function pushCredentialFileToPage(
  account: string,
  credentialDir: string,
  logPrefix = "[oauth]",
  opts: PushCredentialOptions = {}
): Promise<void> {
  const credPath = join(credentialDir, ".credentials.json")
  let raw: string
  try {
    raw = readFileSync(credPath, "utf-8")
  } catch {
    console.log(`${logPrefix} No credentials file at ${credPath}, skipping push`)
    return
  }

  const parsed = CREDENTIAL_FILE_SCHEMA.parse(JSON.parse(raw))
  const oauth = parsed.claudeAiOauth
  if (!oauth) {
    console.log(`${logPrefix} No claudeAiOauth in credentials file, skipping push`)
    return
  }

  const decision: IdentityPushDecision = decideIdentityPush({
    account,
    identity: await probeCredentialIdentity(oauth.accessToken),
    pinnedUuidByAccount: accountUuidsFromPages(),
    allowRebind: opts.allowRebind === true,
  })

  switch (decision.kind) {
    case "refuse": {
      const message = `${logPrefix} REFUSING credential push for ${account}: ${decision.reason}`
      console.error(message)
      throw new Error(message)
    }
    case "match":
      await pageCredentialStore(logPrefix).updateTokenIfNewer({
        account,
        accessToken: oauth.accessToken,
        refreshToken: oauth.refreshToken,
        expiresAt: oauth.expiresAt,
      })
      break
    case "pin":
    case "rebind": {
      const previousUuid = decision.kind === "rebind" ? decision.previousUuid : null
      const pinned = pinIdentityOnPage({
        account,
        accessToken: oauth.accessToken,
        refreshToken: oauth.refreshToken,
        expiresAt: oauth.expiresAt,
        accountUuid: decision.accountUuid,
        previousUuid,
      })
      if (pinned.kind === "refused") {
        const said = describeFailedIdentityWrite({ account, previousUuid, at: pinned.at, why: pinned.why })
        const message = `${logPrefix} ${said}`
        console.error(message)
        throw new Error(message)
      }
      break
    }
    default:
      return assertNeverIdentityDecision(decision)
  }
  console.log(`${logPrefix} Pushed token update for ${account} (identity: ${decision.kind})`)
}

export interface CredentialFileChangeArgs {
  account: string
  credentialDir: string
  prevObservedExpiresAt: number | null
  shouldSkip: (account: string) => boolean
  push: (account: string, credentialDir: string) => Promise<void>
  onReauthDetected?: (account: string) => void
  logPrefix?: string
}

export interface CredentialFileChangeResult {
  pushed: boolean
  observedExpiresAt: number | null
  reauthDetected: boolean
}

export async function handleCredentialFileChange(
  args: CredentialFileChangeArgs
): Promise<CredentialFileChangeResult> {
  const { account, credentialDir, prevObservedExpiresAt, shouldSkip, push, onReauthDetected } = args
  const logPrefix = args.logPrefix ?? "[oauth]"
  const credPath = join(credentialDir, ".credentials.json")

  let fileExpiresAt: number
  try {
    const raw = readFileSync(credPath, "utf-8")
    const parsed = CREDENTIAL_FILE_SCHEMA.parse(JSON.parse(raw))
    const candidate = parsed.claudeAiOauth?.expiresAt
    if (typeof candidate !== "number") {
      return { pushed: false, observedExpiresAt: prevObservedExpiresAt, reauthDetected: false }
    }
    fileExpiresAt = candidate
  } catch {
    console.log(`${logPrefix} Credential file unreadable or malformed at ${credPath}`)
    return { pushed: false, observedExpiresAt: prevObservedExpiresAt, reauthDetected: false }
  }

  const reauthDetected = prevObservedExpiresAt !== null && fileExpiresAt > prevObservedExpiresAt

  if (shouldSkip(account)) {
    if (reauthDetected) {
      onReauthDetected?.(account)
      await push(account, credentialDir)
      return { pushed: true, observedExpiresAt: fileExpiresAt, reauthDetected: true }
    }
    return { pushed: false, observedExpiresAt: fileExpiresAt, reauthDetected: false }
  }

  await push(account, credentialDir)
  return { pushed: true, observedExpiresAt: fileExpiresAt, reauthDetected }
}

export function watchCredentialFile(
  getAccount: () => string,
  credentialDir: string,
  logPrefix = "[oauth]",
  opts: {
    shouldSkip?: (account: string) => boolean
    onReauthDetected?: (account: string) => void
    onPushResult?: (result: { ok: true } | { ok: false; error: unknown }) => void
  } = {}
): () => void {
  const credPath = join(credentialDir, ".credentials.json")
  let debounceTimer: ReturnType<typeof setTimeout> | null = null
  let lastPushedMtime = 0
  let lastObservedExpiresAt: number | null = null

  const onChange = (curr: import("node:fs").Stats, prev: import("node:fs").Stats) => {
    if (curr.mtimeMs === prev.mtimeMs || curr.size === 0) return
    if (curr.mtimeMs === lastPushedMtime) return

    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      debounceTimer = null
      const account = getAccount()
      if (account === "") return

      const wrappedPush = async (a: string, dir: string): Promise<void> => {
        lastPushedMtime = curr.mtimeMs
        try {
          await pushCredentialFileToPage(a, dir, logPrefix)
          opts.onPushResult?.({ ok: true })
        } catch (err) {
          console.error(`${logPrefix} Credential watch push failed:`, err)
          opts.onPushResult?.({ ok: false, error: err })
        }
      }

      void handleCredentialFileChange({
        account,
        credentialDir,
        prevObservedExpiresAt: lastObservedExpiresAt,
        shouldSkip: (a) => opts.shouldSkip?.(a) ?? false,
        push: wrappedPush,
        onReauthDetected: opts.onReauthDetected,
        logPrefix,
      }).then((result) => {
        lastObservedExpiresAt = result.observedExpiresAt
        if (!result.pushed && opts.shouldSkip?.(account) && !result.reauthDetected) {
          console.log(
            `${logPrefix} Credential watch push skipped for ${account} (terminal error — re-auth required)`
          )
        }
      })
    }, 2_000)
  }

  watchFile(credPath, { interval: 3_000 }, onChange)

  return () => {
    if (debounceTimer) clearTimeout(debounceTimer)
    unwatchFile(credPath, onChange)
  }
}
