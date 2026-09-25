import { SPACING_STEPS } from "akasha/design/interface/token/modules/spacing-step/spacing-step.module.code.ts"
import type { UiControl } from "akasha/temper/eso/ui-harness/modules/ui-harness/ui-harness.module.code.ts"

export type Direction = "across" | "down"

export type OffStep = {
  readonly direction: Direction
  readonly gap: number
  readonly from: string
  readonly to: string
}

type Box = {
  readonly named: string
  readonly left: number
  readonly top: number
  readonly right: number
  readonly bottom: number
}

const STEPS: ReadonlySet<number> = new Set(SPACING_STEPS.map((step) => step.px))

const LARGEST = Math.max(...STEPS)

function measured(one: UiControl): boolean {
  return !one.hidden && one.alpha > 0 && one.width > 0 && one.height > 0
}

function namedIn(one: UiControl, holder: UiControl): string {
  if (one.name !== undefined) return one.name
  const left = Math.round(one.left - holder.left)
  const top = Math.round(one.top - holder.top)
  return `the control at ${left}, ${top} in ${holder.name ?? "an unnamed control"}`
}

function boxesIn(holder: UiControl): readonly Box[] {
  return holder.children.filter(measured).map((one) => ({
    named: namedIn(one, holder),
    left: one.left,
    top: one.top,
    right: one.left + one.width,
    bottom: one.top + one.height,
  }))
}

function overlap(start: number, end: number, otherStart: number, otherEnd: number): number {
  return Math.min(end, otherEnd) - Math.max(start, otherStart)
}

function gapTo(from: Box, to: Box, direction: Direction): number | null {
  if (direction === "across") {
    if (overlap(from.top, from.bottom, to.top, to.bottom) <= 0) return null
    return to.left >= from.right ? to.left - from.right : null
  }
  if (overlap(from.left, from.right, to.left, to.right) <= 0) return null
  return to.top >= from.bottom ? to.top - from.bottom : null
}

function nearest(from: Box, boxes: readonly Box[], direction: Direction): OffStep | null {
  let found: OffStep | null = null
  for (const to of boxes) {
    if (to === from) continue
    const gap = gapTo(from, to, direction)
    if (gap === null || (found !== null && gap >= found.gap)) continue
    found = { direction, gap, from: from.named, to: to.named }
  }
  return found
}

function halved(gap: number): number {
  return Math.round(gap * 2) / 2
}

function offStep(gap: number): boolean {
  return gap > 0 && gap < LARGEST && !STEPS.has(gap)
}

function offStepIn(holder: UiControl): readonly OffStep[] {
  const boxes = boxesIn(holder)
  const found: OffStep[] = []
  for (const from of boxes) {
    for (const direction of ["across", "down"] as const) {
      const near = nearest(from, boxes, direction)
      if (near === null) continue
      const gap = halved(near.gap)
      if (offStep(gap)) found.push({ ...near, gap })
    }
  }
  return found
}

export function offStepGaps(root: UiControl): readonly OffStep[] {
  const found: OffStep[] = []
  function walk(one: UiControl): undefined {
    if (!measured(one)) return undefined
    found.push(...offStepIn(one))
    for (const child of one.children) {
      if (child.virtual === undefined) walk(child)
    }
    return undefined
  }
  walk(root)
  return found
}
