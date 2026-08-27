import { z } from "zod"
import { maskStringLiterals } from "./addon-banned-symbols"

export function stripLineComment(masked: string): string {
  const idx = masked.indexOf("--")
  if (idx === -1) return masked
  return masked.slice(0, idx) + " ".repeat(masked.length - idx)
}

export const LOAD_SCOPE_MAX_DEPTH = 1

const BLOCK_TOKENS_SCHEMA = z.array(z.string()).nullable()

export function functionDepthByLine(source: string): readonly number[] {
  const lines = source.split("\n")
  const stack: ("F" | "B" | "R")[] = []
  const fdepth = (): number => stack.reduce((n, s) => (s === "F" ? n + 1 : n), 0)
  let pendingLoopDo = false
  const out: number[] = []
  for (const raw of lines) {
    out.push(fdepth())
    const line = raw.endsWith("\r") ? raw.slice(0, -1) : raw
    const masked = stripLineComment(maskStringLiterals(line))
    const toks =
      BLOCK_TOKENS_SCHEMA.parse(masked.match(/\b(function|if|for|while|do|repeat|end|until)\b/g)) ??
      []
    for (const t of toks) {
      if (t === "function") stack.push("F")
      else if (t === "if") stack.push("B")
      else if (t === "for" || t === "while") {
        stack.push("B")
        pendingLoopDo = true
      } else if (t === "do") {
        if (pendingLoopDo) pendingLoopDo = false
        else stack.push("B")
      } else if (t === "repeat") stack.push("R")
      else if (t === "end") stack.pop()
      else if (t === "until") {
        if (stack[stack.length - 1] === "R") stack.pop()
      }
    }
  }
  return out
}
