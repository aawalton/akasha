import ts from "typescript"
import type { DiscoveredRbacProfile, RuleAttrs } from "./rbac-types.ts"
import {
  collectTopLevelStringConsts,
  findProperty,
  resolveStringExpression,
  unwrapExpression,
} from "./ts-literals.ts"

export type RbacExtraction = {
  readonly profiles: readonly DiscoveredRbacProfile[]
  readonly unreadable: string | null
}

type Read<T> = { readonly value: T; readonly unreadable?: never } | { readonly unreadable: string }

const PROFILES_EXPORT = "profiles"

type Candidate = { readonly what: string; readonly expr: ts.Expression }

const exportModified = (stmt: ts.Statement): boolean =>
  ts.canHaveModifiers(stmt) &&
  (ts.getModifiers(stmt) ?? []).some((m) => m.kind === ts.SyntaxKind.ExportKeyword)

const findProfilesExport = (sf: ts.SourceFile): Read<Candidate | null> => {
  let fallback: Candidate | null = null
  for (const stmt of sf.statements) {
    if (ts.isVariableStatement(stmt) && exportModified(stmt)) {
      for (const decl of stmt.declarationList.declarations) {
        if (!ts.isIdentifier(decl.name) || decl.name.text !== PROFILES_EXPORT) continue
        if (decl.initializer === undefined) {
          return { unreadable: "`profiles` is exported with no value" }
        }
        return { value: { what: "the `profiles` export", expr: unwrapExpression(decl.initializer) } }
      }
      continue
    }
    if (ts.isExportAssignment(stmt) && stmt.isExportEquals !== true) {
      fallback = { what: "the default export", expr: unwrapExpression(stmt.expression) }
      continue
    }
    if (ts.isExportDeclaration(stmt)) {
      const clause = stmt.exportClause
      if (clause === undefined || !ts.isNamedExports(clause)) continue
      for (const element of clause.elements) {
        if (element.name.text !== PROFILES_EXPORT) continue
        return {
          unreadable: "`profiles` is exported from a name declared elsewhere",
        }
      }
    }
  }
  return { value: fallback }
}

const readStringArray = (
  expr: ts.Expression,
  consts: ReadonlyMap<string, string>
): readonly string[] | null => {
  if (!ts.isArrayLiteralExpression(expr)) return null
  const out: string[] = []
  for (const element of expr.elements) {
    const value = resolveStringExpression(element, consts)
    if (value === null) return null
    out.push(value)
  }
  return out
}

const readRequiredStringArray = (
  obj: ts.ObjectLiteralExpression,
  key: string,
  consts: ReadonlyMap<string, string>,
  where: string
): Read<readonly string[]> => {
  const found = findProperty(obj, key)
  if (found === null) return { unreadable: `${where} carries no \`${key}\`` }
  const values = readStringArray(found, consts)
  if (values === null) return { unreadable: `the \`${key}\` of ${where} is not a list of strings` }
  return { value: values }
}

const readRequiredString = (
  obj: ts.ObjectLiteralExpression,
  key: string,
  consts: ReadonlyMap<string, string>,
  where: string
): Read<string> => {
  const found = findProperty(obj, key)
  if (found === null) return { unreadable: `${where} carries no \`${key}\`` }
  const value = resolveStringExpression(found, consts)
  if (value === null) return { unreadable: `the \`${key}\` of ${where} is not a string` }
  return { value }
}

const readOptionalString = (
  obj: ts.ObjectLiteralExpression,
  key: string,
  consts: ReadonlyMap<string, string>,
  where: string
): Read<string | null> => {
  const found = findProperty(obj, key)
  if (found === null) return { value: null }
  const value = resolveStringExpression(found, consts)
  if (value === null) return { unreadable: `the \`${key}\` of ${where} is not a string` }
  return { value }
}

const readRule = (
  expr: ts.Expression,
  consts: ReadonlyMap<string, string>,
  where: string
): Read<RuleAttrs> => {
  if (!ts.isObjectLiteralExpression(expr)) return { unreadable: `${where} is not an object literal` }
  const apiGroups = readRequiredStringArray(expr, "apiGroups", consts, where)
  if (apiGroups.unreadable !== undefined) return apiGroups
  const resources = readRequiredStringArray(expr, "resources", consts, where)
  if (resources.unreadable !== undefined) return resources
  const verbs = readRequiredStringArray(expr, "verbs", consts, where)
  if (verbs.unreadable !== undefined) return verbs
  const comment = readOptionalString(expr, "comment", consts, where)
  if (comment.unreadable !== undefined) return comment

  const resourceNamesFound = findProperty(expr, "resourceNames")
  let resourceNames: readonly string[] | null = null
  if (resourceNamesFound !== null) {
    resourceNames = readStringArray(resourceNamesFound, consts)
    if (resourceNames === null) {
      return { unreadable: `the \`resourceNames\` of ${where} is not a list of strings` }
    }
  }

  return {
    value: {
      ...(comment.value !== null ? { comment: comment.value } : {}),
      apiGroups: apiGroups.value,
      resources: resources.value,
      verbs: verbs.value,
      ...(resourceNames !== null ? { resourceNames } : {}),
    },
  }
}

const readProfile = (
  expr: ts.Expression,
  consts: ReadonlyMap<string, string>,
  where: string
): Read<DiscoveredRbacProfile> => {
  if (!ts.isObjectLiteralExpression(expr)) return { unreadable: `${where} is not an object literal` }
  const namespace = readRequiredString(expr, "namespace", consts, where)
  if (namespace.unreadable !== undefined) return namespace
  const roleName = readRequiredString(expr, "roleName", consts, where)
  if (roleName.unreadable !== undefined) return roleName
  const comment = readOptionalString(expr, "comment", consts, where)
  if (comment.unreadable !== undefined) return comment

  const rulesFound = findProperty(expr, "rules")
  if (rulesFound === null) return { unreadable: `${where} carries no \`rules\`` }
  if (!ts.isArrayLiteralExpression(rulesFound)) {
    return { unreadable: `the \`rules\` of ${where} is not an array literal` }
  }
  const rules: RuleAttrs[] = []
  let index = 0
  for (const element of rulesFound.elements) {
    const rule = readRule(unwrapExpression(element), consts, `rule ${index} of ${where}`)
    if (rule.unreadable !== undefined) return rule
    rules.push(rule.value)
    index += 1
  }

  return {
    value: {
      namespace: namespace.value,
      roleName: roleName.value,
      ...(comment.value !== null ? { comment: comment.value } : {}),
      rules,
    },
  }
}

export const extractRbacProfiles = (sourcePath: string, sourceText: string): RbacExtraction => {
  const sf = ts.createSourceFile(sourcePath, sourceText, ts.ScriptTarget.Latest, true)
  const consts = collectTopLevelStringConsts(sf)

  const found = findProfilesExport(sf)
  if (found.unreadable !== undefined) return { profiles: [], unreadable: found.unreadable }
  if (found.value === null) return { profiles: [], unreadable: null }

  const candidate = found.value
  if (!ts.isArrayLiteralExpression(candidate.expr)) {
    return { profiles: [], unreadable: `${candidate.what} is not an array literal` }
  }

  const profiles: DiscoveredRbacProfile[] = []
  let index = 0
  for (const element of candidate.expr.elements) {
    const profile = readProfile(
      unwrapExpression(element),
      consts,
      `profile ${index} of ${candidate.what}`
    )
    if (profile.unreadable !== undefined) return { profiles: [], unreadable: profile.unreadable }
    profiles.push(profile.value)
    index += 1
  }

  return { profiles, unreadable: null }
}
