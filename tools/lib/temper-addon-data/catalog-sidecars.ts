import { asPage, type Page } from "@akasha/temper-addon-generators/addon-data-page"

type Values = Readonly<Record<string, unknown>>

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
 * page states `type` and `value`. Both are asked for so neither half comes back null.
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

const METRIC_ID: readonly string[] = ["metric-id", "metricId"]

const SCRIPT_ID: readonly string[] = ["script-id", "scriptId"]

const CLASS_ID: readonly string[] = ["class-id", "classId"]

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
    metricId: textOf(eitherOf(values, METRIC_ID)),
    ...(effectType === null ? {} : { effectType }),
    effectValue: seconds === null ? value : { value, seconds },
  }
}

function flatQualityOf(held: readonly Values[]): Record<string, number> {
  const out: Record<string, number> = {}
  for (const one of held) {
    const quality = textOf(one.quality)
    const value = numberOf(one.value)
    if (quality !== null && value !== null) out[quality] = value
  }
  return out
}

function metricQualityOf(held: readonly Values[]): Record<string, Record<string, number>> {
  const out: Record<string, Record<string, number>> = {}
  for (const one of held) {
    const metric = textOf(eitherOf(one, METRIC_ID))
    const quality = textOf(one.quality)
    const value = numberOf(one.value)
    if (metric === null || quality === null || value === null) continue
    out[metric] = { ...(out[metric] ?? {}), [quality]: value }
  }
  return out
}

// A jewelry trait names a metric only where its values split in two, as Triune
// splits into health and resource. Every other trait carries one flat table.
function traitQualityOf(held: readonly Values[]): Record<string, unknown> {
  const split = held.some((one) => textOf(eitherOf(one, METRIC_ID)) !== null)
  return split ? metricQualityOf(held) : flatQualityOf(held)
}

function scriptsOf(held: readonly Values[]): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const one of held) {
    const scriptId = textOf(eitherOf(one, SCRIPT_ID))
    if (scriptId === null) continue
    const classId = textOf(eitherOf(one, CLASS_ID))
    out[scriptId] = {
      scriptId,
      ...(classId === null ? {} : { classId }),
      description: textOf(one.description) ?? "",
    }
  }
  return out
}

function passiveOf(values: Values): unknown {
  return {
    metricId: textOf(eitherOf(values, METRIC_ID)),
    value: numberOf(eitherOf(values, EFFECT_VALUE)),
  }
}

function shaped(shape: Shape, held: readonly Values[]): unknown {
  if (shape === "effects") return held.map(effectOf)
  if (shape === "passive-effects") return held.map(passiveOf)
  if (shape === "flat-quality") return flatQualityOf(held)
  if (shape === "metric-quality") return metricQualityOf(held)
  if (shape === "trait-quality") return traitQualityOf(held)
  return scriptsOf(held)
}

interface Carry {
  readonly key: string
  readonly shape: Shape
}

const EFFECTS: readonly Carry[] = [{ key: "effects", shape: "effects" }]

const CARRIED: Readonly<Record<string, readonly Carry[]>> = {
  "temper-buff-major": EFFECTS,
  "temper-buff-minor": EFFECTS,
  "temper-buff-other": EFFECTS,
  "temper-debuff-major": EFFECTS,
  "temper-debuff-minor": EFFECTS,
  "temper-debuff-other": EFFECTS,
  "temper-eso-companion": [{ key: "passiveEffects", shape: "passive-effects" }],
  "temper-armor-trait": [...EFFECTS, { key: "qualityValues", shape: "flat-quality" }],
  "temper-companion-trait": [{ key: "qualityValues", shape: "flat-quality" }],
  "temper-armor-enchant": [...EFFECTS, { key: "qualityValues", shape: "metric-quality" }],
  "temper-jewelry-enchant": [...EFFECTS, { key: "qualityValues", shape: "metric-quality" }],
  "temper-weapon-enchant": [...EFFECTS, { key: "qualityValues", shape: "metric-quality" }],
  "temper-weapon-trait": [...EFFECTS, { key: "qualityValues", shape: "flat-quality" }],
  "temper-jewelry-trait": [...EFFECTS, { key: "qualityValues", shape: "trait-quality" }],
  "temper-grimoire": [
    { key: "affixScripts", shape: "scripts" },
    { key: "signatureScripts", shape: "scripts" },
  ],
}

const EMPTY: Readonly<Record<Shape, unknown>> = {
  effects: [],
  "passive-effects": [],
  "flat-quality": null,
  "metric-quality": {},
  "trait-quality": null,
  scripts: {},
}

function entriesIn(value: unknown): readonly Values[] | null {
  if (!Array.isArray(value)) return null
  return value.filter((one): one is Values => typeof one === "object" && one !== null)
}

/**
 * Each carried property of a catalog page turned from its rows into the shape a generator reads.
 *
 * The rows of a property arrive on the page that carries them: `effects: "jsonl"` on the page names
 * a `<page>.<page-type>.<key>.jsonl` beside it, and a composed query answers that file's lines in
 * order under the same property name. So there is nothing to look up and nothing to join — this
 * reshapes what the row already holds, and a property with no rows takes the empty table its shape
 * declares rather than going absent.
 */
export function withSidecars(pageTypeSlug: string, rows: readonly Page[]): readonly Page[] {
  const carries = CARRIED[pageTypeSlug]
  if (carries === undefined) return rows
  return rows.map((row) => {
    const out: Record<string, unknown> = { ...row }
    for (const carry of carries) {
      const held = entriesIn(row[carry.key])
      out[carry.key] = held === null ? EMPTY[carry.shape] : shaped(carry.shape, held)
    }
    return asPage(out)
  })
}
