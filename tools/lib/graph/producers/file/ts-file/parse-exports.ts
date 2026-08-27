import ts from "typescript"
import type { TsFileExport, TsFileExportKind } from "./types.ts"

const lineOf = (sourceFile: ts.SourceFile, pos: number): number =>
  sourceFile.getLineAndCharacterOfPosition(pos).line + 1

const hasExportModifier = (node: ts.Node): boolean =>
  ts.canHaveModifiers(node) &&
  (ts.getModifiers(node)?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword) ?? false)

const hasDefaultModifier = (node: ts.Node): boolean =>
  ts.canHaveModifiers(node) &&
  (ts.getModifiers(node)?.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword) ?? false)

const exportKindFromNode = (node: ts.Node): TsFileExportKind => {
  if (ts.isFunctionDeclaration(node)) return "function"
  if (ts.isClassDeclaration(node)) return "class"
  if (ts.isInterfaceDeclaration(node)) return "interface"
  if (ts.isTypeAliasDeclaration(node)) return "type"
  if (ts.isEnumDeclaration(node)) return "enum"
  if (ts.isModuleDeclaration(node)) return "namespace"
  if (ts.isVariableStatement(node)) {
    const flags = node.declarationList.flags
    if ((flags & ts.NodeFlags.Const) !== 0) return "const"
    if ((flags & ts.NodeFlags.Let) !== 0) return "let"
    return "var"
  }
  return "const"
}

const collectSignatureTypeRefs = (node: ts.Node): readonly string[] => {
  const refs = new Set<string>()
  const visit = (n: ts.Node | undefined): undefined => {
    if (n === undefined) return
    if (ts.isTypeReferenceNode(n) && ts.isIdentifier(n.typeName)) {
      refs.add(n.typeName.text)
    }
    ts.forEachChild(n, visit)
  }
  if (ts.isFunctionDeclaration(node)) {
    visit(node.type)
    for (const p of node.parameters) visit(p.type)
  } else if (ts.isVariableStatement(node)) {
    for (const decl of node.declarationList.declarations) {
      visit(decl.type)
      if (decl.initializer !== undefined && ts.isArrowFunction(decl.initializer)) {
        visit(decl.initializer.type)
        for (const p of decl.initializer.parameters) visit(p.type)
      }
    }
  } else if (ts.isTypeAliasDeclaration(node)) {
    visit(node.type)
  } else if (ts.isInterfaceDeclaration(node)) {
    for (const member of node.members) {
      if (ts.isPropertySignature(member)) visit(member.type)
      if (ts.isMethodSignature(member)) {
        visit(member.type)
        for (const p of member.parameters) visit(p.type)
      }
    }
  } else if (ts.isClassDeclaration(node)) {
    for (const member of node.members) {
      if (ts.isPropertyDeclaration(member)) visit(member.type)
      if (ts.isMethodDeclaration(member)) {
        visit(member.type)
        for (const p of member.parameters) visit(p.type)
      }
    }
  }
  return [...refs]
}

export const visitForExports = (sourceFile: ts.SourceFile): readonly TsFileExport[] => {
  const exports: TsFileExport[] = []

  for (const stmt of sourceFile.statements) {
    if (hasExportModifier(stmt)) {
      const kind = exportKindFromNode(stmt)
      const typeOnly = ts.isInterfaceDeclaration(stmt) || ts.isTypeAliasDeclaration(stmt)
      const line = lineOf(sourceFile, stmt.getStart(sourceFile))
      if (hasDefaultModifier(stmt)) {
        exports.push({ name: "default", line, kind: "default", typeOnly: false })
        continue
      }
      if (
        ts.isFunctionDeclaration(stmt) ||
        ts.isClassDeclaration(stmt) ||
        ts.isInterfaceDeclaration(stmt) ||
        ts.isEnumDeclaration(stmt) ||
        ts.isModuleDeclaration(stmt) ||
        ts.isTypeAliasDeclaration(stmt)
      ) {
        const nameNode = stmt.name
        if (nameNode !== undefined && ts.isIdentifier(nameNode)) {
          const signatureTypeRefs = collectSignatureTypeRefs(stmt)
          exports.push({
            name: nameNode.text,
            line,
            kind,
            typeOnly,
            ...(signatureTypeRefs.length > 0 ? { signatureTypeRefs } : {}),
          })
        }
        continue
      }
      if (ts.isVariableStatement(stmt)) {
        const signatureTypeRefs = collectSignatureTypeRefs(stmt)
        for (const decl of stmt.declarationList.declarations) {
          if (ts.isIdentifier(decl.name)) {
            const declLine = lineOf(sourceFile, decl.getStart(sourceFile))
            exports.push({
              name: decl.name.text,
              line: declLine,
              kind,
              typeOnly: false,
              ...(signatureTypeRefs.length > 0 ? { signatureTypeRefs } : {}),
            })
          } else if (ts.isObjectBindingPattern(decl.name) || ts.isArrayBindingPattern(decl.name)) {
            for (const elem of decl.name.elements) {
              if (ts.isBindingElement(elem) && ts.isIdentifier(elem.name)) {
                const elemLine = lineOf(sourceFile, elem.getStart(sourceFile))
                exports.push({ name: elem.name.text, line: elemLine, kind, typeOnly: false })
              }
            }
          }
        }
      }
      continue
    }

    if (ts.isExportDeclaration(stmt)) {
      const line = lineOf(sourceFile, stmt.getStart(sourceFile))
      const declTypeOnly = stmt.isTypeOnly
      if (stmt.exportClause !== undefined) {
        if (ts.isNamedExports(stmt.exportClause)) {
          for (const elem of stmt.exportClause.elements) {
            const name = elem.name.text
            exports.push({
              name,
              line: lineOf(sourceFile, elem.getStart(sourceFile)),
              kind: "reexport",
              typeOnly: declTypeOnly || elem.isTypeOnly,
            })
          }
        } else if (ts.isNamespaceExport(stmt.exportClause)) {
          const name = stmt.exportClause.name.text
          exports.push({ name, line, kind: "reexport", typeOnly: declTypeOnly })
        }
      }
      continue
    }

    if (ts.isExportAssignment(stmt)) {
      const line = lineOf(sourceFile, stmt.getStart(sourceFile))
      exports.push({ name: "default", line, kind: "default", typeOnly: false })
    }
  }

  return exports
}
