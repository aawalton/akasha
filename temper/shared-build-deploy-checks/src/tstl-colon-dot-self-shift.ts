import ts from "typescript"
import { z } from "zod"
import { maskStringLiterals } from "./addon-banned-symbols"
import {
  functionDepthByLine,
  LOAD_SCOPE_MAX_DEPTH,
  stripLineComment,
} from "./tstl-colon-dot-load-scope"
import {
  COLON_DOT_ALLOW,
  type ColonDotAllowEntry,
  FORCE_COLON_METHODS,
} from "./tstl-colon-dot-self-shift.manifest"

export interface SelfShiftIssue {
  file: string
  line: number
  col: number
  receiver: string
  method: string
  hint: string
  loadScope: boolean
}

const CONSTRUCTOR_NAMES: ReadonlySet<string> = new Set(["New", "Subclass"])

export type ThisKind = "void" | "nonvoid" | "absent"

export function thisParamKind(params: ts.NodeArray<ts.ParameterDeclaration>): ThisKind {
  const first = params[0]
  if (first === undefined) return "absent"
  if (!ts.isIdentifier(first.name)) return "absent"
  if (ts.identifierToKeywordKind(first.name) !== ts.SyntaxKind.ThisKeyword) return "absent"
  return first.type?.kind === ts.SyntaxKind.VoidKeyword ? "void" : "nonvoid"
}

function functionTypeThisKind(t: ts.TypeNode | undefined): ThisKind | null {
  if (t === undefined || !ts.isFunctionTypeNode(t)) return null
  return thisParamKind(t.parameters)
}

function isDotValueInitializer(init: ts.Expression): boolean {
  if (!ts.isArrowFunction(init) && !ts.isFunctionExpression(init)) return false
  return thisParamKind(init.parameters) !== "nonvoid"
}

export function memberName(name: ts.PropertyName): string | null {
  if (ts.isIdentifier(name)) return name.text
  if (ts.isStringLiteral(name)) return name.text
  return null
}

export function collectColonMethodNames(
  sources: readonly { readonly file: string; readonly text: string; readonly core?: boolean }[],
  forceColon: readonly string[] = FORCE_COLON_METHODS
): ReadonlySet<string> {
  const colon = new Set<string>()
  const dotShim = new Set<string>()
  const dotStatic = new Set<string>()
  const reserved = new Set<string>()
  let currentCore = false

  function addColon(n: string): undefined {
    colon.add(n)
    if (currentCore) reserved.add(n)
    return
  }

  function visit(node: ts.Node): undefined {
    if (ts.isMethodSignature(node)) {
      const n = memberName(node.name)
      if (n !== null) {
        if (thisParamKind(node.parameters) === "void") dotShim.add(n)
        else addColon(n)
      }
    } else if (ts.isPropertySignature(node) || ts.isPropertyDeclaration(node)) {
      const n = memberName(node.name)
      const kind = functionTypeThisKind(node.type)
      if (n !== null && kind !== null) {
        if (kind === "nonvoid") addColon(n)
        else dotShim.add(n)
      }
    } else if (ts.isMethodDeclaration(node)) {
      const n = memberName(node.name)
      if (n !== null && thisParamKind(node.parameters) === "void") dotShim.add(n)
    } else if (ts.isFunctionDeclaration(node) && node.name !== undefined) {
      dotStatic.add(node.name.text)
    } else if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer !== undefined &&
      isDotValueInitializer(node.initializer)
    ) {
      dotStatic.add(node.name.text)
    } else if (ts.isPropertyAssignment(node) && isDotValueInitializer(node.initializer)) {
      const n = memberName(node.name)
      if (n !== null) dotStatic.add(n)
    }
    ts.forEachChild(node, visit)
    return
  }

  for (const { file, text, core } of sources) {
    currentCore = core === true
    const sf = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
    ts.forEachChild(sf, visit)
  }

  const force = new Set(forceColon)
  for (const c of CONSTRUCTOR_NAMES) colon.delete(c)
  for (const d of dotStatic) if (!force.has(d)) colon.delete(d)
  for (const d of dotShim) if (!reserved.has(d)) colon.delete(d)
  return colon
}

const REGEX_EXEC_SCHEMA = z
  .unknown()
  .nullable()
  .transform((raw): { method: string; index: number } | null => {
    if (raw === null) return null
    if (!Array.isArray(raw)) throw new Error("expected array from RegExp.exec")
    z.string().parse(raw[1])
    const method = z.string().parse(raw[2])
    const indexUnknown: unknown = Reflect.get(raw, "index")
    const index = z.number().parse(indexUnknown)
    return { method, index }
  })

