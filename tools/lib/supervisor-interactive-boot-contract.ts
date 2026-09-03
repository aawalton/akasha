import type { resolveClaudeHandoff } from "@akasha/seat-system/supervisor-adopt"
import type { RowAgentLaunch } from "@akasha/seat-system/supervisor-agent-create"
import type { buildAgentLogRedirect } from "@akasha/seat-system/supervisor-console"
import type { buildCredentialSubsystem } from "@akasha/seat-system/supervisor-credentials"
import type { startPerAgentMonitors } from "./supervisor-monitors-wire.ts"
import type { ProxyAdoptionRuleSource } from "./supervisor-proxy-adoption-rule.ts"
import type { ProxyLivenessRuleSource } from "./supervisor-proxy-liveness-rule.ts"
import type { AgentIdHandle } from "./supervisor-self-identity.ts"
import type { ToolRestrictions } from "./tool-access.ts"

export type InteractiveOpts = {
  resume: boolean
  account: string
  sessionId?: string
  agentId?: string
  headless: boolean
  exitAfterIterations?: number
  modelOverride?: string
  anthropicBaseUrl?: string
  anthropicAuthToken?: string
}

export type InheritedClaude = ReturnType<typeof resolveClaudeHandoff>

export interface InteractiveBootArgs {
  opts: InteractiveOpts
  agentLog: ReturnType<typeof buildAgentLogRedirect>
  getClaudePid: () => number | null
  proxyAdoptionRule: ProxyAdoptionRuleSource
  proxyLivenessRule: ProxyLivenessRuleSource
}

export type CredentialSubsystem = Awaited<ReturnType<typeof buildCredentialSubsystem>>

export interface InteractiveSessionBoot {
  inheritedClaude: InheritedClaude
  processId: string
  selectedAccount: string
  configDir: string
  agentIdHandle: AgentIdHandle
  agentId: string
  sessionId: string
  launch: RowAgentLaunch
  proxy: CredentialSubsystem["proxy"]
  anthropicBaseUrl: string
  stopCredentialWatch: CredentialSubsystem["stopCredentialWatch"]
  credentialRefreshTimer: CredentialSubsystem["credentialRefreshTimer"]
  monitors: ReturnType<typeof startPerAgentMonitors>
  restrictions: ToolRestrictions
  mcpConfigNonce: string
}
