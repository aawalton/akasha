import type { ChildExitRuleSource } from "@akasha/seat-system/supervisor-child-exit-rule"
import { LOG } from "@akasha/seat-system/supervisor-config"
import { takeSeatPage } from "@akasha/seat-system/supervisor-heartbeat-beat"
import { shouldWriteTerminalStoppedStatus } from "@akasha/seat-system/supervisor-lifecycle-death-write"
import { teardownProxyVersionSubscription } from "@akasha/seat-system/supervisor-proxy-version"
import { attemptInPlaceReExec } from "@akasha/seat-system/supervisor-reexec"
import { resolveReExecArgv } from "@akasha/seat-system/supervisor-self-heal"
import {
  getCurrentAgentIdForSelfHeal,
  isPendingReExec,
  SUPERVISOR_SCRIPT,
  teardownVersionSubscription,
} from "@akasha/seat-system/supervisor-self-heal-state"
import {
  killProcessesForShutdown,
  recordShutdownEvent,
} from "@akasha/seat-system/supervisor-shutdown-procs"
import {
  activeLifecycles,
  getObservedChildExit,
  isShuttingDown,
  processes,
  setShuttingDown,
} from "@akasha/seat-system/supervisor-state"
import { shape } from "./shape.ts"

const SHUTDOWN_FORCE_EXIT_MS = 10_000
const SHUTDOWN_SIGKILL_BACKSTOP_MS = 1_500

function inplaceReExecEnabled(): boolean {
  return shape.string().optional().parse(process.env.SUPERVISOR_USE_INPLACE_REEXEC) !== "0"
}

async function reExecSupervisor(): Promise<never> {
  console.log(`${LOG} Re-execing supervisor to load latest on-disk bytecode`)
  const reExecArgv = [process.execPath, SUPERVISOR_SCRIPT, ...resolveReExecArgv()]
  if (inplaceReExecEnabled()) {
    attemptInPlaceReExec(process.execPath, reExecArgv)
  }
  const child = Bun.spawn(reExecArgv, {
    stdio: ["inherit", "inherit", "inherit"],
    cwd: process.cwd(),
    env: process.env,
  })
  const code = await child.exited
  process.exit(code)
}

export function armForceExitTimer(signal: string): () => void {
  const forceTimer = setTimeout(() => {
    recordShutdownEvent("force-exit", {
      signal,
      activeLifecycles: activeLifecycles.size,
      processes: processes.size,
      pendingReExec: isPendingReExec(),
    })
    if (isPendingReExec() && inplaceReExecEnabled()) {
      recordShutdownEvent("force-exit-reexec")
      attemptInPlaceReExec(process.execPath, [
        process.execPath,
        SUPERVISOR_SCRIPT,
        ...resolveReExecArgv(),
      ])
      recordShutdownEvent("force-exit-reexec-unreached")
    }
    setTimeout(() => {
      recordShutdownEvent("sigkill-backstop", { signal })
      try {
        process.kill(process.pid, "SIGKILL")
      } catch {}
    }, SHUTDOWN_SIGKILL_BACKSTOP_MS).unref()
    process.exit(1)
  }, SHUTDOWN_FORCE_EXIT_MS)
  forceTimer.unref()
  return () => clearTimeout(forceTimer)
}

export async function shutdown(signal: string, childExitRule: ChildExitRuleSource): Promise<void> {
  if (isShuttingDown()) {
    recordShutdownEvent("re-entry-noop", { signal })
    return
  }
  setShuttingDown(true)
  const disarmForceExit = armForceExitTimer(signal)
  recordShutdownEvent("entry", {
    signal,
    activeLifecycles: activeLifecycles.size,
    processes: processes.size,
    pendingReExec: isPendingReExec(),
  })

  if (isPendingReExec() && inplaceReExecEnabled()) {
    recordShutdownEvent("entering-reexec", { inplace: true })
    await reExecSupervisor()
  }

  const childExit = getObservedChildExit()
  const { value: exitWrite, notice: exitWriteNotice } = await childExitRule.shutdownWrite(childExit)
  if (exitWrite === null) recordShutdownEvent("exit-write-unreached", { reason: exitWriteNotice })

  if (shouldWriteTerminalStoppedStatus(isPendingReExec())) {
    const dyingAgentId = getCurrentAgentIdForSelfHeal()
    if (
      dyingAgentId !== null &&
      exitWrite !== null &&
      !exitWrite.stampCleanExit &&
      childExit !== null
    ) {
      recordShutdownEvent("child-crash", { agentId: dyingAgentId, reason: childExit.reason })
    }
  }

  const preserveClaude = inplaceReExecEnabled() && isPendingReExec()
  await killProcessesForShutdown(preserveClaude)
  recordShutdownEvent("after-kill-procs", { preserveClaude })

  if (shouldWriteTerminalStoppedStatus(isPendingReExec())) {
    const dyingAgentId = getCurrentAgentIdForSelfHeal()
    if (dyingAgentId !== null && exitWrite !== null) {
      const pageTaken = takeSeatPage(dyingAgentId, exitWrite.stopReason)
      recordShutdownEvent("seat-page-remove", {
        agentId: dyingAgentId,
        outcome: pageTaken.kind,
        detail: pageTaken.kind === "refused" ? pageTaken.detail : undefined,
      })
    } else if (dyingAgentId !== null) {
      recordShutdownEvent("seat-page-remove-skip-unreached", { agentId: dyingAgentId })
    } else {
      recordShutdownEvent("seat-page-remove-skip-no-agent")
    }
  } else {
    recordShutdownEvent("seat-page-remove-skip-reexec")
  }

  if (activeLifecycles.size > 0) {
    recordShutdownEvent("drain-start", { count: activeLifecycles.size })
    let timeoutHandle: ReturnType<typeof setTimeout> | undefined
    let timedOut = true
    const timeout = new Promise<void>((resolve) => {
      timeoutHandle = setTimeout(resolve, 30_000)
    })
    const drained = Promise.allSettled([...activeLifecycles]).then(() => {
      timedOut = false
    })
    await Promise.race([drained, timeout])
    if (timeoutHandle) clearTimeout(timeoutHandle)
    recordShutdownEvent("drain-end", {
      remaining: activeLifecycles.size,
      timedOut,
    })
  } else {
    recordShutdownEvent("drain-skip-empty")
  }

  teardownVersionSubscription()
  teardownProxyVersionSubscription()
  recordShutdownEvent("after-version-teardown")

  if (isPendingReExec()) {
    recordShutdownEvent("entering-reexec", { inplace: false })
    await reExecSupervisor()
  }

  recordShutdownEvent("pre-process-exit")
  disarmForceExit()
  process.exit(0)
}
