
import { join } from "node:path"
import { codeRoot } from "./code-root.ts"

export function supervisorsRootDir(): string {
  return join(codeRoot(), ".claude", "supervisors")
}

export function supervisorSocketPath(agentId: string, baseDir?: string): string {
  return join(baseDir ?? supervisorsRootDir(), agentId, "oauth-proxy.sock")
}
