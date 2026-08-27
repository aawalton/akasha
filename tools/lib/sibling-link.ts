import { existsSync, lstatSync, realpathSync, rmSync, symlinkSync } from "node:fs"
import { resolveRoots, AKASHA as SIBLING } from "../../repo/roots/roots"

function standsAt(at: string): boolean {
  try {
    lstatSync(at)
    return true
  } catch {
    return false
  }
}

export function link(from: string, to: string): void {
  if (!existsSync(from)) return
  if (standsAt(to)) {
    if (!lstatSync(to).isSymbolicLink()) return
    if (existsSync(to) && realpathSync(to) === realpathSync(from)) return
    rmSync(to, { force: true })
  }
  symlinkSync(from, to, "dir")
}

export function linkSibling(beside: string): void {
  link(resolveRoots()[SIBLING] as string, `${beside}/${SIBLING}`)
}
