import { mock } from "bun:test"
import { writeFileSync } from "node:fs"
import { REGISTRATION_ACCOUNT, type Vector, vectorNamed } from "./model-gateway-main-vectors.ts"

const HERE = new URL(".", import.meta.url).pathname
const LABEL = process.argv[2] ?? ""
const OUT = process.argv[3] ?? ""
const DIR = process.argv[4] ?? `${HERE}../lib/model-gateway`
const SUBJECT = process.argv[5] ?? "main.ts"
const V: Vector = vectorNamed(LABEL)

const events: Record<string, unknown>[] = []
const lines: string[] = []
let exitCode: number | null = null

function push(e: string, fields: Record<string, unknown> = {}): undefined {
  events.push({ e, ...fields })
}

function resolveAny(candidates: readonly string[]): string | null {
  for (const one of candidates) {
    try {
      return Bun.resolveSync(one, DIR)
    } catch {}
  }
  return null
}

const SEAM_PATHS = {
  gateway: resolveAny(["./gateway.ts", "./oauth-proxy.ts", "./oauth-proxy"]),
  bootEnv: resolveAny(["./parse-boot-env.ts", "./parse-boot-env"]),
  proxyState: resolveAny(["../seat-proxy-state.ts"]),
  supervisorPaths: resolveAny(["../supervisor-log-path.ts"]),
  accountTerminal: resolveAny([
    "../account-terminal.ts",
    "./terminal-accounts.ts",
    "./terminal-accounts",
  ]),
  oauth: resolveAny(["../oauth.ts"]),
  agentHealth: resolveAny(["../agent-health-write.ts"]),
  console: resolveAny(["../supervisor-console.ts"]),
}

const BOOT_ENV = {
  agentId: "agent-fixed",
  port: 4001,
  logDir: "/var/tmp/model-gateway-main-arm",
  upstreamIdleTimeoutMs: 90_000,
  downstreamKeepaliveMs: 15_000,
  registrationAccount: REGISTRATION_ACCOUNT,
  oauthProxyVersion: "v-fixed",
}

function spell(one: unknown): string {
  if (one instanceof Error) return `Error: ${one.message}`
  return JSON.stringify(one) ?? "undefined"
}

const health = (name: string) => {
  return (...args: unknown[]): Promise<undefined> => {
    push(name, { args: args.map(spell) })
    if (V.healthRejects) return Promise.reject(new Error(`${name} refused`))
    return Promise.resolve(undefined)
  }
}

let captured: Record<string, unknown> = {}

if (SEAM_PATHS.console !== null) {
  mock.module(SEAM_PATHS.console, () => ({
    LOG_MAX_BYTES: 10 * 1024 * 1024,
    fileSink: (logPath: string, rotate?: { maxBytes: number }) => {
      push("fileSink", { logPath, rotate: JSON.stringify(rotate) ?? "undefined" })
      return () => undefined
    },
    pageSink: () => () => undefined,
    redirectConsoleToSink: () => {
      push("redirectConsoleToSink")
      return () => undefined
    },
  }))
}

if (SEAM_PATHS.bootEnv !== null) {
  mock.module(SEAM_PATHS.bootEnv, () => ({
    parseBootEnv: () => {
      push("parseBootEnv")
      if (V.envRefuses) throw new Error("the boot env is not what it must be")
      return BOOT_ENV
    },
  }))
}

if (SEAM_PATHS.gateway !== null) {
  mock.module(SEAM_PATHS.gateway, () => ({
    startOAuthProxy: (opts: Record<string, unknown>) => {
      captured = opts
      push("startOAuthProxy", {
        keys: Object.keys(opts).sort(),
        port: opts.port,
        logPrefix: opts.logPrefix,
        upstreamIdleTimeoutMs: opts.upstreamIdleTimeoutMs,
        downstreamKeepaliveMs: opts.downstreamKeepaliveMs,
        unixSocketPath: opts.unixSocketPath,
        logDir: (opts.getLogDir as () => string)(),
      })
      return {
        port: 4001,
        stop: () => {
          push("proxy.stop")
          if (V.stopRefuses) throw new Error("stop refused")
        },
        flushAll: (reason: string) => {
          push("proxy.flushAll", { reason })
          if (V.flushRefuses) throw new Error("flushAll refused")
        },
      }
    },
  }))
}

if (SEAM_PATHS.supervisorPaths !== null) {
  mock.module(SEAM_PATHS.supervisorPaths, () => ({
    supervisorSocketPath: (agentId: string) => {
      push("supervisorSocketPath", { agentId })
      return `/var/tmp/model-gateway-main-arm/${agentId}.sock`
    },
  }))
}

