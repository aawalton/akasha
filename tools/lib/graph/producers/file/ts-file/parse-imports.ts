import ts from "typescript"
import type { ImportedSymbol } from "./types.ts"

export const DYNAMIC_IMPORT_SUFFIX_PREFIX = "[dynamic-import-suffix]"

export type ParsedStaticImport = {
  readonly specifier: string
  readonly typeOnly: boolean
  readonly importedSymbols: readonly ImportedSymbol[]
}

export type ParsedReExport = {
  readonly specifier: string
  readonly typeOnly: boolean
  readonly importedSymbols: readonly ImportedSymbol[]
  readonly reexportLocalNames: readonly (string | null)[] | null
}

const isStaticImportTypeOnly = (node: ts.ImportDeclaration): boolean => {
  const clause = node.importClause
  if (clause === undefined) return false
  if (clause.isTypeOnly) return true
  if (clause.name !== undefined) return false
  const bindings = clause.namedBindings
  if (bindings === undefined) return false
  if (ts.isNamespaceImport(bindings)) {
    return false
  }
  if (bindings.elements.length === 0) return false
  return bindings.elements.every((el) => el.isTypeOnly)
}

const collectImportedSymbols = (node: ts.ImportDeclaration): readonly ImportedSymbol[] => {
  const clause = node.importClause
  if (clause === undefined) return [null]
  const symbols: ImportedSymbol[] = []
  if (clause.name !== undefined) symbols.push("default")
  const bindings = clause.namedBindings
  if (bindings !== undefined) {
    if (ts.isNamespaceImport(bindings)) {
      symbols.push("*")
    } else {
      for (const el of bindings.elements) {
        symbols.push(el.propertyName?.text ?? el.name.text)
      }
    }
  }
  return symbols
}

const isReExportTypeOnly = (node: ts.ExportDeclaration): boolean => {
  if (node.isTypeOnly) return true
  const clause = node.exportClause
  if (clause === undefined) return false
  if (ts.isNamespaceExport(clause)) return false
  if (clause.elements.length === 0) return false
  return clause.elements.every((el) => el.isTypeOnly)
}

const collectReExportNames = (
  node: ts.ExportDeclaration
): {
  readonly importedSymbols: readonly ImportedSymbol[]
  readonly reexportLocalNames: readonly (string | null)[] | null
} => {
  const clause = node.exportClause
  if (clause === undefined) {
    return { importedSymbols: ["*"], reexportLocalNames: null }
  }
  if (ts.isNamespaceExport(clause)) {
    return { importedSymbols: ["*"], reexportLocalNames: null }
  }
  const importedSymbols: ImportedSymbol[] = []
  const reexportLocalNames: string[] = []
  for (const elem of clause.elements) {
    importedSymbols.push(elem.propertyName?.text ?? elem.name.text)
    reexportLocalNames.push(elem.name.text)
  }
  return { importedSymbols, reexportLocalNames }
}

export const visitForImports = (
  sourceFile: ts.SourceFile
): {
  readonly staticImports: readonly ParsedStaticImport[]
  readonly dynamicImports: readonly string[]
  readonly reExports: readonly ParsedReExport[]
} => {
  const staticImports: ParsedStaticImport[] = []
  const dynamicImports: string[] = []
  const reExports: ParsedReExport[] = []
  const visit = (node: ts.Node): undefined => {
    if (ts.isImportDeclaration(node)) {
      if (ts.isStringLiteral(node.moduleSpecifier)) {
        staticImports.push({
          specifier: node.moduleSpecifier.text,
          typeOnly: isStaticImportTypeOnly(node),
          importedSymbols: collectImportedSymbols(node),
        })
      }
      return
    }

    if (ts.isExportDeclaration(node)) {
      if (node.moduleSpecifier !== undefined && ts.isStringLiteral(node.moduleSpecifier)) {
        const names = collectReExportNames(node)
        reExports.push({
          specifier: node.moduleSpecifier.text,
          typeOnly: isReExportTypeOnly(node),
          importedSymbols: names.importedSymbols,
          reexportLocalNames: names.reexportLocalNames,
        })
      }
      return
    }

    if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments[0] !== undefined
    ) {
      const arg = node.arguments[0]
      if (ts.isStringLiteral(arg)) {
        dynamicImports.push(arg.text)
      } else if (ts.isTemplateExpression(arg)) {
        const lastSpan = arg.templateSpans[arg.templateSpans.length - 1]
        if (lastSpan !== undefined) {
          const tail = lastSpan.literal.text
          if (tail.length > 0 && tail.includes("/")) {
            dynamicImports.push(`${DYNAMIC_IMPORT_SUFFIX_PREFIX}${tail}`)
          }
        }
      }
    }

    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === "require" &&
      node.arguments.length === 1
    ) {
      const arg = node.arguments[0]
      if (arg !== undefined && ts.isStringLiteral(arg)) {
        dynamicImports.push(arg.text)
      }
    }

    ts.forEachChild(node, visit)
  }
  ts.forEachChild(sourceFile, visit)
  return { staticImports, dynamicImports, reExports }
}
