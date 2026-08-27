import ts from "typescript"

const REGISTRATION_FNS: ReadonlySet<string> = new Set([
  "RegisterAddonPanel",
  "CreateControl",
  "CreateTopLevelWindow",
  "CreateControlFromVirtual",
])

export type DependentKind = "ts-global-read" | "xml-handler-ref" | "lam-topology-binding"

export interface DependentRef {
  readonly kind: DependentKind
  readonly file: string
  readonly line: number
  readonly column: number
  readonly detail: string
}

export type RenameVerdict = "rename-safe" | "keep-name-required"

export interface GlobalDependentReport {
  readonly global: string
  readonly dependents: readonly DependentRef[]
  readonly verdict: RenameVerdict
}

export interface DependentSourceFile {
  readonly path: string
  readonly source: string
  readonly lang: "ts" | "xml"
}

export interface DependentScanInput {
  readonly global: string
  readonly files: readonly DependentSourceFile[]
}

type ResolvedName =
  | { readonly kind: "exact"; readonly value: string }
  | { readonly kind: "unresolved" }

interface AddonSymbols {
  readonly consts: ReadonlyMap<string, string>
  readonly objectProps: ReadonlyMap<string, ReadonlyMap<string, string>>
}

function stringLiteralValue(node: ts.Expression): string | undefined {
  if (ts.isStringLiteralLike(node)) return node.text
  return undefined
}

function isModuleLevel(node: ts.Node): boolean {
  return node.parent !== undefined && ts.isSourceFile(node.parent)
}

function collectSymbolsFromFile(
  sf: ts.SourceFile,
  consts: Map<string, string>,
  ambiguousConsts: Set<string>,
  objectProps: Map<string, Map<string, string>>
): undefined {
  for (const stmt of sf.statements) {
    if (!ts.isVariableStatement(stmt) || !isModuleLevel(stmt)) continue
    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name) || decl.initializer === undefined) continue
      const name = decl.name.text
      const init = decl.initializer
      const literal = stringLiteralValue(init)
      if (literal !== undefined) {
        const existing = consts.get(name)
        if (existing !== undefined && existing !== literal) ambiguousConsts.add(name)
        else consts.set(name, literal)
        continue
      }
      if (ts.isObjectLiteralExpression(init)) {
        const props = objectProps.get(name) ?? new Map<string, string>()
        for (const prop of init.properties) {
          if (!ts.isPropertyAssignment(prop)) continue
          const key = prop.name
          const keyText = ts.isIdentifier(key) || ts.isStringLiteralLike(key) ? key.text : undefined
          if (keyText === undefined) continue
          const propLiteral = stringLiteralValue(prop.initializer)
          if (propLiteral !== undefined) props.set(keyText, propLiteral)
        }
        objectProps.set(name, props)
      }
    }
  }
  return undefined
}

function buildSymbols(sources: readonly ts.SourceFile[]): AddonSymbols {
  const consts = new Map<string, string>()
  const ambiguousConsts = new Set<string>()
  const objectProps = new Map<string, Map<string, string>>()
  for (const sf of sources) collectSymbolsFromFile(sf, consts, ambiguousConsts, objectProps)
  for (const name of ambiguousConsts) consts.delete(name)
  return { consts, objectProps }
}

function resolveNameArg(arg: ts.Expression, symbols: AddonSymbols): ResolvedName {
  const literal = stringLiteralValue(arg)
  if (literal !== undefined) return { kind: "exact", value: literal }
  if (ts.isIdentifier(arg)) {
    const value = symbols.consts.get(arg.text)
    return value !== undefined ? { kind: "exact", value } : { kind: "unresolved" }
  }
  if (ts.isPropertyAccessExpression(arg) && ts.isIdentifier(arg.expression)) {
    const value = symbols.objectProps.get(arg.expression.text)?.get(arg.name.text)
    return value !== undefined ? { kind: "exact", value } : { kind: "unresolved" }
  }
  return { kind: "unresolved" }
}

function matchRegistrationCallee(
  callee: ts.Expression
): { readonly fn: string; readonly viaCall: boolean } | undefined {
  if (ts.isIdentifier(callee) && REGISTRATION_FNS.has(callee.text)) {
    return { fn: callee.text, viaCall: false }
  }
  if (ts.isPropertyAccessExpression(callee)) {
    if (REGISTRATION_FNS.has(callee.name.text)) return { fn: callee.name.text, viaCall: false }
    if (
      callee.name.text === "call" &&
      ts.isPropertyAccessExpression(callee.expression) &&
      REGISTRATION_FNS.has(callee.expression.name.text)
    ) {
      return { fn: callee.expression.name.text, viaCall: true }
    }
  }
  return undefined
}

