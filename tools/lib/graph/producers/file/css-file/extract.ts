import { z } from "zod"

const FIRST_CAPTURE_SCHEMA = z
  .unknown()
  .transform((v) => (Array.isArray(v) && typeof v[1] === "string" ? v[1] : null))

export type SpecifierInfo = {
  readonly specifier: string
  readonly line: number
}

const IMPORT_PATTERNS: readonly RegExp[] = [
  /@import\s+url\s*\(\s*["']([^"']+)["']\s*\)/,
  /@import\s+url\s*\(\s*([^)\s"']+)\s*\)/,
  /@import\s+["']([^"']+)["']/,
]

export const extractImportSpecifiers = (content: string): readonly SpecifierInfo[] => {
  const results: SpecifierInfo[] = []
  const lines = content.split("\n")

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line === undefined) continue

    for (const pattern of IMPORT_PATTERNS) {
      const specifier = FIRST_CAPTURE_SCHEMA.parse(line.match(pattern))
      if (specifier === null) continue
      results.push({ specifier, line: i + 1 })
      break
    }
  }

  return results
}

const URL_PATTERN = /url\(\s*["']?([^"')]+?)["']?\s*\)/g

export const extractUrlSpecifiers = (content: string): readonly SpecifierInfo[] => {
  const results: SpecifierInfo[] = []
  const lines = content.split("\n")

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line === undefined) continue
    for (const m of line.matchAll(URL_PATTERN)) {
      const specifier = FIRST_CAPTURE_SCHEMA.parse(m)
      if (specifier === null) continue
      const trimmed = specifier.trim()
      if (trimmed.length === 0) continue
      results.push({ specifier: trimmed, line: i + 1 })
    }
  }

  return results
}

export const isTemplateSpecifier = (specifier: string): boolean =>
  specifier.includes("<") && specifier.includes(">")

export const isUrlSpecifier = (specifier: string): boolean => {
  if (specifier.startsWith("data:")) return true
  if (specifier.startsWith("http://") || specifier.startsWith("https://")) return true
  if (specifier.startsWith("//")) return true
  return false
}

export const isRelativeSpecifier = (specifier: string): boolean =>
  specifier.startsWith("./") || specifier.startsWith("../")

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

export type SourceDirectiveRaw = {
  readonly raw: string
  readonly pattern: string
  readonly line: number
  readonly negated: boolean
}

const SOURCE_DIRECTIVE_PATTERN = /@source\s+(not\s+)?"([^"]+)"/

const SOURCE_MATCH_SCHEMA = z.unknown().transform((v) => {
  if (!Array.isArray(v)) return null
  const negation = typeof v[1] === "string" ? v[1] : null
  const pattern = typeof v[2] === "string" ? v[2] : null
  if (pattern === null) return null
  return { negation, pattern }
})

const INLINE_DIRECTIVE_PATTERN = /@source\s+inline\s*\(/

export const isInlineDirective = (line: string): boolean => INLINE_DIRECTIVE_PATTERN.test(line)

export const extractSourceDirectives = (content: string): readonly SourceDirectiveRaw[] => {
  const out: SourceDirectiveRaw[] = []
  const lines = content.split("\n")
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line === undefined) continue
    if (isInlineDirective(line)) continue
    const matched = SOURCE_MATCH_SCHEMA.parse(line.match(SOURCE_DIRECTIVE_PATTERN))
    if (matched === null) continue
    out.push({
      raw: line.trim(),
      pattern: matched.pattern,
      line: i + 1,
      negated: matched.negation !== null,
    })
  }
  return out
}

export const globBase = (pattern: string): string => {
  const parts = pattern.split("/")
  const baseParts: string[] = []
  for (const p of parts) {
    if (p.includes("*") || p.includes("{") || p.includes("?")) break
    baseParts.push(p)
  }
  return baseParts.join("/")
}
