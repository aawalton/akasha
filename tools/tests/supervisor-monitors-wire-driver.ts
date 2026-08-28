
export const DRIVER_SOURCE = `
import { mock } from "bun:test"

const TARGET = process.argv[2]
const DIR = process.argv[3]

const rec = { calls: [], log: [] }
let seq = 0
const getOAuthProxyHandle = () => { seq += 1; return { pid: 4000 + seq, port: 31337, seq } }
const HB_TIMER = { __sentinel: "heartbeat-timer" }
const PROXY_MON = { __sentinel: "proxy-monitor", stop: () => {} }
const LIMIT_MON = { __sentinel: "limit-monitor", stop: () => {} }
const WAIT_MON = { __sentinel: "wait-monitor", stop: () => {} }

mock.module(\`\${DIR}/supervisor-config.ts\`, () => ({ LOG: "[local]" }))
mock.module(\`\${DIR}/supervisor-state.ts\`, () => ({ getOAuthProxyHandle, getAgentActionHandler: () => null }))
mock.module(\`\${DIR}/supervisor-poll-agent-action.ts\`, () => ({ pollAgentAction: async () => {} }))
mock.module(\`\${DIR}/supervisor-self-heal.ts\`, () => ({ handleVersionUpdate: async () => {}, SUPERVISOR_SCRIPT: "/drive/run-supervisor.ts" }))
mock.module(\`\${DIR}/supervisor-proxy-version.ts\`, () => ({ handleProxyVersionUpdate: () => {} }))
mock.module(\`\${DIR}/supervisor-heartbeat.ts\`, () => ({
  buildHeartbeatMonitor: (a) => {
    const pollNames = (a.polls ?? []).map((p) => p.name)
    rec.calls.push({ fn: "buildHeartbeatMonitor", keys: Object.keys(a).sort(), agentId: a.getAgentId(), pollNames })
    return { heartbeatTimer: HB_TIMER }
  },
}))
mock.module(\`\${DIR}/supervisor-proxy-liveness.ts\`, () => ({
  startProxyLivenessMonitor: (a) => {
    rec.calls.push({
      fn: "startProxyLivenessMonitor",
      keys: Object.keys(a).sort(),
      agentId: a.getAgentId(),
      getProxyHandleIsTheStateGetter: a.getProxyHandle === getOAuthProxyHandle,
      tick1: a.getProxyHandle(),
      tick2: a.getProxyHandle(),
      registrationAccount: a.registrationAccount,
      logDir: a.getLogDir(),
      ruleTag: a.proxyLivenessRule.__tag ?? null,
      ruleIsCalledAtWireTime: a.proxyLivenessRule.__called === true,
    })
    return PROXY_MON
  },
}))
mock.module(\`\${DIR}/supervisor-limit-resume.ts\`, () => ({
  startLimitResumeMonitor: (a) => {
    rec.calls.push({ fn: "startLimitResumeMonitor", keys: Object.keys(a).sort(), agentId: a.getAgentId() })
    if (typeof a.log === "function") a.log("probe-line")
    return LIMIT_MON
  },
}))

mock.module(\`\${DIR}/supervisor-wait-resume.ts\`, () => ({
  startWaitResumeMonitor: (a) => {
    rec.calls.push({ fn: "startWaitResumeMonitor", keys: Object.keys(a).sort(), agentId: a.getAgentId() })
    return WAIT_MON
  },
}))

const mod = await import(TARGET)

const VECTORS = [
  { name: "live-seat", agentId: "agent-alpha", registrationAccount: "walton", logDir: "/home/walton/.claude/logs/alpha", ruleTag: "rule-A" },
  { name: "no-agent-id-yet", agentId: null, registrationAccount: "walton", logDir: "/home/walton/.claude/logs/boot", ruleTag: "rule-B" },
  { name: "second-account", agentId: "agent-beta", registrationAccount: "walton-two", logDir: "/var/tmp/logs/beta", ruleTag: "rule-C" },
  { name: "empty-strings", agentId: "", registrationAccount: "", logDir: "", ruleTag: "rule-D" },
]

const out = []
for (const v of VECTORS) {
  rec.calls = []
  rec.log = []
  seq = 0
  const realLog = console.log
  console.log = (...args) => { rec.log.push(args.join(" ")) }
  let result
  let threw = null
  try {
    const rule = () => { rule.__called = true; throw new Error("the rule must not be called at wire time") }
    rule.__tag = v.ruleTag
    rule.__called = false
    result = mod.startPerAgentMonitors({
      getAgentId: () => v.agentId,
      registrationAccount: v.registrationAccount,
      getLogDir: () => v.logDir,
      proxyLivenessRule: rule,
      onAgentName: () => undefined,
    })
  } catch (e) {
    threw = String(e && e.message ? e.message : e)
  } finally {
    console.log = realLog
  }
  out.push({
    vector: v.name,
    threw,
    calls: rec.calls,
    logLines: rec.log,
    stateGetterCallsDuringArm: seq,
    returnedKeys: result === undefined ? null : Object.keys(result).sort(),
    returned: result === undefined ? null : {
      heartbeatTimerIsBuilt: result.heartbeatTimer === HB_TIMER,
      proxyLivenessMonitorIsStarted: result.proxyLivenessMonitor === PROXY_MON,
      limitResumeMonitorIsStarted: result.limitResumeMonitor === LIMIT_MON,
      limitResumeMonitorIsNull: result.limitResumeMonitor === null,
      waitResumeMonitorIsStarted: result.waitResumeMonitor === WAIT_MON,
    },
  })
}
console.log(JSON.stringify({ exports: Object.keys(mod).sort(), vectors: out }))
`
