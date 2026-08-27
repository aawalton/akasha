import ts from "typescript"
import { resolveStringExpression, unwrapExpression } from "./ts-literals.ts"

export const returnedObjectLiteral = (body: ts.Block | undefined): ts.ObjectLiteralExpression | null => {
  if (body === undefined) return null
  let found: ts.ObjectLiteralExpression | null = null
  for (const statement of body.statements) {
    if (!ts.isReturnStatement(statement)) continue
    if (found !== null) return null
    const returned = statement.expression
    if (returned === undefined) return null
    const unwrapped = unwrapExpression(returned)
    if (!ts.isObjectLiteralExpression(unwrapped)) return null
    found = unwrapped
  }
  return found
}

export const parameterNamesOf = (
  parameters: ts.NodeArray<ts.ParameterDeclaration>
): readonly string[] | null => {
  const out: string[] = []
  for (const parameter of parameters) {
    if (!ts.isIdentifier(parameter.name)) return null
    out.push(parameter.name.text)
  }
  return out
}

export const calleeName = (call: ts.CallExpression): string | null => {
  const target = call.expression
  if (ts.isIdentifier(target)) return target.text
  if (!ts.isPropertyAccessExpression(target)) return null
  return ts.isIdentifier(target.expression)
    ? `${target.expression.text}.${target.name.text}`
    : target.name.text
}

export const shapeOf = (expr: ts.Expression): string => {
  if (ts.isIdentifier(expr)) return `the name ${expr.text}`
  if (ts.isCallExpression(expr)) {
    const name = calleeName(expr)
    return name === null ? "a call" : `a call to ${name}`
  }
  if (ts.isArrayLiteralExpression(expr)) return "an array literal"
  if (ts.isObjectLiteralExpression(expr)) return "an object literal"
  if (ts.isConditionalExpression(expr)) return "a conditional"
  if (ts.isSpreadElement(expr)) return "a spread"
  return "an expression this does not evaluate"
}

export type MappedList = {
  readonly parameterName: string
  readonly returned: ts.ObjectLiteralExpression
  readonly values: readonly string[]
}

export const arrowReturnedObjectLiteral = (
  arrow: ts.ArrowFunction
): ts.ObjectLiteralExpression | null => {
  if (ts.isBlock(arrow.body)) return returnedObjectLiteral(arrow.body)
  const unwrapped = unwrapExpression(arrow.body)
  return ts.isObjectLiteralExpression(unwrapped) ? unwrapped : null
}

export const readMappedList = (
  list: ts.Expression,
  arrayConsts: ReadonlyMap<string, ts.ArrayLiteralExpression>,
  stringConsts: ReadonlyMap<string, string>
): MappedList | { readonly unreadable: string } | null => {
  if (!ts.isCallExpression(list)) return null
  const target = list.expression
  if (!ts.isPropertyAccessExpression(target)) return null
  if (target.name.text !== "map") return null
  if (!ts.isIdentifier(target.expression)) return null
  const arrayName = target.expression.text
  const over = `a synthMulti whose manifest list maps over ${arrayName}`
  const array = arrayConsts.get(arrayName)
  if (array === undefined) {
    return { unreadable: `${over}, which is no top-level const array literal in this service` }
  }
  const argument = list.arguments[0]
  const arrow = argument === undefined ? undefined : unwrapExpression(argument)
  if (arrow === undefined || !ts.isArrowFunction(arrow)) {
    return { unreadable: `${over} with something other than an arrow function` }
  }
  const parameterNames = parameterNamesOf(arrow.parameters)
  const [parameterName] = parameterNames ?? []
  if (parameterNames === null || parameterNames.length !== 1 || parameterName === undefined) {
    return { unreadable: `${over} with an arrow this reads only as one taking a single named parameter` }
  }
  const returned = arrowReturnedObjectLiteral(arrow)
  if (returned === null) {
    return { unreadable: `${over} with an arrow that returns no object literal` }
  }
  const values: string[] = []
  for (const element of array.elements) {
    const value = resolveStringExpression(element, stringConsts)
    if (value === null) {
      return {
        unreadable: `${over}, which holds ${shapeOf(unwrapExpression(element))} this could not read as a string`,
      }
    }
    values.push(value)
  }
  return { parameterName, returned, values }
}
