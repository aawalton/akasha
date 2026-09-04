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
  | "effect-rows"
  | "passive-effects"
  | "flat-quality"
  | "metric-quality"
  | "trait-quality"
  | "scripts"

const RENAMED: Readonly<Record<string, string>> = {
  type: "effectType",
  "effect-type": "effectType",
  value: "effectValue",
  "effect-value": "effectValue",
  seconds: "seconds",
  "effect-seconds": "seconds",
}

const ROW_ID = "id"

function effectRowOf(values: Values): unknown {
  const held: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(values)) {
    if (key === ROW_ID) continue
    held[RENAMED[key] ?? key] = value
  }
  return held
}

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
  if (shape === "effect-rows") return held.map(effectRowOf)
  if (shape === "passive-effects") return held.map(passiveOf)
  if (shape === "flat-quality") return flatQualityOf(held)
  if (shape === "metric-quality") return metricQualityOf(held)
  if (shape === "trait-quality") return traitQualityOf(held)
  return scriptsOf(held)
}

interface Carry {
  readonly key: string
  readonly shape: Shape
  readonly whenNone?: "empty" | "absent"
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
  "temper-skill": [{ key: "effects", shape: "effect-rows", whenNone: "absent" }],
  "temper-grimoire": [
    { key: "affixScripts", shape: "scripts" },
    { key: "signatureScripts", shape: "scripts" },
  ],
}

interface Projection {
  readonly from: string
  readonly key: string
}

const PROJECTED: Readonly<Record<string, readonly Projection[]>> = {
  "temper-grimoire": [
    { from: "focusScripts", key: "compatibleFocusScripts" },
    { from: "signatureScripts", key: "compatibleSignatureScripts" },
    { from: "affixScripts", key: "compatibleAffixScripts" },
  ],
}

function idsIn(value: unknown): readonly string[] {
  if (!Array.isArray(value)) return []
  const out: string[] = []
  for (const one of value) {
    if (typeof one === "string") {
      out.push(one)
      continue
    }
    if (typeof one !== "object" || one === null) continue
    const scriptId = textOf(eitherOf(one as Values, SCRIPT_ID))
    if (scriptId !== null) out.push(scriptId)
  }
  return out
}

const EMPTY: Readonly<Record<Shape, unknown>> = {
  effects: [],
  "effect-rows": [],
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

export function withSidecars(pageTypeSlug: string, rows: readonly Page[]): readonly Page[] {
  const carries = CARRIED[pageTypeSlug] ?? []
  const projections = PROJECTED[pageTypeSlug] ?? []
  if (carries.length === 0 && projections.length === 0) return rows
  return rows.map((row) => {
    const out: Record<string, unknown> = { ...row }
    for (const projection of projections) {
      out[projection.key] = idsIn(row[projection.from])
    }
    for (const carry of carries) {
      const held = entriesIn(row[carry.key])
      if (held !== null) out[carry.key] = shaped(carry.shape, held)
      else if (carry.whenNone === "absent") delete out[carry.key]
      else out[carry.key] = EMPTY[carry.shape]
    }
    return asPage(out)
  })
}
