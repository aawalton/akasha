import { z } from "zod"

export interface RangeDoubleShiftIssue {
  readonly message: string
  readonly loopVar: string
  readonly bound: string
  readonly arrayText: string
  readonly line: number
  readonly file: string
}

const HEADER_RANGE = /^(\s*)for\s+(\w+)\s*=\s*1\s*,\s*(#[\w.]+)\s+do\s*$/

const HEADER_ITER = /^(\s*)for\s+(\w+)(?:\s*,\s*\w+)*\s+in\s+(i?pairs\(.+\))\s+do\s*$/

const HEADER_SCHEMA = z
  .unknown()
  .nullable()
  .transform((raw): { indent: number; loopVar: string; bound: string } | null => {
    if (raw === null) return null
    if (!Array.isArray(raw)) throw new Error("expected array from RegExp.exec")
    return {
      indent: z.string().parse(raw[1]).length,
      loopVar: z.string().parse(raw[2]),
      bound: z.string().parse(raw[3]),
    }
  })

const ARRAY_BEFORE_SCHEMA = z
  .unknown()
  .nullable()
  .transform((raw): string | null => {
    if (raw === null) return null
    if (!Array.isArray(raw)) throw new Error("expected array from String.match")
    return z.string().parse(raw[1])
  })

function indentWidth(line: string): number {
  return line.length - line.trimStart().length
}

function subscriptRe(loopVar: string): RegExp {
  return new RegExp(`\\[${loopVar}\\s*\\+\\s*1\\]`)
}

function blockRebindRe(loopVar: string): RegExp {
  return new RegExp(
    `\\bfor\\s+${loopVar}\\s*=` +
      `|\\bfor\\s+[\\w\\s,]*\\b${loopVar}\\b[\\w\\s,]*\\sin\\b` +
      `|\\bfunction\\s*\\([^)]*\\b${loopVar}\\b`
  )
}

function localRebindRe(loopVar: string): RegExp {
  return new RegExp(`\\blocal\\s+${loopVar}\\b`)
}

function rebindFloor(line: string, block: RegExp, local: RegExp): number | null {
  const indent = indentWidth(line)
  if (local.test(line)) return indent
  if (block.test(line)) return indent + 1
  return null
}

function parseHeader(line: string): { indent: number; loopVar: string; bound: string } | null {
  return HEADER_SCHEMA.parse(HEADER_RANGE.exec(line)) ?? HEADER_SCHEMA.parse(HEADER_ITER.exec(line))
}

function arrayBefore(line: string, loopVar: string): string {
  return (
    ARRAY_BEFORE_SCHEMA.parse(line.match(new RegExp(`([\\w.]+)\\[${loopVar}\\s*\\+\\s*1\\]`))) ??
    "(array)"
  )
}

export function scanBundle(source: string, file: string): readonly RangeDoubleShiftIssue[] {
  const lines = source.split("\n")
  const issues: RangeDoubleShiftIssue[] = []

  for (let h = 0; h < lines.length; h++) {
    const header = lines[h]
    if (header === undefined) continue
    const parsed = parseHeader(header)
    if (parsed === null) continue
    const { indent: base, loopVar, bound } = parsed
    const headerText = header.trim()
    const sub = subscriptRe(loopVar)
    const block = blockRebindRe(loopVar)
    const local = localRebindRe(loopVar)

    let floor: number | null = null
    for (let j = h + 1; j < lines.length; j++) {
      const line = lines[j]
      if (line === undefined) break
      if (line.trim() === "") continue
      if (indentWidth(line) <= base) break
      if (floor !== null && indentWidth(line) < floor) floor = null
      const shadow = rebindFloor(line, block, local)
      if (shadow !== null) floor = floor === null ? shadow : Math.min(floor, shadow)
      if (floor === null && sub.test(line)) {
        const arrayText = arrayBefore(line, loopVar)
        issues.push({
          loopVar,
          bound,
          arrayText,
          line: j + 1,
          file,
          message: `\`${arrayText}[${loopVar} + 1]\` inside \`${headerText}\` (${file}:${j + 1}) — TSTL stamped \`+ 1\` because \`${arrayText}\` is a real TS array, and \`${loopVar}\` is already a 1-based Lua index, so this lands on slots 2..N+1. On a read that skips the first element and indexes nil past the end; on a WRITE it leaves key 1 nil, and \`ipairs\`/\`#\` stop at that hole — every later reader sees an EMPTY table. In source, use \`${arrayText}[${loopVar} - 1]\` (the \`- 1\` cancels TSTL's \`+ 1\`)`,
        })
      }
    }
  }

  issues.sort((a, b) =>
    a.line !== b.line ? a.line - b.line : a.arrayText.localeCompare(b.arrayText)
  )
  return issues
}
