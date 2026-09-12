import { mkdirSync, mkdtempSync, realpathSync } from "node:fs"
import { join } from "node:path"
import { saidBy } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

const SCRATCH_PARENT = "/var/tmp"

export function saidShort(thrown: unknown): string {
  return saidBy(thrown).replace(/\s+/g, " ").trim()
}

export function stagedSaid(at: string): string {
  return `the staging folder ${at}, which sits outside the checkout and nothing here takes away`
}

export function stagingAt(named: string | undefined, prefix: string, done: string[] = []): string {
  if (named === undefined) {
    const fresh = mkdtempSync(join(realpathSync(SCRATCH_PARENT), prefix))
    done.push(stagedSaid(fresh))
    return fresh
  }
  const made = mkdirSync(named, { recursive: true })
  if (made !== undefined) done.push(stagedSaid(made))
  return realpathSync(named)
}
