import { z } from "zod"
import {
  COMPONENT_LABELS,
  humanizeGlobal,
  UNCATEGORIZED,
} from "../hud-component-labels/hud-component-labels.module.code.ts"
import {
  type ComponentKind,
  type HideMechanism,
  HUD_SCENES,
  type HudComponentRecord,
  type HudScene,
} from "../hud-component-record/hud-component-record.module.code.ts"

const CONTROL_METHODS = [
  "SetCompassHidden",
  "SetTopLevelHidden",
  "SuppressTutorialType",
  "SetHiddenForReason",
  "RefreshVisibility",
  "RequestHidden",
  "SetSupressed",
] as const

const CONTROL_METHOD_SET: ReadonlySet<string> = new Set(CONTROL_METHODS)

function isHideMechanism(value: string): value is HideMechanism {
  return CONTROL_METHOD_SET.has(value)
}

const EXEC_CAPTURES = z.array(z.string()).min(2).nullable()

const FLOATING_MARKERS_GLOBAL = "FLOATING_MARKERS"

interface RawHit {
  readonly esoGlobal: string
  readonly kind: ComponentKind
  readonly hideMechanism: HideMechanism
  readonly scenes: readonly HudScene[]
  readonly line: number
  readonly conditional: boolean
}

function lineAt(source: string, index: number): number {
  let line = 1
  for (let i = 0; i < index && i < source.length; i++) {
    if (source[i] === "\n") line++
  }
  return line
}

function precededByCondition(source: string, index: number): boolean {
  const before = source.slice(0, index).split("\n")
  const preceding = before.slice(-3, -1)
  return preceding.some((l) => /\bif\b.*\bthen\b/.test(l))
}

function sliceBlock(
  source: string,
  startMarker: RegExp,
  endMarker: RegExp
): { body: string; offset: number } | undefined {
  const start = source.search(startMarker)
  if (start < 0) return undefined
  const rest = source.slice(start)
  const endRel = rest.search(endMarker)
  const body = endRel < 0 ? rest : rest.slice(0, endRel)
  return { body, offset: start }
}

function parseFragmentGroup(source: string): readonly RawHit[] {
  const match = EXEC_CAPTURES.parse(/HUD_FRAGMENT_GROUP\s*=\s*\{([\s\S]*?)\}/.exec(source))
  if (match === null) return []
  const body = match[1] ?? ""
  const bodyOffset = source.indexOf(body, source.indexOf("HUD_FRAGMENT_GROUP"))
  const hits: RawHit[] = []
  for (const m of body.matchAll(/^[ \t]*([A-Z][A-Z0-9_]*)\s*,?[ \t]*$/gm)) {
    const esoGlobal = m[1]
    if (esoGlobal === undefined || m.index === undefined) continue
    hits.push({
      esoGlobal,
      kind: "fragment",
      hideMechanism: "fragment-group",
      scenes: HUD_SCENES,
      line: lineAt(source, bodyOffset + m.index),
      conditional: false,
    })
  }
  return hits
}

