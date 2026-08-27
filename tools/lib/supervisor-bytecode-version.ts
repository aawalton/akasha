
import { createHash } from "node:crypto"
import { readFileSync } from "node:fs"

export function computeSupervisorBytecodeVersion(): string {
  const scriptPath = process.argv[1]
  if (typeof scriptPath !== "string" || scriptPath.length === 0) return "unknown"
  try {
    const bytes = readFileSync(scriptPath)
    return createHash("sha256").update(bytes).digest("hex")
  } catch {
    return "unknown"
  }
}
