import type { Dirent } from "node:fs"
import { readdirSync } from "node:fs"
import { onceInCall } from "@akasha/command-system/during-call"
import { isAttachmentFile } from "@akasha/markdown-pages/attachment-file"
import { isRowsFile } from "@akasha/markdown-pages/rows-file"
import { isVendored } from "@akasha/pages-system/checkout-roots"
import type { Repo } from "@akasha/pages-system/markdown-document"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import type { Outcome, Population } from "@akasha/verdict/outcome"
import type { Band } from "./run-cost.ts"

export const CHECK_BAND: Band = "lagging"

export const CHECKS_CEILING_MS = 120_000

export interface RepoView {
  readonly roots: Roots
  readonly name: Repo
  readonly documents: readonly string[]
  readonly read: (relPath: string) => string
  readonly exists: (absolutePath: string) => boolean
  readonly deadlineAt?: number
}

export interface CheckOutcome extends Outcome {
  readonly population: Population
}

export type Check = (repo: RepoView) => CheckOutcome

export type AsyncCheck = (repo: RepoView) => Promise<CheckOutcome>

export interface Levy {
  readonly repos: readonly [Repo, ...Repo[]]
  readonly run: Check | AsyncCheck
  readonly band?: Band
}

export function listDocuments(root: string): readonly string[] {
  return onceInCall(`documents:${root}`, () => scanDocuments(root))
}

function markdownUnder(root: string): readonly string[] {
  const found: string[] = []
  const walk = (at: string, prefix: string): void => {
    let entries: readonly Dirent[]
    try {
      entries = readdirSync(at, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      const relPath = prefix === "" ? entry.name : `${prefix}/${entry.name}`
      if (entry.isDirectory()) {
        if (relPath === ".git" || isVendored(relPath)) continue
        walk(`${at}/${entry.name}`, relPath)
      } else if (entry.name.endsWith(".md")) {
        found.push(relPath)
      }
    }
  }
  walk(root, "")
  return found
}

function scanDocuments(root: string): readonly string[] {
  const paths: string[] = []
  for (const relPath of markdownUnder(root)) {
    if (relPath.startsWith(".git/") || isVendored(relPath)) continue
    if (isAttachmentFile(relPath) || isRowsFile(relPath)) continue
    paths.push(relPath)
  }
  return paths.sort()
}
