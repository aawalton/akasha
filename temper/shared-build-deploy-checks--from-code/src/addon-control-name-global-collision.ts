import ts from "typescript"
import { type AddonSymbols, buildSymbols, resolveNameArg } from "./addon-control-name-resolve"
import type { ParsedAddonSource } from "./addon-global-ownership"

const REGISTRATION_NAME_ARG: ReadonlyMap<string, number> = new Map([
  ["RegisterAddonPanel", 0],
  ["CreateControl", 0],
  ["CreateTopLevelWindow", 0],
  ["CreateControlFromVirtual", 0],
  ["registerPanel", 1],
])

function isYieldCall(callee: ts.Expression): boolean {
  return (
    ts.isPropertyAccessExpression(callee) &&
    callee.name.text === "yield" &&
    ts.isIdentifier(callee.expression) &&
    callee.expression.text === "coroutine"
  )
}

export type AddonSourceFile = ParsedAddonSource

export interface AddonCollisionInput {
  readonly addonName: string
  readonly protectedGlobals: readonly string[]
  readonly files: readonly AddonSourceFile[]
}

export interface CollisionFinding {
  readonly addonName: string
  readonly name: string
  readonly global: string
  readonly fn: string
  readonly file: string
  readonly line: number
  readonly column: number
}

interface StatementSite {
  readonly statements: readonly ts.Statement[]
  readonly index: number
  readonly enclosingFn: string | undefined
}

type RestoreOutcome = "restored" | "boundary" | "escaped"

function matchRegistrationCallee(
  callee: ts.Expression
): { readonly fn: string; readonly nameArgIndex: number } | undefined {
  if (ts.isIdentifier(callee)) {
    const index = REGISTRATION_NAME_ARG.get(callee.text)
    if (index !== undefined) return { fn: callee.text, nameArgIndex: index }
  }
  if (ts.isPropertyAccessExpression(callee)) {
    const index = REGISTRATION_NAME_ARG.get(callee.name.text)
    if (index !== undefined) return { fn: callee.name.text, nameArgIndex: index }
    if (callee.name.text === "call" && ts.isPropertyAccessExpression(callee.expression)) {
      const inner = callee.expression.name.text
      const shifted = REGISTRATION_NAME_ARG.get(inner)
      if (shifted !== undefined) return { fn: inner, nameArgIndex: shifted + 1 }
    }
  }
  return undefined
}

function calleeName(callee: ts.Expression): string | undefined {
  if (ts.isIdentifier(callee)) return callee.text
  if (ts.isPropertyAccessExpression(callee)) return callee.name.text
  return undefined
}

function functionLikeName(node: ts.Node): string | undefined {
  if (ts.isFunctionDeclaration(node)) return node.name?.text
  if (ts.isFunctionExpression(node) || ts.isArrowFunction(node)) {
    const parent = node.parent
    if (parent !== undefined && ts.isVariableDeclaration(parent) && ts.isIdentifier(parent.name)) {
      return parent.name.text
    }
    if (ts.isFunctionExpression(node)) return node.name?.text
  }
  return undefined
}

function enclosingStatementSite(node: ts.Node): StatementSite | undefined {
  let current: ts.Node = node
  while (current.parent !== undefined) {
    const parent = current.parent
    if ((ts.isBlock(parent) || ts.isSourceFile(parent)) && ts.isStatement(current)) {
      const statements = parent.statements
      const index = statements.indexOf(current)
      if (index >= 0) return { statements, index, enclosingFn: enclosingFunctionName(node) }
    }
    current = parent
  }
  return undefined
}

function enclosingFunctionName(node: ts.Node): string | undefined {
  let current: ts.Node | undefined = node.parent
  while (current !== undefined) {
    if (
      ts.isFunctionDeclaration(current) ||
      ts.isFunctionExpression(current) ||
      ts.isArrowFunction(current)
    ) {
      return functionLikeName(current)
    }
    current = current.parent
  }
  return undefined
}

function buildCallerIndex(files: readonly AddonSourceFile[]): ReadonlyMap<string, StatementSite[]> {
  const index = new Map<string, StatementSite[]>()
  for (const file of files) {
    const visit = (node: ts.Node): undefined => {
      if (ts.isCallExpression(node)) {
        const name = calleeName(node.expression)
        if (name !== undefined) {
          const site = enclosingStatementSite(node)
          if (site !== undefined) {
            const sites = index.get(name) ?? []
            sites.push(site)
            index.set(name, sites)
          }
        }
      }
      ts.forEachChild(node, visit)
      return undefined
    }
    visit(file.sf)
  }
  return index
}

