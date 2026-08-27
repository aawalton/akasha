import type { Declared } from "./page-declared.ts"
import type { Held } from "./page-file-values.ts"
import type { Reached } from "./page-reach.ts"
import { seatIsAttached } from "./seat-attached-read.ts"
import { type SeatPresence, statedProcessPresence } from "./seat-proc-key.ts"

const SUPERVISOR_PROCESS = "supervisor-process"

const TITLE = "title"

const PRESENCE_HELD: Readonly<Record<SeatPresence, Held>> = {
  present: "true",
  absent: "false",
  unknown: null,
}

export interface Deriving {
  readonly declared: ReadonlyMap<string, ReadonlyMap<string, Declared>>
  readonly chainOf: (pageType: string) => readonly string[]
}

export type CodeValue = (page: Reached, from: Deriving) => Held

const CODE_VALUES: ReadonlyMap<string, CodeValue> = new Map<string, CodeValue>([
  [
    "seat-presence",
    (page) => PRESENCE_HELD[statedProcessPresence(page.values[SUPERVISOR_PROCESS])],
  ],
  [
    "seat-mode",
    (page) => {
      const name = page.values[TITLE]
      if (typeof name !== "string" || name === "") return null
      const attached = seatIsAttached(name)
      if (attached === null) return null
      return attached ? "interactive" : "headless"
    },
  ],
  [
    "page-type-properties",
    (page, from) => {
      const found = new Map<string, string>()
      for (const on of from.chainOf(page.named))
        for (const [key, one] of from.declared.get(on) ?? [])
          if (!found.has(key)) found.set(key, one.slug)
      return [...found.values()].sort()
    },
  ],
])

export function codeValueFor(slug: string): CodeValue | undefined {
  return CODE_VALUES.get(slug)
}
