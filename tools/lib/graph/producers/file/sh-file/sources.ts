import { posix } from "node:path"

const DIRECTIVE = /^[ \t]*#[ \t]*shellcheck[ \t]+source=([^ \t\r\n]+)/

export const sourcedSpecifiers = (text: string): readonly string[] => {
  const held: string[] = []
  const seen = new Set<string>()
  for (const line of text.split("\n")) {
    const found = DIRECTIVE.exec(line)
    if (found === null) continue
    const spec = found[1]
    if (spec === undefined) continue
    if (spec.startsWith("/")) continue
    if (seen.has(spec)) continue
    seen.add(spec)
    held.push(spec)
  }
  return held
}

export const sourcedPath = (
  fromPath: string,
  specifier: string,
  standing: ReadonlySet<string>
): string | null => {
  if (standing.has(specifier)) return specifier
  const beside = posix.normalize(posix.join(posix.dirname(fromPath), specifier))
  return standing.has(beside) ? beside : null
}
