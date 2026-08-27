import { HOSTNAME_KEY, HOSTNAMES, type Hostname } from "@infra/k8s-types/hostnames"
import {
  type DocSpan,
  parseMappingLine,
  type RawLine,
  unquote,
} from "@infra/k8s-types/k8s-manifest-walker"

const HOSTNAME_SET: ReadonlySet<string> = new Set(HOSTNAMES)
const isHostname = (value: string): value is Hostname => HOSTNAME_SET.has(value)

function readMatchExpressionSiblings(
  lines: readonly RawLine[],
  keyLineIndex: number,
  spanEnd: number,
  headIndent: number,
  siblingIndent: number
): { operator: string | undefined; values: readonly string[] } {
  let operator: string | undefined
  const values: string[] = []
  let inValuesList = false
  let valuesItemIndent = -1

  for (let i = keyLineIndex + 1; i < spanEnd; i++) {
    const ln = lines[i]
    if (ln === undefined) continue
    if (ln.blank) continue

    if (ln.indent <= headIndent) break

    if (inValuesList) {
      if (ln.indent === valuesItemIndent && ln.stripped.trimStart().startsWith("- ")) {
        const v = unquote(ln.stripped.trimStart().slice(2).trim())
        values.push(v)
        continue
      }
      if (ln.indent < valuesItemIndent) {
        inValuesList = false
      } else {
        continue
      }
    }

    if (ln.indent !== siblingIndent) continue

    const parsed = parseMappingLine(ln.stripped)
    if (parsed === null) continue

    if (parsed.key === "operator" && parsed.value !== undefined) {
      operator = unquote(parsed.value)
    } else if (parsed.key === "values") {
      inValuesList = true
      valuesItemIndent = -1
      for (let j = i + 1; j < spanEnd; j++) {
        const sub = lines[j]
        if (sub === undefined) continue
        if (sub.blank) continue
        if (sub.indent <= siblingIndent && !sub.stripped.trimStart().startsWith("- ")) {
          inValuesList = false
          break
        }
        if (sub.stripped.trimStart().startsWith("- ")) {
          valuesItemIndent = sub.indent
          break
        }
      }
      if (valuesItemIndent === -1) inValuesList = false
    }
  }

  return { operator, values }
}

export function extractPvHostnamePins(
  lines: readonly RawLine[],
  span: DocSpan
): readonly Hostname[] {
  const out: Hostname[] = []

  for (let i = span.startIndex; i < span.endIndex; i++) {
    const ln = lines[i]
    if (ln === undefined) continue
    if (ln.blank) continue

    const trimmed = ln.stripped.trimStart()
    if (!trimmed.startsWith("- ")) continue
    const head = parseMappingLine(trimmed.slice(2).trim())
    if (head === null) continue
    if (head.key !== "key" || head.value === undefined) continue
    if (unquote(head.value) !== HOSTNAME_KEY) continue

    const headIndent = ln.indent
    const siblingIndent = headIndent + 2

    const { operator, values } = readMatchExpressionSiblings(
      lines,
      i,
      span.endIndex,
      headIndent,
      siblingIndent
    )
    if (operator !== "In") continue

    for (const v of values) {
      if (isHostname(v)) out.push(v)
    }
  }

  return out
}
