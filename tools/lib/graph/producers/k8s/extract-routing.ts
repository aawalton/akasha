import {
  parseMappingLine,
  type RawLine,
  resolveMappingPath,
  unquote,
} from "@infra/k8s-types/k8s-manifest-walker"

export type IngressBackend = {
  readonly serviceName: string
  readonly host: string | null
  readonly path: string
  readonly line: number
}

const POD_TEMPLATE_LABELS_PATHS = new Map<string, readonly string[]>([
  ["Deployment", ["spec", "template", "metadata", "labels"]],
  ["StatefulSet", ["spec", "template", "metadata", "labels"]],
  ["DaemonSet", ["spec", "template", "metadata", "labels"]],
  ["Job", ["spec", "template", "metadata", "labels"]],
  ["CronJob", ["spec", "jobTemplate", "spec", "template", "metadata", "labels"]],
])

function readMappingLine(stripped: string): { key: string; value: string | undefined } | null {
  const trimmed = stripped.trimStart()
  const candidate = trimmed.startsWith("- ") ? trimmed.slice(2).trim() : trimmed
  return parseMappingLine(candidate)
}

function readFlatMapping(
  lines: readonly RawLine[],
  span: { startIndex: number; endIndex: number },
  indent: number
): ReadonlyMap<string, string> {
  const out = new Map<string, string>()
  for (let i = span.startIndex; i < span.endIndex; i++) {
    const ln = lines[i]
    if (ln === undefined) continue
    if (ln.blank) continue
    if (ln.indent !== indent) continue
    const parsed = parseMappingLine(ln.stripped)
    if (parsed === null) continue
    if (parsed.value === undefined) continue
    out.set(parsed.key, unquote(parsed.value))
  }
  return out
}

export function extractPodTemplateLabels(
  lines: readonly RawLine[],
  span: { startIndex: number; endIndex: number },
  kind: string
): ReadonlyMap<string, string> {
  const path = POD_TEMPLATE_LABELS_PATHS.get(kind)
  if (path === undefined) return new Map()
  const block = resolveMappingPath(lines, span, path)
  if (block === null) return new Map()
  return readFlatMapping(lines, block, block.indent)
}

export function extractServiceSelector(
  lines: readonly RawLine[],
  span: { startIndex: number; endIndex: number }
): ReadonlyMap<string, string> {
  const block = resolveMappingPath(lines, span, ["spec", "selector"])
  if (block === null) return new Map()
  return readFlatMapping(lines, block, block.indent)
}

function findRulesListShape(
  lines: readonly RawLine[],
  span: { startIndex: number; endIndex: number }
): { parentIndex: number; parentIndent: number; itemIndent: number } | null {
  for (let i = span.startIndex; i < span.endIndex; i++) {
    const ln = lines[i]
    if (ln === undefined) continue
    if (ln.blank) continue
    const parsed = parseMappingLine(ln.stripped)
    if (parsed === null) continue
    if (parsed.key !== "rules") continue
    if (parsed.value !== undefined) continue
    const parentIndent = ln.indent
    for (let j = i + 1; j < span.endIndex; j++) {
      const sub = lines[j]
      if (sub === undefined) continue
      if (sub.blank) continue
      if (sub.indent < parentIndent) return null
      const subTrim = sub.stripped.trimStart()
      if (sub.indent === parentIndent && !subTrim.startsWith("- ")) return null
      if (subTrim.startsWith("- ")) {
        return { parentIndex: i, parentIndent, itemIndent: sub.indent }
      }
    }
    return null
  }
  return null
}

function ruleItemStarts(
  lines: readonly RawLine[],
  span: { startIndex: number; endIndex: number },
  parentIndex: number,
  parentIndent: number,
  itemIndent: number
): readonly number[] {
  const out: number[] = []
  for (let i = parentIndex + 1; i < span.endIndex; i++) {
    const ln = lines[i]
    if (ln === undefined) continue
    if (ln.blank) continue
    if (ln.indent < parentIndent) break
    if (ln.indent === parentIndent && !ln.stripped.trimStart().startsWith("- ")) break
    if (ln.indent === itemIndent && ln.stripped.trimStart().startsWith("- ")) {
      out.push(i)
    }
  }
  return out
}

export function extractIngressBackends(
  lines: readonly RawLine[],
  span: { startIndex: number; endIndex: number }
): readonly IngressBackend[] {
  const out: IngressBackend[] = []
  const shape = findRulesListShape(lines, span)
  if (shape === null) return out
  const starts = ruleItemStarts(
    lines,
    span,
    shape.parentIndex,
    shape.parentIndent,
    shape.itemIndent
  )
  for (let r = 0; r < starts.length; r++) {
    const start = starts[r]
    if (start === undefined) continue
    const end = starts[r + 1] ?? span.endIndex
    let host: string | null = null
    for (let i = start; i < end; i++) {
      const ln = lines[i]
      if (ln === undefined) continue
      if (ln.blank) continue
      const parsed = readMappingLine(ln.stripped)
      if (parsed === null) continue
      if (parsed.key === "host" && parsed.value !== undefined) {
        host = unquote(parsed.value)
        break
      }
    }
    let currentPath = "/"
    for (let i = start; i < end; i++) {
      const ln = lines[i]
      if (ln === undefined) continue
      if (ln.blank) continue
      const parsed = readMappingLine(ln.stripped)
      if (parsed === null) continue
      if (parsed.key === "path" && parsed.value !== undefined) {
        currentPath = unquote(parsed.value)
        continue
      }
      if (parsed.key === "service" && parsed.value === undefined) {
        const parentIndent = ln.indent
        for (let j = i + 1; j < end; j++) {
          const sub = lines[j]
          if (sub === undefined) continue
          if (sub.blank) continue
          if (sub.indent <= parentIndent) break
          const subParsed = readMappingLine(sub.stripped)
          if (subParsed === null) continue
          if (subParsed.key === "name" && subParsed.value !== undefined) {
            out.push({
              serviceName: unquote(subParsed.value),
              host,
              path: currentPath,
              line: sub.lineNumber,
            })
            break
          }
        }
      }
    }
  }
  return out
}
