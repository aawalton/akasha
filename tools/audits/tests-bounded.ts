import { AKASHA, rootFor } from "../../repo/roots/roots.ts"
import type { Check } from "../lib/check.ts"
import { judge, over } from "../../outcome/outcome"
import { refusalText } from "../../refusal/refusal.ts"
import { CEILING_MS, type Band } from "../lib/run-cost.ts"
import { unitFiles } from "./suite-runs.ts"

const NAME = "tests-bounded"

export const TEST_BAND: Band = "instant"

export const DEFAULT_CEILING_MS = CEILING_MS[TEST_BAND]

const CALL = /(?<![.\w$])(test|it)(?:\.[A-Za-z]+)*\s*\(/y

export interface Stated {
  readonly line: number
  readonly stated: string
}

function skipQuoted(source: string, at: number): number {
  const quote = source[at] as string
  let here = at + 1
  while (here < source.length) {
    if (source[here] === "\\") {
      here += 2
      continue
    }
    if (source[here] === quote) return here
    if (quote === "`" && source[here] === "$" && source[here + 1] === "{") {
      let depth = 1
      here += 2
      while (here < source.length && depth > 0) {
        if (source[here] === "{") depth += 1
        else if (source[here] === "}") depth -= 1
        here += 1
      }
      continue
    }
    here += 1
  }
  return here
}

function thirdArgument(source: string, openAt: number): string | null {
  let depth = 0
  let commas = 0
  let from = -1
  for (let here = openAt; here < source.length; here += 1) {
    const glyph = source[here] as string
    if (glyph === '"' || glyph === "'" || glyph === "`") {
      here = skipQuoted(source, here)
      continue
    }
    if (glyph === "/" && source[here + 1] === "/") {
      while (here < source.length && source[here] !== "\n") here += 1
      continue
    }
    if (glyph === "/" && source[here + 1] === "*") {
      here = source.indexOf("*/", here + 2)
      if (here === -1) return null
      here += 1
      continue
    }
    if (glyph === "(" || glyph === "[" || glyph === "{") depth += 1
    else if (glyph === ")" || glyph === "]" || glyph === "}") {
      depth -= 1
      if (depth === 0) return commas >= 2 && from >= 0 ? source.slice(from, here).trim() : null
    } else if (glyph === "," && depth === 1) {
      commas += 1
      if (commas === 2) from = here + 1
    }
  }
  return null
}

export function statedTimeouts(source: string): readonly Stated[] {
  const found: Stated[] = []
  for (let here = 0; here < source.length; here += 1) {
    const glyph = source[here] as string
    if (glyph === '"' || glyph === "'" || glyph === "\`") {
      here = skipQuoted(source, here)
      continue
    }
    if (glyph === "/" && source[here + 1] === "/") {
      while (here < source.length && source[here] !== "\n") here += 1
      continue
    }
    if (glyph === "/" && source[here + 1] === "*") {
      const shut = source.indexOf("*/", here + 2)
      if (shut === -1) break
      here = shut + 1
      continue
    }
    CALL.lastIndex = here
    const call = CALL.exec(source)
    if (call === null) continue
    const openAt = here + call[0].length - 1
    const stated = thirdArgument(source, openAt)
    if (stated !== null && stated !== "") {
      found.push({ line: source.slice(0, here).split("\n").length, stated })
    }
    here = openAt
  }
  return found
}

export const testsBounded: Check = (repo) => {
  const files = unitFiles(rootFor(repo.roots, AKASHA))
  const named: string[] = []
  for (const relPath of files) {
    for (const one of statedTimeouts(repo.read(relPath))) {
      named.push(`${relPath}:${one.line} states \`${one.stated}\``)
    }
  }
  const messages =
    named.length === 0
      ? []
      : [
          refusalText(
            "test-timeout-stated",
            { stated: `${named.length}`, ceiling: `${DEFAULT_CEILING_MS / 1000}` },
            rootFor(repo.roots, AKASHA)
          ),
          ...named,
        ]
  return {
    ...judge(
      NAME,
      `${files.length} unit test file(s), ${named.length} timeout(s) stated`,
      messages
    ),
    population: over(files.length, "unit test file(s)"),
  }
}
