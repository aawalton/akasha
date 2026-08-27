import ts from "typescript"

export type SourceTree = {
  readonly files: readonly string[]
  readonly read: (path: string) => string | null
}

export type Site = { readonly path: string; readonly node: ts.Node }

const MODULE_EXTENSIONS: readonly string[] = [".ts", ".tsx", ".mts", ".cts", ""]
const INDEX_NAMES: readonly string[] = ["/index.ts", "/index.tsx", "/index.mts"]
const BARE_ENTRIES: readonly string[] = ["src/index.ts", "src/dsl/index.ts", "index.ts"]
const TAIL_DEPTH = 4
export const NESTING_CEILING = 8

const dirOf = (path: string): string => {
  const slash = path.lastIndexOf("/")
  return slash < 0 ? "" : path.slice(0, slash)
}

const normalise = (path: string): string => {
  const out: string[] = []
  for (const segment of path.split("/")) {
    if (segment === "" || segment === ".") continue
    if (segment === "..") {
      out.pop()
      continue
    }
    out.push(segment)
  }
  return out.join("/")
}

export const unwrap = (expr: ts.Expression): ts.Expression => {
  let node = expr
  for (;;) {
    if (
      ts.isParenthesizedExpression(node) ||
      ts.isAsExpression(node) ||
      ts.isSatisfiesExpression(node) ||
      ts.isNonNullExpression(node)
    ) {
      node = node.expression
      continue
    }
    return node
  }
}

export const nameOfProperty = (name: ts.PropertyName): string | null => {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text
  }
  return null
}

export const isFunctionLike = (node: ts.Node): boolean =>
  ts.isFunctionDeclaration(node) || ts.isFunctionExpression(node) || ts.isArrowFunction(node)

const isExported = (node: ts.Node): boolean => {
  const modifiers = ts.canHaveModifiers(node) ? ts.getModifiers(node) : undefined
  if (modifiers === undefined) return false
  return modifiers.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
}

export const pathOfNode = (node: ts.Node, fallback: string): string => {
  const sourceFile = node.getSourceFile()
  return sourceFile === undefined ? fallback : sourceFile.fileName
}

export const lineOfNode = (node: ts.Node): number => {
  const sourceFile = node.getSourceFile()
  if (sourceFile === undefined) return 0
  return sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1
}

export const textOfNode = (node: ts.Node, ceiling = 100): string => {
  const sourceFile = node.getSourceFile()
  if (sourceFile === undefined) return ""
  const text = node.getText(sourceFile).replace(/\s+/g, " ").trim()
  return text.length > ceiling ? `${text.slice(0, ceiling)}...` : text
}

export type ModuleReader = ReturnType<typeof createModuleReader>

