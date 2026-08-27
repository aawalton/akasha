import ts from "typescript"
import { type ParsedAddonSource, parseAddonSource } from "./addon-global-ownership"

export type AddonCrossClusterFile = ParsedAddonSource

export { parseAddonSource }

export interface AddonCrossClusterInput {
  readonly addonName: string
  readonly ownedGlobals: readonly string[]
  readonly files: readonly AddonCrossClusterFile[]
}

export type CrossClusterAttachKind = "crash" | "silent-disable"

export interface CrossClusterAttachViolation {
  readonly message: string
  readonly addonName: string
  readonly memberName: string
  readonly viewInterface: string
  readonly declaredIn: string
  readonly kind: CrossClusterAttachKind
}

function isIdent(node: ts.Node, name: string): boolean {
  return ts.isIdentifier(node) && node.text === name
}

function isOwnedIdent(node: ts.Node, owned: ReadonlySet<string>): boolean {
  return ts.isIdentifier(node) && owned.has(node.text)
}

function isGlobalThisOwned(node: ts.Expression, owned: ReadonlySet<string>): boolean {
  return (
    ts.isPropertyAccessExpression(node) &&
    isIdent(node.expression, "globalThis") &&
    owned.has(node.name.text)
  )
}

function peelCasts(expr: ts.Expression): ts.Expression {
  let e: ts.Expression = expr
  while (
    ts.isAsExpression(e) ||
    ts.isParenthesizedExpression(e) ||
    ts.isTypeAssertionExpression(e)
  ) {
    e = e.expression
  }
  return e
}

function isNarrowedOwnedGlobal(expr: ts.Expression, owned: ReadonlySet<string>): boolean {
  const e = peelCasts(expr)
  return isOwnedIdent(e, owned) || isGlobalThisOwned(e, owned)
}

interface CastHelper {
  readonly view: string
  readonly paramIndex: number
}

function readCastHelper(
  params: readonly ts.ParameterDeclaration[],
  type: ts.TypeNode | undefined,
  body: ts.ConciseBody | undefined
): CastHelper | undefined {
  if (type === undefined || body === undefined) return undefined
  if (!ts.isTypeReferenceNode(type) || !ts.isIdentifier(type.typeName)) return undefined
  const returned = ts.isBlock(body) ? body.statements.find(ts.isReturnStatement)?.expression : body
  if (returned === undefined) return undefined
  const e = peelCasts(returned)
  if (!ts.isIdentifier(e)) return undefined
  const paramIndex = params.findIndex((p) => ts.isIdentifier(p.name) && p.name.text === e.text)
  if (paramIndex < 0) return undefined
  return { view: type.typeName.text, paramIndex }
}

function collectCastHelpers(sf: ts.SourceFile): Map<string, CastHelper> {
  const helpers = new Map<string, CastHelper>()
  const visit = (node: ts.Node): undefined => {
    if (ts.isFunctionDeclaration(node) && node.name !== undefined) {
      const helper = readCastHelper(node.parameters, node.type, node.body)
      if (helper !== undefined) helpers.set(node.name.text, helper)
    } else if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer !== undefined &&
      (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer))
    ) {
      const fn = node.initializer
      const helper = readCastHelper(fn.parameters, fn.type, fn.body)
      if (helper !== undefined) helpers.set(node.name.text, helper)
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return helpers
}

