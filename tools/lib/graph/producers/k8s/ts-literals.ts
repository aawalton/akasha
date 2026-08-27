import ts from "typescript"

export const unwrapExpression = (expr: ts.Expression): ts.Expression => {
  let current = expr
  while (
    ts.isAsExpression(current) ||
    ts.isSatisfiesExpression(current) ||
    ts.isParenthesizedExpression(current) ||
    ts.isTypeAssertionExpression(current)
  ) {
    current = current.expression
  }
  return current
}

export const collectTopLevelStringConsts = (sf: ts.SourceFile): ReadonlyMap<string, string> => {
  const out = new Map<string, string>()
  for (const stmt of sf.statements) {
    if (!ts.isVariableStatement(stmt)) continue
    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name)) continue
      const init = decl.initializer
      if (init === undefined) continue
      const unwrapped = unwrapExpression(init)
      if (ts.isStringLiteral(unwrapped) || ts.isNoSubstitutionTemplateLiteral(unwrapped)) {
        out.set(decl.name.text, unwrapped.text)
      }
    }
  }
  return out
}

export const collectTopLevelArrayConsts = (
  sf: ts.SourceFile
): ReadonlyMap<string, ts.ArrayLiteralExpression> => {
  const out = new Map<string, ts.ArrayLiteralExpression>()
  for (const stmt of sf.statements) {
    if (!ts.isVariableStatement(stmt)) continue
    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name)) continue
      const init = decl.initializer
      if (init === undefined) continue
      const unwrapped = unwrapExpression(init)
      if (ts.isArrayLiteralExpression(unwrapped)) out.set(decl.name.text, unwrapped)
    }
  }
  return out
}

export const collectTopLevelObjectConsts = (
  sf: ts.SourceFile
): ReadonlyMap<string, ts.ObjectLiteralExpression> => {
  const out = new Map<string, ts.ObjectLiteralExpression>()
  for (const stmt of sf.statements) {
    if (!ts.isVariableStatement(stmt)) continue
    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name)) continue
      const init = decl.initializer
      if (init === undefined) continue
      const unwrapped = unwrapExpression(init)
      if (ts.isObjectLiteralExpression(unwrapped)) out.set(decl.name.text, unwrapped)
    }
  }
  return out
}

type ScopeLookup = { readonly bound: true; readonly value: string | null } | { readonly bound: false }

const UNBOUND: ScopeLookup = { bound: false }

const stringConstAmong = (statements: ts.NodeArray<ts.Statement>, name: string): ScopeLookup => {
  for (const stmt of statements) {
    if (!ts.isVariableStatement(stmt)) continue
    for (const decl of stmt.declarationList.declarations) {
      if (!ts.isIdentifier(decl.name)) continue
      if (decl.name.text !== name) continue
      const init = decl.initializer
      if (init === undefined) return { bound: true, value: null }
      const unwrapped = unwrapExpression(init)
      const literal = ts.isStringLiteral(unwrapped) || ts.isNoSubstitutionTemplateLiteral(unwrapped)
      return { bound: true, value: literal ? unwrapped.text : null }
    }
  }
  return UNBOUND
}

const resolveInEnclosingScopes = (identifier: ts.Identifier): ScopeLookup => {
  let scope: ts.Node | undefined = identifier.parent
  while (scope !== undefined && !ts.isSourceFile(scope)) {
    if (ts.isBlock(scope) || ts.isModuleBlock(scope)) {
      const found = stringConstAmong(scope.statements, identifier.text)
      if (found.bound) return found
    }
    scope = scope.parent
  }
  return UNBOUND
}

export const resolveStringExpression = (
  expr: ts.Expression,
  topLevelStringConsts: ReadonlyMap<string, string>
): string | null => {
  const unwrapped = unwrapExpression(expr)
  if (ts.isStringLiteral(unwrapped) || ts.isNoSubstitutionTemplateLiteral(unwrapped)) {
    return unwrapped.text
  }
  if (ts.isIdentifier(unwrapped)) {
    const scoped = resolveInEnclosingScopes(unwrapped)
    if (scoped.bound) return scoped.value
    return topLevelStringConsts.get(unwrapped.text) ?? null
  }
  return null
}

export const findProperty = (
  obj: ts.ObjectLiteralExpression,
  key: string
): ts.Expression | null => {
  for (const prop of obj.properties) {
    if (ts.isShorthandPropertyAssignment(prop)) {
      if (prop.name.text === key) return prop.name
      continue
    }
    if (!ts.isPropertyAssignment(prop)) continue
    if (!ts.isIdentifier(prop.name) && !ts.isStringLiteral(prop.name)) continue
    if (prop.name.text !== key) continue
    return unwrapExpression(prop.initializer)
  }
  return null
}

export const readStringProperty = (
  obj: ts.ObjectLiteralExpression,
  key: string,
  topLevelStringConsts: ReadonlyMap<string, string>
): string | null => {
  const found = findProperty(obj, key)
  return found === null ? null : resolveStringExpression(found, topLevelStringConsts)
}

export const readObjectProperty = (
  obj: ts.ObjectLiteralExpression,
  key: string
): ts.ObjectLiteralExpression | null => {
  const found = findProperty(obj, key)
  return found !== null && ts.isObjectLiteralExpression(found) ? found : null
}