if (SEAM_PATHS.proxyState !== null) {
  mock.module(SEAM_PATHS.proxyState, () => ({
    writeProxyStateQuietly: (agentId: string, state: Record<string, unknown>) => {
      push("writeProxyStateQuietly", {
        agentId,
        port: state.port,
        oauthProxyVersion: state.oauthProxyVersion,
        pidIsThisProcess: state.pid === process.pid,
      })
    },
    clearProxyState: (agentId: string) => {
      push("clearProxyState", { agentId })
      if (V.removeRefuses) throw new Error("clearProxyState refused")
    },
  }))
}

if (SEAM_PATHS.accountTerminal !== null) {
  mock.module(SEAM_PATHS.accountTerminal, () => ({
    isAccountTerminal: (account: string) => {
      push("isAccountTerminal", { account })
      return true
    },
    markAccountTerminal: (account: string) => {
      push("markAccountTerminal", { account })
      return V.markAnswers
    },
    clearAccountTerminal: (account: string) => {
      push("clearAccountTerminal", { account })
      return V.clearAnswers
    },
  }))
}

if (SEAM_PATHS.oauth !== null) {
  mock.module(SEAM_PATHS.oauth, () => ({
    writeRefreshHealth: health("writeRefreshHealth"),
    writeTerminalHealth: health("writeTerminalHealth"),
  }))
}

if (SEAM_PATHS.agentHealth !== null) {
  mock.module(SEAM_PATHS.agentHealth, () => ({
    reportOAuthRecovered: health("reportOAuthRecovered"),
    reportTerminalOAuthError: health("reportTerminalOAuthError"),
  }))
}

const realLog = console.log
const realWarn = console.warn
const realError = console.error
const realStdout = process.stdout.write.bind(process.stdout)
const realStderr = process.stderr.write.bind(process.stderr)
console.log = (...parts: unknown[]) => lines.push(`log ${parts.map(String).join(" ")}`)
console.warn = (...parts: unknown[]) => lines.push(`warn ${parts.map(String).join(" ")}`)
console.error = (...parts: unknown[]) => lines.push(`error ${parts.map(String).join(" ")}`)
process.stdout.write = ((chunk: unknown) => {
  lines.push(`stdout ${String(chunk).trimEnd()}`)
  return true
}) as typeof process.stdout.write
process.stderr.write = ((chunk: unknown) => {
  lines.push(`stderr ${String(chunk).trimEnd()}`)
  return true
}) as typeof process.stderr.write

process.on("exit", (code: number) => {
  console.log = realLog
  console.warn = realWarn
  console.error = realError
  process.stdout.write = realStdout
  process.stderr.write = realStderr
  writeFileSync(
    OUT,
    `${JSON.stringify({
      shared: { label: V.label, events, lines, exitCode: exitCode ?? code },
      divergent: {
        label: V.label,
        seams: Object.fromEntries(
          Object.entries(SEAM_PATHS).map(([k, v]) => [k, v === null ? "unresolved" : "mocked"])
        ),
      },
    })}\n`
  )
})

const realExit = process.exit.bind(process)
process.exit = ((code?: number) => {
  exitCode = code ?? 0
  push("process.exit", { code: exitCode })
  if (V.act === "signal") return undefined as never
  return realExit(code)
}) as typeof process.exit

await import(`${DIR}/${SUBJECT}`)

const OUTCOME = {
  ok: V.outcomeOk,
  reason: "the reason the refresh gave",
  code: "invalid_grant",
  description: "the description the refresh gave",
  terminal: V.outcomeTerminal,
  error: V.outcomeHasError ? new Error("the error the refresh carried") : undefined,
}

if (V.act === "refresh") {
  const onRefreshOutcome = captured.onRefreshOutcome as
    | ((account: string, outcome: unknown) => undefined)
    | undefined
  if (onRefreshOutcome === undefined) push("BROKEN: no onRefreshOutcome was captured")
  else onRefreshOutcome(V.account, OUTCOME)
}

if (V.act === "terminal-check") {
  const isTerminal = captured.isAccountTerminal as ((account: string) => boolean) | undefined
  if (isTerminal === undefined) push("BROKEN: no isAccountTerminal was captured")
  else push("the wired check answered", { answer: isTerminal("acct-asked-about") })
}

if (V.act === "signal") {
  push("emit", { signal: V.signal })
  process.emit(V.signal)
  if (V.signalTwice) {
    push("emit", { signal: V.signal })
    process.emit(V.signal)
  }
}

await new Promise((r) => setTimeout(r, 50))
