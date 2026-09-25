import { engineConstantsTable } from "akasha/temper/eso/constant/modules/engine-constants-seeding/engine-constants-seeding.module.code.ts"
import {
  measureOf,
  merged,
  type VirtualAnchor,
  type VirtualNode,
  type VirtualTable,
  withBases,
} from "akasha/temper/eso/ui-harness/modules/ui-inheritance/ui-inheritance.module.code.ts"
import { type DOMParser, type Document, type Element, Window } from "happy-dom"
import { z } from "zod"

function numbered(
  named: (key: string) => string,
  keys: readonly string[]
): Readonly<Record<string, number>> {
  const held = engineConstantsTable().numbers
  const found: Record<string, number> = {}
  for (const key of keys) {
    const value = held[named(key)]
    if (value !== undefined) found[key] = value
  }
  return found
}

const CONTROL_TAGS: readonly string[] = [
  "Control",
  "Label",
  "Texture",
  "Button",
  "TopLevelControl",
  "Scroll",
  "EditBox",
  "Backdrop",
  "Slider",
  "StatusBar",
  "Cooldown",
  "Line",
  "TextureComposite",
  "ColorSelect",
  "Tooltip",
]

const POINT_NAMES: readonly string[] = [
  "TOPLEFT",
  "TOP",
  "TOPRIGHT",
  "LEFT",
  "CENTER",
  "RIGHT",
  "BOTTOMLEFT",
  "BOTTOM",
  "BOTTOMRIGHT",
]

const ALIGN_NAMES: readonly string[] = ["LEFT", "TOP", "CENTER", "RIGHT", "BOTTOM"]

const CONTROL_TYPES: Readonly<Record<string, number>> = numbered(
  (tag) => `CT_${tag.toUpperCase()}`,
  CONTROL_TAGS
)

const ANCHOR_POINTS: Readonly<Record<string, number>> = numbered((name) => name, POINT_NAMES)

const ALIGNMENTS: Readonly<Record<string, number>> = numbered(
  (name) => `TEXT_ALIGN_${name}`,
  ALIGN_NAMES
)

const HEX_RADIX = 16

const BYTE = 255

const HEX_COLOR = /^#?([0-9a-fA-F]{6})([0-9a-fA-F]{2})?$/

const hexShape = z.tuple([z.string(), z.string(), z.string().optional()])

let cachedParser: DOMParser | null = null

function domParser(): DOMParser {
  if (cachedParser === null) {
    const madeBy = new Window().DOMParser
    cachedParser = new madeBy()
  }
  return cachedParser
}

const LINE_BREAK = /\r\n?/g

function parsedXml(text: string): Document {
  return domParser().parseFromString(text.replace(LINE_BREAK, "\n"), "application/xml")
}

function numberOr(text: string | null, fallback: number): number {
  if (text === null) return fallback
  const worked = Number(text)
  return Number.isFinite(worked) ? worked : fallback
}

function maybeNumber(text: string | null): number | undefined {
  if (text === null) return undefined
  const worked = Number(text)
  return Number.isFinite(worked) ? worked : undefined
}

function maybeBoolean(text: string | null): boolean | undefined {
  if (text === null) return undefined
  return text === "true"
}

const POINT_NUMBER = /^\d+$/

function pointOf(text: string | null, fallback: number): number {
  if (text === null) return fallback
  const said = text.trim()
  if (POINT_NUMBER.test(said)) return Number(said)
  return ANCHOR_POINTS[said] ?? fallback
}

function hexColor(flat: string | null): readonly number[] | undefined {
  if (flat === null) return undefined
  const matched = hexShape.safeParse(HEX_COLOR.exec(flat.trim()))
  if (!matched.success) return undefined
  const [, body, tail] = matched.data
  const channel = (at: number): number =>
    Number.parseInt(body.slice(at * 2, at * 2 + 2), HEX_RADIX) / BYTE
  const opacity = tail === undefined ? 1 : Number.parseInt(tail, HEX_RADIX) / BYTE
  return [channel(0), channel(1), channel(2), opacity]
}

function colorOf(element: Element): readonly number[] | undefined {
  const flat = hexColor(element.getAttribute("color"))
  if (flat !== undefined) return flat
  const red = element.getAttribute("r")
  if (red === null) return undefined
  return [
    numberOr(red, 1),
    numberOr(element.getAttribute("g"), 1),
    numberOr(element.getAttribute("b"), 1),
    numberOr(element.getAttribute("a"), 1),
  ]
}

function childNamed(element: Element, tag: string): Element | null {
  for (const child of element.children) {
    if (child.tagName === tag) return child
  }
  return null
}

function anchorsIn(element: Element): readonly VirtualAnchor[] {
  const found: VirtualAnchor[] = []
  for (const child of element.children) {
    if (child.tagName !== "Anchor") continue
    const point = pointOf(child.getAttribute("point"), ANCHOR_POINTS.TOPLEFT ?? 1)
    const relative = child.getAttribute("relativeTo")
    found.push({
      point,
      relativeTo: relative === null ? undefined : relative,
      relativePoint: pointOf(child.getAttribute("relativePoint"), point),
      offsetX: measureOf(child.getAttribute("offsetX")) ?? 0,
      offsetY: measureOf(child.getAttribute("offsetY")) ?? 0,
    })
  }
  return found
}

function handlersIn(element: Element): Readonly<Record<string, string>> {
  const found: Record<string, string> = {}
  for (const child of element.children) {
    if (!child.tagName.startsWith("On")) continue
    const body = child.textContent ?? ""
    if (body.trim() === "") continue
    const named = child.getAttribute("name")
    found[named === null || named === "" ? child.tagName : `${child.tagName}:${named}`] = body
  }
  return found
}

