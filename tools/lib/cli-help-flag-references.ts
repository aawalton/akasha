
import type { CommandHelp } from "../ops/surface.ts"

export const PROSE_KINDS = ["command", "flag", "positional", "env", "exit", "example"] as const

export type ProseKind = (typeof PROSE_KINDS)[number]

export const REFERENCE_VERDICTS = ["own", "other", "foreign", "unattributed"] as const

export type ReferenceVerdict = (typeof REFERENCE_VERDICTS)[number]

export const UNIVERSAL_FLAGS: readonly string[] = ["--help", "-h", "--version"]

export const PROSE_ROUTE_SUFFIX = "-file"

export interface ProseSite {
  readonly kind: ProseKind
  readonly field: string
  readonly text: string
}

export interface FlagSurface {
  readonly command: string
  readonly declaredFlags: readonly string[]
  readonly prose: readonly ProseSite[]
}

export interface FlagReference {
  readonly command: string
  readonly kind: ProseKind
  readonly field: string
  readonly token: string
  readonly verdict: ReferenceVerdict
  readonly program: string | null
  readonly spanLedBy: string | null
}

export interface ReferenceCensus {
  readonly commandsScanned: number
  readonly proseSites: number
  readonly tokens: number
  readonly byVerdict: Readonly<Record<ReferenceVerdict, number>>
  readonly sitesByKind: Readonly<Record<ProseKind, number>>
  readonly references: readonly FlagReference[]
  readonly foreign: readonly FlagReference[]
  readonly unattributed: readonly FlagReference[]
}

const TOKEN_RE = /--[a-zA-Z0-9][a-zA-Z0-9-]*/g

const SPAN_RE = /`([^`\n]+)`/g

function normalize(flag: string): string {
  return `--${flag.replace(/^-+/, "")}`
}

function enclosingSpan(text: string, at: number): readonly string[] | null {
  for (const span of text.matchAll(SPAN_RE)) {
    const open = span.index ?? 0
    if (at <= open || at >= open + span[0].length) continue
    return (span[1] ?? "").trim().split(/\s+/)
  }
  return null
}

function attributingProgram(span: readonly string[] | null): string | null {
  if (span === null) return null
  const first = span[0] ?? ""
  if (first.startsWith("-")) return null
  if (first === "ops") return null
  if (first === "bun" && span[1] === "ops") return null
  return first
}

function classify(input: {
  readonly token: string
  readonly text: string
  readonly at: number
  readonly own: ReadonlySet<string>
  readonly registry: ReadonlySet<string>
}): Pick<FlagReference, "verdict" | "program" | "spanLedBy"> {
  if (input.own.has(input.token)) return { verdict: "own", program: null, spanLedBy: null }
  if (input.registry.has(input.token)) return { verdict: "other", program: null, spanLedBy: null }
  const span = enclosingSpan(input.text, input.at)
  const program = attributingProgram(span)
  if (program !== null) return { verdict: "foreign", program, spanLedBy: null }
  const lead = span?.[0] ?? ""
  return { verdict: "unattributed", program: null, spanLedBy: lead.startsWith("-") ? lead : null }
}

function zeroedCounts(): {
  byVerdict: Record<ReferenceVerdict, number>
  sitesByKind: Record<ProseKind, number>
} {
  return {
    byVerdict: { own: 0, other: 0, foreign: 0, unattributed: 0 },
    sitesByKind: { command: 0, flag: 0, positional: 0, env: 0, exit: 0, example: 0 },
  }
}

function routedFlags(help: CommandHelp): readonly string[] {
  const declared = help.flags ?? []
  const taken = new Set<string>()
  for (const flag of declared) {
    taken.add(flag.name)
    for (const alias of flag.aliases ?? []) taken.add(alias)
  }
  const routes: string[] = []
  for (const flag of declared) {
    if (flag.argLabel === undefined) continue
    if (flag.valueShape !== "prose" && flag.valueShape !== "line") continue
    const route = `${flag.name}${PROSE_ROUTE_SUFFIX}`
    if (!taken.has(route)) routes.push(route)
  }
  return routes
}

export function surfaceOf(command: string, help: CommandHelp, described?: string): FlagSurface {
  const declaredFlags: string[] = []
  const prose: ProseSite[] = []
  const push = (kind: ProseKind, field: string, text: string | undefined): undefined => {
    if (text !== undefined && text !== "") prose.push({ kind, field, text })
    return undefined
  }
  push("command", "description", described ?? help.description)
  for (const flag of help.flags ?? []) {
    declaredFlags.push(flag.name)
    for (const alias of flag.aliases ?? []) declaredFlags.push(alias)
    push("flag", flag.name, flag.description)
  }
  for (const route of routedFlags(help)) declaredFlags.push(route)
  for (const one of help.positionals ?? []) push("positional", one.name, one.description)
  for (const one of help.envVars ?? []) push("env", one.name, one.description)
  for (const one of help.exits ?? []) push("exit", String(one.code), one.meaning)
  for (const [at, example] of (help.examples ?? []).entries()) push("example", String(at), example)
  return { command, declaredFlags, prose }
}

export function censusFlagReferences(input: {
  readonly surfaces: readonly FlagSurface[]
  readonly universalFlags: readonly string[]
}): ReferenceCensus {
  const registry = new Set(input.universalFlags.map(normalize))
  const ownByCommand = new Map<string, ReadonlySet<string>>()
  for (const surface of input.surfaces) {
    const own = new Set(surface.declaredFlags.map(normalize))
    ownByCommand.set(surface.command, own)
    for (const flag of own) registry.add(flag)
  }

  const { byVerdict, sitesByKind } = zeroedCounts()
  const references: FlagReference[] = []
  let proseSites = 0
  let tokens = 0

  for (const surface of input.surfaces) {
    const own = ownByCommand.get(surface.command) ?? new Set<string>()
    for (const site of surface.prose) {
      proseSites += 1
      sitesByKind[site.kind] += 1
      for (const match of site.text.matchAll(TOKEN_RE)) {
        tokens += 1
        const classified = classify({
          token: match[0],
          text: site.text,
          at: match.index ?? 0,
          own,
          registry,
        })
        byVerdict[classified.verdict] += 1
        references.push({
          command: surface.command,
          kind: site.kind,
          field: site.field,
          token: match[0],
          ...classified,
        })
      }
    }
  }

  return {
    commandsScanned: input.surfaces.length,
    proseSites,
    tokens,
    byVerdict,
    sitesByKind,
    references,
    foreign: references.filter((one) => one.verdict === "foreign"),
    unattributed: references.filter((one) => one.verdict === "unattributed"),
  }
}

export function referenceKey(reference: FlagReference): string {
  return `ops ${reference.command}#${reference.kind}:${reference.field}#${reference.token}`
}

