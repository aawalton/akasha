import ts from "typescript"

export function parseAddonSource(source: string, filePath: string): ts.SourceFile {
  return ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true)
}

export type ClosureSite =
  | { readonly kind: "hook-installer"; readonly name: string }
  | { readonly kind: "property"; readonly name: string }
  | { readonly kind: "bare" }

export interface HookEagerCaptureIssue {
  readonly message: string
  readonly capturedName: string
  readonly objectName: string
  readonly fieldName: string
  readonly closureSite: ClosureSite
  readonly line: number
  readonly filePath: string
}

function describeClosureSite(site: ClosureSite): string {
  if (site.kind === "hook-installer") return `the callback passed to \`${site.name}\``
  if (site.kind === "property") return `the closure held by the \`${site.name}\` property`
  return "a closure registered by no installer this gate recognises"
}

const HOOK_INSTALLER_IDENTIFIERS = new Set([
  "ZO_PreHook",
  "ZO_PostHook",
  "ZO_PreHookHandler",
  "ZO_PreHookWidget",
  "SecurePostHook",
])

const HOOK_INSTALLER_METHODS = new Set(["RegisterForEvent", "RegisterForUpdate"])

interface EagerCapture {
  readonly name: string
  readonly objectName: string
  readonly fieldName: string
  readonly start: number
  readonly end: number
}

interface DeferredClosure {
  readonly site: ClosureSite
  readonly body: ts.Node
  readonly start: number
  readonly end: number
}

