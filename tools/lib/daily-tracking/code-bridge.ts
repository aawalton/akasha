import { codeModule, codeModuleSync } from "../code-import.ts"
import type {
  Asked,
  ComposedQuery,
  DailyTierColor,
  DailyTierLadder,
  DayWindow,
  PropertyDefinition,
  ReadonlyJSONValue,
  SessionPage,
  WakeWindow,
  Written,
} from "./tracking-types.ts"

const PAGES_CORE = "@shared/pages-core"
const PAGES_QUERY = "@shared/pages-query"
const ASK = "@shared/pages-query/ask"
const RESET_TIMES = "@shared/recurrence/reset-times"
const STATUS_BAR = "@shared/status-bar-access"
const NARROW = "@shared/utils-narrow"
const PERSONAS_CORE = "@alanwalton/personas-core"

export const WRITER = "daily-tracking"

interface ResetTimes {
  readonly getEsoDayStr: (instant: Date) => string
  readonly getEsoDayStrOffset: (instant: Date, offset: number) => string
  readonly getEsoDayWindow: (dayStr: string) => DayWindow
}

const reset = codeModuleSync<ResetTimes>(RESET_TIMES)
export const getEsoDayStr = reset.getEsoDayStr
export const getEsoDayStrOffset = reset.getEsoDayStrOffset
export const getEsoDayWindow = reset.getEsoDayWindow

interface Narrow {
  readonly assertNever: (value: never) => never
}
export const assertNever = codeModuleSync<Narrow>(NARROW).assertNever

interface PersonasCore {
  readonly DEFAULT_GREEN_DAY_POINTS: number
  readonly SOURCE_POINTS_FIELD: string
  readonly GREEN_DAY_FRACTION_FIELD: string
  readonly GREEN_DAY_POINTS_FIELD: string
  readonly PERSONA_POINTS_SOURCE_COHERENCE_RULES: readonly unknown[]
  readonly decideTotalPointsWrite: (...args: readonly unknown[]) => unknown
  readonly resolvePointsPrefixes: (row: {
    readonly pointsPathPrefix?: string
    readonly pointsPathPrefixes?: readonly string[]
  }) => readonly string[]
  readonly createNetBytesAccumulator: (...args: readonly unknown[]) => unknown
  readonly evalDailyTier: (...args: readonly unknown[]) => unknown
  readonly pathspecsForPrefix: (pathPrefix: string) => readonly string[]
  readonly pathspecsForPrefixes: (prefixes: string | readonly string[]) => readonly string[]
}

const personas = codeModuleSync<PersonasCore>(PERSONAS_CORE)
export const DEFAULT_GREEN_DAY_POINTS = personas.DEFAULT_GREEN_DAY_POINTS
export const SOURCE_POINTS_FIELD = personas.SOURCE_POINTS_FIELD
export const GREEN_DAY_FRACTION_FIELD = personas.GREEN_DAY_FRACTION_FIELD
export const GREEN_DAY_POINTS_FIELD = personas.GREEN_DAY_POINTS_FIELD
export const PERSONA_POINTS_SOURCE_COHERENCE_RULES = personas.PERSONA_POINTS_SOURCE_COHERENCE_RULES
export const decideTotalPointsWrite = personas.decideTotalPointsWrite
export const resolvePointsPrefixes = personas.resolvePointsPrefixes
export const createNetBytesAccumulator = personas.createNetBytesAccumulator
export const evalDailyTier = personas.evalDailyTier
export const pathspecsForPrefix = personas.pathspecsForPrefix
export const pathspecsForPrefixes = personas.pathspecsForPrefixes

interface PagesCore {
  readonly evaluateCoherenceRules: (...args: readonly unknown[]) => unknown
  readonly resolveComputedProperties: (
    data: Readonly<Record<string, ReadonlyJSONValue>>,
    definitions: readonly PropertyDefinition[],
    opts?: { readonly now?: number }
  ) => Readonly<Record<string, ReadonlyJSONValue>>
}
const pagesCore = codeModuleSync<PagesCore>(PAGES_CORE)
export const evaluateCoherenceRules = pagesCore.evaluateCoherenceRules
export const resolveComputedProperties = pagesCore.resolveComputedProperties

interface AskModule {
  readonly askComposed: (query: ComposedQuery) => Promise<Asked>
}
export async function askComposed(query: ComposedQuery): Promise<Asked> {
  return (await codeModule<AskModule>(ASK)).askComposed(query)
}