export function referenceCarrier(key: string): string {
  const at = key.indexOf("#")
  return at < 0 ? key : key.slice(0, at)
}

export function liveCarriers(surfaces: readonly FlagSurface[]): ReadonlySet<string> {
  return new Set(surfaces.map((surface) => `ops ${surface.command}`))
}

export interface RatchetVerdict {
  readonly failures: readonly FlagReference[]
  readonly grandfathered: readonly string[]
  readonly stale: readonly string[]
}

export function applyRatchet(
  found: readonly FlagReference[],
  accepted: readonly string[]
): RatchetVerdict {
  const acceptedSet = new Set(accepted)
  const foundKeys = new Set(found.map(referenceKey))
  return {
    failures: found.filter((one) => !acceptedSet.has(referenceKey(one))),
    grandfathered: accepted.filter((key) => foundKeys.has(key)),
    stale: accepted.filter((key) => !foundKeys.has(key)),
  }
}

export type RatchetWrite =
  | { readonly kind: "tightened"; readonly accepted: readonly string[]; readonly dropped: number }
  | { readonly kind: "refused"; readonly wouldAdd: readonly string[] }

export function nextRatchet(
  foundKeys: readonly string[],
  accepted: readonly string[]
): RatchetWrite {
  const acceptedSet = new Set(accepted)
  const wouldAdd = [...new Set(foundKeys)].filter((key) => !acceptedSet.has(key)).sort()
  if (wouldAdd.length > 0) return { kind: "refused", wouldAdd }
  const found = new Set(foundKeys)
  const kept = accepted.filter((key) => found.has(key)).sort()
  return { kind: "tightened", accepted: kept, dropped: accepted.length - kept.length }
}

export interface DepartedEntry {
  readonly entry: string
  readonly carrier: string
}

export interface SuppressionSplit {
  readonly departed: readonly DepartedEntry[]
  readonly repaired: readonly string[]
}

export function splitBySubject(args: {
  readonly stale: readonly string[]
  readonly carrierOf: (entry: string) => string
  readonly liveCarriers: ReadonlySet<string>
}): SuppressionSplit {
  const departed: DepartedEntry[] = []
  const repaired: string[] = []
  for (const entry of args.stale) {
    const carrier = args.carrierOf(entry)
    if (args.liveCarriers.has(carrier)) repaired.push(entry)
    else departed.push({ entry, carrier })
  }
  return { departed, repaired }
}

export type CliHelpViolation =
  | { readonly refusal: "reference-added"; readonly reference: FlagReference }
  | { readonly refusal: "accepted-subject-departed"; readonly departed: DepartedEntry }

export function refusals(args: {
  readonly added: readonly FlagReference[]
  readonly departed: readonly DepartedEntry[]
}): readonly CliHelpViolation[] {
  return [
    ...args.added.map((reference): CliHelpViolation => ({ refusal: "reference-added", reference })),
    ...args.departed.map(
      (departed): CliHelpViolation => ({ refusal: "accepted-subject-departed", departed })
    ),
  ]
}
