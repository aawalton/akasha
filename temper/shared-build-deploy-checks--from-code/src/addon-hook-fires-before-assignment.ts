import ts from "typescript"
import {
  calleeName,
  enclosingStepName,
  firstStringArg,
  isInsideFunctionBody,
  readFieldKey,
  readMemberParts,
} from "./ts-node-shapes"

export interface HookFiresBeforeAssignmentIssue {
  readonly message: string
  readonly objectName: string
  readonly fieldName: string
  readonly installer: string
  readonly hookTarget: string | undefined
  readonly registeringStep: string
  readonly assigningStep: string
  readonly line: number
  readonly filePath: string
}

const HOOK_INSTALLER_IDENTIFIERS = new Set([
  "ZO_PreHook",
  "ZO_PostHook",
  "ZO_PreHookHandler",
  "ZO_PreHookWidget",
  "SecurePostHook",
])

const HOOK_INSTALLER_METHODS = new Set(["RegisterForEvent", "RegisterForUpdate"])

export interface InitStepCall {
  readonly name: string
  readonly pos: number
}

export interface FieldAssignmentStep {
  readonly key: string
  readonly step: string
}

export interface HookFieldCall {
  readonly objectName: string
  readonly fieldName: string
  readonly key: string
  readonly installer: string
  readonly hookTarget: string | undefined
  readonly registeringStep: string
  readonly line: number
  readonly filePath: string
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

export function parseAddonSource(filePath: string, source: string): ts.SourceFile {
  return ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true)
}

export function collectInitOrder(sf: ts.SourceFile): readonly InitStepCall[] {
  const calls: InitStepCall[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isCallExpression(node)) {
      const name = calleeName(node)
      if (name !== undefined) calls.push({ name, pos: node.getStart(sf) })
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  calls.sort((a, b) => a.pos - b.pos)
  return calls
}

export function collectFieldAssignmentSteps(sf: ts.SourceFile): readonly FieldAssignmentStep[] {
  const out: FieldAssignmentStep[] = []
  const visit = (node: ts.Node): undefined => {
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      isInsideFunctionBody(node)
    ) {
      const key = readFieldKey(node.left)
      const step = enclosingStepName(node)
      if (key !== undefined && step !== undefined) out.push({ key, step })
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return out
}

export function collectModuleTopAssignedKeys(sf: ts.SourceFile): readonly string[] {
  const keys = new Set<string>()
  const visit = (node: ts.Node): undefined => {
    if (
      ts.isBinaryExpression(node) &&
      node.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      !isInsideFunctionBody(node)
    ) {
      const key = readFieldKey(node.left)
      if (key !== undefined) keys.add(key)
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return [...keys].sort()
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

export function collectHookFieldCalls(sf: ts.SourceFile): readonly HookFieldCall[] {
  const declared = collectDeclaredNames(sf)
  const out: HookFieldCall[] = []

  const visit = (node: ts.Node): undefined => {
    if (ts.isCallExpression(node)) {
      const installer = hookInstallerName(node.expression)
      if (installer !== undefined) {
        const callback = node.arguments[node.arguments.length - 1]
        const target = firstStringArg(node)
        if (
          callback !== undefined &&
          (ts.isArrowFunction(callback) || ts.isFunctionExpression(callback))
        ) {
          out.push(...collectAmbientFieldCalls(sf, callback.body, declared, installer, target))
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)
  return out
}

function collectAmbientFieldCalls(
  sf: ts.SourceFile,
  body: ts.Node,
  declared: ReadonlySet<string>,
  installer: string,
  hookTarget: string | undefined
): readonly HookFieldCall[] {
  const out: HookFieldCall[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isCallExpression(node)) {
      const parts = readMemberParts(node.expression)
      if (parts !== undefined && !declared.has(parts.objectName)) {
        const registeringStep = enclosingStepName(node)
        if (registeringStep !== undefined) {
          const { line } = sf.getLineAndCharacterOfPosition(node.getStart(sf))
          out.push({
            objectName: parts.objectName,
            fieldName: parts.fieldName,
            key: `${parts.objectName}.${parts.fieldName}`,
            installer,
            hookTarget,
            registeringStep,
            line: line + 1,
            filePath: sf.fileName,
          })
        }
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(body)
  return out
}

export interface AddonInitFacts {
  readonly initOrder: ReadonlyMap<string, number>
  readonly assignSteps: ReadonlyMap<string, ReadonlySet<string>>
  readonly moduleTopAssigned: ReadonlySet<string>
  readonly hookCalls: readonly HookFieldCall[]
}

export function collectFiresBeforeAssignmentIssues(
  facts: AddonInitFacts
): readonly HookFiresBeforeAssignmentIssue[] {
  const issues: HookFiresBeforeAssignmentIssue[] = []
  for (const call of facts.hookCalls) {
    if (facts.moduleTopAssigned.has(call.key)) continue
    const steps = facts.assignSteps.get(call.key)
    if (steps === undefined || steps.size === 0) continue

    const rOrder = facts.initOrder.get(call.registeringStep)
    if (rOrder === undefined) continue

    let earliestAssign: number | undefined
    let earliestStep: string | undefined
    for (const step of steps) {
      const a = facts.initOrder.get(step)
      if (a === undefined) continue
      if (earliestAssign === undefined || a < earliestAssign) {
        earliestAssign = a
        earliestStep = step
      }
    }
    if (earliestAssign === undefined || earliestStep === undefined) continue

    if (rOrder < earliestAssign) {
      const targetLabel = call.hookTarget !== undefined ? ` on \`${call.hookTarget}\`` : ""
      issues.push({
        objectName: call.objectName,
        fieldName: call.fieldName,
        installer: call.installer,
        hookTarget: call.hookTarget,
        registeringStep: call.registeringStep,
        assigningStep: earliestStep,
        line: call.line,
        filePath: call.filePath,
        message: `\`${call.installer}\`${targetLabel} callback (${call.filePath}:${call.line}) calls \`${call.key}\`, but \`${call.registeringStep}()\` registers this hook BEFORE \`${earliestStep}()\` publishes \`${call.key}\` in init order — the hook can fire (e.g. a load-window \`SetCVar\`) while \`${call.key}\` is still nil and throw \`function expected instead of nil\`, swallowing the original command. Register the hook in an init step that runs after \`${earliestStep}()\`.`,
      })
    }
  }
  issues.sort((a, b) =>
    a.filePath !== b.filePath
      ? a.filePath.localeCompare(b.filePath)
      : a.line !== b.line
        ? a.line - b.line
        : `${a.objectName}.${a.fieldName}`.localeCompare(`${b.objectName}.${b.fieldName}`)
  )
  return issues
}
