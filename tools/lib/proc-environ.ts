import { readFileSync } from "node:fs"

/**
 * One environment variable of a running process, as the kernel recorded it when the process
 * was exec'd.
 *
 * READ RATHER THAN ASKED FOR, because the processes this is used on are ones that may be wedged
 * or orphaned, and a process too stuck to answer still has an environment.
 */
export function readProcEnvVar(pid: number, key: string): string | null {
  let environ: string
  try {
    environ = readFileSync(`/proc/${pid}/environ`, "utf8")
  } catch {
    return null
  }
  const prefix = `${key}=`
  for (const entry of environ.split("\0")) {
    if (entry.startsWith(prefix)) return entry.slice(prefix.length)
  }
  return null
}