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
  readonly resizeToFit?: boolean
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
  readonly textureCoords?: readonly number[]
  readonly centerTexture?: string
  readonly edgeTexture?: string
  readonly edgeSize?: number
  readonly insets?: readonly number[]
  readonly normalTexture?: string
  readonly anchorFill: boolean
  readonly anchors: readonly VirtualAnchor[]
  readonly handlers: Readonly<Record<string, string>>
  readonly children: readonly VirtualNode[]
  readonly inherits?: readonly string[]
}

export type VirtualTable = Readonly<Record<string, VirtualNode>>

export type BaseOf = (name: string) => VirtualNode | undefined

const PARENT = "$(parent)"

function relativeName(name: string | undefined, parent: string): string | undefined {
  return name === undefined ? undefined : name.split(PARENT).join(parent)
}

function overriddenBelow(
  children: readonly VirtualNode[],
  parent: string,
  target: string,
  over: VirtualNode
): readonly VirtualNode[] | null {
  for (const [at, one] of children.entries()) {
    const full = relativeName(one.name, parent)
    if (full === target) {
      const replaced = { ...merged(one, over), name: one.name, controlType: one.controlType }
      return [...children.slice(0, at), replaced, ...children.slice(at + 1)]
    }
    if (full === undefined || one.children.length === 0) continue
    const below = overriddenBelow(one.children, full, target, over)
    if (below !== null) {
      return [...children.slice(0, at), { ...one, children: below }, ...children.slice(at + 1)]
    }
  }
  return null
}

function mergedChildren(
  base: readonly VirtualNode[],
  over: readonly VirtualNode[]
): readonly VirtualNode[] {
  let out: readonly VirtualNode[] = base
  const added: VirtualNode[] = []
  for (const one of over) {
    const target = relativeName(one.name, "")
    const found = target === undefined ? null : overriddenBelow(out, "", target, one)
    if (found === null) added.push(one)
    else out = found
  }
  return [...out, ...added]
}

export function merged(base: VirtualNode, over: VirtualNode): VirtualNode {
  return {
    controlType: over.controlType,
    name: over.name ?? base.name,
    hidden: over.hidden ?? base.hidden,
    alpha: over.alpha ?? base.alpha,
    mouseEnabled: over.mouseEnabled ?? base.mouseEnabled,
    resizeToFit: over.resizeToFit ?? base.resizeToFit,
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
    textureCoords: over.textureCoords ?? base.textureCoords,
    centerTexture: over.centerTexture ?? base.centerTexture,
    edgeTexture: over.edgeTexture ?? base.edgeTexture,
    edgeSize: over.edgeSize ?? base.edgeSize,
    insets: over.insets ?? base.insets,
    normalTexture: over.normalTexture ?? base.normalTexture,
    anchorFill: over.anchorFill || base.anchorFill,
    anchors: over.anchors.length === 0 ? base.anchors : over.anchors,
    handlers: { ...base.handlers, ...over.handlers },
    children: mergedChildren(base.children, over.children),
  }
}

export function withBases(node: VirtualNode, baseOf: BaseOf): VirtualNode {
  if (node.children.length === 0) return node
  return {
    ...node,
    children: node.children.map((child) => {
      let made = withBases(child, baseOf)
      for (const from of child.inherits ?? []) {
        const base = baseOf(from)
        if (base !== undefined) made = merged(base, made)
      }
      return made
    }),
  }
}