interface PagesQuery {
  readonly askNamed: (slug: string) => Promise<Asked>
  readonly patchPage: (
    pageType: string,
    name: string,
    values: Readonly<Record<string, unknown>>,
    writer: string
  ) => Promise<Written>
  readonly writePage: (
    pageType: string,
    name: string,
    values: Readonly<Record<string, unknown>>,
    writer: string
  ) => Promise<Written>
}
export async function askNamed(slug: string): Promise<Asked> {
  return (await codeModule<PagesQuery>(PAGES_QUERY)).askNamed(slug)
}
export async function patchPage(
  pageType: string,
  name: string,
  values: Readonly<Record<string, unknown>>,
  writer: string
): Promise<Written> {
  return (await codeModule<PagesQuery>(PAGES_QUERY)).patchPage(pageType, name, values, writer)
}
export async function writePage(
  pageType: string,
  name: string,
  values: Readonly<Record<string, unknown>>,
  writer: string
): Promise<Written> {
  return (await codeModule<PagesQuery>(PAGES_QUERY)).writePage(pageType, name, values, writer)
}

interface ReadoutGroup {
  readonly slug: string
  readonly readouts: readonly { readonly slug: string }[]
  readonly unresolved: ReadonlyMap<string, string>
}

interface StatusBar {
  readonly readSessionPages: (fetcher?: unknown) => Promise<readonly SessionPage[]>
  readonly readPersonaDaily: (args: { readonly day: string }) => Promise<readonly unknown[]>
  readonly cardioReading: (day: string, span: WakeWindow) => Promise<number | null>
  readonly wakeWindow: (pages: readonly SessionPage[], day: string) => WakeWindow
  readonly getInboxStoplightTiers: (args: { readonly day: string }) => Promise<readonly unknown[]>
  readonly getUpkeepStoplightTiers: (args: { readonly day: string }) => Promise<readonly unknown[]>
  readonly aggregateValueUnits: (...args: readonly unknown[]) => unknown
  readonly resolveReadoutGroup: (slug: string) => Promise<ReadoutGroup>
  readonly tierFloorValues: (ladder: DailyTierLadder) => ReadonlyMap<DailyTierColor, number>
  readonly GREEN_DAY_UNITS_LADDER: DailyTierLadder
}

const statusBarSync = codeModuleSync<StatusBar>(STATUS_BAR)
export const aggregateValueUnits = statusBarSync.aggregateValueUnits
export const tierFloorValues = statusBarSync.tierFloorValues
export const GREEN_DAY_UNITS_LADDER = statusBarSync.GREEN_DAY_UNITS_LADDER
export const wakeWindow = statusBarSync.wakeWindow

export async function readSessionPages(fetcher?: unknown): Promise<readonly SessionPage[]> {
  return (await codeModule<StatusBar>(STATUS_BAR)).readSessionPages(fetcher)
}

export async function cardioReading(day: string, span: WakeWindow): Promise<number | null> {
  return (await codeModule<StatusBar>(STATUS_BAR)).cardioReading(day, span)
}

export async function readPersonaDaily(day: string): Promise<readonly unknown[]> {
  return (await codeModule<StatusBar>(STATUS_BAR)).readPersonaDaily({ day })
}

export async function resolveReadoutGroup(slug: string): Promise<ReadoutGroup> {
  return (await codeModule<StatusBar>(STATUS_BAR)).resolveReadoutGroup(slug)
}

export async function getInboxStoplightTiers(day: string): Promise<readonly unknown[]> {
  return (await codeModule<StatusBar>(STATUS_BAR)).getInboxStoplightTiers({ day })
}

export async function getUpkeepStoplightTiers(day: string): Promise<readonly unknown[]> {
  return (await codeModule<StatusBar>(STATUS_BAR)).getUpkeepStoplightTiers({ day })
}

export function kebabKey(key: string): string {
  return key.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase()
}

export function askedRows(
  named: string,
  asked: Asked
): readonly Readonly<Record<string, unknown>>[] {
  if (!asked.ok) throw new Error(`${named} went unread: ${asked.why}`)
  const answer = asked.answer as {
    readonly rows: readonly { readonly values: Record<string, unknown> }[]
    readonly unfound?: readonly string[]
  }
  const unfound = answer.unfound ?? []
  if (unfound.length > 0) {
    throw new Error(
      `${named} named ${unfound.length} key(s) no page carries — ${unfound.join(", ")} — and a ` +
        `key that is not there reads as a clean zero rather than an error, so every figure ` +
        `drawn from it would be a fabricated one`
    )
  }
  return answer.rows.map((row) => row.values)
}

export function numberOf(value: unknown): number | undefined {
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined
  if (typeof value !== "string") return undefined
  const trimmed = value.trim()
  if (trimmed === "") return undefined
  const parsed = Number(trimmed)
  return Number.isFinite(parsed) ? parsed : undefined
}

export function textOf(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined
}

export type { Asked, ComposedQuery, DayWindow, PropertyDefinition }
export type { ReadonlyJSONValue, SessionPage, WakeWindow, Written }
