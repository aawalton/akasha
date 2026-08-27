import ts from "typescript"
import { memberName, thisParamKind } from "./tstl-colon-dot-self-shift"

export interface ThisVoidColonMethodFinding {
  readonly file: string
  readonly line: number
  readonly column: number
  readonly method: string
}

function hasExplicitSelfParam(params: readonly ts.ParameterDeclaration[]): boolean {
  for (const p of params) {
    if (p.name.getText() === "this") continue
    const named = ts.isIdentifier(p.name) ? p.name.text : ""
    if (named === "self") return true
    if (p.type !== undefined && p.type.kind === ts.SyntaxKind.ObjectKeyword) return true
    return false
  }
  return false
}

function isNestedUtilNamespaceMember(node: ts.Node): boolean {
  const container = node.parent
  if (!ts.isTypeLiteralNode(container)) return false
  const owner = container.parent
  return ts.isPropertySignature(owner) || ts.isPropertyDeclaration(owner)
}

function isTransparentForwardHook(params: readonly ts.ParameterDeclaration[]): boolean {
  const rest = params.filter((p) => p.name.getText() !== "this")
  return rest.length === 1 && rest[0]?.dotDotDotToken !== undefined
}

function resolveReceiverName(node: ts.Node): string | null {
  for (let n: ts.Node | undefined = node.parent; n !== undefined; n = n.parent) {
    if (ts.isVariableDeclaration(n) && ts.isIdentifier(n.name)) return n.name.text
    if (ts.isInterfaceDeclaration(n)) return n.name.text
    if (ts.isTypeAliasDeclaration(n)) return n.name.text
  }
  return null
}

function isBaseGameGlobalReceiver(node: ts.Node, baseGameGlobals: ReadonlySet<string>): boolean {
  const receiver = resolveReceiverName(node)
  return receiver !== null && baseGameGlobals.has(receiver)
}

export function scanThisVoidColonMethods(
  sourceFile: ts.SourceFile,
  authority: ReadonlySet<string>,
  baseGameGlobals: ReadonlySet<string>
): readonly ThisVoidColonMethodFinding[] {
  const findings: ThisVoidColonMethodFinding[] = []

  function pushIfAuthority(name: string, node: ts.Node): undefined {
    if (!authority.has(name)) return
    const pos = sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile))
    findings.push({
      file: sourceFile.fileName,
      line: pos.line + 1,
      column: pos.character + 1,
      method: name,
    })
    return
  }

  function visit(node: ts.Node): undefined {
    if (ts.isMethodSignature(node) || ts.isMethodDeclaration(node)) {
      const n = memberName(node.name)
      if (
        n !== null &&
        thisParamKind(node.parameters) === "void" &&
        !hasExplicitSelfParam(node.parameters) &&
        !isNestedUtilNamespaceMember(node)
      ) {
        pushIfAuthority(n, node)
      }
    }
    if (ts.isPropertySignature(node) || ts.isPropertyDeclaration(node)) {
      const t = node.type
      if (t !== undefined && ts.isFunctionTypeNode(t)) {
        const n = memberName(node.name)
        if (
          n !== null &&
          thisParamKind(t.parameters) === "void" &&
          !hasExplicitSelfParam(t.parameters) &&
          !isTransparentForwardHook(t.parameters) &&
          isBaseGameGlobalReceiver(node, baseGameGlobals)
        ) {
          pushIfAuthority(n, node)
        }
      }
    }
    ts.forEachChild(node, visit)
    return
  }

  ts.forEachChild(sourceFile, visit)
  return findings
}

export function scanThisVoidColonMethodsText(
  text: string,
  file: string,
  authority: ReadonlySet<string>,
  baseGameGlobals: ReadonlySet<string>
): readonly ThisVoidColonMethodFinding[] {
  const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
  return scanThisVoidColonMethods(sf, authority, baseGameGlobals)
}

export const THIS_VOID_COLON_METHOD_HINT =
  "ESO colon-method declared with a `this: void` self — TSTL lowers this to a self-LESS dot-call `obj.Method(...)`, dropping the colon receiver so the first argument shifts into `self` and the call crashes in-client. Flip the declaration to the colon form: method shorthand `Method(...): R` (no `this` param) in a `.d.ts`, or a `this:`-typed property arrow `Method: (this: Recv, ...) => R` in a `.ts`."
