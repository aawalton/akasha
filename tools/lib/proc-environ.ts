import { readFileSync } from "node:fs"

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