function collectViewInterfaceNames(
  sf: ts.SourceFile,
  owned: ReadonlySet<string>,
  helpers: ReadonlyMap<string, CastHelper>
): Set<string> {
  const names = new Set<string>()
  const visit = (node: ts.Node): undefined => {
    if (
      ts.isFunctionDeclaration(node) &&
      node.type !== undefined &&
      ts.isTypeReferenceNode(node.type) &&
      ts.isIdentifier(node.type.typeName) &&
      node.body !== undefined
    ) {
      const ret = node.body.statements.find(ts.isReturnStatement)?.expression
      if (ret !== undefined && isNarrowedOwnedGlobal(ret, owned)) {
        names.add(node.type.typeName.text)
      } else if (ret !== undefined && ts.isCallExpression(ret) && ret.arguments.length === 1) {
        const arg = ret.arguments[0]
        if (arg !== undefined && isNarrowedOwnedGlobal(arg, owned)) {
          names.add(node.type.typeName.text)
        }
      }
    }
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
      const helper = helpers.get(node.expression.text)
      const arg = helper === undefined ? undefined : node.arguments[helper.paramIndex]
      if (helper !== undefined && arg !== undefined && isNarrowedOwnedGlobal(arg, owned)) {
        names.add(helper.view)
      }
    }
    if (
      ts.isAsExpression(node) &&
      ts.isTypeReferenceNode(node.type) &&
      ts.isIdentifier(node.type.typeName) &&
      isNarrowedOwnedGlobal(node.expression, owned)
    ) {
      names.add(node.type.typeName.text)
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return names
}

interface FnMember {
  readonly path: string
  readonly optional: boolean
}

function collectFnMembers(
  rootView: string,
  decls: ReadonlyMap<string, { decl: ts.InterfaceDeclaration; path: string }>
): Map<string, FnMember> {
  const members = new Map<string, FnMember>()
  const seen = new Set<string>()
  const walk = (name: string): undefined => {
    if (seen.has(name)) return
    seen.add(name)
    const entry = decls.get(name)
    if (entry === undefined) return
    for (const clause of entry.decl.heritageClauses ?? []) {
      for (const t of clause.types) {
        if (ts.isIdentifier(t.expression)) walk(t.expression.text)
      }
    }
    for (const m of entry.decl.members) {
      if (m.name === undefined || !ts.isIdentifier(m.name)) continue
      const optional = m.questionToken !== undefined
      if (ts.isMethodSignature(m)) {
        if (!members.has(m.name.text)) members.set(m.name.text, { path: entry.path, optional })
      } else if (
        ts.isPropertySignature(m) &&
        m.type !== undefined &&
        ts.isFunctionTypeNode(m.type)
      ) {
        if (!members.has(m.name.text)) members.set(m.name.text, { path: entry.path, optional })
      }
    }
  }
  walk(rootView)
  return members
}

function isGlobalItself(node: ts.Expression, owned: ReadonlySet<string>): boolean {
  return isOwnedIdent(node, owned) || isGlobalThisOwned(node, owned)
}

function collectAttachedMembers(sf: ts.SourceFile, owned: ReadonlySet<string>): Set<string> {
  const attached = new Set<string>()
  const addSeedProps = (obj: ts.ObjectLiteralExpression): undefined => {
    for (const p of obj.properties) {
      if (p.name !== undefined && ts.isIdentifier(p.name)) attached.add(p.name.text)
    }
  }
  const visit = (node: ts.Node): undefined => {
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      const lhs = node.left
      if (ts.isPropertyAccessExpression(lhs) && isGlobalItself(lhs.expression, owned)) {
        attached.add(lhs.name.text)
      }
      if (isGlobalItself(lhs, owned) && ts.isObjectLiteralExpression(node.right)) {
        addSeedProps(node.right)
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return attached
}

export function findUnattachedViewMembers(
  input: AddonCrossClusterInput
): readonly CrossClusterAttachViolation[] {
  const owned = new Set(input.ownedGlobals)
  if (owned.size === 0) return []

  const helpers = new Map<string, CastHelper>()
  for (const { sf } of input.files) {
    for (const [name, helper] of collectCastHelpers(sf)) helpers.set(name, helper)
  }

  const viewNames = new Set<string>()
  const interfaceDecls = new Map<string, { decl: ts.InterfaceDeclaration; path: string }>()
  const attached = new Set<string>()
  for (const { path, sf } of input.files) {
    for (const v of collectViewInterfaceNames(sf, owned, helpers)) viewNames.add(v)
    for (const m of collectAttachedMembers(sf, owned)) attached.add(m)
    const visit = (node: ts.Node): undefined => {
      if (ts.isInterfaceDeclaration(node)) interfaceDecls.set(node.name.text, { decl: node, path })
      ts.forEachChild(node, visit)
    }
    visit(sf)
  }

  const promised = new Map<string, { view: string; member: FnMember }>()
  for (const view of viewNames) {
    const members = collectFnMembers(view, interfaceDecls)
    for (const [member, fn] of members) {
      if (!promised.has(member)) promised.set(member, { view, member: fn })
    }
  }

  const global = input.ownedGlobals[0] ?? "GLOBAL"
  const violations: CrossClusterAttachViolation[] = []
  for (const [member, { view, member: fn }] of promised) {
    if (attached.has(member)) continue
    const kind: CrossClusterAttachKind = fn.optional ? "silent-disable" : "crash"
    const message = fn.optional
      ? `\`${member}\` is declared optional (\`${member}?:\`) on the \`${view}\` cross-cluster view (${fn.path}) and called with \`?.\`, but is never attached onto the runtime global anywhere — so the optional call always short-circuits to undefined and the feature it guards is permanently dead (silent-disable). Either attach it in public-api* (\`${global}.${member} = ${member}\`), or, if it is a pure helper that does not belong on the view, drop the member and import it directly at the call site.`
      : `\`${member}\` is promised by the \`${view}\` cross-cluster view (${fn.path}) but never attached onto the runtime global — a call through the view throws \`function expected instead of nil\`. Attach it in public-api* (\`${global}.${member} = ${member}\`) or, if it is genuinely optional and wired conditionally, declare the member \`${member}?:\` and call it with \`?.\`.`
    violations.push({
      addonName: input.addonName,
      memberName: member,
      viewInterface: view,
      declaredIn: fn.path,
      kind,
      message,
    })
  }

  violations.sort((a, b) => a.memberName.localeCompare(b.memberName))
  return violations
}
