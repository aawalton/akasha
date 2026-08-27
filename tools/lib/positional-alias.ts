
export interface PositionalShape {
  readonly name: string
  readonly aliasOfFlag: string | undefined
  readonly description: string
}

export interface RequiredValueFlag {
  readonly name: string
  readonly valueShape: "prose" | "line" | "token"
}

export interface CommandArgShape {
  readonly command: string
  readonly requiredValueFlags: readonly RequiredValueFlag[]
  readonly positionals: readonly PositionalShape[]
}

export interface PositionalAliasViolation {
  readonly command: string
  readonly problem: "missing-positional-alias" | "redundant-alias-note"
  readonly identifiers: readonly string[]
  readonly positional: string
}

export function deriveSubjectIdentifierFlags(verbs: readonly CommandArgShape[]): ReadonlySet<string> {
  const names = new Set<string>()
  for (const verb of verbs) {
    for (const positional of verb.positionals) {
      if (positional.aliasOfFlag !== undefined) names.add(positional.aliasOfFlag)
    }
  }
  return names
}

export function isCreateShaped(command: string): boolean {
  const terminal = command.split(" ").at(-1)
  return terminal === "create" || terminal === "upsert"
}

function identifiersOf(
  verb: CommandArgShape,
  subjectIdentifierFlags: ReadonlySet<string>
): readonly string[] {
  return verb.requiredValueFlags
    .filter((flag) => flag.valueShape === "token" && subjectIdentifierFlags.has(flag.name))
    .map((flag) => flag.name)
}

function findMissingAlias(
  verb: CommandArgShape,
  subjectIdentifierFlags: ReadonlySet<string>
): PositionalAliasViolation | undefined {
  const identifiers = identifiersOf(verb, subjectIdentifierFlags)
  if (identifiers.length === 0) return undefined
  if (verb.positionals.some((one) => one.aliasOfFlag === undefined)) return undefined
  if (isCreateShaped(verb.command)) return undefined
  const aliased = new Set(
    verb.positionals.map((one) => one.aliasOfFlag).filter((name): name is string => name !== undefined)
  )
  if (identifiers.some((name) => aliased.has(name))) return undefined
  return { command: verb.command, problem: "missing-positional-alias", identifiers, positional: "" }
}

function findRedundantNotes(verb: CommandArgShape): readonly PositionalAliasViolation[] {
  return verb.positionals
    .filter((one) => one.aliasOfFlag !== undefined && /alias of/i.test(one.description))
    .map((one) => ({
      command: verb.command,
      problem: "redundant-alias-note" as const,
      identifiers: [],
      positional: one.name,
    }))
}

export function findPositionalAliasViolations(
  verbs: readonly CommandArgShape[],
  subjectIdentifierFlags: ReadonlySet<string>
): readonly PositionalAliasViolation[] {
  const violations: PositionalAliasViolation[] = []
  for (const verb of verbs) {
    const missing = findMissingAlias(verb, subjectIdentifierFlags)
    if (missing !== undefined) violations.push(missing)
    violations.push(...findRedundantNotes(verb))
  }
  return violations
}
