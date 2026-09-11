import { readFileSync } from "node:fs"
import { environValue } from "akasha/utils/process/proc-reading/proc-reading.module.code.ts"

export function readProcEnvVar(pid: number, key: string): string | null {
  let environ: string
  try {
    environ = readFileSync(`/proc/${pid}/environ`, "utf8")
  } catch {
    return null
  }
  return environValue(environ, key)
}
