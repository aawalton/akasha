import { deriver } from "./page-derive.ts"
import { type Carries, type Deriver, type Row } from "./page-derive-shape.ts"
import type { Roots } from "../../page/page.ts"

let deriverTtlMs = 0

interface HeldDeriver {
  readonly at: number
  readonly derive: Deriver
}

const held = new Map<string, HeldDeriver>()

export function holdDerivers(ttlMs: number): void {
  deriverTtlMs = ttlMs
}

export function dropDerivers(): void {
  held.clear()
}

function memoRows(derive: Deriver): Deriver {
  const rowed = new Map<string, Iterable<Row> | null>()
  return {
    ...derive,
    rows: (pageType: string): Iterable<Row> | null => {
      const stood = rowed.get(pageType)
      if (stood !== undefined) return stood
      const got = derive.rows(pageType)
      rowed.set(pageType, got)
      return got
    },
  }
}

export function deriverFor(roots: Roots, carries: Carries = {}): Deriver {
  if (deriverTtlMs === 0) return memoRows(deriver(roots, carries))
  const key = [
    carries.body === true,
    (carries.attachment ?? []).join(","),
    (carries.rows ?? []).join(","),
    carries.pages === true,
    carries.only === undefined ? "*" : [...carries.only].sort().join(","),
  ].join("|")
  const now = Date.now()
  for (const [named, one] of held) if (now - one.at > deriverTtlMs) held.delete(named)
  const one = held.get(key)
  if (one !== undefined) return one.derive
  const made = memoRows(deriver(roots, carries))
  held.set(key, { at: now, derive: made })
  return made
}
