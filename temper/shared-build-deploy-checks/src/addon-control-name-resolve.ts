import ts from "typescript"

export type ResolvedName =
  | { readonly kind: "exact"; readonly value: string }
  | { readonly kind: "unresolved" }

export interface AddonSymbols {
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

export function buildSymbols(sourceFiles: readonly ts.SourceFile[]): AddonSymbols {
  const consts = new Map<string, string>()
  const ambiguousConsts = new Set<string>()
  const objectProps = new Map<string, Map<string, string>>()
  for (const sf of sourceFiles) {
    collectSymbolsFromFile(sf, consts, ambiguousConsts, objectProps)
  }
  for (const name of ambiguousConsts) consts.delete(name)
  return { consts, objectProps }
}

export function resolveNameArg(arg: ts.Expression, symbols: AddonSymbols): ResolvedName {
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