function collectDeclaredNames(sf: ts.SourceFile): ReadonlySet<string> {
  const names = new Set<string>()
  const addBinding = (name: ts.BindingName): undefined => {
    if (ts.isIdentifier(name)) {
      names.add(name.text)
    } else if (ts.isObjectBindingPattern(name) || ts.isArrayBindingPattern(name)) {
      for (const el of name.elements) {
        if (ts.isBindingElement(el)) addBinding(el.name)
      }
    }
  }
  const visit = (node: ts.Node): undefined => {
    if (ts.isImportClause(node) && node.name) names.add(node.name.text)
    if (ts.isNamespaceImport(node)) names.add(node.name.text)
    if (ts.isImportSpecifier(node)) names.add(node.name.text)
    if (ts.isVariableDeclaration(node)) addBinding(node.name)
    if (ts.isParameter(node) && ts.isIdentifier(node.name)) names.add(node.name.text)
    if ((ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) && node.name) {
      names.add(node.name.text)
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return names
}

function isInsideFunctionBody(node: ts.Node): boolean {
  let p = node.parent
  while (p) {
    if (
      ts.isFunctionDeclaration(p) ||
      ts.isFunctionExpression(p) ||
      ts.isArrowFunction(p) ||
      ts.isMethodDeclaration(p)
    ) {
      return true
    }
    p = p.parent
  }
  return false
}

function readFieldAssignmentKey(lhs: ts.Expression): string | undefined {
  if (ts.isPropertyAccessExpression(lhs) && ts.isIdentifier(lhs.expression)) {
    return `${lhs.expression.text}.${lhs.name.text}`
  }
  if (
    ts.isElementAccessExpression(lhs) &&
    ts.isIdentifier(lhs.expression) &&
    ts.isStringLiteralLike(lhs.argumentExpression)
  ) {
    return `${lhs.expression.text}.${lhs.argumentExpression.text}`
  }
  return undefined
}

export function collectDeferredPublishedFields(sf: ts.SourceFile): readonly string[] {
  const keys = new Set<string>()
  const visit = (node: ts.Node): undefined => {
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      isInsideFunctionBody(node)
    ) {
      const key = readFieldAssignmentKey(node.left)
      if (key !== undefined) keys.add(key)
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return [...keys].sort()
}

function collectLocallyAssignedFieldKeys(sf: ts.SourceFile): ReadonlySet<string> {
  const keys = new Set<string>()
  const visit = (node: ts.Node): undefined => {
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      const key = readFieldAssignmentKey(node.left)
      if (key !== undefined) keys.add(key)
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return keys
}

function readAmbientFieldAccess(
  init: ts.Expression,
  ambient: (name: string) => boolean
): { objectName: string; fieldName: string } | undefined {
  if (ts.isPropertyAccessExpression(init) && ts.isIdentifier(init.expression)) {
    const objectName = init.expression.text
    if (ambient(objectName)) return { objectName, fieldName: init.name.text }
  }
  if (
    ts.isElementAccessExpression(init) &&
    ts.isIdentifier(init.expression) &&
    ts.isStringLiteralLike(init.argumentExpression)
  ) {
    const objectName = init.expression.text
    if (ambient(objectName)) return { objectName, fieldName: init.argumentExpression.text }
  }
  return undefined
}

function collectEagerCaptures(
  sf: ts.SourceFile,
  ambient: (name: string) => boolean
): readonly EagerCapture[] {
  const captures: EagerCapture[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
      const access = readAmbientFieldAccess(node.initializer, ambient)
      if (access) {
        captures.push({
          name: node.name.text,
          objectName: access.objectName,
          fieldName: access.fieldName,
          start: node.getStart(sf),
          end: node.getEnd(),
        })
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return captures
}

function hookInstallerName(callee: ts.Expression): string | undefined {
  if (ts.isIdentifier(callee) && HOOK_INSTALLER_IDENTIFIERS.has(callee.text)) return callee.text
  if (ts.isPropertyAccessExpression(callee) && HOOK_INSTALLER_METHODS.has(callee.name.text)) {
    return ts.isIdentifier(callee.expression)
      ? `${callee.expression.text}.${callee.name.text}`
      : callee.name.text
  }
  return undefined
}

function closureSiteOf(fn: ts.ArrowFunction | ts.FunctionExpression): ClosureSite {
  const parent = fn.parent
  if (parent && ts.isCallExpression(parent)) {
    const installer = hookInstallerName(parent.expression)
    if (installer !== undefined) return { kind: "hook-installer", name: installer }
  }
  if (parent && ts.isPropertyAssignment(parent) && ts.isIdentifier(parent.name)) {
    return { kind: "property", name: parent.name.text }
  }
  return { kind: "bare" }
}

function collectDeferredClosures(sf: ts.SourceFile): readonly DeferredClosure[] {
  const closures: DeferredClosure[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) {
      closures.push({
        site: closureSiteOf(node),
        body: node.body,
        start: node.body.getStart(sf),
        end: node.body.getEnd(),
      })
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return closures
}

function collectLocalNames(body: ts.Node): ReadonlySet<string> {
  const names = new Set<string>()
  const visit = (node: ts.Node): undefined => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) names.add(node.name.text)
    if (ts.isParameter(node) && ts.isIdentifier(node.name)) names.add(node.name.text)
    if (ts.isFunctionDeclaration(node) && node.name) names.add(node.name.text)
    ts.forEachChild(node, visit)
  }
  visit(body)
  return names
}

export function collectHookEagerCaptureIssues(
  sf: ts.SourceFile,
  deferredFields: ReadonlySet<string>
): readonly HookEagerCaptureIssue[] {
  const filePath = sf.fileName
  const declared = collectDeclaredNames(sf)
  const ambient = (name: string): boolean => !declared.has(name)

  const localAssigned = collectLocallyAssignedFieldKeys(sf)
  const captures = collectEagerCaptures(sf, ambient).filter((c) => {
    const key = `${c.objectName}.${c.fieldName}`
    return deferredFields.has(key) && !localAssigned.has(key)
  })
  if (captures.length === 0) return []
  const byName = new Map<string, EagerCapture>()
  for (const c of captures) byName.set(c.name, c)

  const callbacks = collectDeferredClosures(sf)
  const issues: HookEagerCaptureIssue[] = []

  for (const cb of callbacks) {
    const shadowed = collectLocalNames(cb.body)
    const visit = (node: ts.Node): undefined => {
      if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
        const name = node.expression.text
        const capture = byName.get(name)
        const declaredOutside =
          capture !== undefined && (capture.start < cb.start || capture.end > cb.end)
        if (capture !== undefined && declaredOutside && !shadowed.has(name)) {
          const { line } = sf.getLineAndCharacterOfPosition(node.expression.getStart(sf))
          issues.push({
            capturedName: name,
            objectName: capture.objectName,
            fieldName: capture.fieldName,
            closureSite: cb.site,
            line: line + 1,
            filePath,
            message: `\`${name}\` is eagerly captured from \`${capture.objectName}.${capture.fieldName}\` at install scope and called inside ${describeClosureSite(cb.site)} (${filePath}:${line + 1}) — resolve \`${capture.objectName}.${capture.fieldName}\` lazily at fire time, or the closure holds its pre-init (nil) value`,
          })
        }
      }
      ts.forEachChild(node, visit)
    }
    visit(cb.body)
  }

  issues.sort((a, b) =>
    a.line !== b.line ? a.line - b.line : a.capturedName.localeCompare(b.capturedName)
  )
  return issues
}