function isYieldBoundary(stmt: ts.Statement): boolean {
  let found = false
  const visit = (node: ts.Node): undefined => {
    if (found) return undefined
    if (ts.isCallExpression(node) && isYieldCall(node.expression)) found = true
    ts.forEachChild(node, visit)
    return undefined
  }
  visit(stmt)
  return found
}

function isGlobalTarget(expr: ts.Expression, g: string): boolean {
  if (ts.isIdentifier(expr)) return expr.text === g
  if (ts.isPropertyAccessExpression(expr) && ts.isIdentifier(expr.expression)) {
    return (
      (expr.expression.text === "globalThis" || expr.expression.text === "_G") &&
      expr.name.text === g
    )
  }
  return false
}

function isDirectRestore(stmt: ts.Statement, g: string): boolean {
  if (!ts.isExpressionStatement(stmt)) return false
  const expr = stmt.expression
  if (!ts.isBinaryExpression(expr)) return false
  if (expr.operatorToken.kind !== ts.SyntaxKind.EqualsToken) return false
  return isGlobalTarget(expr.left, g)
}

function traceRestore(
  site: StatementSite,
  g: string,
  callerIndex: ReadonlyMap<string, StatementSite[]>,
  depth: number,
  visited: Set<string>
): RestoreOutcome {
  for (let i = site.index + 1; i < site.statements.length; i++) {
    const stmt = site.statements[i]
    if (stmt === undefined) continue
    if (isYieldBoundary(stmt)) return "boundary"
    if (isDirectRestore(stmt, g)) return "restored"
  }
  const fn = site.enclosingFn
  if (fn === undefined || depth <= 0) return "escaped"
  const callers = callerIndex.get(fn)
  if (callers === undefined || callers.length === 0) return "escaped"
  let allRestored = true
  for (const caller of callers) {
    const key = `${fn}@${caller.enclosingFn ?? "<module>"}#${caller.index}`
    if (visited.has(key)) continue
    visited.add(key)
    if (traceRestore(caller, g, callerIndex, depth - 1, visited) !== "restored") {
      allRestored = false
    }
  }
  return allRestored ? "restored" : "escaped"
}

const MAX_RESTORE_DEPTH = 4

function isMitigated(
  regNode: ts.Node,
  g: string,
  callerIndex: ReadonlyMap<string, StatementSite[]>
): boolean {
  const site = enclosingStatementSite(regNode)
  if (site === undefined) return false
  return traceRestore(site, g, callerIndex, MAX_RESTORE_DEPTH, new Set<string>()) === "restored"
}

function collectFindingsFromFile(
  file: AddonSourceFile,
  addonName: string,
  protectedGlobals: ReadonlySet<string>,
  symbols: AddonSymbols,
  callerIndex: ReadonlyMap<string, StatementSite[]>
): readonly CollisionFinding[] {
  const found: CollisionFinding[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isCallExpression(node)) {
      const match = matchRegistrationCallee(node.expression)
      if (match !== undefined) {
        const nameArg = node.arguments[match.nameArgIndex]
        if (nameArg !== undefined) {
          const resolved = resolveNameArg(nameArg, symbols)
          if (
            resolved.kind === "exact" &&
            protectedGlobals.has(resolved.value) &&
            !isMitigated(node, resolved.value, callerIndex)
          ) {
            const pos = file.sf.getLineAndCharacterOfPosition(node.getStart(file.sf))
            found.push({
              addonName,
              name: resolved.value,
              global: resolved.value,
              fn: match.fn,
              file: file.path,
              line: pos.line + 1,
              column: pos.character + 1,
            })
          }
        }
      }
    }
    ts.forEachChild(node, visit)
    return undefined
  }
  visit(file.sf)
  return found
}

export function findControlNameGlobalCollisions(
  input: AddonCollisionInput
): readonly CollisionFinding[] {
  const protectedGlobals = new Set(input.protectedGlobals)
  if (protectedGlobals.size === 0) return []
  const parsed: readonly AddonSourceFile[] = input.files
  const symbols = buildSymbols(parsed.map((file) => file.sf))
  const callerIndex = buildCallerIndex(parsed)
  const findings: CollisionFinding[] = []
  for (const file of parsed) {
    findings.push(
      ...collectFindingsFromFile(file, input.addonName, protectedGlobals, symbols, callerIndex)
    )
  }
  findings.sort((a, b) => {
    const byFile = a.file.localeCompare(b.file)
    if (byFile !== 0) return byFile
    if (a.line !== b.line) return a.line - b.line
    return a.name.localeCompare(b.name)
  })
  return findings
}
