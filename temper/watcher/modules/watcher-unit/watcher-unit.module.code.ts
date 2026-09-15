import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"

const WATCHER_UNIT = "temper-watcher.service"

export function isUnitActive(): boolean {
  return ran(["systemctl", "--user", "is-active", WATCHER_UNIT]).code === 0
}

export function unitMainPid(): number | null {
  const done = ran(["systemctl", "--user", "show", "-p", "MainPID", "--value", WATCHER_UNIT])
  if (done.code !== 0) return null
  const pid = Number.parseInt(done.out.trim(), 10)
  return Number.isFinite(pid) && pid > 0 ? pid : null
}
