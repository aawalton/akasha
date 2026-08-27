
import { attemptInPlaceReExec, collectClaudeHandoff } from "../lib/supervisor-reexec.ts"
import { setProxyOwnerAgentIdForSelfHeal } from "../lib/supervisor-self-heal-state"
import { processes } from "../lib/supervisor-state.ts"
import type { AgentProcess } from "../lib/supervisor-types.ts"

function rec(o: {
  interactive: boolean
  pid?: unknown
  noProc?: boolean
  process_id?: string
  currentAccount?: string
  configDir?: string | null
  agent_id?: string
  session_id?: string
}): AgentProcess {
  return {
    interactive: o.interactive,
    proc: o.noProc ? null : { pid: o.pid },
    process_id: o.process_id ?? "proc-1",
    currentAccount: o.currentAccount ?? "arm-account",
    configDir: o.configDir === undefined ? "/arm/config" : o.configDir,
    agent_id: o.agent_id ?? "agent-1",
    session_id: o.session_id ?? "session-1",
  } as unknown as AgentProcess
}

const put = (key: string, one: AgentProcess): undefined => {
  processes.set(key, one)
}

interface Scenario {
  readonly seed: () => void
  readonly action: "collect" | "exec" | "execfail"
}

export const SCENARIOS: Readonly<Record<string, Scenario>> = {
  "no processes": { seed: () => {}, action: "collect" },
  "only non-interactive": {
    seed: () => put("a", rec({ interactive: false, pid: 4242 })),
    action: "collect",
  },
  "interactive with null proc": {
    seed: () => put("a", rec({ interactive: true, noProc: true })),
    action: "collect",
  },
  "interactive pid zero": {
    seed: () => put("a", rec({ interactive: true, pid: 0 })),
    action: "collect",
  },
  "interactive pid negative": {
    seed: () => put("a", rec({ interactive: true, pid: -1 })),
    action: "collect",
  },
  "interactive pid undefined": {
    seed: () => put("a", rec({ interactive: true, pid: undefined })),
    action: "collect",
  },
  "interactive pid string": {
    seed: () => put("a", rec({ interactive: true, pid: "4242" })),
    action: "collect",
  },
  "interactive with explicit configDir": {
    seed: () =>
      put(
        "a",
        rec({
          interactive: true,
          pid: 4242,
          process_id: "p-explicit",
          currentAccount: "acct-explicit",
          configDir: "/explicit/config/dir",
          agent_id: "agent-explicit",
          session_id: "session-explicit",
        })
      ),
    action: "collect",
  },
  "interactive with null configDir derives from account": {
    seed: () =>
      put(
        "a",
        rec({
          interactive: true,
          pid: 4242,
          process_id: "p-derived",
          currentAccount: "acct-derived",
          configDir: null,
          agent_id: "agent-derived",
          session_id: "session-derived",
        })
      ),
    action: "collect",
  },
  "non-interactive first then interactive": {
    seed: () => {
      put("a", rec({ interactive: false, pid: 1111, process_id: "p-skip" }))
      put("b", rec({ interactive: true, pid: 2222, process_id: "p-taken" }))
    },
    action: "collect",
  },
  "two interactive picks first": {
    seed: () => {
      put("a", rec({ interactive: true, pid: 3333, process_id: "p-first" }))
      put("b", rec({ interactive: true, pid: 4444, process_id: "p-second" }))
    },
    action: "collect",
  },
  "unusable interactive then usable interactive": {
    seed: () => {
      put("a", rec({ interactive: true, pid: 0, process_id: "p-unusable" }))
      put("b", rec({ interactive: true, pid: 5555, process_id: "p-usable" }))
    },
    action: "collect",
  },

  "exec carries claude and proxy owner": {
    seed: () => {
      put(
        "a",
        rec({
          interactive: true,
          pid: 4242,
          process_id: "p-exec",
          currentAccount: "acct-exec",
          configDir: "/exec/config/dir",
          agent_id: "agent-exec",
          session_id: "session-exec",
        })
      )
      setProxyOwnerAgentIdForSelfHeal("owner-exec")
    },
    action: "exec",
  },
  "exec with nothing to inherit": { seed: () => {}, action: "exec" },
  "exec with proxy owner only": {
    seed: () => setProxyOwnerAgentIdForSelfHeal("owner-alone"),
    action: "exec",
  },
  "exec with empty proxy owner": {
    seed: () => setProxyOwnerAgentIdForSelfHeal(""),
    action: "exec",
  },
  "exec failure returns to the caller": { seed: () => {}, action: "execfail" },
}

if (import.meta.main) {
  const name = process.argv[2]
  const scenario = name === undefined ? undefined : SCENARIOS[name]
  if (scenario === undefined) {
    console.error(`unknown scenario: ${String(name)}`)
    process.exit(2)
  }

  scenario.seed()

  if (scenario.action === "collect") {
    console.log(`ANSWER ${JSON.stringify(collectClaudeHandoff())}`)
  } else if (scenario.action === "exec") {
    attemptInPlaceReExec("/usr/bin/env", ["env"])
    console.log(`ANSWER ${JSON.stringify({ execReturned: true })}`)
  } else {
    attemptInPlaceReExec("/nonexistent-binary-for-the-reexec-arm", [
      "nonexistent-binary-for-the-reexec-arm",
    ])
    console.log(`ANSWER ${JSON.stringify({ returnedToCaller: true })}`)
  }
}
