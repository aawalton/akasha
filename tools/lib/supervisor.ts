import { parseArgs } from "@akasha/seat-system/supervisor-args"
import { liveChildExitRule } from "@akasha/seat-system/supervisor-child-exit-rule"
import { assertBootFiles, LOG, REQUIRED_BOOT_FILES } from "@akasha/seat-system/supervisor-config"
import { buildAgentLogRedirect } from "@akasha/seat-system/supervisor-console"
import { runInteractive } from "./supervisor-interactive.ts"
import type { RunInteractiveSeams } from "./supervisor-interactive-seams.ts"
import { shutdown } from "./supervisor-lifecycle.ts"
import {
  getRestoreConsoleHandle,
  processes,
  setRestoreConsoleHandle,
  setShutdownSinkGetter,
} from "./supervisor-state.ts"
import { installSupervisorTerminalGuard } from "./supervisor-terminal.ts"

export async function supervisorMain(seams: RunInteractiveSeams): Promise<void> {
  const agentLog = buildAgentLogRedirect()
  setRestoreConsoleHandle(agentLog.redirectToBootstrap())
  const parsed = parseArgs(process.argv.slice(2))
  assertBootFiles(REQUIRED_BOOT_FILES)

  installSupervisorTerminalGuard({
    shutdown: (signal: string) => shutdown(signal, liveChildExitRule),
    isClaudeAlive: () => processes.size > 0,
    getSink: agentLog.getCurrentSink,
  })
  setShutdownSinkGetter(agentLog.getCurrentSink)

  console.log(`${LOG} Interactive mode`)
  await runInteractive(parsed.prompt, parsed, agentLog, seams)
  getRestoreConsoleHandle()?.()
  setRestoreConsoleHandle(null)
  await shutdown("interactive-exit", liveChildExitRule)
}

export function runSupervisor(seams: RunInteractiveSeams): undefined {
  supervisorMain(seams).catch((err: unknown) => {
    try {
      getRestoreConsoleHandle()?.()
    } catch {}
    setRestoreConsoleHandle(null)
    const message = err instanceof Error ? `${err.message}\n${err.stack ?? ""}` : String(err)
    process.stderr.write(`${LOG} Fatal: ${message}\n`)
    console.error(`${LOG} Fatal:`, err)
    process.exit(1)
  })
}
