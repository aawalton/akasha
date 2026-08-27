import ts from "typescript"
import { calleeName, isFunctionLike } from "./ts-node-shapes"

const ADDON_LOADED_EVENT = "EVENT_ADD_ON_LOADED"

const REGISTER_FOR_EVENT = "RegisterForEvent"

export function performsLoadRegistration(sf: ts.SourceFile): boolean {
  let found = false
  const visit = (node: ts.Node): undefined => {
    if (found) return
    if (ts.isCallExpression(node) && calleeName(node) === REGISTER_FOR_EVENT) {
      for (const arg of node.arguments) {
        if (ts.isIdentifier(arg) && arg.text === ADDON_LOADED_EVENT) {
          found = true
          return
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return found
}

function valueImportSpecifiers(sf: ts.SourceFile): ReadonlyMap<string, string> {
  const out = new Map<string, string>()
  for (const statement of sf.statements) {
    if (!ts.isImportDeclaration(statement)) continue
    const clause = statement.importClause
    if (clause === undefined || clause.isTypeOnly) continue
    if (!ts.isStringLiteralLike(statement.moduleSpecifier)) continue
    const specifier = statement.moduleSpecifier.text
    if (clause.name !== undefined) out.set(clause.name.text, specifier)
    const bindings = clause.namedBindings
    if (bindings === undefined) continue
    if (ts.isNamespaceImport(bindings)) {
      out.set(bindings.name.text, specifier)
      continue
    }
    for (const element of bindings.elements) {
      if (!element.isTypeOnly) out.set(element.name.text, specifier)
    }
  }
  return out
}

function calledNames(sf: ts.SourceFile, moduleTopOnly: boolean): ReadonlySet<string> {
  const out = new Set<string>()
  const visit = (node: ts.Node): undefined => {
    if (moduleTopOnly && (isFunctionLike(node) || ts.isClassDeclaration(node))) return
    if (ts.isCallExpression(node)) {
      const name = calleeName(node)
      if (name !== undefined) out.add(name)
      const callee = node.expression
      if (ts.isPropertyAccessExpression(callee) && ts.isIdentifier(callee.expression)) {
        out.add(callee.expression.text)
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return out
}

export function calledImports(sf: ts.SourceFile): ReadonlyMap<string, string> {
  return filterToCalled(valueImportSpecifiers(sf), calledNames(sf, false))
}

export function moduleTopCalledImports(sf: ts.SourceFile): ReadonlyMap<string, string> {
  return filterToCalled(valueImportSpecifiers(sf), calledNames(sf, true))
}

function filterToCalled(
  imports: ReadonlyMap<string, string>,
  called: ReadonlySet<string>
): ReadonlyMap<string, string> {
  const out = new Map<string, string>()
  for (const [name, specifier] of imports) {
    if (called.has(name)) out.set(name, specifier)
  }
  return out
}