export const createModuleReader = (tree: SourceTree) => {
  if (typeof ts.createSourceFile !== "function") {
    throw new Error(
      "graph: the resolved `typescript` carries no compiler API, so no workflow source could be parsed; a native typescript build is standing where the compiler is wanted"
    )
  }

  const parsed = new Map<string, ts.SourceFile | null>()
  const fileSet = new Set(tree.files)
  const packageDirs = new Map<string, string | null>()
  const resolving = new Set<string>()
  let dirsByTail: Map<string, string[]> | null = null

  const sourceFile = (path: string): ts.SourceFile | null => {
    const cached = parsed.get(path)
    if (cached !== undefined) return cached
    const text = tree.read(path)
    const file = text === null ? null : ts.createSourceFile(path, text, ts.ScriptTarget.Latest, true)
    parsed.set(path, file)
    return file
  }

  const tailIndex = (): ReadonlyMap<string, readonly string[]> => {
    if (dirsByTail !== null) return dirsByTail
    const index = new Map<string, string[]>()
    for (const file of tree.files) {
      if (file !== "package.json" && !file.endsWith("/package.json")) continue
      const segments = dirOf(file).split("/")
      for (let depth = 1; depth <= TAIL_DEPTH && depth <= segments.length; depth += 1) {
        const tail = segments.slice(segments.length - depth).join("-")
        const bucket = index.get(tail)
        if (bucket === undefined) index.set(tail, [dirOf(file)])
        else bucket.push(dirOf(file))
      }
    }
    dirsByTail = index
    return index
  }

  const manifestOf = (dir: string): Record<string, unknown> | null => {
    const text = tree.read(`${dir}/package.json`)
    if (text === null) return null
    try {
      const value: unknown = JSON.parse(text)
      return typeof value === "object" && value !== null ? (value as Record<string, unknown>) : null
    } catch {
      return null
    }
  }

  const packageDirFor = (packageName: string): string | null => {
    const cached = packageDirs.get(packageName)
    if (cached !== undefined) return cached
    const tail = packageName.startsWith("@")
      ? packageName.slice(packageName.indexOf("/") + 1)
      : packageName
    let found: string | null = null
    for (const dir of tailIndex().get(tail) ?? []) {
      if (manifestOf(dir)?.name !== packageName) continue
      found = dir
      break
    }
    packageDirs.set(packageName, found)
    return found
  }

  const existingModule = (base: string): string | null => {
    const stripped = base.endsWith(".js") ? base.slice(0, -3) : base
    for (const extension of MODULE_EXTENSIONS) {
      const candidate = `${stripped}${extension}`
      if (candidate !== "" && fileSet.has(candidate)) return candidate
    }
    for (const index of INDEX_NAMES) {
      if (fileSet.has(`${stripped}${index}`)) return `${stripped}${index}`
    }
    return null
  }

  const resolveModule = (fromPath: string, specifier: string): string | null => {
    if (specifier.startsWith(".")) {
      return existingModule(normalise(`${dirOf(fromPath)}/${specifier}`))
    }
    if (specifier.startsWith("node:") || specifier.startsWith("bun:")) return null
    const segments = specifier.split("/")
    const scoped = specifier.startsWith("@")
    const packageName = scoped ? segments.slice(0, 2).join("/") : segments[0]
    if (packageName === undefined) return null
    const subPath = segments.slice(scoped ? 2 : 1).join("/")
    const dir = packageDirFor(packageName)
    if (dir === null) return null

    const exported = manifestOf(dir)?.exports
    const key = subPath === "" ? "." : `./${subPath}`
    if (typeof exported === "object" && exported !== null) {
      const target = (exported as Record<string, unknown>)[key]
      if (typeof target === "string") return existingModule(normalise(`${dir}/${target}`))
    }
    if (subPath !== "") return existingModule(normalise(`${dir}/${subPath}`))
    for (const entry of BARE_ENTRIES) {
      const candidate = normalise(`${dir}/${entry}`)
      if (fileSet.has(candidate)) return candidate
    }
    return null
  }

  const resolveExport = (modulePath: string, exportName: string): Site | null => {
    const token = `${modulePath}\u0000${exportName}`
    if (resolving.has(token)) return null
    resolving.add(token)
    try {
      return resolveExportOnce(modulePath, exportName)
    } finally {
      resolving.delete(token)
    }
  }

  const resolveExportOnce = (modulePath: string, exportName: string): Site | null => {
    const file = sourceFile(modulePath)
    if (file === null) return null
    const starSpecifiers: string[] = []

    for (const statement of file.statements) {
      if (ts.isVariableStatement(statement) && isExported(statement)) {
        for (const declaration of statement.declarationList.declarations) {
          if (!ts.isIdentifier(declaration.name)) continue
          if (declaration.name.text !== exportName) continue
          if (declaration.initializer === undefined) return null
          return { path: modulePath, node: declaration.initializer }
        }
        continue
      }
      if (ts.isFunctionDeclaration(statement) && isExported(statement)) {
        if (statement.name?.text === exportName) return { path: modulePath, node: statement }
        continue
      }
      if (ts.isExportAssignment(statement) && statement.isExportEquals !== true) {
        if (exportName === "default") return { path: modulePath, node: statement.expression }
        continue
      }
      if (!ts.isExportDeclaration(statement)) continue
      const specifier = statement.moduleSpecifier
      const clause = statement.exportClause
      if (clause === undefined) {
        if (specifier !== undefined && ts.isStringLiteral(specifier)) {
          starSpecifiers.push(specifier.text)
        }
        continue
      }
      if (!ts.isNamedExports(clause)) continue
      for (const element of clause.elements) {
        if (element.name.text !== exportName) continue
        const local = element.propertyName?.text ?? element.name.text
        if (specifier !== undefined && ts.isStringLiteral(specifier)) {
          const target = resolveModule(modulePath, specifier.text)
          return target === null ? null : resolveExport(target, local)
        }
        return resolveLocal(modulePath, local)
      }
    }

    for (const specifier of starSpecifiers) {
      const target = resolveModule(modulePath, specifier)
      if (target === null) continue
      const hit = resolveExport(target, exportName)
      if (hit !== null) return hit
    }
    return null
  }

  const resolveLocal = (modulePath: string, name: string): Site | null => {
    const file = sourceFile(modulePath)
    if (file === null) return null
    for (const statement of file.statements) {
      if (ts.isVariableStatement(statement)) {
        for (const declaration of statement.declarationList.declarations) {
          if (!ts.isIdentifier(declaration.name)) continue
          if (declaration.name.text !== name) continue
          if (declaration.initializer === undefined) return null
          return { path: modulePath, node: declaration.initializer }
        }
        continue
      }
      if (ts.isFunctionDeclaration(statement) && statement.name?.text === name) {
        return { path: modulePath, node: statement }
      }
      if (!ts.isImportDeclaration(statement)) continue
      const clause = statement.importClause
      const specifier = statement.moduleSpecifier
      if (clause === undefined || !ts.isStringLiteral(specifier)) continue
      if (clause.name?.text === name) {
        const target = resolveModule(modulePath, specifier.text)
        return target === null ? null : resolveExport(target, "default")
      }
      const bindings = clause.namedBindings
      if (bindings === undefined || !ts.isNamedImports(bindings)) continue
      for (const element of bindings.elements) {
        if (element.name.text !== name) continue
        const target = resolveModule(modulePath, specifier.text)
        const imported = element.propertyName?.text ?? element.name.text
        return target === null ? null : resolveExport(target, imported)
      }
    }
    return null
  }

  return {
    sourceFile,
    resolveModule,
    resolveExport,
    resolveLocal,
  }
}
