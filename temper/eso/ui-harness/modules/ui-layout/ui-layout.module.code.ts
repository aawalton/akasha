import type { UiControl } from "akasha/temper/eso/ui-harness/modules/ui-harness/ui-harness.module.code.ts"

const SCREEN_WIDTH = 1920

const SCREEN_HEIGHT = 1080

const ORIGIN: readonly [number, number] = [0, 0]

const POINT_FRACTIONS: Readonly<Record<number, readonly [number, number]>> = {
  1: [0, 0],
  2: [0.5, 0],
  4: [1, 0],
  8: [0, 0.5],
  16: [0.5, 0.5],
  32: [1, 0.5],
  64: [0, 1],
  128: [0.5, 1],
  256: [1, 1],
}

export type UiRect = {
  readonly left: number
  readonly top: number
  readonly width: number
  readonly height: number
}

export type UiBox = {
  readonly control: UiControl
  readonly depth: number
  readonly rect: UiRect
}

export type LayOutOptions = {
  readonly screen?: UiRect
}

function fractionOf(point: number): readonly [number, number] {
  return POINT_FRACTIONS[point] ?? ORIGIN
}

export function layOut(root: UiControl, options: LayOutOptions = {}): readonly UiBox[] {
  const screen: UiRect = options.screen ?? {
    left: 0,
    top: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  }

  const byName = new Map<string, UiControl>()
  const parentOf = new Map<UiControl, UiControl | null>()
  const depthOf = new Map<UiControl, number>()
  const painted: UiControl[] = []

  function walk(one: UiControl, parent: UiControl | null, depth: number): undefined {
    if (one.name !== undefined) byName.set(one.name, one)
    parentOf.set(one, parent)
    depthOf.set(one, depth)
    painted.push(one)
    for (const child of one.children) walk(child, one, depth + 1)
    return undefined
  }

  walk(root, null, 0)

  const settled = new Map<UiControl, UiRect>()
  const working = new Set<UiControl>()

  function rectOf(one: UiControl): UiRect {
    const had = settled.get(one)
    if (had !== undefined) return had
    if (working.has(one)) return screen
    working.add(one)
    const made = worked(one)
    working.delete(one)
    settled.set(one, made)
    return made
  }

  function targetRect(name: string | undefined, parent: UiControl | null): UiRect {
    if (name !== undefined) {
      const named = byName.get(name)
      if (named !== undefined) return rectOf(named)
      return screen
    }
    return parent === null ? screen : rectOf(parent)
  }

  function worked(one: UiControl): UiRect {
    const parent = parentOf.get(one) ?? null
    if (one === root) {
      return {
        left: screen.left,
        top: screen.top,
        width: one.width === 0 ? screen.width : one.width,
        height: one.height === 0 ? screen.height : one.height,
      }
    }
    const held = parent === null ? screen : rectOf(parent)
    const anchors = one.anchors
    if (anchors.length === 0) {
      return { left: held.left, top: held.top, width: one.width, height: one.height }
    }
    const placed = anchors.slice(0, 2).map((anchor) => {
      const against = targetRect(anchor.relativeTo, parent)
      const [towardsX, towardsY] = fractionOf(anchor.relativePoint)
      const [mineX, mineY] = fractionOf(anchor.point)
      return {
        mineX,
        mineY,
        atX: against.left + towardsX * against.width + anchor.offsetX,
        atY: against.top + towardsY * against.height + anchor.offsetY,
      }
    })
    const first = placed[0]
    if (first === undefined) {
      return { left: held.left, top: held.top, width: one.width, height: one.height }
    }
    const second = placed[1]
    const width =
      second === undefined || second.mineX === first.mineX
        ? one.width
        : (second.atX - first.atX) / (second.mineX - first.mineX)
    const height =
      second === undefined || second.mineY === first.mineY
        ? one.height
        : (second.atY - first.atY) / (second.mineY - first.mineY)
    return {
      left: first.atX - first.mineX * width,
      top: first.atY - first.mineY * height,
      width,
      height,
    }
  }

  return painted.map((one) => ({
    control: one,
    depth: depthOf.get(one) ?? 0,
    rect: rectOf(one),
  }))
}