function escapeRegex(name: string): string {
  return name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

const IDENT_OR_DOT = /[A-Za-z0-9_.]/

function receiverToken(line: string, lastCharIndex: number): { text: string; start: number } {
  let start = lastCharIndex
  const last = line[lastCharIndex] ?? ""
  let depth = last === ")" || last === "]" ? 1 : 0
  while (start > 0) {
    const ch = line[start - 1] ?? ""
    if (ch === ")" || ch === "]") {
      depth++
      start--
      continue
    }
    if (ch === "(" || ch === "[") {
      if (depth === 0) break
      depth--
      start--
      continue
    }
    if (depth > 0) {
      start--
      continue
    }
    if (IDENT_OR_DOT.test(ch)) {
      start--
      continue
    }
    break
  }
  return { text: line.slice(start, lastCharIndex + 1), start }
}

function firstArgToken(args: string): string {
  let depth = 0
  let i = 0
  for (; i < args.length; i++) {
    const ch = args[i]
    if (ch === "(" || ch === "[" || ch === "{") depth++
    else if (ch === ")" || ch === "]" || ch === "}") {
      if (depth === 0) break
      depth--
    } else if (ch === "," && depth === 0) break
  }
  return args.slice(0, i).trim()
}

function firstArgTokenMultiline(args: string, lines: readonly string[], nextIdx: number): string {
  let acc = args
  for (let j = nextIdx; acc.trim() === "" && j < lines.length && j < nextIdx + 6; j++) {
    const raw = lines[j] ?? ""
    const line = raw.endsWith("\r") ? raw.slice(0, -1) : raw
    acc += ` ${stripLineComment(maskStringLiterals(line))}`
  }
  return firstArgToken(acc)
}

function passesSelfExplicitly(receiver: string, firstArg: string): boolean {
  if (firstArg === "") return false
  if (firstArg === "self") return true
  if (firstArg === receiver) return true
  return receiver.endsWith(`(${firstArg})`)
}

const HINT =
  "ESO/lib colon-method dot-called in emitted Lua — `self` is dropped and the first argument shifts into it (TSTL self-shift). Route the receiver through a precisely-typed interface (method shorthand in `.d.ts`, or a `this:`-typed property arrow in `.ts`) so the call lowers to a colon-call."

function isAllowed(
  file: string,
  receiver: string,
  method: string,
  allow: readonly ColonDotAllowEntry[]
): boolean {
  return allow.some(
    (e) =>
      e.method === method &&
      (e.receiver === undefined || e.receiver === receiver) &&
      (e.bundleSuffix === undefined || file.endsWith(e.bundleSuffix))
  )
}

export function scanBundle(
  source: string,
  file: string,
  colonMethods: ReadonlySet<string>,
  allow: readonly ColonDotAllowEntry[] = COLON_DOT_ALLOW
): readonly SelfShiftIssue[] {
  if (colonMethods.size === 0) return []
  const alternation = [...colonMethods].map(escapeRegex).join("|")
  const re = new RegExp(`([A-Za-z0-9_)\\]])\\s*\\.\\s*(${alternation})\\s*\\(`, "g")

  const issues: SelfShiftIssue[] = []
  const lines = source.split("\n")
  const lineStartDepth = functionDepthByLine(source)
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]
    if (line === undefined) continue
    if (line.endsWith("\r")) line = line.slice(0, -1)
    if (line.trim() === "") continue
    const scanLine = stripLineComment(maskStringLiterals(line))
    if (scanLine.trim() === "") continue
    re.lastIndex = 0
    for (
      let parsed = REGEX_EXEC_SCHEMA.parse(re.exec(scanLine));
      parsed !== null;
      parsed = REGEX_EXEC_SCHEMA.parse(re.exec(scanLine))
    ) {
      const method = parsed.method
      const matchStart = parsed.index
      const args = scanLine.slice(re.lastIndex)
      const before = scanLine.slice(0, matchStart + 1)
      const isDefinition = /\bfunction\s+[A-Za-z0-9_.]*$/.test(before)
      const { text: receiver, start } = receiverToken(scanLine, matchStart)
      const firstArg = firstArgTokenMultiline(args, lines, i + 1)
      const passesSelf = passesSelfExplicitly(receiver, firstArg)
      if (!isDefinition && !passesSelf && !isAllowed(file, receiver, method, allow)) {
        const prefix = scanLine.slice(0, matchStart + 1)
        const loadScope =
          (lineStartDepth[i] ?? 0) <= LOAD_SCOPE_MAX_DEPTH && !/\bfunction\b/.test(prefix)
        issues.push({
          file,
          line: i + 1,
          col: start + 1,
          receiver,
          method,
          hint: HINT,
          loadScope,
        })
      }
    }
  }
  return issues
}

export function findForceColonGuardViolations(
  source: string,
  file: string,
  forceColon: readonly string[] = FORCE_COLON_METHODS
): readonly SelfShiftIssue[] {
  if (forceColon.length === 0) return []
  return scanBundle(source, file, new Set(forceColon), [])
}

export function formatIssue(issue: SelfShiftIssue): string {
  return `${issue.file}:${issue.line}:${issue.col}  [tstl-colon-dot-self-shift] ${issue.receiver}.${issue.method}( — ${issue.hint}`
}
