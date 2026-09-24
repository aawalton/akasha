import { firstCapture } from "akasha/code/type/narrowing/modules/first-capture/first-capture.module.code.ts"

export type Group = readonly string[]

const STATED: readonly RegExp[] = [
  /^declare (?:const|let|var) ([A-Za-z0-9_$]+)/,
  /^declare function ([A-Za-z0-9_$]+)/,
  /^type ([A-Za-z0-9_$]+)/,
  /^interface ([A-Za-z0-9_$]+)/,
]

const DIGITS = 2

const FIRST = 1

export function nameIn(line: string): string | null {
  for (const held of STATED) {
    const found = firstCapture(held.exec(line))
    if (found !== null) return found
  }
  return null
}

export function groupKey(group: Group): string | null {
  const first = group[0]
  return first === undefined ? null : nameIn(first)
}

export function pagedBy(bodies: readonly string[]): ReadonlyMap<string, number> {
  const held = new Map<string, number>()
  for (const [at, body] of bodies.entries()) {
    for (const line of body.split("\n")) {
      const named = nameIn(line)
      if (named !== null && !held.has(named)) held.set(named, at)
    }
  }
  return held
}

export function assigned(
  groups: readonly Group[],
  pagedAt: ReadonlyMap<string, number>
): readonly (readonly Group[])[] {
  const pages: Group[][] = [[]]
  let at = 0
  for (const group of groups) {
    const named = groupKey(group)
    const was = named === null ? undefined : pagedAt.get(named)
    if (was !== undefined && was > at) at = was
    while (pages.length <= at) pages.push([])
    pages[at]?.push(group)
  }
  return pages
}

export function spilled(
  pages: readonly (readonly Group[])[],
  sizeOf: (groups: readonly Group[]) => number,
  ceiling: number
): readonly (readonly Group[])[] {
  const held: Group[][] = pages.map((one) => [...one])
  for (let at = 0; at < held.length; at += 1) {
    let one = held[at]
    while (one !== undefined && one.length > 1 && sizeOf(one) > ceiling) {
      const last = one.pop()
      if (last === undefined) break
      if (held[at + 1] === undefined) held.push([])
      held[at + 1]?.unshift(last)
      one = held[at]
    }
  }
  return held.filter((one) => one.length > 0)
}

export function slugsFor(prefix: string, held: readonly string[], many: number): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < many; at += 1) {
    const was = held[at]
    found.push(was ?? `${prefix}-${String(at + FIRST).padStart(DIGITS, "0")}`)
  }
  return found
}
