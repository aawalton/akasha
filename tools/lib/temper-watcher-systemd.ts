import { OperationalError } from "@shared/errors-core/exit"

export const WATCHER_UNIT = "temper-watcher.service"

interface SystemctlResult {
  ok: boolean
  stdout: string
  stderr: string
  code: number
}

function systemctl(args: readonly string[]): SystemctlResult {
  const proc = Bun.spawnSync(["systemctl", "--user", ...args], { stdout: "pipe", stderr: "pipe" })
  return {
    ok: proc.exitCode === 0,
    stdout: proc.stdout.toString().trim(),
    stderr: proc.stderr.toString().trim(),
    code: proc.exitCode ?? -1,
  }
}

function requireVerb(verb: string): undefined {
  const result = systemctl([verb, WATCHER_UNIT])
  if (!result.ok) {
    const detail =
      result.stderr.length > 0
        ? result.stderr
        : result.stdout.length > 0
          ? result.stdout
          : "no output"
    throw new OperationalError(
      `systemctl --user ${verb} ${WATCHER_UNIT} failed (exit ${result.code}): ${detail}`
    )
  }
}

export function restartUnit(): undefined {
  requireVerb("restart")
}

export function isUnitActive(): boolean {
  return systemctl(["is-active", WATCHER_UNIT]).ok
}

function showValue(property: string): string {
  const result = systemctl(["show", "-p", property, "--value", WATCHER_UNIT])
  return result.ok ? result.stdout : ""
}

export function unitMainPid(): number | null {
  const pid = Number.parseInt(showValue("MainPID"), 10)
  return Number.isFinite(pid) && pid > 0 ? pid : null
}
