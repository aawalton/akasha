import ts from "typescript"
import { dynamicImportSpecifier, unwrapParens } from "./parse-mock-module-helpers.ts"

export const collectSpecifierBindings = (sourceFile: ts.SourceFile): Map<string, Set<string>> => {
  const bindings = new Map<string, Set<string>>()
  const add = (specifier: string, name: string): undefined => {
    const set = bindings.get(specifier) ?? new Set<string>()
    set.add(name)
    bindings.set(specifier, set)
  }
  const visit = (node: ts.Node): undefined => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      const specifier = node.moduleSpecifier.text
      const clause = node.importClause
      if (clause !== undefined) {
        if (clause.name !== undefined) add(specifier, clause.name.text)
        const named = clause.namedBindings
        if (named !== undefined && ts.isNamespaceImport(named)) add(specifier, named.name.text)
      }
    }
    if (ts.isVariableDeclaration(node) && node.initializer !== undefined) {
      if (ts.isIdentifier(node.name)) {
        const specifier = dynamicImportSpecifier(node.initializer)
        if (specifier !== null) add(specifier, node.name.text)
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(sourceFile, visit)
  return bindings
}

export type CollectedFileDecls = {
  readonly constInits: ReadonlyMap<string, ts.Expression>
  readonly mutableInits: ReadonlyMap<string, ts.Expression>
  readonly afterAllResets: ReadonlyMap<string, ReadonlySet<string>>
}

export const collectFileDecls = (sourceFile: ts.SourceFile): CollectedFileDecls => {
  const constInits = new Map<string, ts.Expression>()
  const mutableInits = new Map<string, ts.Expression>()
  const afterAllResets = new Map<string, Set<string>>()
  const collectResets = (body: ts.Node): undefined => {
    const walk = (n: ts.Node): undefined => {
      if (
        ts.isBinaryExpression(n) &&
        n.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
        ts.isIdentifier(n.left) &&
        ts.isIdentifier(n.right)
      ) {
        const set = afterAllResets.get(n.left.text) ?? new Set<string>()
        set.add(n.right.text)
        afterAllResets.set(n.left.text, set)
      }
      ts.forEachChild(n, walk)
    }
    walk(body)
  }
  const visit = (node: ts.Node): undefined => {
    if (ts.isVariableDeclarationList(node)) {
      const target = (node.flags & ts.NodeFlags.Const) !== 0 ? constInits : mutableInits
      for (const decl of node.declarations) {
        if (ts.isIdentifier(decl.name) && decl.initializer !== undefined) {
          target.set(decl.name.text, decl.initializer)
        }
      }
    }
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "afterAll"
    ) {
      const callback = node.arguments[0]
      if (
        callback !== undefined &&
        (ts.isArrowFunction(callback) || ts.isFunctionExpression(callback))
      ) {
        collectResets(callback.body)
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(sourceFile, visit)
  return { constInits, mutableInits, afterAllResets }
}

const isDelegatingValue = (value: ts.Expression, bases: ReadonlySet<string>): boolean => {
  if (ts.isPropertyAccessExpression(value)) {
    return ts.isIdentifier(value.expression) && bases.has(value.expression.text)
  }
  if (ts.isIdentifier(value)) return bases.has(value.text)
  return false
}

export const delegationBases = (
  importBindings: ReadonlySet<string>,
  constInits: ReadonlyMap<string, ts.Expression>
): ReadonlySet<string> => {
  const bases = new Set(importBindings)
  let grew = true
  while (grew) {
    grew = false
    for (const [name, init] of constInits) {
      if (bases.has(name)) continue
      if (isDelegatingValue(init, bases)) {
        bases.add(name)
        grew = true
      }
    }
  }
  return bases
}

export const wrapperBindings = (
  bases: ReadonlySet<string>,
  decls: CollectedFileDecls
): ReadonlySet<string> => {
  const wrappers = new Set<string>()
  for (const [name, init] of decls.mutableInits) {
    if (!isDelegatingValue(init, bases)) continue
    const resets = decls.afterAllResets.get(name)
    if (resets === undefined) continue
    for (const target of resets) {
      if (bases.has(target)) {
        wrappers.add(name)
        break
      }
    }
  }
  return wrappers
}

export type DelegationContext = {
  readonly bases: ReadonlySet<string>
  readonly wrappers: ReadonlySet<string>
}

const singleCallCallee = (arrow: ts.ArrowFunction): string | null => {
  const body = arrow.body
  let expr: ts.Expression
  if (ts.isBlock(body)) {
    if (body.statements.length !== 1) return null
    const only = body.statements[0]
    if (only === undefined || !ts.isReturnStatement(only)) return null
    if (only.expression === undefined) return null
    expr = only.expression
  } else {
    expr = body
  }
  const inner = unwrapParens(expr)
  if (!ts.isCallExpression(inner)) return null
  if (!ts.isIdentifier(inner.expression)) return null
  return inner.expression.text
}

export const isFactoryDelegatingValue = (value: ts.Expression, ctx: DelegationContext): boolean => {
  if (isDelegatingValue(value, ctx.bases)) return true
  if (!ts.isArrowFunction(value)) return false
  const callee = singleCallCallee(value)
  return callee !== null && ctx.wrappers.has(callee)
}
