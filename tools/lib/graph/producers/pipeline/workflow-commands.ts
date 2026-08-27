import ts from "typescript"
import { isFunctionLike, NESTING_CEILING, type Site, unwrap } from "./workflow-modules.ts"
import type { ArgumentMap, Scoped } from "./workflow-source.ts"

export const UNRESOLVED = "\u0000"

const CI_WORKSPACE_PROPERTY = "workspace"

const CI_WORKSPACE_VARIABLE = "$WORKSPACE"

const NONE: ArgumentMap = new Map()

export type CommandReaderParts = {
  readonly resolveString: (
    expr: ts.Expression,
    path: string,
    args: ArgumentMap,
    depth: number
  ) => string | null
  readonly resolveInScope: (
    expr: ts.Expression,
    path: string,
    args: ArgumentMap,
    depth: number
  ) => Scoped | null
  readonly callReturns: (
    call: ts.CallExpression,
    path: string,
    args: ArgumentMap,
    depth: number
  ) => Scoped | null
  readonly resolveArray: (
    expr: ts.Expression,
    path: string,
    args: ArgumentMap,
    depth: number
  ) => Scoped | null
  readonly returnedExpression: (fn: ts.Node, path: string) => Site | null
}

export const createCommandReader = (parts: CommandReaderParts) => {
  const looseString = (
    expr: ts.Expression,
    path: string,
    args: ArgumentMap,
    depth: number
  ): string => {
    if (depth > NESTING_CEILING) return UNRESOLVED
    const whole = parts.resolveString(expr, path, args, depth)
    if (whole !== null) return whole
    const node = unwrap(expr)
    if (ts.isPropertyAccessExpression(node) && node.name.text === CI_WORKSPACE_PROPERTY) {
      return CI_WORKSPACE_VARIABLE
    }
    const scoped = parts.resolveInScope(node, path, args, depth)
    if (scoped === null) return UNRESOLVED
    const { site, args: scope } = scoped
    if (ts.isTemplateExpression(site.node)) {
      let out = site.node.head.text
      for (const span of site.node.templateSpans) {
        out += looseString(span.expression, site.path, scope, depth + 1) + span.literal.text
      }
      return out
    }
    if (ts.isCallExpression(site.node)) {
      const returned = parts.callReturns(site.node, site.path, scope, depth + 1)
      if (returned === null) return UNRESOLVED
      return looseString(
        returned.site.node as ts.Expression,
        returned.site.path,
        returned.args,
        depth + 1
      )
    }
    if (
      ts.isBinaryExpression(site.node) &&
      site.node.operatorToken.kind === ts.SyntaxKind.PlusToken
    ) {
      return (
        looseString(site.node.left, site.path, scope, depth + 1) +
        looseString(site.node.right, site.path, scope, depth + 1)
      )
    }
    return UNRESOLVED
  }

  const resolveCommands = (
    expr: ts.Expression,
    path: string,
    args: ArgumentMap = NONE,
    depth = 0
  ): readonly string[] | null => {
    if (depth > NESTING_CEILING) return null
    const scoped = parts.resolveInScope(expr, path, args, depth)
    if (scoped === null) return null
    if (isFunctionLike(scoped.site.node)) {
      const returned = parts.returnedExpression(scoped.site.node, scoped.site.path)
      if (returned === null) return null
      return resolveCommands(returned.node as ts.Expression, returned.path, scoped.args, depth + 1)
    }
    const array = parts.resolveArray(expr, path, args, depth)
    if (array === null) return null
    const out: string[] = []
    for (const element of (array.site.node as ts.ArrayLiteralExpression).elements) {
      if (ts.isSpreadElement(element)) {
        const nested = resolveCommands(element.expression, array.site.path, array.args, depth + 1)
        if (nested !== null) out.push(...nested)
        continue
      }
      out.push(looseString(element, array.site.path, array.args, depth + 1))
    }
    return out
  }

  return { resolveCommands }
}
