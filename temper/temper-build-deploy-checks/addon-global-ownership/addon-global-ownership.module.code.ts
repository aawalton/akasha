import ts from "typescript"

export interface ParsedAddonSource {
  readonly path: string
  readonly sf: ts.SourceFile
}

export function parseAddonSource(path: string, source: string): ParsedAddonSource {
  return { path, sf: ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true) }
}

export interface AddonOwnershipInput {
  readonly addonName: string
  readonly writtenGlobals: readonly string[]
  readonly savedVariables: readonly string[]
}

export interface OwnershipViolation {
  readonly message: string
  readonly globalName: string
  readonly addons: readonly string[]
  readonly remedy: string
}

export const OWNED_GLOBAL_REMEDY = [
  "one port owns each global, so delete the write from every port but the owner.",
  "A port that needs the owner's table READS it — `globalThis.<name>.member(…)` is fine and always was;",
  "it is the re-assignment that hands the outcome to ESO's AddOns/ load order.",
  "A port that needs a table of its own publishes it under a name of its own rather than the contended one.",
  "Where the claim comes from `addon.json#savedVariables`, the non-owner renames its saved-variables table —",
  "deleting the entry drops the player's stored data instead of moving it.",
  "Before renaming anything, ask what already depends on the name:",
  "akasha temper-addon-global-name-dependents --global <name>",
].join(" ")

const GLOBAL_TABLE_IDENTIFIERS: ReadonlySet<string> = new Set(["globalThis", "_G"])

function unwrap(node: ts.Expression): ts.Expression {
  let current: ts.Expression = node
  for (;;) {
    if (
      ts.isParenthesizedExpression(current) ||
      ts.isAsExpression(current) ||
      ts.isSatisfiesExpression(current) ||
      ts.isNonNullExpression(current) ||
      ts.isTypeAssertionExpression(current)
    ) {
      current = current.expression
      continue
    }
    return current
  }
}

function isGlobalTable(node: ts.Expression, bound: ReadonlySet<string>): boolean {
  const expr = unwrap(node)
  if (ts.isIdentifier(expr)) {
    return GLOBAL_TABLE_IDENTIFIERS.has(expr.text) || bound.has(expr.text)
  }
  if (ts.isCallExpression(expr) && expr.arguments.length === 1) {
    const arg = expr.arguments[0]
    return arg !== undefined && isGlobalTable(arg, bound)
  }
  return false
}

function boundGlobalTableNames(sf: ts.SourceFile): ReadonlySet<string> {
  const declarations = new Map<string, ts.Expression[]>()
  const collect = (node: ts.Node): undefined => {
    if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.initializer) {
      const initializers = declarations.get(node.name.text) ?? []
      initializers.push(node.initializer)
      declarations.set(node.name.text, initializers)
    }
    ts.forEachChild(node, collect)
  }
  collect(sf)

  const bound = new Set<string>()
  for (;;) {
    let grew = false
    for (const [name, initializers] of declarations) {
      if (bound.has(name)) continue
      if (initializers.every((init) => isGlobalTable(init, bound))) {
        bound.add(name)
        grew = true
      }
    }
    if (!grew) return bound
  }
}

export function collectGlobalWritesFromSourceFile(sf: ts.SourceFile): readonly string[] {
  const bound = boundGlobalTableNames(sf)
  const names = new Set<string>()

  const visit = (node: ts.Node): undefined => {
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.EqualsToken) {
      const lhs = unwrap(node.left)
      if (ts.isPropertyAccessExpression(lhs) && isGlobalTable(lhs.expression, bound)) {
        names.add(lhs.name.text)
      } else if (
        ts.isElementAccessExpression(lhs) &&
        isGlobalTable(lhs.expression, bound) &&
        ts.isStringLiteralLike(lhs.argumentExpression)
      ) {
        names.add(lhs.argumentExpression.text)
      }
    }
    ts.forEachChild(node, visit)
  }
  visit(sf)

  return [...names].sort()
}

export function collectGlobalWritesFromSource(source: string, filePath: string): readonly string[] {
  return collectGlobalWritesFromSourceFile(parseAddonSource(filePath, source).sf)
}

export function findOwnershipViolations(
  inputs: readonly AddonOwnershipInput[]
): readonly OwnershipViolation[] {
  const claimants = new Map<string, Set<string>>()
  const claim = (globalName: string, addon: string): undefined => {
    const set = claimants.get(globalName) ?? new Set<string>()
    set.add(addon)
    claimants.set(globalName, set)
  }

  for (const input of inputs) {
    for (const g of input.writtenGlobals) claim(g, input.addonName)
    for (const g of input.savedVariables) claim(g, input.addonName)
  }

  const violations: OwnershipViolation[] = []
  for (const [globalName, addonSet] of claimants) {
    if (addonSet.size < 2) continue
    const addons = [...addonSet].sort()
    violations.push({
      globalName,
      addons,
      message: `global \`${globalName}\` is claimed by ${addons.length} addons (${addons.join(", ")}) — exactly one port may own a global; load order decides which write wins at runtime`,
      remedy: OWNED_GLOBAL_REMEDY,
    })
  }

  violations.sort((a, b) => a.globalName.localeCompare(b.globalName))
  return violations
}
