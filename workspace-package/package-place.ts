import type { Landed } from "./relocated-path.ts"

const SCOPED = /^@([^/@]+)\/([^/@]+)$/

const PLAIN = /^[^/@][^/]*$/

export interface Placing {
  readonly name: string
  readonly from: string
  readonly to: string
}

export function placeOf(name: string): string | null {
  const scoped = SCOPED.exec(name)
  if (scoped !== null) return `${scoped[1]}/${scoped[2]}`
  return PLAIN.test(name) ? name : null
}

export function planFrom(named: ReadonlyMap<string, string>): readonly Placing[] {
  const out: Placing[] = []
  for (const [from, name] of named) {
    const to = placeOf(name)
    if (to === null) continue
    out.push({ name, from, to })
  }
  return out.sort((a, b) => (a.from < b.from ? -1 : 1))
}

export function collisionsIn(plan: readonly Placing[]): readonly string[] {
  const seen = new Map<string, string[]>()
  for (const one of plan) {
    const held = seen.get(one.to)
    if (held === undefined) seen.set(one.to, [one.from])
    else held.push(one.from)
  }
  return [...seen]
    .filter(([, from]) => from.length > 1)
    .map(([to, from]) => `${to} is claimed by ${from.join(" and ")}`)
}

export function landedFor(plan: readonly Placing[]): readonly Landed[] {
  return [{ from: "", to: null }, ...plan.map((one) => ({ from: one.from, to: one.to }))]
}
