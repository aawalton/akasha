import { asPage, type Page } from "@akasha/temper-addon-generators/addon-data-page"
import { askComposed } from "./pages-bridge.ts"
import { rowsNamingOf } from "../../../page/rows-file.ts"

type Values = Readonly<Record<string, unknown>>

const SLUG_SUFFIX = "-slug"

// A row's locator is the rows file it sits in and its line, as `<repo>:<path>#<index>`.
const LOCATOR = /^(.+)#(\d+)$/

interface SidecarAt {
  readonly key: string
  readonly part: number
  readonly at: number
}

/**
 * Which property a row belongs to, and where in that property it sits.
 *
 * The rows of one property may be divided across `<page>.<key>.jsonl` and `<key>.partN.jsonl`
 * beside it, so the property a row belongs to is read by `rowsNamingOf`, which is the same rule
 * `rowsPartsOf` finds the files by. Spelling the name here instead is how a part came to be
 * skipped: a hand-written `[a-z-]+` cannot match `part10`, so every row past the first file was
 * answered `null` and dropped without a word.
 */
function parseSidecarAt(at: string): SidecarAt | null {
  const split = LOCATOR.exec(at)
  if (split === null) return null
  const naming = rowsNamingOf(split[1] as string)
  if (naming === null) return null
  return { key: naming.key, part: naming.part, at: Number(split[2]) }
}

function numberOf(value: unknown): number | null {
  if (typeof value === "number") return value
  if (typeof value !== "string" || value.trim() === "") return null
  const one = Number(value)
  return Number.isFinite(one) ? one : null
}

function textOf(value: unknown): string | null {
  return typeof value === "string" && value !== "" ? value : null
}

/**
 * A field read under either spelling the two halves of the corpus give it.
 *
 * A markdown row states `effect-type` and `effect-value`; the same row recreated beside an akasha
 * page states `type` and `value`, which the reader kebabs to the same pair of words. Both are
 * asked for so neither half comes back null, and `tools/addon-data-proof.ts` names the same
 * translation for the same reason.
 */
function eitherOf(values: Values, keys: readonly string[]): unknown {
  for (const key of keys) {
    const held = values[key]
    if (held !== undefined && held !== null) return held
  }
  return null
}

const EFFECT_TYPE: readonly string[] = ["effect-type", "type"]

const EFFECT_VALUE: readonly string[] = ["effect-value", "value"]

const EFFECT_SECONDS: readonly string[] = ["effect-seconds", "seconds"]

interface Owner {
  readonly pageType: string
  readonly named: string
}

/**
 * The page a row was read from beside, taken from the slug the reader writes into every row.
 *
 * `rowsPagesIn` puts `<page-type>-slug: <page name>` on each row, so both halves of the mark are
 * there to be read. Taking the name off the file instead answered `sturdy.temper-armor-trait`
 * where the catalog looks up `sturdy`, so no mark ever matched and every carried table came back
 * empty.
 */
function ownerOf(values: Values): Owner | null {
  for (const [key, value] of Object.entries(values)) {
    if (key.endsWith(SLUG_SUFFIX) && typeof value === "string" && value !== "") {
      return { pageType: key.slice(0, -SLUG_SUFFIX.length), named: value }
    }
  }
  return null
}

export interface Held {
  readonly part: number
  readonly at: number
  readonly values: Values
}

export type Sidecars = ReadonlyMap<string, readonly Held[]>

function markOf(pageType: string, named: string, key: string): string {
  return `${pageType} ${named} ${key}`
}

export interface SidecarRow {
  readonly at?: string | null
  readonly values: Values
}

/** Each row filed under the page and property it belongs to, whichever part it was read from. */
export function gatherSidecars(rows: Iterable<SidecarRow>, into: Map<string, Held[]>): void {
  for (const row of rows) {
    const owner = ownerOf(row.values)
    const found = parseSidecarAt(row.at ?? "")
    if (owner === null || found === null) continue
    const mark = markOf(owner.pageType, owner.named, found.key)
    const held = into.get(mark) ?? []
    held.push({ part: found.part, at: found.at, values: row.values })
    into.set(mark, held)
  }
}

/** Every row of one page type put in order under the page that carries it. */
export function orderSidecars(held: Map<string, Held[]>): Sidecars {
  for (const one of held.values()) one.sort((a, b) => a.part - b.part || a.at - b.at)
  return held
}

async function readOne(pageType: string, into: Map<string, Held[]>): Promise<void> {
  const asked = await askComposed({ "page-type": pageType })
  if (!asked.ok) throw new Error(`catalog sidecars: ${pageType} went unread — ${asked.why}`)
  gatherSidecars(asked.answer.rows, into)
}

/**
 * Every row a page carries, in the order the page carries it.
 *
 * A divided property numbers its lines from zero again in each part, so the line alone is no
 * order — part 2 line 0 follows part 1's last line and does not precede it. The part leads the
 * comparison for that reason, and an undivided property is part 1 throughout, so nothing changes
 * for one.
 */
export async function readCatalogSidecars(): Promise<Sidecars> {
  const held = new Map<string, Held[]>()
  await Promise.all(
    ["temper-metric-effect", "temper-quality-value", "temper-grimoire-script"].map((one) =>
      readOne(one, held)
    )
  )
  return orderSidecars(held)
}

type Shape =
  | "effects"
  | "passive-effects"
  | "flat-quality"
  | "metric-quality"
  | "trait-quality"
  | "scripts"

