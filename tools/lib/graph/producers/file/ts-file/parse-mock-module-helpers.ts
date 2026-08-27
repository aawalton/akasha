import ts from "typescript"

export const lineOf = (sourceFile: ts.SourceFile, pos: number): number =>
  sourceFile.getLineAndCharacterOfPosition(pos).line + 1

export const isMockModuleCall = (node: ts.CallExpression): boolean => {
  const expr = node.expression
  if (!ts.isPropertyAccessExpression(expr)) return false
  if (!ts.isIdentifier(expr.expression)) return false
  if (expr.expression.text !== "mock") return false
  if (!ts.isIdentifier(expr.name)) return false
  return expr.name.text === "module"
}

export const literalSpecifier = (node: ts.Expression): string | null => {
  if (ts.isStringLiteral(node)) return node.text
  if (ts.isNoSubstitutionTemplateLiteral(node)) return node.text
  return null
}

const SPECIFIER_TEXT_LIMIT = 80

export const specifierSourceText = (node: ts.Expression, sourceFile: ts.SourceFile): string => {
  const collapsed = node.getText(sourceFile).replace(/\s+/g, " ").trim()
  return collapsed.length <= SPECIFIER_TEXT_LIMIT
    ? collapsed
    : `${collapsed.slice(0, SPECIFIER_TEXT_LIMIT)}…`
}

export const unwrapParens = (node: ts.Expression): ts.Expression => {
  let cur = node
  while (ts.isParenthesizedExpression(cur)) cur = cur.expression
  return cur
}

export const objectLiteralBody = (arrow: ts.ArrowFunction): ts.ObjectLiteralExpression | null => {
  const body = arrow.body
  if (ts.isBlock(body)) {
    if (body.statements.length !== 1) return null
    const only = body.statements[0]
    if (only === undefined || !ts.isReturnStatement(only)) return null
    if (only.expression === undefined) return null
    const inner = unwrapParens(only.expression)
    if (!ts.isObjectLiteralExpression(inner)) return null
    return inner
  }
  const inner = unwrapParens(body)
  if (ts.isObjectLiteralExpression(inner)) return inner
  return null
}

export const dynamicImportSpecifier = (expr: ts.Expression): string | null => {
  const inner = ts.isAwaitExpression(expr) ? expr.expression : expr
  if (!ts.isCallExpression(inner)) return null
  if (inner.expression.kind !== ts.SyntaxKind.ImportKeyword) return null
  const arg = inner.arguments[0]
  return arg === undefined ? null : literalSpecifier(arg)
}
