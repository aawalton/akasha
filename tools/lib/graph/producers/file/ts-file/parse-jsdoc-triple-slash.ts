import ts from "typescript"

export const extractJsdocImports = (sourceFile: ts.SourceFile): readonly string[] => {
  const out: string[] = []
  const seenDocs = new Set<ts.Node>()
  const visit = (node: ts.Node): undefined => {
    const docs = ts.getJSDocCommentsAndTags(node)
    for (const docOrTag of docs) {
      if (!ts.isJSDoc(docOrTag)) continue
      if (seenDocs.has(docOrTag)) continue
      seenDocs.add(docOrTag)
      const tags = docOrTag.tags
      if (tags === undefined) continue
      for (const tag of tags) {
        if (!ts.isJSDocTypeTag(tag)) continue
        const typeExpr = tag.typeExpression
        if (typeExpr === undefined) continue
        const inner = typeExpr.type
        if (!ts.isImportTypeNode(inner)) continue
        const arg = inner.argument
        if (!ts.isLiteralTypeNode(arg)) continue
        const lit = arg.literal
        if (!ts.isStringLiteral(lit)) continue
        out.push(lit.text)
      }
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(sourceFile, visit)
  return out
}

export const extractTripleSlashRefs = (sourceFile: ts.SourceFile): readonly string[] => {
  const out: string[] = []
  for (const ref of sourceFile.typeReferenceDirectives) {
    out.push(ref.fileName)
  }
  return out
}
