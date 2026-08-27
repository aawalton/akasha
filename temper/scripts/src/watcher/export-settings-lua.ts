import { requireMatchPositional } from "../../../../shared/utils-narrow/src/require-match-positional"
import { z } from "zod"

export function replaceOrInsertLuaBlock(
  lines: readonly string[],
  key: string,
  newBlock: readonly string[],
  siblingKeys: readonly string[]
): readonly string[] {
  let blockStart = -1
  for (const [i, line] of lines.entries()) {
    if (line.includes(`["${key}"]`)) {
      blockStart = i
      break
    }
  }

  if (blockStart !== -1) {
    let depth = 0
    let enteredBlock = false
    let blockEnd = blockStart
    for (let i = blockStart; i < lines.length; i++) {
      const line = lines[i]
      if (line === undefined) break
      for (const ch of line) {
        if (ch === "{") {
          depth++
          enteredBlock = true
        }
        if (ch === "}") depth--
      }
      if (enteredBlock && depth <= 0) {
        blockEnd = i
        break
      }
    }

    return [...lines.slice(0, blockStart), ...newBlock, ...lines.slice(blockEnd + 1)]
  }

  for (const siblingKey of siblingKeys) {
    for (const [i, line] of lines.entries()) {
      if (line.includes(`["${siblingKey}"]`)) {
        return [...lines.slice(0, i), ...newBlock, ...lines.slice(i)]
      }
    }
  }

  console.warn(
    `replaceOrInsertLuaBlock: no anchor for key=${JSON.stringify(key)} (siblings=${JSON.stringify(siblingKeys)}); leaving content unchanged`
  )
  return lines
}

export function detectIndent(
  lines: readonly string[],
  key: string,
  siblingKeys: readonly string[]
): string {
  for (const line of lines) {
    if (line.includes(`["${key}"]`)) {
      const [indent] = requireMatchPositional(/^(\s*)/, z.tuple([z.string()]), line)
      return indent
    }
  }

  for (const siblingKey of siblingKeys) {
    for (const line of lines) {
      if (line.includes(`["${siblingKey}"]`)) {
        const [indent] = requireMatchPositional(/^(\s*)/, z.tuple([z.string()]), line)
        return indent
      }
    }
  }

  return "            "
}
