import { readFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"

export type AliasEntry = {
  readonly account: string
  readonly aliasIndex: number
}

export const ACCOUNT_ALIAS_SNAPSHOT_PATH = join(homedir(), ".claude", "account-aliases.json")

function aliasEntry(value: unknown): AliasEntry | null {
  if (typeof value !== "object" || value === null) return null
  const candidate = value as { account?: unknown; aliasIndex?: unknown }
  if (typeof candidate.account !== "string" || candidate.account.length === 0) return null
  if (typeof candidate.aliasIndex !== "number" || !Number.isInteger(candidate.aliasIndex)) {
    return null
  }
  return { account: candidate.account, aliasIndex: candidate.aliasIndex }
}

export function readAliasSnapshot(path = ACCOUNT_ALIAS_SNAPSHOT_PATH): readonly AliasEntry[] {
  try {
    const parsed: unknown = JSON.parse(readFileSync(path, "utf-8"))
    if (!Array.isArray(parsed)) return []
    const out: AliasEntry[] = []
    for (const value of parsed) {
      const entry = aliasEntry(value)
      if (entry !== null) out.push(entry)
    }
    return out.sort((a, b) => a.aliasIndex - b.aliasIndex)
  } catch {
    return []
  }
}
