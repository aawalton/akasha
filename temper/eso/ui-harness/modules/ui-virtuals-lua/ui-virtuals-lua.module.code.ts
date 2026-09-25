import type {
  VirtualAnchor,
  VirtualNode,
  VirtualTable,
} from "akasha/temper/eso/ui-harness/modules/ui-inheritance/ui-inheritance.module.code.ts"

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
  return `{ point = ${anchor.point}, ${towards}relativePoint = ${anchor.relativePoint}, offsetX = ${JSON.stringify(anchor.offsetX)}, offsetY = ${JSON.stringify(anchor.offsetY)} }`
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
  if (node.padding !== undefined) {
    parts.push(`padding = { ${node.padding.map((side) => JSON.stringify(side)).join(", ")} }`)
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
  if (node.width !== undefined) parts.push(`width = ${JSON.stringify(node.width)}`)
  if (node.height !== undefined) parts.push(`height = ${JSON.stringify(node.height)}`)
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
