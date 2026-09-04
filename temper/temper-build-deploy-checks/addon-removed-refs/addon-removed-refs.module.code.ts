import { readFileSync } from "node:fs"
import { z } from "zod"
import { maskStringLiterals } from "../addon-banned-symbols/addon-banned-symbols.module.code.ts"
import {
  REMOVED_EXTERNAL_ADDON_GLOBALS,
  type RemovedAddonGlobal,
} from "../addon-removed-refs-manifest/addon-removed-refs-manifest.module.code.ts"

export interface RemovedRefIssue {
  file: string
  line: number
  col: number
  symbol: string
  addon: string
  hint: string
}

const REGEX_EXEC_SCHEMA = z
  .unknown()
  .nullable()
  .transform((raw): { symbol: string; index: number } | null => {
    if (raw === null) return null
    if (!Array.isArray(raw)) throw new Error("expected array from RegExp.exec")
    const symbol = z.string().parse(raw[0])
    const indexUnknown: unknown = Reflect.get(raw, "index")
    const index = z.number().parse(indexUnknown)
    return { symbol, index }
  })

function parseNextExec(re: RegExp, input: string): { symbol: string; index: number } | null {
  return REGEX_EXEC_SCHEMA.parse(re.exec(input))
}

function escapeRegex(name: string): string {
  return name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function hintFor(entry: RemovedAddonGlobal, symbol: string): string {
  const owner = entry.addon === symbol ? "" : `${entry.addon}: `
  return `${owner}removed external addon, ${entry.remedy}; addon source must not reference it`
}

export function scanBundle(source: string, file: string): readonly RemovedRefIssue[] {
  const issues: RemovedRefIssue[] = []
  const lines = source.split("\n")
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
    if (line === undefined) continue
    if (line.endsWith("\r")) line = line.slice(0, -1)
    if (line.trim() === "") continue
    const masked = maskStringLiterals(line)
    const lineNumber = i + 1
    for (const entry of REMOVED_EXTERNAL_ADDON_GLOBALS) {
      const re = new RegExp(`\\b${escapeRegex(entry.global)}\\b`, "g")
      let match = parseNextExec(re, masked)
      while (match !== null) {
        issues.push({
          file,
          line: lineNumber,
          col: match.index + 1,
          symbol: match.symbol,
          addon: entry.addon,
          hint: hintFor(entry, match.symbol),
        })
        match = parseNextExec(re, masked)
      }
    }
  }
  return issues
}

export function scanBundleFile(path: string): readonly RemovedRefIssue[] {
  const source = readFileSync(path, "utf8")
  return scanBundle(source, path)
}

export function formatIssue(issue: RemovedRefIssue): string {
  return `${issue.file}:${issue.line}:${issue.col}  [removed-addon-ref] ${issue.symbol} — ${issue.hint}`
}
