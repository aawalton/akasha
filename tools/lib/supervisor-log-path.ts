
import { join } from "node:path"
import { akashaRoot } from "../../repo/roots/roots.ts"

export function supervisorsRootDir(): string {
  return join(akashaRoot(), ".supervisors")
}

export function supervisorSocketPath(agentId: string, baseDir?: string): string {
  return join(baseDir ?? supervisorsRootDir(), agentId, "oauth-proxy.sock")
}
