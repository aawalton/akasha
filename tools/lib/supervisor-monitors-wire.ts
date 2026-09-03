import { LOG } from "@akasha/seat-system/supervisor-config"
import { pollSupervisorFileVersion } from "@akasha/seat-system/supervisor-file-version"
import { computeModelGatewayTreeVersion } from "./model-gateway-tree-version.ts"
import { buildHeartbeatMonitor } from "./supervisor-heartbeat.ts"
import { startLimitResumeMonitor } from "./supervisor-limit-resume.ts"
import { pollAgentAction } from "./supervisor-poll-agent-action.ts"
import { startProxyLivenessMonitor } from "./supervisor-proxy-liveness.ts"
import type { ProxyLivenessRuleSource } from "./supervisor-proxy-liveness-rule.ts"
import { handleProxyVersionUpdate } from "./supervisor-proxy-version.ts"
import { handleVersionUpdate } from "./supervisor-self-heal.ts"
import { SUPERVISOR_SCRIPT } from "./supervisor-self-heal-state"
import { getAgentActionHandler, getOAuthProxyHandle } from "./supervisor-state.ts"
import { startWaitResumeMonitor } from "./supervisor-wait-resume.ts"

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
