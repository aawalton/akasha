import { Glob } from "bun"
import { readFileSync } from "node:fs"
import { HOLES_KEY } from "../../page/document/holes.ts"
import type { Check } from "../lib/check.ts"
import { parseFrontmatter } from "../../page/frontmatter.ts"
import { ownTypeScript } from "../lib/own-typescript.ts"
import { REFUSAL_DIR, refusalText } from "../../refusal/refusal.ts"
import { judge, over } from "../../outcome/outcome"
import { AKASHA, rootFor } from "../../repo/roots/roots"
import { fileStemOf } from "../../page/name/name"

const NAME = "refusals-bound"
const CALL = "refusalText("
const DECLARES = /\bfunction\s+$/
const TESTS = ".test.ts"
const QUOTED = "\"'`"
const OPENS = "({["
const CLOSES = ")}]"

function pastQuoted(source: string, at: number): number {
  const quote = source[at]
  for (let i = at + 1; i < source.length; i += 1) {
    if (source[i] === "\\") i += 1
    else if (source[i] === quote) return i
  }
  return -1
}

function spanOf(source: string, open: number): { end: number; splits: number[] } | null {
  const splits: number[] = []
  const stack: string[] = []
  for (let i = open; i < source.length; i += 1) {
    const c = source[i]!
    if (stack[stack.length - 1] === "`") {
      if (c === "\\") i += 1
      else if (c === "`") stack.pop()
      else if (c === "$" && source[i + 1] === "{") {
        stack.push("{")
        i += 1
      }
      continue
    }
    if (QUOTED.includes(c)) {
      if (c === "`") stack.push(c)
      else {
        const close = pastQuoted(source, i)
        if (close === -1) return null
        i = close
      }
    } else if (OPENS.includes(c)) stack.push(c)
    else if (CLOSES.includes(c)) {
      stack.pop()
      if (stack.length === 0) return { end: i, splits }
    } else if (c === "," && stack.length === 1) splits.push(i)
  }
  return null
}

function keysOf(source: string, from: number): string[] | null {
  const open = source.indexOf("{", from)
  if (open === -1) return null
  const span = spanOf(source, open)
  if (span === null) return null
  const parts: string[] = []
  let start = open + 1
  for (const at of [...span.splits, span.end]) {
    parts.push(source.slice(start, at))
    start = at + 1
  }
  const keys = parts
    .map((part) => part.trim())
    .filter((part) => part !== "")
    .map((part) => (part.includes(":") ? part.slice(0, part.indexOf(":")) : part).trim())
  return keys.some((key) => !/^[A-Za-z_$][\w$]*$/.test(key)) ? null : keys
}

const LONE = /^\s*"([a-z][a-z0-9-]*)"\s*$/
const BRANCH = /[?:]\s*"([a-z][a-z0-9-]*)"/g

function slugsOf(first: string): string[] | null {
  const lone = LONE.exec(first)
  if (lone !== null) return [lone[1]!]
  const branches = [...first.matchAll(BRANCH)].map((found) => found[1]!)
  return branches.length === 0 ? null : branches
}

function declaredIn(body: string): string[] {
  const held = parseFrontmatter(body).fields.get(HOLES_KEY)
  return Array.isArray(held) ? held.map((name) => String(name)) : []
}

const listed = (names: readonly string[]): string => names.map((name) => `\`${name}\``).join(", ")

export const refusalsBound: Check = (repo) => {
  const root = rootFor(repo.roots, AKASHA)
  const documents = new Map<string, string[]>()
  for (const relPath of new Glob(`${REFUSAL_DIR}/*.md`).scanSync(root)) {
    const slug = fileStemOf(relPath)
    documents.set(slug, declaredIn(readFileSync(`${root}/${relPath}`, "utf8")))
  }

  const failures: string[] = []
  const printed = new Set<string>()
  let callers = 0
  for (const relPath of ownTypeScript(root)) {
    if (relPath.endsWith(TESTS)) continue
    const source = readFileSync(`${root}/${relPath}`, "utf8")
    const spots: number[] = []
    for (let at = source.indexOf(CALL); at !== -1; at = source.indexOf(CALL, at + CALL.length))
      if (!QUOTED.includes(source[at - 1] ?? "") && !DECLARES.test(source.slice(0, at)))
        spots.push(at)
    if (spots.length === 0) continue
    callers += 1
    for (const at of spots) {
      const args = source.slice(at + CALL.length)
      const call = spanOf(source, at + CALL.length - 1)
      const first =
        call === null || call.splits.length === 0 ? null : call.splits[0]! - (at + CALL.length)
      const slugs = first === null ? null : slugsOf(args.slice(0, first))
      if (first === null || slugs === null) {
        failures.push(refusalText("refusal-slug-not-literal", { path: relPath }, root))
        continue
      }
      const keys = args
        .slice(first + 1)
        .trimStart()
        .startsWith("{")
        ? keysOf(args, first + 1)
        : null
      if (keys === null) {
        failures.push(
          refusalText(
            "refusal-values-unreadable",
            { path: relPath, slug: slugs.join(", ") },
            root
          )
        )
        continue
      }
      for (const slug of slugs) {
        const declared = documents.get(slug)
        if (declared === undefined) {
          failures.push(refusalText("refusal-document-absent", { path: relPath, slug }, root))
          continue
        }
        printed.add(slug)
        const missing = declared.filter((hole) => !keys.includes(hole))
        const surplus = keys.filter((key) => !declared.includes(key))
        if (missing.length > 0)
          failures.push(
            refusalText(
              "refusal-hole-unfilled",
              { path: relPath, slug, holes: listed(missing) },
              root
            )
          )
        if (surplus.length > 0)
          failures.push(
            refusalText(
              "refusal-value-surplus",
              { path: relPath, slug, values: listed(surplus) },
              root
            )
          )
      }
    }
  }

  for (const slug of [...documents.keys()].sort())
    if (!printed.has(slug)) failures.push(refusalText("refusal-document-unprinted", { slug }, root))

  return {
    ...judge(
      NAME,
      `${documents.size} refusal document(s) against ${callers} instrument(s) that print one`,
      failures
    ),
    population: over(documents.size + callers, "refusal document(s) and printer(s)"),
  }
}
