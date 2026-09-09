import { mkdirSync, mkdtempSync, realpathSync } from "node:fs"
import { join } from "node:path"
import { saidBy } from "../../../commands/modules/fault-saying/fault-saying.module.code.ts"

const SCRATCH_PARENT = "/var/tmp"

export function saidFor(argv: readonly string[], flag: string): string | undefined {
  for (let at = 0; at < argv.length; at += 1) {
    if (argv[at] === flag) return argv[at + 1]
  }
  return undefined
}

export function saidShort(thrown: unknown): string {
  return saidBy(thrown).replace(/\s+/g, " ").trim()
}

export function stagingAt(named: string | undefined, prefix: string): string {
  if (named === undefined) return mkdtempSync(join(realpathSync(SCRATCH_PARENT), prefix))
  mkdirSync(named, { recursive: true })
  return realpathSync(named)
}
