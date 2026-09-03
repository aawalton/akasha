import { reconcileAgentBootFiles, resolveClaudeHandoff } from "@akasha/seat-system/supervisor-adopt"
import { selectAccountAndWriteCredential } from "@akasha/seat-system/supervisor-agent"
import { createAgent } from "@akasha/seat-system/supervisor-agent-create"
import { configDirForAccount, LOG } from "@akasha/seat-system/supervisor-config"
import { buildCredentialSubsystem } from "@akasha/seat-system/supervisor-credentials"
import { AGENT_LAUNCH_OPENED, AGENT_LAUNCH_SPAWNED } from "@akasha/seat-system/supervisor-env"
import {
  parseSupervisorHandoffEnv,
  resolveProxyOwnerAgentId,
  SUPERVISOR_HANDOFF_ENV_KEYS,
} from "@akasha/seat-system/supervisor-handoff-env"
import { computeModelGatewayTreeVersion } from "./model-gateway-tree-version"
import { claimSeatSupervision } from "./seat-supervisor-claim.ts"
import { shape } from "./shape.ts"
import type {
  InteractiveBootArgs,
  InteractiveSessionBoot,
} from "./supervisor-interactive-boot-contract.ts"
import { startPerAgentMonitors } from "./supervisor-monitors-wire.ts"
import { installProxyVersionSubsystem } from "./supervisor-proxy-version.ts"
import {
  AGENT_MODE_HEADLESS,
  AGENT_MODE_INTERACTIVE,
  stateSeatDefaults,
} from "./supervisor-seat-defaults.ts"
import { setProxyOwnerAgentIdForSelfHeal } from "./supervisor-self-heal-state"
import { createAgentIdHandle } from "./supervisor-self-identity.ts"
import {
  setInheritedClaude,
  setOAuthProxyHandle,
  setRestoreConsoleHandle,
} from "./supervisor-state.ts"
import { toolRestrictions } from "./tool-access.ts"

const ENV_OPTIONAL = shape.string().optional()

export async function bootInteractiveSession(
  args: InteractiveBootArgs
): Promise<InteractiveSessionBoot> {
  const { opts, agentLog } = args

  const handoff = parseSupervisorHandoffEnv(process.env)
  for (const key of SUPERVISOR_HANDOFF_ENV_KEYS) delete process.env[key]
  const inheritedClaude = resolveClaudeHandoff(
    handoff,
    ENV_OPTIONAL.parse(process.env.SUPERVISOR_USE_INPLACE_REEXEC)
  )
  if (inheritedClaude) {
    setInheritedClaude(inheritedClaude)
    console.log(
      `${LOG} adopt: inherited Claude pid=${inheritedClaude.pid} ` +
        `agent=${inheritedClaude.agentId} session=${inheritedClaude.sessionId} ` +
        `account=${inheritedClaude.account}`
    )
  }
  const processId = inheritedClaude?.processId ?? crypto.randomUUID().slice(0, 8)

  const selectedAccount =
    inheritedClaude?.account ??
    (await selectAccountAndWriteCredential(opts.account, undefined, !opts.headless))

  const configDir = configDirForAccount(selectedAccount)
  reconcileAgentBootFiles(configDir, inheritedClaude)

  const agentIdHandle = createAgentIdHandle(opts.agentId ?? null)

  let agentId: string | null = inheritedClaude?.agentId ?? opts.agentId ?? null
  const sessionId = inheritedClaude?.sessionId ?? opts.sessionId ?? crypto.randomUUID()
  const launch = opts.headless ? AGENT_LAUNCH_SPAWNED : AGENT_LAUNCH_OPENED
  const mode = opts.headless ? AGENT_MODE_HEADLESS : AGENT_MODE_INTERACTIVE
  if (agentId == null) {
    agentId = await createAgent(selectedAccount, launch)
  }
  agentIdHandle.bind(agentId)

  await stateSeatDefaults({ agentId, mode })

  claimSeatSupervision(agentId)

  setRestoreConsoleHandle(agentLog.redirectTo(agentId))

  const proxyOwnerAgentId = resolveProxyOwnerAgentId({
    handoffProxyOwnerAgentId: handoff.proxyOwnerAgentId,
    sessionAgentId: agentId,
  })
  setProxyOwnerAgentIdForSelfHeal(proxyOwnerAgentId)

  const oauthProxyVersion = computeModelGatewayTreeVersion()
  const { stopCredentialWatch, credentialRefreshTimer, proxy } = await buildCredentialSubsystem({
    account: selectedAccount,
    configDir,
    agentIdHandle,
    getLogDir: agentLog.getCurrentLogDir,
    proxyOwnerAgentId,
    oauthProxyVersion,
    adoptedClaudePid: inheritedClaude?.pid ?? null,
    proxyAdoptionRule: args.proxyAdoptionRule,
  })
  setOAuthProxyHandle(proxy)
  const anthropicBaseUrl = opts.anthropicBaseUrl ?? `http://localhost:${proxy.port}/`

  installProxyVersionSubsystem({
    agentIdHandle,
    selectedAccount,
    getLogDir: agentLog.getCurrentLogDir,
  })

  const monitors = startPerAgentMonitors({
    getAgentId: () => agentIdHandle.id,
    registrationAccount: selectedAccount,
    getLogDir: agentLog.getCurrentLogDir,
    proxyLivenessRule: args.proxyLivenessRule,
  })

  const restrictions = toolRestrictions()
  const mcpConfigNonce = crypto.randomUUID()

  return {
    inheritedClaude,
    processId,
    selectedAccount,
    configDir,
    agentIdHandle,
    agentId,
    sessionId,
    launch,
    proxy,
    anthropicBaseUrl,
    stopCredentialWatch,
    credentialRefreshTimer,
    monitors,
    restrictions,
    mcpConfigNonce,
  }
}
