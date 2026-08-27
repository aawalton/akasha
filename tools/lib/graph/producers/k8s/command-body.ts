import ts from "typescript"

const DECLARED =
  /(?:export\s+)?const\s+([A-Za-z_$][\w$]*)\s*=\s*(`(?:[^`\\]|\\.)*`|"[^"\n]*"|'[^'\n]*')/g

const HOLE = /\$\{\s*([A-Za-z_$][\w$]*)\s*\}/g

const UNKNOWN = " "

const PASSES = 3

const CONTAINER_COMMAND_KEYS: readonly string[] = ["command", "args"]

const NAMED = /packages\/[A-Za-z0-9_@./-]+/g

export type CommandSource = {
  readonly sourcePath: string
  readonly text: string
}

const keyOf = (name: ts.PropertyName): string | null => {
  if (ts.isIdentifier(name)) return name.text
  if (ts.isStringLiteral(name)) return name.text
  return null
}

export const resolvedConsts = (texts: readonly string[]): ReadonlyMap<string, string> => {
  const env = new Map<string, string>()
  for (let pass = 0; pass < PASSES; pass++) {
    for (const text of texts) {
      for (const found of text.matchAll(DECLARED)) {
        const name = found[1]
        const raw = found[2]
        if (name === undefined || raw === undefined) continue
        const body = raw.slice(1, -1)
        env.set(
          name,
          body.replace(HOLE, (_whole: string, named: string) => env.get(named) ?? UNKNOWN)
        )
      }
    }
  }
  return env
}

export const commandBodies = (sources: readonly CommandSource[]): readonly string[] => {
  const env = resolvedConsts(sources.map((one) => one.text))
  const bodies: string[] = []
  for (const source of sources) {
    const sf = ts.createSourceFile(source.sourcePath, source.text, ts.ScriptTarget.Latest, true)
    const visit = (node: ts.Node): undefined => {
      if (ts.isPropertyAssignment(node) && ts.isArrayLiteralExpression(node.initializer)) {
        const key = keyOf(node.name)
        if (key !== null && CONTAINER_COMMAND_KEYS.includes(key)) {
          for (const element of node.initializer.elements) {
            if (ts.isStringLiteral(element)) {
              bodies.push(element.text)
              continue
            }
            if (!ts.isIdentifier(element)) continue
            const held = env.get(element.text)
            if (held !== undefined) bodies.push(held)
          }
        }
      }
      ts.forEachChild(node, visit)
      return undefined
    }
    visit(sf)
  }
  return bodies
}

export const filesNamedIn = (
  bodies: readonly string[],
  standing: ReadonlySet<string>
): readonly string[] => {
  const found = new Set<string>()
  for (const body of bodies) {
    for (const one of body.matchAll(NAMED)) {
      const ref = one[0]
      if (ref !== undefined && standing.has(ref)) found.add(ref)
    }
  }
  return [...found].sort()
}
