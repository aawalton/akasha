export interface RetiredToken {
  readonly token: string
  readonly reason: string
}

export interface FingerprintFile {
  readonly path: string
  readonly content: string
}

export interface FingerprintResidueInput {
  readonly addonName: string
  readonly retiredTokens: readonly RetiredToken[]
  readonly keepNames: readonly string[]
  readonly files: readonly FingerprintFile[]
}

export interface FingerprintFinding {
  readonly token: string
  readonly path: string
  readonly line: number
  readonly reason: string
}

function stripTsComments(source: string): string {
  const noBlocks = source.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
  return noBlocks.replace(/\/\/[^\n]*/g, "")
}

function stripXmlComments(source: string): string {
  return source.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
}

function stripComments(file: FingerprintFile): string {
  return file.path.endsWith(".xml") ? stripXmlComments(file.content) : stripTsComments(file.content)
}

interface KeepSpan {
  readonly start: number
  readonly end: number
}

function keepSpans(line: string, keepNames: readonly string[]): readonly KeepSpan[] {
  const spans: KeepSpan[] = []
  for (const name of keepNames) {
    if (name.length === 0) continue
    let from = 0
    for (;;) {
      const at = line.indexOf(name, from)
      if (at < 0) break
      spans.push({ start: at, end: at + name.length })
      from = at + 1
    }
  }
  return spans
}

function residueOnLine(line: string, token: string, spans: readonly KeepSpan[]): boolean {
  if (token.length === 0) return false
  let from = 0
  for (;;) {
    const at = line.indexOf(token, from)
    if (at < 0) return false
    const end = at + token.length
    if (!spans.some((s) => s.start <= at && end <= s.end)) return true
    from = at + 1
  }
}

export function findFingerprintResidue(
  input: FingerprintResidueInput
): readonly FingerprintFinding[] {
  const findings: FingerprintFinding[] = []
  for (const file of input.files) {
    const clean = stripComments(file)
    const lines = clean.split("\n")
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line === undefined) continue
      const spans = keepSpans(line, input.keepNames)
      for (const m of input.retiredTokens) {
        if (residueOnLine(line, m.token, spans)) {
          findings.push({ token: m.token, path: file.path, line: i + 1, reason: m.reason })
        }
      }
    }
  }
  findings.sort((a, b) =>
    a.path < b.path
      ? -1
      : a.path > b.path
        ? 1
        : a.line !== b.line
          ? a.line - b.line
          : a.token < b.token
            ? -1
            : a.token > b.token
              ? 1
              : 0
  )
  return findings
}

export function formatFinding(f: FingerprintFinding): string {
  return `${f.path}:${f.line}  [fingerprint-residue] ${f.token} — ${f.reason}`
}
