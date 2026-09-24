import { engineConstantsTable } from "akasha/temper/eso/constant/modules/engine-constants-seeding/engine-constants-seeding.module.code.ts"
import {
  merged,
  type VirtualAnchor,
  type VirtualNode,
  type VirtualTable,
  withBases,
} from "akasha/temper/eso/ui-harness/modules/ui-inheritance/ui-inheritance.module.code.ts"
import { JSDOM } from "jsdom"

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

const LOW_CEILING = 32

function luaText(text: string): string {
  const safe: string[] = []
  for (const one of text) {
    const code = one.charCodeAt(0)
    if (one === "\\") safe.push("\\\\")
    else if (one === '"') safe.push('\\"')
    else if (code < LOW_CEILING) safe.push(`\\${code}`)
    else safe.push(one)
  }
  return `"${safe.join("")}"`
}

function luaAnchor(anchor: VirtualAnchor): string {
  const towards =
    anchor.relativeTo === undefined ? "" : `relativeTo = ${luaText(anchor.relativeTo)}, `
  return `{ point = ${anchor.point}, ${towards}relativePoint = ${anchor.relativePoint}, offsetX = ${anchor.offsetX}, offsetY = ${anchor.offsetY} }`
}

function luaArt(node: VirtualNode): readonly string[] {
  const parts: string[] = []
  if (node.textureCoords !== undefined) {
    parts.push(`textureCoords = { ${node.textureCoords.join(", ")} }`)
  }
  if (node.centerTexture !== undefined) {
    parts.push(`centerTexture = ${luaText(node.centerTexture)}`)
  }
  if (node.edgeTexture !== undefined) parts.push(`edgeTexture = ${luaText(node.edgeTexture)}`)
  if (node.edgeSize !== undefined) parts.push(`edgeSize = ${node.edgeSize}`)
  if (node.insets !== undefined) parts.push(`insets = { ${node.insets.join(", ")} }`)
  if (node.normalTexture !== undefined) {
    parts.push(`normalTexture = ${luaText(node.normalTexture)}`)
  }
  return parts
}

function luaNode(node: VirtualNode): string {
  const parts: string[] = [`controlType = ${node.controlType}`, ...luaArt(node)]
  if (node.name !== undefined) parts.push(`name = ${luaText(node.name)}`)
  if (node.hidden !== undefined) parts.push(`hidden = ${node.hidden}`)
  if (node.alpha !== undefined) parts.push(`alpha = ${node.alpha}`)
  if (node.mouseEnabled !== undefined) parts.push(`mouseEnabled = ${node.mouseEnabled}`)
  if (node.resizeToFit !== undefined) parts.push(`resizeToFit = ${node.resizeToFit}`)
  if (node.width !== undefined) parts.push(`width = ${node.width}`)
  if (node.height !== undefined) parts.push(`height = ${node.height}`)
  if (node.font !== undefined) parts.push(`font = ${luaText(node.font)}`)
  if (node.text !== undefined) parts.push(`text = ${luaText(node.text)}`)
  if (node.alignH !== undefined) parts.push(`alignH = ${node.alignH}`)
  if (node.alignV !== undefined) parts.push(`alignV = ${node.alignV}`)
  if (node.texture !== undefined) parts.push(`texture = ${luaText(node.texture)}`)
  if (node.color !== undefined) parts.push(`color = { ${node.color.join(", ")} }`)
  if (node.centerColor !== undefined) {
    parts.push(`centerColor = { ${node.centerColor.join(", ")} }`)
  }
  if (node.edgeColor !== undefined) parts.push(`edgeColor = { ${node.edgeColor.join(", ")} }`)
  if (node.anchorFill) parts.push("anchorFill = true")
  if (node.anchors.length > 0) {
    parts.push(`anchors = { ${node.anchors.map(luaAnchor).join(", ")} }`)
  }
  const handlers = Object.entries(node.handlers).map(
    ([event, body]) => `[${luaText(event)}] = function(self, ...)
${body}
end`
  )
  if (handlers.length > 0) {
    parts.push(`handlers = { ${handlers.join(", ")} }`)
    parts.push(`handlerOrder = { ${Object.keys(node.handlers).map(luaText).join(", ")} }`)
  }
  if (node.children.length > 0) {
    parts.push(`children = { ${node.children.map(luaNode).join(", ")} }`)
  }
  return `{ ${parts.join(", ")} }`
}

export function virtualsLua(table: VirtualTable, perChunk: number): readonly string[] {
  const names = Object.keys(table)
  const chunks: string[] = []
  for (let at = 0; at < names.length; at += perChunk) {
    const written = names.slice(at, at + perChunk).flatMap((name) => {
      const node = table[name]
      return node === undefined ? [] : [`[${luaText(name)}] = ${luaNode(node)},`]
    })
    chunks.push(`__ui_virtuals({ ${written.join(" ")} })`)
  }
  return chunks
}

export function declaredLua(
  table: VirtualTable,
  wanted: readonly string[],
  perChunk: number
): readonly string[] {
  const names = wanted.filter((one) => table[one] !== undefined)
  const chunks: string[] = []
  for (let at = 0; at < names.length; at += perChunk) {
    const written = names.slice(at, at + perChunk).flatMap((name) => {
      const node = table[name]
      return node === undefined ? [] : [`{ ${luaText(name)}, ${luaNode(node)} },`]
    })
    chunks.push(`__ui_declare({ ${written.join(" ")} })`)
  }
  return chunks
}

export function declaredFrom(documents: readonly string[], virtuals: VirtualTable): VirtualTable {
  const parser = domParser()
  const table: Record<string, VirtualNode> = {}
  for (const text of documents) {
    const doc = parser.parseFromString(text, "application/xml")
    for (const element of doc.querySelectorAll("GuiXml > Controls > *")) {
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
