import { Page } from "@akasha/temper-addon-generators/addon-data-page"
import { askComposed } from "./pages-bridge.ts"
import { z } from "zod"

type Values = Readonly<Record<string, unknown>>

const SLUG_SUFFIX = "-slug"

const SIDECAR = /\/([^/]+)\.([a-z-]+)\.jsonl#(\d+)$/

const SIDECAR_CAPTURE = z.tuple([z.string(), z.string(), z.string(), z.string().regex(/^\d+$/)])

interface SidecarAt {
  readonly named: string
  readonly key: string
  readonly at: number
}

function parseSidecarAt(at: string): SidecarAt | null {
  const captured = SIDECAR_CAPTURE.safeParse(SIDECAR.exec(at))
  if (!captured.success) return null
  return { named: captured.data[1], key: captured.data[2], at: Number(captured.data[3]) }
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

function ownerOf(values: Values): string | null {
  for (const [key, value] of Object.entries(values)) {
    if (key.endsWith(SLUG_SUFFIX) && typeof value === "string" && value !== "") {
      return key.slice(0, -SLUG_SUFFIX.length)
    }
  }
  return null
}

interface Held {
  readonly at: number
  readonly values: Values
}

export type Sidecars = ReadonlyMap<string, readonly Held[]>

function markOf(pageType: string, named: string, key: string): string {
  return `${pageType} ${named} ${key}`
}

async function readOne(pageType: string, into: Map<string, Held[]>): Promise<void> {
  const asked = await askComposed({ "page-type": pageType })
  if (!asked.ok) throw new Error(`catalog sidecars: ${pageType} went unread — ${asked.why}`)
  for (const row of asked.answer.rows) {
    const owner = ownerOf(row.values)
    const found = parseSidecarAt(row.at ?? "")
    if (owner === null || found === null) continue
    const mark = markOf(owner, found.named, found.key)
    const held = into.get(mark) ?? []
    held.push({ at: found.at, values: row.values })
    into.set(mark, held)
  }
}

export async function readCatalogSidecars(): Promise<Sidecars> {
  const held = new Map<string, Held[]>()
  await Promise.all(
    ["temper-metric-effect", "temper-quality-value", "temper-grimoire-script"].map((one) =>
      readOne(one, held)
    )
  )
  for (const one of held.values()) one.sort((a, b) => a.at - b.at)
  return held
}

type Shape = "effects" | "passive-effects" | "flat-quality" | "metric-quality" | "scripts"

function effectOf(values: Values): unknown {
  const seconds = numberOf(values["effect-seconds"])
  const value = numberOf(values["effect-value"])
  const effectType = textOf(values["effect-type"])
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
  return { metricId: textOf(values["metric-id"]), value: numberOf(values["effect-value"]) }
}

function shaped(shape: Shape, held: readonly Held[]): unknown {
  if (shape === "effects") return held.map((one) => effectOf(one.values))
  if (shape === "passive-effects") return held.map((one) => passiveOf(one.values))
  if (shape === "flat-quality") return flatQualityOf(held)
  if (shape === "metric-quality") return metricQualityOf(held)
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
  "temper-grimoire": [
    { sidecar: "affix-scripts", key: "affixScripts", shape: "scripts" },
    { sidecar: "signature-scripts", key: "signatureScripts", shape: "scripts" },
  ],
}

const NAMED_BY: Readonly<Record<string, string>> = {
  "temper-buff-major": "buffId",
  "temper-buff-minor": "buffId",
  "temper-buff-other": "buffId",
  "temper-debuff-major": "debuffId",
  "temper-debuff-minor": "debuffId",
  "temper-debuff-other": "buffId",
}

const EMPTY: Readonly<Record<Shape, unknown>> = {
  effects: [],
  "passive-effects": [],
  "flat-quality": null,
  "metric-quality": {},
  scripts: {},
}

export function withSidecars(
  pageTypeSlug: string,
  rows: readonly Page[],
  sidecars: Sidecars
): readonly Page[] {
  const carries = CARRIED[pageTypeSlug]
  if (carries === undefined) return rows
  const namedBy = NAMED_BY[pageTypeSlug] ?? "key"
  return rows.map((row) => {
    const named = textOf(row[namedBy])
    if (named === null) return row
    const out: Record<string, unknown> = { ...row }
    for (const carry of carries) {
      const held = sidecars.get(markOf(pageTypeSlug, named, carry.sidecar))
      out[carry.key] = held === undefined ? EMPTY[carry.shape] : shaped(carry.shape, held)
    }
    return Page(out)
  })
}
