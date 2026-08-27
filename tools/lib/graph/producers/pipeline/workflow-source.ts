import ts from "typescript"
import { createCommandReader } from "./workflow-commands.ts"
import {
  createModuleReader,
  isFunctionLike,
  type ModuleReader,
  NESTING_CEILING,
  nameOfProperty,
  type Site,
  type SourceTree,
  unwrap,
} from "./workflow-modules.ts"

export type ArgumentMap = ReadonlyMap<string, Field>

export type Field = {
  readonly expr: ts.Expression
  readonly path: string
  readonly args?: ArgumentMap
}

export type Fields = { readonly get: (key: string) => Field | null }

export type Scoped = { readonly site: Site; readonly args: ArgumentMap }

export const NO_ARGUMENTS: ArgumentMap = new Map()

export const FIELD_KEYS: readonly string[] = [
  "alwaysRun",
  "branch",
  "commands",
  "dependsOn",
  "disabled",
  "image",
  "kind",
  "name",
  "package",
  "script",
  "steps",
  "dispatchNodes",
  "dispatchNodeTypes",
  "when",
]

export type SourceReader = ReturnType<typeof createSourceReader>

export const createSourceReader = (tree: SourceTree) => {
  const modules: ModuleReader = createModuleReader(tree)
  const { sourceFile, resolveLocal } = modules

  const propertyOf = (obj: ts.ObjectLiteralExpression, key: string): ts.Expression | null => {
    for (const property of obj.properties) {
      if (!ts.isPropertyAssignment(property)) continue
      if (nameOfProperty(property.name) !== key) continue
      return property.initializer
    }
    return null
  }

  const resolveValue = (
    expr: ts.Expression,
    path: string,
    args: ArgumentMap = NO_ARGUMENTS,
    depth = 0
  ): Site | null => {
    if (depth > NESTING_CEILING) return null
    const node = unwrap(expr)
    if (ts.isIdentifier(node)) {
      const bound = args.get(node.text)
      if (bound !== undefined) {
        return resolveValue(bound.expr, bound.path, bound.args ?? NO_ARGUMENTS, depth + 1)
      }
      const site = resolveLocal(path, node.text)
      if (site === null) return null
      if (isFunctionLike(site.node)) return site
      return resolveValue(site.node as ts.Expression, site.path, NO_ARGUMENTS, depth + 1)
    }
    if (ts.isPropertyAccessExpression(node)) {
      const owner = resolveValue(node.expression, path, args, depth + 1)
      if (owner === null || !ts.isObjectLiteralExpression(owner.node)) return null
      const hit = propertyOf(owner.node, node.name.text)
      return hit === null ? null : resolveValue(hit, owner.path, NO_ARGUMENTS, depth + 1)
    }
    return { path, node }
  }

  const resolveInScope = (
    expr: ts.Expression,
    path: string,
    args: ArgumentMap = NO_ARGUMENTS,
    depth = 0
  ): Scoped | null => {
    const node = unwrap(expr)
    const site = resolveValue(node, path, args, depth)
    if (site === null) return null
    return { site, args: site.node === node ? args : NO_ARGUMENTS }
  }

  const returnedExpression = (fn: ts.Node, path: string): Site | null => {
    const body = isFunctionLike(fn)
      ? (fn as ts.FunctionDeclaration | ts.FunctionExpression | ts.ArrowFunction).body
      : undefined
    if (body === undefined) return null
    if (!ts.isBlock(body)) return { path, node: unwrap(body) }
    let found: Site | null = null
    const visit = (node: ts.Node): undefined => {
      if (found !== null) return
      if (isFunctionLike(node)) return
      if (ts.isReturnStatement(node) && node.expression !== undefined) {
        found = { path, node: unwrap(node.expression) }
        return
      }
      ts.forEachChild(node, visit)
    }
    ts.forEachChild(body, visit)
    return found
  }

  const argumentField = (expr: ts.Expression, path: string, outer: ArgumentMap): Field => {
    const node = unwrap(expr)
    if (ts.isIdentifier(node)) {
      const bound = outer.get(node.text)
      if (bound !== undefined) return bound
    }
    return { expr: node, path, args: outer }
  }

  const mapArguments = (
    fn: ts.Node,
    call: ts.CallExpression,
    path: string,
    outer: ArgumentMap
  ): ArgumentMap => {
    const argumentMap = new Map<string, Field>()
    if (!isFunctionLike(fn)) return argumentMap
    const parameters = (fn as ts.FunctionDeclaration).parameters
    parameters.forEach((parameter, index) => {
      if (!ts.isIdentifier(parameter.name)) return
      const argument = call.arguments[index]
      if (argument === undefined) return
      argumentMap.set(parameter.name.text, argumentField(argument, path, outer))
    })
    return argumentMap
  }

  const callReturns = (
    call: ts.CallExpression,
    path: string,
    args: ArgumentMap = NO_ARGUMENTS,
    depth = 0
  ): Scoped | null => {
    if (depth > NESTING_CEILING) return null
    const callee = resolveValue(call.expression, path, args, depth)
    if (callee === null || !isFunctionLike(callee.node)) return null
    const returned = returnedExpression(callee.node, callee.path)
    if (returned === null) return null
    return { site: returned, args: mapArguments(callee.node, call, path, args) }
  }

  const resolveString = (
    expr: ts.Expression,
    path: string,
    args: ArgumentMap = NO_ARGUMENTS,
    depth = 0
  ): string | null => {
    if (depth > NESTING_CEILING) return null
    const scoped = resolveInScope(expr, path, args, depth)
    if (scoped === null) return null
    const { site, args: scope } = scoped
    const node = site.node
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
    if (ts.isTemplateExpression(node)) {
      let out = node.head.text
      for (const span of node.templateSpans) {
        const piece = resolveString(span.expression, site.path, scope, depth + 1)
        if (piece === null) return null
        out += piece + span.literal.text
      }
      return out
    }
    if (ts.isCallExpression(node)) {
      const returned = callReturns(node, site.path, scope, depth + 1)
      if (returned === null) return null
      return resolveString(
        returned.site.node as ts.Expression,
        returned.site.path,
        returned.args,
        depth + 1
      )
    }
    if (ts.isBinaryExpression(node)) {
      const operator = node.operatorToken.kind
      if (operator === ts.SyntaxKind.PlusToken) {
        const left = resolveString(node.left, site.path, scope, depth + 1)
        const right = resolveString(node.right, site.path, scope, depth + 1)
        return left === null || right === null ? null : left + right
      }
      if (
        operator === ts.SyntaxKind.QuestionQuestionToken ||
        operator === ts.SyntaxKind.BarBarToken
      ) {
        return resolveString(node.right, site.path, scope, depth + 1)
      }
    }
    return null
  }

  const resolveBoolean = (
    expr: ts.Expression,
    path: string,
    args: ArgumentMap = NO_ARGUMENTS
  ): boolean | null => {
    const site = resolveValue(expr, path, args)
    if (site === null) return null
    if (site.node.kind === ts.SyntaxKind.TrueKeyword) return true
    if (site.node.kind === ts.SyntaxKind.FalseKeyword) return false
    return null
  }

  const resolveArray = (
    expr: ts.Expression,
    path: string,
    args: ArgumentMap = NO_ARGUMENTS,
    depth = 0
  ): Scoped | null => {
    if (depth > NESTING_CEILING) return null
    const scoped = resolveInScope(expr, path, args, depth)
    if (scoped === null) return null
    if (ts.isArrayLiteralExpression(scoped.site.node)) return scoped
    if (!ts.isCallExpression(scoped.site.node)) return null
    const returned = callReturns(scoped.site.node, scoped.site.path, scoped.args, depth + 1)
    if (returned === null) return null
    return resolveArray(
      returned.site.node as ts.Expression,
      returned.site.path,
      returned.args,
      depth + 1
    )
  }

  const resolveStringArray = (
    expr: ts.Expression,
    path: string,
    args: ArgumentMap = NO_ARGUMENTS,
    depth = 0
  ): readonly string[] | null => {
    if (depth > NESTING_CEILING) return null
    const scoped = resolveArray(expr, path, args, depth)
    if (scoped === null) return null
    const { site, args: scope } = scoped
    const out: string[] = []
    for (const element of (site.node as ts.ArrayLiteralExpression).elements) {
      if (ts.isSpreadElement(element)) {
        const nested = resolveStringArray(element.expression, site.path, scope, depth + 1)
        if (nested === null) return null
        out.push(...nested)
        continue
      }
      const value = resolveString(element, site.path, scope, depth + 1)
      if (value === null) return null
      out.push(value)
    }
    return out
  }

  const { resolveCommands } = createCommandReader({
    resolveString,
    resolveInScope,
    callReturns,
    resolveArray,
    returnedExpression,
  })

  const mergeFields = (base: Fields | null, over: Fields | null): Fields => ({
    get: (key) => over?.get(key) ?? base?.get(key) ?? null,
  })

  const objectFields = (
    obj: ts.ObjectLiteralExpression,
    path: string,
    argumentMap: ArgumentMap,
    depth: number
  ): Fields => {
    const map = new Map<string, Field>()
    if (depth <= NESTING_CEILING) {
      for (const property of obj.properties) {
        if (ts.isSpreadAssignment(property)) {
          const source = argumentField(property.expression, path, argumentMap)
          const nested = declaredFields(
            source.expr,
            source.path,
            source.args ?? NO_ARGUMENTS,
            depth + 1
          )
          if (nested === null) continue
          for (const key of FIELD_KEYS) {
            const hit = nested.get(key)
            if (hit !== null) map.set(key, hit)
          }
          continue
        }
        if (ts.isPropertyAssignment(property)) {
          const key = nameOfProperty(property.name)
          if (key === null) continue
          map.set(key, { expr: property.initializer, path, args: argumentMap })
          continue
        }
        if (ts.isShorthandPropertyAssignment(property)) {
          const bound = argumentMap.get(property.name.text)
          if (bound !== undefined) map.set(property.name.text, bound)
        }
      }
    }
    return { get: (key) => map.get(key) ?? null }
  }

  const callFields = (
    call: ts.CallExpression,
    path: string,
    outer: ArgumentMap,
    depth: number
  ): Fields | null => {
    if (depth > NESTING_CEILING) return null
    const callee = resolveValue(call.expression, path, outer)
    if (callee === null || !isFunctionLike(callee.node)) return null
    const argumentMap = mapArguments(callee.node, call, path, outer)
    const returned = returnedExpression(callee.node, callee.path)
    let base: Fields | null = null
    if (returned !== null) {
      const node = returned.node
      if (ts.isObjectLiteralExpression(node)) {
        base = objectFields(node, returned.path, argumentMap, depth + 1)
      } else if (ts.isCallExpression(node)) {
        base = callFields(node, returned.path, argumentMap, depth + 1)
      } else if (ts.isIdentifier(node)) {
        const bound = argumentMap.get(node.text)
        if (bound !== undefined) {
          base = declaredFields(bound.expr, bound.path, bound.args ?? NO_ARGUMENTS, depth + 1)
        }
      }
    }
    let configured: Fields | null = null
    for (let index = call.arguments.length - 1; index >= 0; index -= 1) {
      const argument = call.arguments[index]
      if (argument === undefined) continue
      const field = argumentField(argument, path, outer)
      const node = unwrap(field.expr)
      if (!ts.isObjectLiteralExpression(node)) continue
      configured = objectFields(node, field.path, field.args ?? NO_ARGUMENTS, depth + 1)
      break
    }
    if (base === null && configured === null) return null
    return mergeFields(base, configured)
  }

  const declaredFields = (
    expr: ts.Expression,
    path: string,
    args: ArgumentMap = NO_ARGUMENTS,
    depth = 0
  ): Fields | null => {
    if (depth > NESTING_CEILING) return null
    const node = unwrap(expr)
    if (ts.isObjectLiteralExpression(node)) return objectFields(node, path, args, depth)
    if (ts.isCallExpression(node)) return callFields(node, path, args, depth)
    const scoped = resolveInScope(node, path, args, depth)
    if (scoped === null) return null
    if (ts.isObjectLiteralExpression(scoped.site.node)) {
      return objectFields(scoped.site.node, scoped.site.path, scoped.args, depth)
    }
    if (ts.isCallExpression(scoped.site.node)) {
      return callFields(scoped.site.node, scoped.site.path, scoped.args, depth)
    }
    return null
  }

  const shapeReturnedBy = (call: ts.CallExpression, path: string): Site | null => {
    const callee = resolveValue(call.expression, path)
    if (callee === null || !isFunctionLike(callee.node)) return null
    let returned = returnedExpression(callee.node, callee.path)
    for (let hop = 0; hop < 4 && returned !== null; hop += 1) {
      if (ts.isObjectLiteralExpression(returned.node)) return returned
      if (!ts.isCallExpression(returned.node)) return null
      const inner = resolveValue(returned.node.expression, returned.path)
      if (inner === null || !isFunctionLike(inner.node)) return null
      returned = returnedExpression(inner.node, inner.path)
    }
    return null
  }

  const declaresKeys = (obj: ts.ObjectLiteralExpression, keys: readonly string[]): boolean => {
    const present = new Set<string>()
    for (const property of obj.properties) {
      if (ts.isPropertyAssignment(property)) {
        const key = nameOfProperty(property.name)
        if (key !== null) present.add(key)
        continue
      }
      if (ts.isShorthandPropertyAssignment(property)) present.add(property.name.text)
    }
    return keys.every((key) => present.has(key))
  }

  return {
    sourceFile,
    resolveValue,
    resolveString,
    resolveBoolean,
    resolveStringArray,
    resolveCommands,
    resolveArray,
    callReturns,
    propertyOf,
    declaredFields,
    returnedExpression,
    shapeReturnedBy,
    declaresKeys,
  }
}