import ts from "typescript"

export const MIN_CODE_SYNC_SIDECAR_MEMORY = "2Gi"

export const SIDECAR_DEFAULT_MEMORY_LIMIT = "1Gi"

export const SIDECAR_HELPER_NAME = "orchestratorCacheSyncSidecar"

const K8S_QUANTITY_RE = /^(\d+(?:\.\d+)?(?:[eE][-+]?\d+)?)\s*([A-Za-z]*)$/

const K8S_QUANTITY_MULTIPLIERS: Readonly<Record<string, number>> = {
  Ki: 1024,
  Mi: 1024 ** 2,
  Gi: 1024 ** 3,
  Ti: 1024 ** 4,
  Pi: 1024 ** 5,
  Ei: 1024 ** 6,
  k: 1000,
  K: 1000,
  M: 1000 ** 2,
  G: 1000 ** 3,
  T: 1000 ** 4,
  P: 1000 ** 5,
  E: 1000 ** 6,
  m: 1e-3,
}

export function parseK8sMemoryToBytes(value: string): number | null {
  const matched = K8S_QUANTITY_RE.exec(value.trim())
  if (matched === null) return null
  const numberPart = matched[1]
  const suffix = matched[2]
  if (numberPart === undefined || suffix === undefined) return null
  const scalar = Number(numberPart)
  if (!Number.isFinite(scalar)) return null
  if (suffix === "") return scalar
  const multiplier = K8S_QUANTITY_MULTIPLIERS[suffix]
  if (multiplier === undefined) return null
  return scalar * multiplier
}

export interface SidecarCall {
  readonly file: string
  readonly line: number
  readonly limit: string | null
}

export function mentionsSidecarHelper(text: string): boolean {
  return text.includes(SIDECAR_HELPER_NAME)
}

function localHelperNames(sf: ts.SourceFile): ReadonlySet<string> {
  const names = new Set<string>([SIDECAR_HELPER_NAME])
  for (const statement of sf.statements) {
    if (!ts.isImportDeclaration(statement)) continue
    const bindings = statement.importClause?.namedBindings
    if (bindings === undefined || !ts.isNamedImports(bindings)) continue
    for (const element of bindings.elements) {
      const exported = element.propertyName?.text ?? element.name.text
      if (exported === SIDECAR_HELPER_NAME) names.add(element.name.text)
    }
  }
  return names
}

function callsHelper(expr: ts.Expression, locals: ReadonlySet<string>): boolean {
  if (ts.isIdentifier(expr)) return locals.has(expr.text)
  if (ts.isPropertyAccessExpression(expr)) return expr.name.text === SIDECAR_HELPER_NAME
  return false
}

function propertyValue(obj: ts.ObjectLiteralExpression, key: string): ts.Expression | undefined {
  for (const prop of obj.properties) {
    if (!ts.isPropertyAssignment(prop)) continue
    const name = prop.name
    if (ts.isIdentifier(name) && name.text === key) return prop.initializer
    if (ts.isStringLiteralLike(name) && name.text === key) return prop.initializer
  }
  return undefined
}

function resolveLimit(call: ts.CallExpression): string | null {
  const arg = call.arguments[0]
  if (arg === undefined || !ts.isObjectLiteralExpression(arg)) return null
  const memory = propertyValue(arg, "memory")
  if (memory === undefined) return SIDECAR_DEFAULT_MEMORY_LIMIT
  if (ts.isStringLiteralLike(memory)) return memory.text
  if (ts.isObjectLiteralExpression(memory)) {
    const limit = propertyValue(memory, "limit")
    if (limit !== undefined && ts.isStringLiteralLike(limit)) return limit.text
    return null
  }
  return null
}

export function scanCodeSyncSidecarCalls(sf: ts.SourceFile): readonly SidecarCall[] {
  const out: SidecarCall[] = []
  const locals = localHelperNames(sf)

  function visit(node: ts.Node): undefined {
    if (ts.isCallExpression(node) && callsHelper(node.expression, locals)) {
      const { line } = ts.getLineAndCharacterOfPosition(sf, node.getStart(sf))
      out.push({ file: sf.fileName, line: line + 1, limit: resolveLimit(node) })
    }
    ts.forEachChild(node, visit)
  }

  ts.forEachChild(sf, visit)
  return out
}
