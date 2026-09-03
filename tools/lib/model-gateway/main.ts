import { join } from "node:path"
import {
  fileSink,
  LOG_MAX_BYTES,
  pageSink,
  redirectConsoleToSink,
} from "@akasha/seat-system/supervisor-console"
import { supervisorSocketPath } from "@akasha/seat-system/supervisor-log-path"
import { seatNameForAgent } from "../../../akasha/seat-system/seat-presence-read/seat-presence-read.module.code.ts"
import {
  clearProxyState,
  type OAuthProxyStateToWrite,
  writeProxyStateQuietly,
} from "../../../akasha/seat-system/seat-proxy-state/seat-proxy-state.module.code.ts"
import { logWriter } from "../log-append.ts"
import { startOAuthProxy } from "./gateway.ts"
import { parseBootEnv } from "./parse-boot-env.ts"

const LOG_PREFIX = "[oauth-proxy]"

const OAUTH_PROXY_SOURCE = "oauth-proxy-console"

function describeError(err: unknown): string {
  if (err instanceof Error) return err.message
  return String(err)
}

function main(): undefined {
  let env: ReturnType<typeof parseBootEnv>
  try {
    env = parseBootEnv(process.env)
  } catch (err) {
    process.stderr.write(`${describeError(err)}\n`)
    process.exit(1)
  }

  const toFile = fileSink(join(env.logDir, "oauth-proxy.log"), { maxBytes: LOG_MAX_BYTES })
  const seatName = seatNameForAgent(env.agentId)
  const consoleWriter = seatName === null ? null : logWriter(OAUTH_PROXY_SOURCE, seatName)
  redirectConsoleToSink(
    consoleWriter === null ? toFile : pageSink(consoleWriter, env.agentId, toFile)
  )

  const proxy = startOAuthProxy({
    port: env.port,
    getLogDir: () => env.logDir,
    upstreamIdleTimeoutMs: env.upstreamIdleTimeoutMs,
    downstreamKeepaliveMs: env.downstreamKeepaliveMs,
    unixSocketPath: supervisorSocketPath(env.agentId),
    logPrefix: LOG_PREFIX,
  })

  const state: OAuthProxyStateToWrite = {
    pid: process.pid,
    port: proxy.port,
    oauthProxyVersion: env.oauthProxyVersion,
  }
  writeProxyStateQuietly(env.agentId, state)

  process.stdout.write(`${proxy.port}\n`)

  let shuttingDown = false
  const shutdown = (signal: NodeJS.Signals): undefined => {
    if (shuttingDown) return
    shuttingDown = true
    try {
      proxy.flushAll(signal)
    } catch (err) {
      console.error(`${LOG_PREFIX} proxy.flushAll threw on ${signal}:`, describeError(err))
    }
    try {
      proxy.stop()
    } catch (err) {
      console.error(`${LOG_PREFIX} proxy.stop threw on ${signal}:`, describeError(err))
    }
    try {
      clearProxyState(env.agentId)
    } catch (err) {
      console.error(`${LOG_PREFIX} clearProxyState threw on ${signal}:`, describeError(err))
    }
    process.exit(0)
  }
  process.on("SIGTERM", () => shutdown("SIGTERM"))
  process.on("SIGINT", () => shutdown("SIGINT"))
}

main()
