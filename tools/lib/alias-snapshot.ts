
import { writeFileSync } from "node:fs"
import { homedir } from "node:os"
import { join } from "node:path"

import { pagesRoot } from "./oauth-page-push.ts"
import { aliasIndexesFromPages } from "./oauth-page-state.ts"

export const ACCOUNT_ALIAS_SNAPSHOT_PATH = join(homedir(), ".claude", "account-aliases.json")

export interface AliasEntry {
  account: string
  aliasIndex: number
}

export function sortAliasEntries(entries: readonly AliasEntry[]): readonly AliasEntry[] {
  return [...entries].sort((a, b) => a.aliasIndex - b.aliasIndex)
}

export function nextAliasIndex(indexes: ReadonlyMap<string, number>): number {
  let max = 0
  for (const index of indexes.values()) {
    if (index > max) max = index
  }
  return max + 1
}

export function writeAliasSnapshot(
  entries: readonly AliasEntry[],
  path = ACCOUNT_ALIAS_SNAPSHOT_PATH
): undefined {
  writeFileSync(path, `${JSON.stringify(sortAliasEntries(entries), null, 2)}\n`)
}

export function syncAliasSnapshotFromPages(
  path = ACCOUNT_ALIAS_SNAPSHOT_PATH,
  root = pagesRoot()
): readonly AliasEntry[] {
  const entries = sortAliasEntries(
    [...aliasIndexesFromPages()].map(([account, aliasIndex]) => ({ account, aliasIndex }))
  )
  writeAliasSnapshot(entries, path)
  return entries
}
