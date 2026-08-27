import { z } from "zod"

export const CODE_FENCE_LANGS: ReadonlySet<string> = new Set([
  "ts",
  "tsx",
  "typescript",
  "javascript",
  "js",
  "jsx",
])

const FIRST_CAPTURE_SCHEMA = z
  .unknown()
  .transform((v) => (Array.isArray(v) && typeof v[1] === "string" ? v[1] : null))

export type CodeFenceBlock = {
  readonly code: string
  readonly startLine: number
}

export const extractCodeFenceBlocks = (content: string): readonly CodeFenceBlock[] => {
  const blocks: CodeFenceBlock[] = []
  const lines = content.split("\n")

  let inFence = false
  let fenceLines: string[] = []
  let startLine = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line === undefined) continue
    const trimmed = line.trimStart()

    if (!inFence) {
      const lang = FIRST_CAPTURE_SCHEMA.parse(trimmed.match(/^```(\w+)/))
      if (lang !== null && CODE_FENCE_LANGS.has(lang)) {
        inFence = true
        fenceLines = []
        startLine = i + 2
      }
    } else {
      if (trimmed === "```") {
        blocks.push({ code: fenceLines.join("\n"), startLine })
        inFence = false
      } else {
        fenceLines.push(line)
      }
    }
  }

  return blocks
}

export type SpecifierKind = "static" | "dynamic" | "require"

export type SpecifierInfo = {
  readonly specifier: string
  readonly line: number
  readonly kind: SpecifierKind
}

const IMPORT_PATTERNS: readonly { readonly pattern: RegExp; readonly kind: SpecifierKind }[] = [
  { pattern: /(?:^|;)\s*(?:import|export)\s+.*?\s+from\s+["']([^"']+)["']/, kind: "static" },
  { pattern: /(?:^|;)\s*import\s+["']([^"']+)["']/, kind: "static" },
  { pattern: /require\s*\(\s*["']([^"']+)["']\s*\)/, kind: "require" },
  { pattern: /import\s*\(\s*["']([^"']+)["']\s*\)/, kind: "dynamic" },
]

export const extractImportSpecifiers = (
  code: string,
  startLine: number
): readonly SpecifierInfo[] => {
  const results: SpecifierInfo[] = []
  const lines = code.split("\n")

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line === undefined) continue
    const trimmed = line.trim()
    if (trimmed.startsWith("//") || trimmed.startsWith("*")) continue

    for (const { pattern, kind } of IMPORT_PATTERNS) {
      const specifier = FIRST_CAPTURE_SCHEMA.parse(line.match(pattern))
      if (specifier === null) continue
      results.push({ specifier, line: startLine + i, kind })
      break
    }
  }

  return results
}

export const isTemplateSpecifier = (specifier: string): boolean =>
  specifier.includes("<") && specifier.includes(">")

export const isExcludedSpecifier = (specifier: string): boolean => {
  if (specifier.startsWith("./") || specifier.startsWith("../")) return true
  if (specifier.startsWith("@/")) return true
  if (specifier.startsWith("node:") || specifier.startsWith("bun:")) return true
  return false
}

export const extractPackageName = (specifier: string): string | null => {
  if (specifier.length === 0) return null
  if (specifier.startsWith("@")) {
    const parts = specifier.split("/")
    if (parts.length < 2) return null
    return `${parts[0]}/${parts[1]}`
  }
  return specifier.split("/")[0] ?? null
}

export const extractSubPath = (specifier: string): string | null => {
  if (specifier.startsWith("@")) {
    const parts = specifier.split("/")
    if (parts.length <= 2) return null
    return `./${parts.slice(2).join("/")}`
  }
  const parts = specifier.split("/")
  if (parts.length <= 1) return null
  return `./${parts.slice(1).join("/")}`
}
