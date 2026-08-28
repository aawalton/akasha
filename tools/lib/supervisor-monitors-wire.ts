
import { computeModelGatewayTreeVersion } from "./model-gateway-tree-version.ts"
import { LOG } from "./supervisor-config.ts"
import { buildHeartbeatMonitor } from "./supervisor-heartbeat.ts"
import { pollAgentAction } from "./supervisor-poll-agent-action.ts"
import { pollSupervisorFileVersion } from "./supervisor-file-version.ts"
import { handleVersionUpdate } from "./supervisor-self-heal.ts"
import { SUPERVISOR_SCRIPT } from "./supervisor-self-heal-state"
import { startLimitResumeMonitor } from "./supervisor-limit-resume.ts"
import { startWaitResumeMonitor } from "./supervisor-wait-resume.ts"
import { startProxyLivenessMonitor } from "./supervisor-proxy-liveness.ts"
import { handleProxyVersionUpdate } from "./supervisor-proxy-version.ts"
import type { ProxyLivenessRuleSource } from "./supervisor-proxy-liveness-rule.ts"
import { getAgentActionHandler, getOAuthProxyHandle } from "./supervisor-state.ts"

export type PerAgentMonitors = {
  heartbeatTimer: ReturnType<typeof setInterval>
  proxyLivenessMonitor: { stop: () => void }
  limitResumeMonitor: { stop: () => void }
  waitResumeMonitor: { stop: () => void }
}

export function startPerAgentMonitors(args: {
  getAgentId: () => string | null
  registrationAccount: string
  getLogDir: () => string
  proxyLivenessRule: ProxyLivenessRuleSource
}): PerAgentMonitors {
  const log = (line: string): undefined => {
    console.log(`${LOG} ${line}`)
  }

  const { heartbeatTimer } = buildHeartbeatMonitor({
    getAgentId: args.getAgentId,
    registrationAccount: args.registrationAccount,
    polls: [
      {
        name: "supervisor-files",
        run: () => pollSupervisorFileVersion(SUPERVISOR_SCRIPT, handleVersionUpdate),
      },
      {
        name: "proxy-version",
        run: async () => {
          handleProxyVersionUpdate(computeModelGatewayTreeVersion())
        },
      },
      {
        name: "agent-action",
        run: () =>
          pollAgentAction(args.getAgentId, async (event) => {
            await getAgentActionHandler()?.(event)
          }),
      },
    ],
  })

  const proxyLivenessMonitor = startProxyLivenessMonitor({
    getProxyHandle: getOAuthProxyHandle,
    getAgentId: args.getAgentId,
    registrationAccount: args.registrationAccount,
    getLogDir: args.getLogDir,
    proxyLivenessRule: args.proxyLivenessRule,
  })

  const limitResumeMonitor = startLimitResumeMonitor({ getAgentId: args.getAgentId, log })

  const waitResumeMonitor = startWaitResumeMonitor({ getAgentId: args.getAgentId, log })

  return {
    heartbeatTimer,
    proxyLivenessMonitor,
    limitResumeMonitor,
    waitResumeMonitor,
  }
}
