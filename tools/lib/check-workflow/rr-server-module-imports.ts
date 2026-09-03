import { dirname, join, resolve } from "node:path"
import ts from "typescript"
import { z } from "zod"
import type { Violation } from "../../../akasha/checks/cluster-checks/modules/violation-reporting/violation-reporting.module.code.ts"
import { requireMatchPositional } from "../narrow.ts"

const APP_DIRECTORY_RE = /appDirectory\s*:\s*["']([^"']+)["']/
const APP_DIRECTORY_CAPTURE_SCHEMA = z.tuple([z.string()])
const SERVER_FILE_RE = /\.server(\.[cm]?[jt]sx?)?$/
const SERVER_DIR_RE = /\/\.server\//
const TEST_FILE_RE = /\.test\.[cm]?[jt]sx?$/
const MODULE_FILE_RE = /\.[cm]?[jt]sx?$/

export function parseAppDirectory(configText: string | undefined): string {
  if (configText === undefined || !APP_DIRECTORY_RE.test(configText)) return "app"
  const [dir] = requireMatchPositional(APP_DIRECTORY_RE, APP_DIRECTORY_CAPTURE_SCHEMA, configText)
  return dir
}

export function resolveConfigAppDir(configAbsPath: string, configText: string | undefined): string {
  return resolve(dirname(configAbsPath), parseAppDirectory(configText))
}

export function isServerModulePath(path: string): boolean {
  return SERVER_FILE_RE.test(path) || SERVER_DIR_RE.test(path)
}

export function isServerSpecifier(specifier: string): boolean {
  return SERVER_FILE_RE.test(specifier) || SERVER_DIR_RE.test(specifier)
}

export function isTestFilePath(path: string): boolean {
  return TEST_FILE_RE.test(path)
}

export interface ServerImportRef {
  readonly specifier: string
  readonly line: number
}

export interface ServerInClientViolation extends Violation {
  readonly file: string
  readonly line: number
  readonly specifier: string
}

export function extractRouteModulePaths(
  appDir: string,
  routesText: string | undefined
): ReadonlySet<string> {
  const set = new Set<string>([join(appDir, "root.tsx"), join(appDir, "entry.server.tsx")])
  if (routesText === undefined) return set
  const sourceFile = ts.createSourceFile(
    "routes.ts",
    routesText,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS
  )
  const visit = (node: ts.Node): undefined => {
    if (ts.isStringLiteral(node) && MODULE_FILE_RE.test(node.text)) {
      set.add(join(appDir, node.text))
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)
  return set
}

export function isExemptImporter(
  absPath: string,
  appDir: string,
  routeModules: ReadonlySet<string>
): boolean {
  if (isServerModulePath(absPath)) return true
  if (isTestFilePath(absPath)) return true
  if (absPath === join(appDir, "routes.ts")) return true
  return routeModules.has(absPath)
}

function lineOf(sourceFile: ts.SourceFile, node: ts.Node): number {
  return sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1
}

function importDeclarationIsTypeOnly(clause: ts.ImportClause): boolean {
  if (clause.isTypeOnly) return true
  if (clause.name !== undefined) return false
  const bindings = clause.namedBindings
  if (bindings === undefined) return false
  if (ts.isNamespaceImport(bindings)) return false
  return bindings.elements.every((el) => el.isTypeOnly)
}

function exportDeclarationIsTypeOnly(decl: ts.ExportDeclaration): boolean {
  if (decl.isTypeOnly) return true
  const clause = decl.exportClause
  if (clause === undefined) return false
  if (ts.isNamespaceExport(clause)) return false
  return clause.elements.every((el) => el.isTypeOnly)
}

function dynamicImportSpecifier(node: ts.CallExpression): string | undefined {
  if (node.expression.kind !== ts.SyntaxKind.ImportKeyword) return undefined
  const arg = node.arguments[0]
  if (arg === undefined || !ts.isStringLiteral(arg)) return undefined
  return arg.text
}

export function extractValueServerImports(
  filePath: string,
  text: string
): readonly ServerImportRef[] {
  const sourceFile = ts.createSourceFile(
    filePath,
    text,
    ts.ScriptTarget.Latest,
    true,
    filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  )
  const refs: ServerImportRef[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isImportDeclaration(node)) {
      const mod = node.moduleSpecifier
      if (ts.isStringLiteral(mod) && isServerSpecifier(mod.text)) {
        const typeOnly =
          node.importClause !== undefined && importDeclarationIsTypeOnly(node.importClause)
        if (!typeOnly) refs.push({ specifier: mod.text, line: lineOf(sourceFile, mod) })
      }
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier !== undefined) {
      const mod = node.moduleSpecifier
      if (
        ts.isStringLiteral(mod) &&
        isServerSpecifier(mod.text) &&
        !exportDeclarationIsTypeOnly(node)
      ) {
        refs.push({ specifier: mod.text, line: lineOf(sourceFile, mod) })
      }
    } else if (ts.isCallExpression(node)) {
      const spec = dynamicImportSpecifier(node)
      if (spec !== undefined && isServerSpecifier(spec)) {
        refs.push({ specifier: spec, line: lineOf(sourceFile, node) })
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sourceFile)
  return refs
}

export function scanFileForServerLeaks(args: {
  readonly absPath: string
  readonly relPath: string
  readonly text: string
  readonly appDir: string
  readonly routeModules: ReadonlySet<string>
}): readonly ServerInClientViolation[] {
  if (isExemptImporter(args.absPath, args.appDir, args.routeModules)) return []
  return extractValueServerImports(args.relPath, args.text).map((ref) => ({
    file: args.relPath,
    line: ref.line,
    specifier: ref.specifier,
  }))
}