function effectOf(values: Values): unknown {
  const seconds = numberOf(eitherOf(values, EFFECT_SECONDS))
  const value = numberOf(eitherOf(values, EFFECT_VALUE))
  const effectType = textOf(eitherOf(values, EFFECT_TYPE))
  return {
    metricId: textOf(values["metric-id"]),
    ...(effectType === null ? {} : { effectType }),
    effectValue: seconds === null ? value : { value, seconds },
  }
}

function flatQualityOf(held: readonly Held[]): Record<string, number> {
  const out: Record<string, number> = {}
  for (const one of held) {
    const quality = textOf(one.values.quality)
    const value = numberOf(one.values.value)
    if (quality !== null && value !== null) out[quality] = value
  }
  return out
}

function metricQualityOf(held: readonly Held[]): Record<string, Record<string, number>> {
  const out: Record<string, Record<string, number>> = {}
  for (const one of held) {
    const metric = textOf(one.values["metric-id"])
    const quality = textOf(one.values.quality)
    const value = numberOf(one.values.value)
    if (metric === null || quality === null || value === null) continue
    out[metric] = { ...(out[metric] ?? {}), [quality]: value }
  }
  return out
}

// A jewelry trait names a metric only where its values split in two, as Triune
// splits into health and resource. Every other trait carries one flat table.
function traitQualityOf(held: readonly Held[]): Record<string, unknown> {
  const split = held.some((one) => textOf(one.values["metric-id"]) !== null)
  return split ? metricQualityOf(held) : flatQualityOf(held)
}

function scriptsOf(held: readonly Held[]): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const one of held) {
    const scriptId = textOf(one.values["script-id"])
    if (scriptId === null) continue
    const classId = textOf(one.values["class-id"])
    out[scriptId] = {
      scriptId,
      ...(classId === null ? {} : { classId }),
      description: textOf(one.values.description) ?? "",
    }
  }
  return out
}

function passiveOf(values: Values): unknown {
  return { metricId: textOf(values["metric-id"]), value: numberOf(eitherOf(values, EFFECT_VALUE)) }
}

function shaped(shape: Shape, held: readonly Held[]): unknown {
  if (shape === "effects") return held.map((one) => effectOf(one.values))
  if (shape === "passive-effects") return held.map((one) => passiveOf(one.values))
  if (shape === "flat-quality") return flatQualityOf(held)
  if (shape === "metric-quality") return metricQualityOf(held)
  if (shape === "trait-quality") return traitQualityOf(held)
  return scriptsOf(held)
}

interface Carry {
  readonly sidecar: string
  readonly key: string
  readonly shape: Shape
}

const EFFECTS: readonly Carry[] = [{ sidecar: "effects", key: "effects", shape: "effects" }]

const CARRIED: Readonly<Record<string, readonly Carry[]>> = {
  "temper-buff-major": EFFECTS,
  "temper-buff-minor": EFFECTS,
  "temper-buff-other": EFFECTS,
  "temper-debuff-major": EFFECTS,
  "temper-debuff-minor": EFFECTS,
  "temper-debuff-other": EFFECTS,
  "temper-eso-companion": [
    { sidecar: "passive-effects", key: "passiveEffects", shape: "passive-effects" },
  ],
  "temper-armor-trait": [
    ...EFFECTS,
    { sidecar: "quality-values", key: "qualityValues", shape: "flat-quality" },
  ],
  "temper-companion-trait": [
    { sidecar: "quality-values", key: "qualityValues", shape: "flat-quality" },
  ],
  "temper-armor-enchant": [
    ...EFFECTS,
    { sidecar: "quality-values", key: "qualityValues", shape: "metric-quality" },
  ],
  "temper-jewelry-enchant": [
    ...EFFECTS,
    { sidecar: "quality-values", key: "qualityValues", shape: "metric-quality" },
  ],
  "temper-weapon-enchant": [
    ...EFFECTS,
    { sidecar: "quality-values", key: "qualityValues", shape: "metric-quality" },
  ],
  "temper-weapon-trait": [
    ...EFFECTS,
    { sidecar: "quality-values", key: "qualityValues", shape: "flat-quality" },
  ],
  "temper-jewelry-trait": [
    ...EFFECTS,
    { sidecar: "quality-values", key: "qualityValues", shape: "trait-quality" },
  ],
  "temper-grimoire": [
    { sidecar: "affix-scripts", key: "affixScripts", shape: "scripts" },
    { sidecar: "signature-scripts", key: "signatureScripts", shape: "scripts" },
  ],
}

/**
 * The property a catalog page is named by, for the mark its rows were filed under.
 *
 * Every page of every carried type states `key`, and the rows beside it are filed under that same
 * name, so one property answers for all of them. Six buff and debuff types were held to `buffId`
 * and `debuffId` instead; no page of those 77 carries either, so the name read back `null` and
 * their effects were dropped before any mark was looked up.
 */
const NAMED_BY = "key"

const EMPTY: Readonly<Record<Shape, unknown>> = {
  effects: [],
  "passive-effects": [],
  "flat-quality": null,
  "metric-quality": {},
  "trait-quality": null,
  scripts: {},
}

export function withSidecars(
  pageTypeSlug: string,
  rows: readonly Page[],
  sidecars: Sidecars
): readonly Page[] {
  const carries = CARRIED[pageTypeSlug]
  if (carries === undefined) return rows
  return rows.map((row) => {
    const named = textOf(row[NAMED_BY])
    if (named === null) return row
    const out: Record<string, unknown> = { ...row }
    for (const carry of carries) {
      const held = sidecars.get(markOf(pageTypeSlug, named, carry.sidecar))
      out[carry.key] = held === undefined ? EMPTY[carry.shape] : shaped(carry.shape, held)
    }
    return asPage(out)
  })
}
