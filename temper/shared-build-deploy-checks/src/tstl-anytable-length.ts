import { z } from "zod"

export interface AnyTableLengthIssue {
  readonly message: string
  readonly receiver: string
  readonly line: number
  readonly file: string
}

const FUNC_OPENER = /\bfunction\b\s*[\w.:[\]"']*\s*\(/

const LENGTH_READ = /([A-Za-z_]\w*)\.length\b/g

const GROUP1_SCHEMA = z
  .unknown()
  .nullable()
  .transform((raw): string | null => {
    if (raw === null) return null
    if (!Array.isArray(raw)) throw new Error("expected array from RegExp match")
    return z.string().parse(raw[1])
  })

function indentWidth(line: string): number {
  return line.length - line.trimStart().length
}

function stripComment(line: string): string {
  const idx = line.indexOf("--")
  return idx === -1 ? line : line.slice(0, idx)
}

function enclosingFunctionStart(lines: readonly string[], target: number): number | null {
  const targetLine = lines[target]
  if (targetLine === undefined) return null
  let currentMin = indentWidth(targetLine)
  for (let j = target - 1; j >= 0; j--) {
    const line = lines[j]
    if (line === undefined || line.trim() === "") continue
    const ij = indentWidth(line)
    if (ij < currentMin) {
      if (FUNC_OPENER.test(line)) return j
      currentMin = ij
    }
  }
  return null
}

function scopeRange(lines: readonly string[], declLine: number): { start: number; end: number } {
  const funcStart = enclosingFunctionStart(lines, declLine)
  if (funcStart === null) return { start: 0, end: lines.length - 1 }
  const headerIndent = indentWidth(z.string().parse(lines[funcStart]))
  let end = funcStart
  for (let j = funcStart + 1; j < lines.length; j++) {
    const line = lines[j]
    if (line === undefined) break
    if (line.trim() === "") {
      end = j
      continue
    }
    if (indentWidth(line) <= headerIndent) break
    end = j
  }
  return { start: funcStart, end }
}

function findDeclaration(lines: readonly string[], ident: string, use: number): number | null {
  const decl = new RegExp(`\\blocal\\b[^=]*\\b${ident}\\b`)
  for (let j = use; j >= 0; j--) {
    const line = lines[j]
    if (line === undefined) continue
    if (decl.test(stripComment(line))) return j
  }
  return null
}

function isSubscripted(
  lines: readonly string[],
  ident: string,
  start: number,
  end: number
): boolean {
  const sub = new RegExp(`\\b${ident}\\[`)
  for (let j = start; j <= end; j++) {
    const line = lines[j]
    if (line === undefined) continue
    if (sub.test(stripComment(line))) return true
  }
  return false
}

export function scanBundle(source: string, file: string): readonly AnyTableLengthIssue[] {
  const lines = source.split("\n")
  const issues: AnyTableLengthIssue[] = []

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]
    if (raw === undefined) continue
    const code = stripComment(raw)
    if (!code.includes(".length")) continue
    LENGTH_READ.lastIndex = 0
    for (;;) {
      const receiver = GROUP1_SCHEMA.parse(LENGTH_READ.exec(code))
      if (receiver === null) break
      const declLine = findDeclaration(lines, receiver, i) ?? i
      const { start, end } = scopeRange(lines, declLine)
      if (!isSubscripted(lines, receiver, start, end)) continue
      issues.push({
        receiver,
        line: i + 1,
        file,
        message: `\`${receiver}.length\` (${file}:${i + 1}) — \`${receiver}\` is subscripted \`${receiver}[…]\` in its declaring scope, so it is a 1-based sequence whose \`.length\` TSTL did NOT lower to \`#\` (the receiver is \`AnyTable\`, not a real array). The emitted raw \`${receiver}.length\` field read is nil at runtime → "number expected for loop variables". In source, view it as an array so the length lowers to \`#${receiver}\`: write \`asAnyArray(${receiver}).length\`, leaving bare \`${receiver}[i]\` indexing intact. \`asAnyArray\` is a per-package \`casts.ts\` brand-constructor, not a shared import — where your package's \`casts.ts\` has none, add \`type AnyArray = readonly unknown[]\` and \`export function asAnyArray(value: unknown): AnyArray { return value as AnyArray }\`, which is the form \`check-type-assertions\` accepts`,
      })
    }
  }

  issues.sort((a, b) =>
    a.line !== b.line ? a.line - b.line : a.receiver.localeCompare(b.receiver)
  )
  return issues
}
