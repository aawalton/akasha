import ts from "typescript"

export type ParsedAugmentation = {
  readonly specifier: string
  readonly augmentedInterfaceNames: readonly string[]
}

export type ParsedSelfAugmentation = {
  readonly localTypeRefs: readonly string[]
}

export const visitForAugmentations = (
  sourceFile: ts.SourceFile
): {
  readonly augmentations: readonly ParsedAugmentation[]
  readonly selfAugmentations: readonly ParsedSelfAugmentation[]
} => {
  const augmentations: ParsedAugmentation[] = []
  const selfAugmentations: ParsedSelfAugmentation[] = []

  const visit = (node: ts.Node): undefined => {
    if (
      ts.isModuleDeclaration(node) &&
      ts.isStringLiteral(node.name) &&
      node.body !== undefined &&
      ts.isModuleBlock(node.body)
    ) {
      const specifier = node.name.text
      if (!specifier.includes("*")) {
        const augmentedNames: string[] = []
        for (const stmt of node.body.statements) {
          if (ts.isInterfaceDeclaration(stmt)) {
            augmentedNames.push(stmt.name.text)
          }
        }

        if (augmentedNames.length > 0) {
          augmentations.push({ specifier, augmentedInterfaceNames: augmentedNames })
        }

        const localTypeRefs = new Set<string>()
        const augmentedSet = new Set(augmentedNames)
        const walkTypeRefs = (n: ts.Node): undefined => {
          if (ts.isTypeReferenceNode(n) && ts.isIdentifier(n.typeName)) {
            const name = n.typeName.text
            if (!augmentedSet.has(name)) {
              localTypeRefs.add(name)
            }
          }
          ts.forEachChild(n, walkTypeRefs)
        }
        walkTypeRefs(node.body)

        if (localTypeRefs.size > 0) {
          selfAugmentations.push({ localTypeRefs: [...localTypeRefs] })
        }
      }
      return
    }
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(sourceFile, visit)
  return { augmentations, selfAugmentations }
}
