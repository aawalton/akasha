import { engineConstantsTable } from "akasha/temper/eso/constant/modules/engine-constants-seeding/engine-constants-seeding.module.code.ts"
import type { UiControl } from "akasha/temper/eso/ui-harness/modules/ui-harness/ui-harness.module.code.ts"

export type UiRect = {
  readonly left: number
  readonly top: number
  readonly width: number
  readonly height: number
}

export type Shown = UiControl & { readonly clip?: UiRect }

const DRAWN = engineConstantsTable().numbers

const CT_SCROLL = DRAWN.CT_SCROLL

const CONTROLS_LAYER = DRAWN.DL_CONTROLS ?? 1

type Order = { readonly tier: number; readonly layer: number; readonly level: number }

type Ordered = Order & { readonly one: Shown; readonly window: number; readonly at: number }

function clipUnder(one: UiControl, clip: UiRect | undefined): UiRect | undefined {
  if (one.controlType !== CT_SCROLL) return clip
  const own = { left: one.left, top: one.top, width: one.width, height: one.height }
  if (clip === undefined) return own
  const left = Math.max(own.left, clip.left)
  const top = Math.max(own.top, clip.top)
  const right = Math.min(own.left + own.width, clip.left + clip.width)
  const bottom = Math.min(own.top + own.height, clip.top + clip.height)
  return { left, top, width: Math.max(0, right - left), height: Math.max(0, bottom - top) }
}

function outside(one: UiControl, clip: UiRect): boolean {
  return (
    one.left >= clip.left + clip.width ||
    one.top >= clip.top + clip.height ||
    one.left + one.width <= clip.left ||
    one.top + one.height <= clip.top
  )
}

function drawnBefore(first: Ordered, second: Ordered): number {
  return (
    first.window - second.window ||
    first.tier - second.tier ||
    first.layer - second.layer ||
    first.level - second.level ||
    first.at - second.at
  )
}

function windowRanks(root: UiControl): readonly number[] {
  const order = root.children.map((one, at) => ({
    at,
    tier: one.drawTier ?? 0,
    layer: one.drawLayer ?? CONTROLS_LAYER,
    level: one.drawLevel ?? 0,
  }))
  order.sort(
    (first, second) =>
      first.tier - second.tier ||
      first.layer - second.layer ||
      first.level - second.level ||
      first.at - second.at
  )
  const ranks: number[] = []
  order.forEach((one, rank) => {
    ranks[one.at] = rank + 1
  })
  return ranks
}

export function shownIn(root: UiControl): readonly Shown[] {
  const ordered: Ordered[] = []
  const ranks = windowRanks(root)
  function walk(
    one: UiControl,
    window: number,
    held: Order,
    above: number,
    clip?: UiRect
  ): undefined {
    const top = one === root
    if (!top && one.hidden) return undefined
    const alpha = one.alpha * above
    if (alpha <= 0) return undefined
    const own: Order = {
      tier: one.drawTier ?? held.tier,
      layer: one.drawLayer ?? held.layer,
      level: one.drawLevel ?? held.level,
    }
    const kept: Shown | null =
      clip === undefined ? { ...one, alpha } : outside(one, clip) ? null : { ...one, alpha, clip }
    if (kept !== null) ordered.push({ ...own, one: kept, window, at: ordered.length })
    const under = clipUnder(one, clip)
    one.children.forEach((child, index) => {
      walk(child, top ? (ranks[index] ?? index + 1) : window, own, alpha, under)
    })
    return undefined
  }
  walk(root, 0, { tier: 0, layer: CONTROLS_LAYER, level: 0 }, 1)
  return ordered.sort(drawnBefore).map((placed) => placed.one)
}
