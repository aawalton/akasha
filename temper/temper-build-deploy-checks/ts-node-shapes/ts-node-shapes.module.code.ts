import ts from "typescript"

export function isFunctionLike(
  node: ts.Node
): node is
  | ts.FunctionDeclaration
  | ts.FunctionExpression
  | ts.ArrowFunction
  | ts.MethodDeclaration {
  return (
    ts.isFunctionDeclaration(node) ||
    ts.isFunctionExpression(node) ||
    ts.isArrowFunction(node) ||
    ts.isMethodDeclaration(node)
  )
}

export function readFieldKey(expr: ts.Expression): string | undefined {
  if (ts.isPropertyAccessExpression(expr) && ts.isIdentifier(expr.expression)) {
    return `${expr.expression.text}.${expr.name.text}`
  }
  if (
    ts.isElementAccessExpression(expr) &&
    ts.isIdentifier(expr.expression) &&
    ts.isStringLiteralLike(expr.argumentExpression)
  ) {
    return `${expr.expression.text}.${expr.argumentExpression.text}`
  }
  return undefined
}

export function readMemberParts(
  expr: ts.Expression
): { objectName: string; fieldName: string } | undefined {
  if (ts.isPropertyAccessExpression(expr) && ts.isIdentifier(expr.expression)) {
    return { objectName: expr.expression.text, fieldName: expr.name.text }
  }
  if (
    ts.isElementAccessExpression(expr) &&
    ts.isIdentifier(expr.expression) &&
    ts.isStringLiteralLike(expr.argumentExpression)
  ) {
    return { objectName: expr.expression.text, fieldName: expr.argumentExpression.text }
  }
  return undefined
}

export function functionLikeName(fn: ts.Node): string | undefined {
  if (ts.isFunctionDeclaration(fn) && fn.name) return fn.name.text
  const parent = fn.parent
  if (parent && ts.isVariableDeclaration(parent) && ts.isIdentifier(parent.name)) {
    return parent.name.text
  }
  if (
    parent &&
    ts.isBinaryExpression(parent) &&
    parent.operatorToken.kind === ts.SyntaxKind.EqualsToken
  ) {
    const key = readFieldKey(parent.left)
    if (key !== undefined) return key.slice(key.indexOf(".") + 1)
    if (ts.isIdentifier(parent.left)) return parent.left.text
  }
  if (parent && ts.isPropertyAssignment(parent) && ts.isIdentifier(parent.name)) {
    return parent.name.text
  }
  return undefined
}

export function outermostEnclosingFunction(node: ts.Node): ts.Node | undefined {
  let p = node.parent
  let outer: ts.Node | undefined
  while (p) {
    if (isFunctionLike(p)) outer = p
    p = p.parent
  }
  return outer
}

export function enclosingStepName(node: ts.Node): string | undefined {
  const fn = outermostEnclosingFunction(node)
  if (fn === undefined) return undefined
  return functionLikeName(fn)
}

export function isInsideFunctionBody(node: ts.Node): boolean {
  return outermostEnclosingFunction(node) !== undefined
}

export function calleeName(call: ts.CallExpression): string | undefined {
  const e = call.expression
  if (ts.isIdentifier(e)) return e.text
  if (ts.isPropertyAccessExpression(e)) return e.name.text
  return undefined
}

export function firstStringArg(call: ts.CallExpression): string | undefined {
  const arg = call.arguments[0]
  if (arg !== undefined && ts.isStringLiteralLike(arg)) return arg.text
  return undefined
}
