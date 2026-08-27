
import { isAccountTerminal, markAccountTerminal } from "./account-terminal.ts"
import { reportOAuthRecovered, reportTerminalOAuthError } from "./agent-health-write.ts"
import { LIVE_HEALTH } from "./oauth-account-health.ts"
import { writeTerminalHealth } from "./oauth-account-health"
import { refreshCredentialFromPage, watchCredentialFile } from "./oauth-file"
import { configDirForAccount, LOG } from "./supervisor-config.ts"
import { guardTick } from "./supervisor-guard-tick.ts"
import { writePacingSnapshot } from "./supervisor-usage-snapshot.ts"
import type { ProxyAdoptionRuleSource } from "./supervisor-proxy-adoption-rule.ts"
import {
  type SupervisorOAuthProxyHandle,
  spawnOrAdoptOAuthProxy,
} from "./supervisor-spawn-oauth-proxy.ts"

export async function runCredentialPullTick(args: {
  account: string
  getAgentId: () => string | null
}): Promise<void> {
  const { account, getAgentId } = args

  if (isAccountTerminal(account)) {
    return
  }

  const configDir = configDirForAccount(account)

  writePacingSnapshot(account, configDir)

  let result: Awaited<ReturnType<typeof refreshCredentialFromPage>>
  try {
    result = await refreshCredentialFromPage(account, configDir, LOG)
  } catch (err) {
    console.error(`${LOG} Credential refresh error:`, err)
    return
  }

  const id = getAgentId()
  if (result.refreshed) return

  if (result.terminal) {
    if (markAccountTerminal(account)) {
      await writeTerminalHealth({ account, logPrefix: LOG }, LIVE_HEALTH)
      reportTerminalOAuthError(
        account,
        {
          code: result.error?.code,
          description: result.error?.description,
        },
        LOG
      )
    }
    return
  }

  if (result.error != null) {
    console.error(
      `${LOG} OAuth refresh failed (${result.error.code ?? "unknown"})${result.error.description != null ? `: ${result.error.description}` : ""}`
    )
  }
}

export async function buildCredentialSubsystem(args: {
  account: string
  configDir: string
  agentIdHandle: { readonly id: string | null }
  getLogDir: () => string
  proxyOwnerAgentId: string
  oauthProxyVersion: string
  adoptedClaudePid: number | null
  proxyAdoptionRule: ProxyAdoptionRuleSource
}): Promise<{
  stopCredentialWatch: () => void
  credentialRefreshTimer: ReturnType<typeof setInterval>
  proxy: SupervisorOAuthProxyHandle
}> {
  const { account, configDir, agentIdHandle, getLogDir, proxyOwnerAgentId, oauthProxyVersion } =
    args
  const { adoptedClaudePid } = args
  const getId = () => agentIdHandle.id

  const stopCredentialFileWatch = watchCredentialFile(() => account, configDir, LOG, {
    shouldSkip: (a) => isAccountTerminal(a),
    onReauthDetected: (a) => {
      reportOAuthRecovered(a, "credential file re-auth detected", LOG)
    },
    onPushResult: (result) => {
      if (result.ok) return
      console.error(`${LOG} Credential push failed:`, result.error)
    },
  })

  const stopCredentialWatch = stopCredentialFileWatch

  const credentialRefreshTimer = setInterval(
    () => {
      guardTick(
        () => runCredentialPullTick({ account, getAgentId: getId }),
        (err) => console.error(`${LOG} credential pull tick error:`, err)
      )
    },
    5 * 60 * 1000
  )

  const proxy = await spawnOrAdoptOAuthProxy(
    {
      agentId: proxyOwnerAgentId,
      registrationAccount: account,
      logDir: getLogDir(),
      oauthProxyVersion,
      adoptedClaudePid,
    },
    args.proxyAdoptionRule
  )

  return { stopCredentialWatch, credentialRefreshTimer, proxy }
}
