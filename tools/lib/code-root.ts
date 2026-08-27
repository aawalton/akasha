
import { resolve } from "node:path"
import { ownRepoRoot } from "../../repo/roots/roots.ts"

export function codeRoot(): string {
  return process.env.CODE_ROOT ?? resolve(ownRepoRoot(), "..", "code")
}