const COORD_SIDES: readonly (readonly [string, number])[] = [
  ["left", 0],
  ["right", 1],
  ["top", 0],
  ["bottom", 1],
]

const INSET_SIDES: readonly string[] = ["left", "top", "right", "bottom"]

function attributeOf(element: Element | null, name: string): string | undefined {
  return element?.getAttribute(name) ?? undefined
}

type ArtOf = Pick<
  VirtualNode,
  "textureCoords" | "centerTexture" | "edgeTexture" | "edgeSize" | "insets" | "normalTexture"
>

function artOf(element: Element): ArtOf {
  const coords = childNamed(element, "TextureCoords")
  const edge = childNamed(element, "Edge")
  const insets = childNamed(element, "Insets")
  const edgeSize = attributeOf(edge, "edgeSize") ?? attributeOf(edge, "edgeFileHeight")
  return {
    textureCoords:
      coords === null
        ? undefined
        : COORD_SIDES.map(([side, fallback]) => numberOr(coords.getAttribute(side), fallback)),
    centerTexture: attributeOf(childNamed(element, "Center"), "file"),
    edgeTexture: attributeOf(edge, "file"),
    edgeSize: maybeNumber(edgeSize ?? null),
    insets:
      insets === null
        ? undefined
        : INSET_SIDES.map((side) => numberOr(insets.getAttribute(side), 0)),
    normalTexture: attributeOf(childNamed(element, "Textures"), "normal"),
  }
}

function nodeOf(element: Element): VirtualNode {
  const dimensions = childNamed(element, "Dimensions")
  const backdropCenter = childNamed(element, "CenterColor")
  const backdropEdge = childNamed(element, "EdgeColor")
  const holder = childNamed(element, "Controls")
  const name = element.getAttribute("name")
  const font = element.getAttribute("font")
  const text = element.getAttribute("text")
  const texture = element.getAttribute("textureFile")
  const alignH = element.getAttribute("horizontalAlignment")
  const alignV = element.getAttribute("verticalAlignment")
  return {
    controlType: CONTROL_TYPES[element.tagName] ?? CONTROL_TYPES.Control ?? 1,
    name: name === null ? undefined : name,
    hidden: maybeBoolean(element.getAttribute("hidden")),
    alpha: maybeNumber(element.getAttribute("alpha")),
    mouseEnabled: maybeBoolean(element.getAttribute("mouseEnabled")),
    resizeToFit: maybeBoolean(element.getAttribute("resizeToFitDescendents")),
    width: dimensions === null ? undefined : measureOf(dimensions.getAttribute("x")),
    height: dimensions === null ? undefined : measureOf(dimensions.getAttribute("y")),
    font: font === null ? undefined : font,
    text: text === null ? undefined : text,
    alignH: alignH === null ? undefined : ALIGNMENTS[alignH.trim()],
    alignV: alignV === null ? undefined : ALIGNMENTS[alignV.trim()],
    texture: texture === null ? undefined : texture,
    color: colorOf(element),
    centerColor:
      backdropCenter === null
        ? hexColor(element.getAttribute("centerColor"))
        : colorOf(backdropCenter),
    edgeColor:
      backdropEdge === null ? hexColor(element.getAttribute("edgeColor")) : colorOf(backdropEdge),
    ...artOf(element),
    anchorFill: childNamed(element, "AnchorFill") !== null,
    anchors: anchorsIn(element),
    handlers: handlersIn(element),
    children: holder === null ? [] : [...holder.children].map((child) => nodeOf(child as Element)),
    inherits: inheritedBy(element),
  }
}

function inheritedBy(element: Element): readonly string[] {
  const named = element.getAttribute("inherits")
  if (named === null) return []
  return named.split(/\s+/).filter((one) => one !== "")
}

export function declaredFrom(documents: readonly string[], virtuals: VirtualTable): VirtualTable {
  const table: Record<string, VirtualNode> = {}
  for (const text of documents) {
    for (const element of parsedXml(text).querySelectorAll("GuiXml > Controls > *")) {
      if (element.getAttribute("virtual") === "true") continue
      const name = element.getAttribute("name")
      if (name === null || name === "") continue
      let made = withBases(nodeOf(element), (from) => virtuals[from])
      for (const from of inheritedBy(element)) {
        const base = virtuals[from]
        if (base !== undefined) made = merged(base, made)
      }
      table[name] = made
    }
  }
  return table
}

export function virtualsFrom(documents: readonly string[]): VirtualTable {
  const raw = new Map<string, VirtualNode>()
  const inherits = new Map<string, readonly string[]>()
  for (const text of documents) {
    for (const element of parsedXml(text).querySelectorAll("[virtual='true']")) {
      const name = element.getAttribute("name")
      if (name === null || name === "") continue
      raw.set(name, nodeOf(element))
      inherits.set(name, inheritedBy(element))
    }
  }
  const settled = new Map<string, VirtualNode>()
  const working = new Set<string>()
  function settle(name: string): VirtualNode | undefined {
    const had = settled.get(name)
    if (had !== undefined) return had
    const own = raw.get(name)
    if (own === undefined || working.has(name)) return own
    working.add(name)
    let made = withBases(own, settle)
    for (const from of inherits.get(name) ?? []) {
      const base = settle(from)
      if (base !== undefined) made = merged(base, made)
    }
    working.delete(name)
    settled.set(name, made)
    return made
  }
  const table: Record<string, VirtualNode> = {}
  for (const name of raw.keys()) {
    const made = settle(name)
    if (made !== undefined) table[name] = made
  }
  return table
}
