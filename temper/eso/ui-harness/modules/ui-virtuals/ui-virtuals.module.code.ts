import { JSDOM } from "jsdom"

const CONTROL_TYPES: Readonly<Record<string, number>> = {
  Control: 1,
  Label: 2,
  Texture: 3,
  Button: 4,
  TopLevelControl: 5,
  Scroll: 6,
  EditBox: 7,
  Backdrop: 8,
  Slider: 9,
  StatusBar: 10,
  Cooldown: 11,
  Line: 12,
  TextureComposite: 13,
  ColorSelect: 14,
  Tooltip: 15,
}

const ANCHOR_POINTS: Readonly<Record<string, number>> = {
  TOPLEFT: 1,
  TOP: 2,
  TOPRIGHT: 4,
  LEFT: 8,
  CENTER: 16,
  RIGHT: 32,
  BOTTOMLEFT: 64,
  BOTTOM: 128,
  BOTTOMRIGHT: 256,
}

const ALIGNMENTS: Readonly<Record<string, number>> = {
  LEFT: 0,
  TOP: 0,
  CENTER: 1,
  RIGHT: 2,
  BOTTOM: 2,
}

const HEX_RADIX = 16

const BYTE = 255

const HEX_COLOR = /^#?([0-9a-fA-F]{6})([0-9a-fA-F]{2})?$/

export type VirtualAnchor = {
  readonly point: number
  readonly relativeTo?: string
  readonly relativePoint: number
  readonly offsetX: number
  readonly offsetY: number
}

export type VirtualNode = {
  readonly controlType: number
  readonly name?: string
  readonly hidden?: boolean
  readonly alpha?: number
  readonly mouseEnabled?: boolean
  readonly width?: number
  readonly height?: number
  readonly font?: string
  readonly text?: string
  readonly alignH?: number
  readonly alignV?: number
  readonly texture?: string
  readonly color?: readonly number[]
  readonly centerColor?: readonly number[]
  readonly edgeColor?: readonly number[]
  readonly anchorFill: boolean
  readonly anchors: readonly VirtualAnchor[]
  readonly children: readonly VirtualNode[]
}

export type VirtualTable = Readonly<Record<string, VirtualNode>>

let cachedParser: DOMParser | null = null

function domParser(): DOMParser {
  if (cachedParser === null) {
    const madeBy = new JSDOM().window.DOMParser
    cachedParser = new madeBy()
  }
  return cachedParser
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

function pointOf(text: string | null, fallback: number): number {
  if (text === null) return fallback
  return ANCHOR_POINTS[text.trim()] ?? fallback
}

function colorOf(element: Element): readonly number[] | undefined {
  const flat = element.getAttribute("color")
  if (flat !== null) {
    const matched = HEX_COLOR.exec(flat.trim())
    if (matched !== null) {
      const body = matched[1] ?? ""
      const channel = (at: number): number =>
        Number.parseInt(body.slice(at * 2, at * 2 + 2), HEX_RADIX) / BYTE
      const tail = matched[2]
      const opacity = tail === undefined ? 1 : Number.parseInt(tail, HEX_RADIX) / BYTE
      return [channel(0), channel(1), channel(2), opacity]
    }
  }
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
      offsetX: numberOr(child.getAttribute("offsetX"), 0),
      offsetY: numberOr(child.getAttribute("offsetY"), 0),
    })
  }
  return found
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
    width: dimensions === null ? undefined : maybeNumber(dimensions.getAttribute("x")),
    height: dimensions === null ? undefined : maybeNumber(dimensions.getAttribute("y")),
    font: font === null ? undefined : font,
    text: text === null ? undefined : text,
    alignH: alignH === null ? undefined : ALIGNMENTS[alignH.trim()],
    alignV: alignV === null ? undefined : ALIGNMENTS[alignV.trim()],
    texture: texture === null ? undefined : texture,
    color: colorOf(element),
    centerColor: backdropCenter === null ? undefined : colorOf(backdropCenter),
    edgeColor: backdropEdge === null ? undefined : colorOf(backdropEdge),
    anchorFill: childNamed(element, "AnchorFill") !== null,
    anchors: anchorsIn(element),
    children: holder === null ? [] : [...holder.children].map((child) => nodeOf(child as Element)),
  }
}

function inheritedBy(element: Element): readonly string[] {
  const named = element.getAttribute("inherits")
  if (named === null) return []
  return named.split(/\s+/).filter((one) => one !== "")
}

function merged(base: VirtualNode, over: VirtualNode): VirtualNode {
  return {
    controlType: over.controlType,
    name: over.name ?? base.name,
    hidden: over.hidden ?? base.hidden,
    alpha: over.alpha ?? base.alpha,
    mouseEnabled: over.mouseEnabled ?? base.mouseEnabled,
    width: over.width ?? base.width,
    height: over.height ?? base.height,
    font: over.font ?? base.font,
    text: over.text ?? base.text,
    alignH: over.alignH ?? base.alignH,
    alignV: over.alignV ?? base.alignV,
    texture: over.texture ?? base.texture,
    color: over.color ?? base.color,
    centerColor: over.centerColor ?? base.centerColor,
    edgeColor: over.edgeColor ?? base.edgeColor,
    anchorFill: over.anchorFill || base.anchorFill,
    anchors: over.anchors.length === 0 ? base.anchors : over.anchors,
    children: [...base.children, ...over.children],
  }
}

export function virtualsFrom(documents: readonly string[]): VirtualTable {
  const parser = domParser()
  const raw = new Map<string, VirtualNode>()
  const inherits = new Map<string, readonly string[]>()
  for (const text of documents) {
    const doc = parser.parseFromString(text, "application/xml")
    for (const element of doc.querySelectorAll("[virtual='true']")) {
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
    let made = own
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