function parseSceneExtras(source: string): readonly RawHit[] {
  const blocks: { scene: HudScene; start: RegExp; end: RegExp }[] = [
    { scene: "hud", start: /function ZO_HUDScene:New\(\)/, end: /\nHUD_SCENE\s*=/ },
    { scene: "hudui", start: /function ZO_HUDUIScene:New\(\)/, end: /\nHUD_UI_SCENE\s*=/ },
    { scene: "loot", start: /LOOT_SCENE:AddFragmentGroup\(\s*FRAGMENT_GROUP/, end: /\n\n\n/ },
  ]
  const hits: RawHit[] = []
  for (const { scene, start, end } of blocks) {
    const block = sliceBlock(source, start, end)
    if (block === undefined) continue
    for (const m of block.body.matchAll(/:AddFragment\(\s*([A-Z][A-Z0-9_]*)\s*\)/g)) {
      const esoGlobal = m[1]
      if (esoGlobal === undefined || m.index === undefined) continue
      const globalIndex = block.offset + m.index
      hits.push({
        esoGlobal,
        kind: "fragment",
        hideMechanism: "scene-fragment",
        scenes: [scene],
        line: lineAt(source, globalIndex),
        conditional: precededByCondition(source, globalIndex),
      })
    }
  }
  return hits
}

function parseNonFragmentControls(source: string): readonly RawHit[] {
  const block = sliceBlock(
    source,
    /function ZO_HUDFragment:UpdateVisibility\(\)/,
    /\nfunction ZO_HUDFragment:/
  )
  if (block === undefined) return []
  const hits: RawHit[] = []

  const callRe = new RegExp(`([A-Z][A-Z0-9_]*):(${CONTROL_METHODS.join("|")})\\b`, "g")
  for (const m of block.body.matchAll(callRe)) {
    const esoGlobal = m[1]
    const method = m[2]
    if (esoGlobal === undefined || method === undefined || m.index === undefined) continue
    if (!isHideMechanism(method)) continue
    const globalIndex = block.offset + m.index
    hits.push({
      esoGlobal,
      kind: "non-fragment-control",
      hideMechanism: method,
      scenes: HUD_SCENES,
      line: lineAt(source, globalIndex),
      conditional: precededByCondition(source, globalIndex),
    })
  }

  for (const fm of block.body.matchAll(/\bSetFloatingMarkerGlobalAlpha\b/g)) {
    if (fm.index === undefined) continue
    const globalIndex = block.offset + fm.index
    hits.push({
      esoGlobal: FLOATING_MARKERS_GLOBAL,
      kind: "non-fragment-control",
      hideMechanism: "SetFloatingMarkerGlobalAlpha",
      scenes: HUD_SCENES,
      line: lineAt(source, globalIndex),
      conditional: false,
    })
  }
  return hits
}

function orderScenes(scenes: Iterable<HudScene>): readonly HudScene[] {
  const set = new Set(scenes)
  return HUD_SCENES.filter((s) => set.has(s))
}

function toRecord(
  hit: RawHit,
  mergedScenes: readonly HudScene[],
  conditional: boolean,
  file: string
): HudComponentRecord {
  const label = COMPONENT_LABELS[hit.esoGlobal]
  return {
    id: hit.esoGlobal.toLowerCase().replace(/_/g, "-"),
    name: label?.name ?? humanizeGlobal(hit.esoGlobal),
    esoGlobal: hit.esoGlobal,
    kind: hit.kind,
    hideMechanism: hit.hideMechanism,
    scenes: mergedScenes,
    category: label?.category ?? UNCATEGORIZED,
    source: { file, line: hit.line },
    conditional,
    wrapsMultiple: label?.wrapsMultiple ?? false,
    ...(label?.grainNotes !== undefined ? { grainNotes: label.grainNotes } : {}),
  }
}

export function buildCatalog(source: string, file: string): readonly HudComponentRecord[] {
  const hits = [
    ...parseFragmentGroup(source),
    ...parseSceneExtras(source),
    ...parseNonFragmentControls(source),
  ]

  const byGlobal = new Map<string, { hit: RawHit; scenes: Set<HudScene>; conditional: boolean }>()
  for (const hit of hits) {
    const existing = byGlobal.get(hit.esoGlobal)
    if (existing === undefined) {
      byGlobal.set(hit.esoGlobal, {
        hit,
        scenes: new Set(hit.scenes),
        conditional: hit.conditional,
      })
      continue
    }
    if (existing.hit.kind !== hit.kind) {
      throw new Error(
        `Conflicting kind for ${hit.esoGlobal}: ${existing.hit.kind} vs ${hit.kind} — unexpected source shape, refusing to guess.`
      )
    }
    for (const s of hit.scenes) existing.scenes.add(s)
    existing.conditional = existing.conditional || hit.conditional
  }

  const records = [...byGlobal.values()].map(({ hit, scenes, conditional }) =>
    toRecord(hit, orderScenes(scenes), conditional, file)
  )

  const kindRank: Record<ComponentKind, number> = { fragment: 0, "non-fragment-control": 1 }
  return records.sort((a, b) => {
    if (kindRank[a.kind] !== kindRank[b.kind]) return kindRank[a.kind] - kindRank[b.kind]
    if (a.source.line !== b.source.line) return a.source.line - b.source.line
    return a.esoGlobal.localeCompare(b.esoGlobal)
  })
}
