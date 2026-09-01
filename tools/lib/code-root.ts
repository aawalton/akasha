import { existsSync } from "node:fs"
import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"

export function codeRoot(): string {
  const stated = process.env.CODE_ROOT
  if (stated !== undefined && stated !== "" && existsSync(stated)) return stated
  return ownRepoRoot()
}
