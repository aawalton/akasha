import { Glob } from "bun"
import { parse } from "yaml"
import { z } from "zod"

const ruleDocSchema = z.looseObject({
  id: z.string().min(1),
  language: z.string().min(1),
  files: z.array(z.string()).default([]),
  ignores: z.array(z.string()).default([]),
})

export interface AstGrepRule {
  readonly id: string
  readonly path: string
  readonly language: string
  readonly filesGlobs: readonly string[]
  readonly ignoresGlobs: readonly string[]
}

export interface AstGrepWorkspace {
  readonly name: string
  readonly dir: string
}

export interface AstGrepViolation {
  readonly message: string
  readonly file: string
  readonly line?: number
}

const GLOB_WILDCARD = /[*?[\]{}]/

export interface WalkedEntity {
  readonly path: string
  readonly language: string
  readonly appliedRuleCount: number
}

const ENTITY_LINE = /^sg: entity\|file\|(.+?): language=(\w+),appliedRuleCount=(\d+)$/gm

export function parseWalkedEntities(inspectStderr: string): readonly WalkedEntity[] {
  const entities: WalkedEntity[] = []
  for (const match of inspectStderr.matchAll(ENTITY_LINE)) {
    entities.push({
      path: match[1] ?? "",
      language: match[2] ?? "",
      appliedRuleCount: Number(match[3]),
    })
  }
  return entities
}

const LANGUAGE_ALIASES: Readonly<Record<string, string>> = {
  cs: "csharp",
  js: "javascript",
  jsx: "javascript",
  kt: "kotlin",
  py: "python",
  rb: "ruby",
  sh: "bash",
  ts: "typescript",
  yml: "yaml",
}

export function normalizeLanguage(name: string): string {
  const lower = name.toLowerCase()
  return LANGUAGE_ALIASES[lower] ?? lower
}

interface CompiledGlob {
  readonly glob: Glob
  readonly onBasename: boolean
}

function compileGlob(pattern: string): CompiledGlob {
  return { glob: new Glob(pattern), onBasename: !pattern.includes("/") }
}

function basename(path: string): string {
  return path.slice(path.lastIndexOf("/") + 1)
}

function matchesAny(globs: readonly CompiledGlob[], path: string): boolean {
  return globs.some(({ glob, onBasename }) =>
    z.boolean().parse(glob.match(onBasename ? basename(path) : path))
  )
}

export function deriveRulePopulations(
  rules: readonly AstGrepRule[],
  entities: readonly WalkedEntity[]
): ReadonlyMap<string, readonly string[]> {
  const compiled = rules.map((rule) => ({
    path: rule.path,
    language: normalizeLanguage(rule.language),
    files: rule.filesGlobs.map(compileGlob),
    ignores: rule.ignoresGlobs.map(compileGlob),
  }))
  const populations = new Map<string, string[]>(rules.map((rule) => [rule.path, []]))
  for (const entity of entities) {
    const entityLanguage = normalizeLanguage(entity.language)
    for (const { path, language, files, ignores } of compiled) {
      if (language !== entityLanguage) continue
      if (files.length > 0 && !matchesAny(files, entity.path)) continue
      if (matchesAny(ignores, entity.path)) continue
      populations.get(path)?.push(entity.path)
    }
  }
  return populations
}

export function duplicateRuleIds(
  rules: readonly AstGrepRule[]
): ReadonlyMap<string, readonly string[]> {
  const byId = new Map<string, string[]>()
  for (const rule of rules) {
    const paths = byId.get(rule.id) ?? []
    paths.push(rule.path)
    byId.set(rule.id, paths)
  }
  return new Map([...byId].filter(([, paths]) => paths.length > 1))
}

export interface PopulationDisagreement {
  readonly path: string
  readonly language: string
  readonly derived: number
  readonly observed: number
}

export function reconcilePopulations(
  populations: ReadonlyMap<string, readonly string[]>,
  entities: readonly WalkedEntity[]
): readonly PopulationDisagreement[] {
  const derived = new Map<string, number>()
  for (const paths of populations.values()) {
    for (const path of paths) derived.set(path, (derived.get(path) ?? 0) + 1)
  }
  const disagreements: PopulationDisagreement[] = []
  const observed = new Map<string, { count: number; languages: string[] }>()
  for (const entity of entities) {
    const seen = observed.get(entity.path) ?? { count: 0, languages: [] }
    seen.count += entity.appliedRuleCount
    seen.languages.push(entity.language)
    observed.set(entity.path, seen)
  }
  for (const [path, seen] of observed) {
    const count = derived.get(path) ?? 0
    if (count !== seen.count) {
      disagreements.push({
        path,
        language: seen.languages.join("+"),
        derived: count,
        observed: seen.count,
      })
    }
  }
  for (const [path, count] of derived) {
    if (!observed.has(path)) {
      disagreements.push({ path, language: "not walked", derived: count, observed: 0 })
    }
  }
  return disagreements
}

export function stripInspectTrace(stderr: string): string {
  return stderr
    .split("\n")
    .filter((line) => !line.startsWith("sg: "))
    .join("\n")
    .trim()
}

export function globLiteralPrefix(glob: string): string {
  const segments = glob.split("/")
  const wildcardAt = segments.findIndex((s) => GLOB_WILDCARD.test(s))
  const literal = wildcardAt === -1 ? segments.slice(0, -1) : segments.slice(0, wildcardAt)
  return literal.join("/")
}

export function parseRuleDoc(text: string, path: string): AstGrepRule {
  const doc = ruleDocSchema.safeParse(parse(text))
  if (!doc.success) {
    throw new Error(
      `ast-grep rule ${path} cannot be run or reported on: ${z.prettifyError(doc.error)}`
    )
  }
  return {
    id: doc.data.id,
    path,
    language: doc.data.language,
    filesGlobs: doc.data.files,
    ignoresGlobs: doc.data.ignores,
  }
}

export interface AstGrepWatchPlan {
  readonly seeds: readonly string[]
  readonly repoWide: boolean
}

export function planAstGrepWatch(
  rules: readonly AstGrepRule[],
  workspaces: readonly AstGrepWorkspace[]
): AstGrepWatchPlan {
  const seeds = new Set<string>()
  let repoWide = false
  for (const rule of rules) {
    if (rule.filesGlobs.length === 0) repoWide = true
    for (const glob of rule.filesGlobs) {
      const prefix = globLiteralPrefix(glob)
      const owner = workspaces
        .filter((w) => prefix === w.dir || prefix.startsWith(`${w.dir}/`))
        .sort((a, b) => b.dir.length - a.dir.length)[0]
      if (owner === undefined) repoWide = true
      else seeds.add(`package:code:${owner.name}`)
    }
  }
  return { seeds: [...seeds].sort(), repoWide }
}

export interface AstGrepFinding {
  readonly ruleId: string
  readonly file: string
  readonly line: number
  readonly message: string
}

export function decideRuleOutcome(args: {
  rule: AstGrepRule
  populationSize: number
  findings: readonly AstGrepFinding[]
}): readonly AstGrepViolation[] {
  const { rule, populationSize, findings } = args
  if (populationSize === 0) {
    return [
      {
        file: rule.path,
        message:
          `ast-grep rule \`${rule.id}\` matched no files — a rule with no population verifies nothing and is ` +
          `not a passing rule. Its \`files:\` globs are repo-root-relative; check they name paths that exist.`,
      },
    ]
  }
  return findings.map((finding) => ({
    file: finding.file,
    line: finding.line + 1,
    message: `ast-grep rule \`${rule.id}\`: ${finding.message.trim()}`,
  }))
}