function posOf(sf: ts.SourceFile, node: ts.Node): { line: number; column: number } {
  const { line, character } = sf.getLineAndCharacterOfPosition(node.getStart(sf))
  return { line: line + 1, column: character + 1 }
}

function isAssignmentTarget(node: ts.Node): boolean {
  const parent = node.parent
  return (
    parent !== undefined &&
    ts.isBinaryExpression(parent) &&
    parent.left === node &&
    parent.operatorToken.kind >= ts.SyntaxKind.FirstAssignment &&
    parent.operatorToken.kind <= ts.SyntaxKind.LastAssignment
  )
}

function globalTableText(expr: ts.Expression): string | undefined {
  if (ts.isIdentifier(expr) && (expr.text === "globalThis" || expr.text === "_G")) return expr.text
  return undefined
}

function collectTsReads(sf: ts.SourceFile, global: string, file: string): readonly DependentRef[] {
  const refs: DependentRef[] = []
  const visit = (node: ts.Node): undefined => {
    let table: string | undefined
    if (ts.isPropertyAccessExpression(node) && node.name.text === global) {
      table = globalTableText(node.expression)
    } else if (
      ts.isElementAccessExpression(node) &&
      ts.isStringLiteralLike(node.argumentExpression) &&
      node.argumentExpression.text === global
    ) {
      table = globalTableText(node.expression)
    }
    if (table !== undefined && !isAssignmentTarget(node)) {
      const { line, column } = posOf(sf, node)
      refs.push({ kind: "ts-global-read", file, line, column, detail: `${table}.${global}` })
    }
    ts.forEachChild(node, visit)
    return undefined
  }
  visit(sf)
  return refs
}

function collectLamBindings(
  sf: ts.SourceFile,
  global: string,
  symbols: AddonSymbols,
  file: string
): readonly DependentRef[] {
  const refs: DependentRef[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isCallExpression(node)) {
      const matched = matchRegistrationCallee(node.expression)
      if (matched !== undefined) {
        const nameArg = node.arguments[matched.viaCall ? 1 : 0]
        if (nameArg !== undefined) {
          const resolved = resolveNameArg(nameArg, symbols)
          if (resolved.kind === "exact" && resolved.value === global) {
            const { line, column } = posOf(sf, node)
            refs.push({
              kind: "lam-topology-binding",
              file,
              line,
              column,
              detail: `${matched.fn}("${global}")`,
            })
          }
        }
      }
    }
    ts.forEachChild(node, visit)
    return undefined
  }
  visit(sf)
  return refs
}

function stripXmlComments(source: string): string {
  return source.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
}

function collectXmlRefs(source: string, global: string, file: string): readonly DependentRef[] {
  const stripped = stripXmlComments(source)
  const escaped = global.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const re = new RegExp(`(?<![\\w$])${escaped}(?![\\w$])\\s*[.(]`, "g")
  const refs: DependentRef[] = []
  for (const match of stripped.matchAll(re)) {
    const index = match.index ?? 0
    const upto = stripped.slice(0, index)
    const line = upto.split("\n").length
    const lastNl = upto.lastIndexOf("\n")
    const column = index - lastNl
    refs.push({
      kind: "xml-handler-ref",
      file,
      line,
      column,
      detail: `${global}${match[0].slice(global.length).trimStart()}`,
    })
  }
  return refs
}

function sortDependents(a: DependentRef, b: DependentRef): number {
  if (a.file !== b.file) return a.file < b.file ? -1 : 1
  if (a.line !== b.line) return a.line - b.line
  if (a.column !== b.column) return a.column - b.column
  return a.kind < b.kind ? -1 : a.kind > b.kind ? 1 : 0
}

export function enumerateGlobalDependents(input: DependentScanInput): GlobalDependentReport {
  const parsed = input.files
    .filter((f) => f.lang === "ts")
    .map((f) => ({
      path: f.path,
      sf: ts.createSourceFile(f.path, f.source, ts.ScriptTarget.Latest, true),
    }))
  const symbols = buildSymbols(parsed.map((p) => p.sf))
  const dependents: DependentRef[] = []
  for (const p of parsed) {
    dependents.push(...collectTsReads(p.sf, input.global, p.path))
    dependents.push(...collectLamBindings(p.sf, input.global, symbols, p.path))
  }
  for (const f of input.files) {
    if (f.lang === "xml") dependents.push(...collectXmlRefs(f.source, input.global, f.path))
  }
  dependents.sort(sortDependents)
  return {
    global: input.global,
    dependents,
    verdict: dependents.length === 0 ? "rename-safe" : "keep-name-required",
  }
}
